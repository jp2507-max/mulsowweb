"use client";

import { useEffect } from 'react';
import { shouldReduceAnimations } from '@/lib/utils/deviceCapabilities';

/**
 * HeroReady - Simplified hero animation controller
 * Ensures hero content is visible and ready for interaction
 */
export function useHeroReady() {
  useEffect(() => {
    // If animations are disabled, ensure content is immediately visible
    if (shouldReduceAnimations()) {
      const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-ctas');
      heroElements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Simple ready state - just ensure content is visible
    const timer = setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-ctas');
      heroElements.forEach(el => {
        el.classList.add('hero-ready');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}