"use client";

import { useEffect } from 'react';
import { shouldReduceAnimations } from '@/lib/utils/deviceCapabilities';

/**
 * Small, zero-config hook that waits for the hero image to decode
 * and then adds `hero-ready` to the documentElement. This is tiny
 * and only runs on the client.
 */
export function useHeroReady(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If device/user prefers reduced motion, mark hero ready immediately
    if (shouldReduceAnimations()) {
      document.documentElement.classList.add('hero-ready');
      return;
    }

    try {
      const img = document.getElementById('hero-img') as HTMLImageElement | null;
      if (!img) {
        // No image - still mark ready so animations can proceed
        document.documentElement.classList.add('hero-ready');
        return;
      }

      // If decode isn't supported, fallback to load event with a short timeout
      const markReady = () => document.documentElement.classList.add('hero-ready');

      if (img.decode) {
        img.decode().then(markReady).catch(markReady);
      } else if (img.complete && img.naturalWidth !== 0) {
        markReady();
      } else {
        const onLoad = () => {
          markReady();
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onLoad);
        };
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onLoad);

        // Safety timeout to avoid blocking animations forever
        const t = window.setTimeout(() => {
          markReady();
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onLoad);
        }, 1200);

        return () => window.clearTimeout(t);
      }
    } catch {
      // In case of any runtime errors, proceed with animations
      document.documentElement.classList.add('hero-ready');
    }
  }, []);
}

export default useHeroReady;
