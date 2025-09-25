/**
 * WillChangeManager - Dynamic will-change property management
 * 
 * Applies will-change just before expensive animations and removes after completion
 * to avoid permanent layer pinning that hurts performance.
 * 
 * Requirements: 6.3, 4.5
 */

import { supportsWillChange } from './deviceCapabilities';

export type WillChangeProperty = 'transform' | 'opacity' | 'scroll-position' | 'contents' | 'auto';

interface AnimationConfig {
  element: Element;
  properties: WillChangeProperty[];
  duration?: number;
  cleanup?: () => void;
}

class WillChangeManager {
  private activeAnimations = new Map<Element, AnimationConfig>();
  private cleanupTimeouts = new Map<Element, number>();

  /**
   * Apply will-change properties just before animation starts
   */
  prepare(element: Element, properties: WillChangeProperty[], duration = 300): void {
    if (!supportsWillChange() || !element) return;

    // Clear any existing cleanup for this element
    this.clearCleanup(element);

    const config: AnimationConfig = {
      element,
      properties,
      duration,
    };

    // Apply will-change
    const htmlElement = element as HTMLElement;
    htmlElement.style.willChange = properties.join(', ');

    // Store the configuration
    this.activeAnimations.set(element, config);

    // Schedule automatic cleanup after animation duration + buffer
    const cleanupDelay = duration + 50; // 50ms buffer
    const timeoutId = window.setTimeout(() => {
      this.cleanup(element);
    }, cleanupDelay);

    this.cleanupTimeouts.set(element, timeoutId);
  }

  /**
   * Manually trigger cleanup for an element (e.g., on animation end event)
   */
  cleanup(element: Element): void {
    if (!element) return;

    const htmlElement = element as HTMLElement;
    
  // Remove inline will-change so stylesheet/class rules can resume
  htmlElement.style.removeProperty('will-change');

    // Clear stored data
    this.activeAnimations.delete(element);
    this.clearCleanup(element);
  }

  /**
   * Clear scheduled cleanup timeout
   */
  private clearCleanup(element: Element): void {
    const timeoutId = this.cleanupTimeouts.get(element);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.cleanupTimeouts.delete(element);
    }
  }

  /**
   * Clean up all active animations (useful for page unload)
   */
  cleanupAll(): void {
    for (const element of this.activeAnimations.keys()) {
      this.cleanup(element);
    }
  }

  /**
   * Get active animation count (for debugging/monitoring)
   */
  getActiveCount(): number {
    return this.activeAnimations.size;
  }
}

// Singleton instance
const willChangeManager = new WillChangeManager();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    willChangeManager.cleanupAll();
  });
}

export { willChangeManager };

/**
 * Convenience functions for common animation patterns
 */

/**
 * Prepare element for transform animation
 */
export function prepareTransform(element: Element, duration?: number): void {
  willChangeManager.prepare(element, ['transform'], duration);
}

/**
 * Prepare element for opacity animation
 */
export function prepareOpacity(element: Element, duration?: number): void {
  willChangeManager.prepare(element, ['opacity'], duration);
}

/**
 * Prepare element for transform + opacity animation (most common)
 */
export function prepareTransformOpacity(element: Element, duration?: number): void {
  willChangeManager.prepare(element, ['transform', 'opacity'], duration);
}

/**
 * Clean up will-change for element
 */
export function cleanupWillChange(element: Element): void {
  willChangeManager.cleanup(element);
}

/**
 * Higher-order function to wrap animation with will-change management
 */
export function withWillChange<T extends Element>(
  element: T,
  properties: WillChangeProperty[],
  animationFn: (element: T) => Promise<void> | void,
  duration = 300
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Prepare will-change
      willChangeManager.prepare(element, properties, duration);

      // Execute animation
      const result = animationFn(element);

      if (result instanceof Promise) {
        result
          .then(() => {
            willChangeManager.cleanup(element);
            resolve();
          })
          .catch((error) => {
            willChangeManager.cleanup(element);
            reject(error);
          });
      } else {
        // Synchronous animation - cleanup after duration
        setTimeout(() => {
          willChangeManager.cleanup(element);
          resolve();
        }, duration);
      }
    } catch (error) {
      willChangeManager.cleanup(element);
      reject(error);
    }
  });
}