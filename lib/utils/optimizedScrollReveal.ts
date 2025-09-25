/**
 * Optimized Scroll Reveal with Will-Change Management
 * 
 * Enhanced version of scroll reveal that uses WillChangeManager for
 * performance optimization and GPU layer management.
 * 
 * Requirements: 6.3, 4.5, 2.1, 2.4
 */

import { shouldReduceAnimations, supportsIntersectionObserver } from './deviceCapabilities';
import { prepareTransformOpacity, cleanupWillChange } from './willChangeManager';

export interface OptimizedRevealConfig {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  maxGroupDelay?: number;
  animationDuration?: number;
}

const DEFAULT_CONFIG: OptimizedRevealConfig = {
  threshold: 0.15,
  rootMargin: '0px 0px -15% 0px',
  staggerDelay: 60,
  maxGroupDelay: 400,
  animationDuration: 200,
};

class OptimizedScrollReveal {
  private observer: IntersectionObserver | null = null;
  private config: OptimizedRevealConfig;
  private revealedElements = new Set<Element>();

  constructor(config: Partial<OptimizedRevealConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Initialize optimized scroll reveal
   */
  init(): () => void {
    // Respect reduced motion preferences
    if (shouldReduceAnimations()) {
      this.makeAllVisible();
      return () => {};
    }

    // Check for IntersectionObserver support
    if (!supportsIntersectionObserver()) {
      this.makeAllVisible();
      return () => {};
    }

    try {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          threshold: this.config.threshold,
          rootMargin: this.config.rootMargin,
        }
      );

      // Find and observe reveal candidates
      this.observeElements();

      return () => this.cleanup();
    } catch (error) {
      console.warn('OptimizedScrollReveal: Failed to initialize, falling back to visible state', error);
      this.makeAllVisible();
      return () => {};
    }
  }

  /**
   * Handle intersection observer entries
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    const visibleEntries = entries.filter(entry => 
      entry.isIntersecting && !this.revealedElements.has(entry.target)
    );

    if (visibleEntries.length === 0) return;

    // Group entries by their parent container for staggered animations
    const groups = this.groupEntriesByContainer(visibleEntries);

    groups.forEach(group => this.animateGroup(group));
  }

  /**
   * Group entries by their common parent for staggered animations
   */
  private groupEntriesByContainer(entries: IntersectionObserverEntry[]): IntersectionObserverEntry[][] {
    const groups = new Map<Element, IntersectionObserverEntry[]>();

    entries.forEach(entry => {
      const container = entry.target.closest('.stagger-group') || 
                       entry.target.parentElement || 
                       document.body;
      
      if (!groups.has(container)) {
        groups.set(container, []);
      }
      groups.get(container)!.push(entry);
    });

    return Array.from(groups.values());
  }

  /**
   * Animate a group of elements with staggered timing
   */
  private animateGroup(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry, index) => {
      const delay = Math.min(index * this.config.staggerDelay!, this.config.maxGroupDelay!);
      
      setTimeout(() => {
        this.revealElement(entry.target);
      }, delay);
    });
  }

  /**
   * Reveal a single element with performance optimization
   */
  private revealElement(element: Element): void {
    if (this.revealedElements.has(element)) return;

    // Prepare will-change for optimal performance
    prepareTransformOpacity(element, this.config.animationDuration);

    // Apply reveal class
    element.classList.add('in');
    this.revealedElements.add(element);

    // Stop observing this element
    this.observer?.unobserve(element);

    // Schedule cleanup
    setTimeout(() => {
      cleanupWillChange(element);
    }, this.config.animationDuration! + 50);
  }

  /**
   * Find and observe all reveal candidate elements
   */
  private observeElements(): void {
    const candidates = document.querySelectorAll('.reveal-candidate, .reveal-optimized');
    
    candidates.forEach(element => {
      // Add reveal class to enable CSS transitions
      element.classList.add('reveal-optimized');
      
      // Observe for intersection
      this.observer?.observe(element);
    });
  }

  /**
   * Make all elements visible immediately (fallback)
   */
  private makeAllVisible(): void {
    const candidates = document.querySelectorAll('.reveal-candidate, .reveal-optimized');
    
    candidates.forEach(element => {
      element.classList.add('reveal-optimized', 'in');
      this.revealedElements.add(element);
    });
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Clean up will-change for all revealed elements
    this.revealedElements.forEach(element => {
      cleanupWillChange(element);
    });

    this.revealedElements.clear();
  }
}

// Export factory function for easy integration
export function createOptimizedScrollReveal(config?: Partial<OptimizedRevealConfig>): () => void {
  const reveal = new OptimizedScrollReveal(config);
  return reveal.init();
}

// Export for direct usage
export { OptimizedScrollReveal };