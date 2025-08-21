/**
 * Optimized Hover Effects with Will-Change Management
 * 
 * Manages hover effects with dynamic will-change application for optimal performance.
 * Only applies will-change during hover interactions to avoid permanent layer pinning.
 * 
 * Requirements: 6.3, 4.5, 1.1, 1.4
 */

import { supportsHover, shouldReduceAnimations } from './deviceCapabilities';
import { prepareTransform, prepareOpacity, cleanupWillChange } from './willChangeManager';

export interface HoverConfig {
  properties: ('transform' | 'opacity')[];
  duration: number;
  usePointerEvents: boolean;
}

const DEFAULT_CONFIG: HoverConfig = {
  properties: ['transform', 'opacity'],
  duration: 200,
  usePointerEvents: true,
};

class OptimizedHoverManager {
  private activeHovers = new Set<Element>();
  private hoverConfigs = new Map<Element, HoverConfig>();

  /**
   * Initialize hover effects for an element
   */
  init(element: Element, config: Partial<HoverConfig> = {}): () => void {
    if (shouldReduceAnimations() || !supportsHover()) {
      return () => {};
    }

    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    this.hoverConfigs.set(element, finalConfig);

    // Use pointer events if supported and requested
    if (finalConfig.usePointerEvents && 'onpointerenter' in element) {
      return this.initPointerEvents(element, finalConfig);
    } else {
      return this.initMouseEvents(element, finalConfig);
    }
  }

  /**
   * Initialize with pointer events (more precise)
   */
  private initPointerEvents(element: Element, config: HoverConfig): () => void {
    const onPointerEnter = (e: Event) => {
      const pointerEvent = e as PointerEvent;
      // Only handle mouse/pen, not touch
      if (pointerEvent.pointerType === 'touch') return;
      this.handleHoverStart(element, config);
    };

    const onPointerLeave = (e: Event) => {
      const pointerEvent = e as PointerEvent;
      if (pointerEvent.pointerType === 'touch') return;
      this.handleHoverEnd(element);
    };

    element.addEventListener('pointerenter', onPointerEnter);
    element.addEventListener('pointerleave', onPointerLeave);

    return () => {
      element.removeEventListener('pointerenter', onPointerEnter);
      element.removeEventListener('pointerleave', onPointerLeave);
      this.cleanup(element);
    };
  }

  /**
   * Initialize with mouse events (fallback)
   */
  private initMouseEvents(element: Element, config: HoverConfig): () => void {
    const onMouseEnter = () => this.handleHoverStart(element, config);
    const onMouseLeave = () => this.handleHoverEnd(element);

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
      this.cleanup(element);
    };
  }

  /**
   * Handle hover start
   */
  private handleHoverStart(element: Element, config: HoverConfig): void {
    if (this.activeHovers.has(element)) return;

    this.activeHovers.add(element);

    // Apply will-change based on properties
    if (config.properties.includes('transform') && config.properties.includes('opacity')) {
      prepareTransform(element, config.duration);
      prepareOpacity(element, config.duration);
    } else if (config.properties.includes('transform')) {
      prepareTransform(element, config.duration);
    } else if (config.properties.includes('opacity')) {
      prepareOpacity(element, config.duration);
    }

    // Add hover class for CSS transitions
    element.classList.add('is-hovering');
  }

  /**
   * Handle hover end
   */
  private handleHoverEnd(element: Element): void {
    if (!this.activeHovers.has(element)) return;

    this.activeHovers.delete(element);

    // Remove hover class
    element.classList.remove('is-hovering');

    // Schedule will-change cleanup after transition
    const config = this.hoverConfigs.get(element);
    const delay = config ? config.duration + 50 : 250; // 50ms buffer

    setTimeout(() => {
      cleanupWillChange(element);
    }, delay);
  }

  /**
   * Clean up an element
   */
  private cleanup(element: Element): void {
    this.activeHovers.delete(element);
    this.hoverConfigs.delete(element);
    cleanupWillChange(element);
    element.classList.remove('is-hovering');
  }

  /**
   * Clean up all elements
   */
  cleanupAll(): void {
    for (const element of this.activeHovers) {
      this.cleanup(element);
    }
  }
}

// Singleton instance
const hoverManager = new OptimizedHoverManager();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    hoverManager.cleanupAll();
  });
}

/**
 * Initialize optimized hover for an element
 */
export function initOptimizedHover(
  element: Element, 
  config?: Partial<HoverConfig>
): () => void {
  return hoverManager.init(element, config);
}

/**
 * Initialize optimized hover for multiple elements
 */
export function initOptimizedHoverBatch(
  elements: Element[], 
  config?: Partial<HoverConfig>
): () => void {
  const cleanupFunctions = elements.map(element => 
    hoverManager.init(element, config)
  );

  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
}

/**
 * Auto-initialize hover effects based on CSS classes
 */
export function autoInitHoverEffects(): () => void {
  const hoverElements = document.querySelectorAll('.hover-optimized, .btn, .card-hover, .sponsor-card');
  
  return initOptimizedHoverBatch(Array.from(hoverElements), {
    properties: ['transform', 'opacity'],
    duration: 200,
  });
}