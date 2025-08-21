import React, { Suspense } from 'react';

/**
 * Bundle optimization utilities for minimizing JavaScript size
 */

/**
 * Lazy loading wrapper for non-critical components
 */
export function LazyWrapper({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

/**
 * Dynamic import helper for code splitting
 */
export function createLazyComponent(
  importFn: () => Promise<{ default: React.ComponentType }>
) {
  const LazyComponent = React.lazy(importFn);
  
  return function WrappedLazyComponent(props: Record<string, unknown>) {
    return (
      <Suspense fallback={<div className="animate-pulse bg-neutral-200 rounded h-8 w-32" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Intersection Observer hook for lazy loading components
 */
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  
  React.useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.05, // Reduced threshold for earlier loading
        rootMargin: '100px', // Increased margin for smoother loading
        ...options,
      }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [ref, options]);
  
  return isIntersecting;
}

/**
 * Lazy loading component that only renders when in viewport
 * Optimized to prevent re-mounting once loaded
 */
export function LazyOnScroll({ 
  children, 
  className = '',
  fallback = null 
}: { 
  children: React.ReactNode; 
  className?: string;
  fallback?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (isVisible && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isVisible, hasLoaded]);
  
  return (
    <div ref={ref} className={className}>
      {hasLoaded ? children : fallback}
    </div>
  );
}

export default LazyWrapper;