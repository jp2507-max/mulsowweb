"use client"
import React, { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [seed, setSeed] = useState<number | null>(null);
  const [addedLocal, setAddedLocal] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function loadSeed() {
      try {
        const res = await fetch('/visitor-seed.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('bad response');
        const data = await res.json();
        if (mounted) setSeed(typeof data?.seed === 'number' ? data.seed : 0);
      } catch {
        if (mounted) setSeed(0);
      }
    }

    loadSeed();

    // Mark this device as a visitor once (persists in localStorage)
    try {
      const key = 'msv61_seen_v1';
      const seen = localStorage.getItem(key);
      if (!seen) {
        localStorage.setItem(key, '1');
        setAddedLocal(true);
      }
    } catch {
      // localStorage might be unavailable in some contexts — ignore
    }

    return () => { mounted = false };
  }, []);

  const display = seed == null ? '—' : seed + (addedLocal ? 1 : 0);

  return (
    <div className="mt-8 pt-6 border-t border-neutral-200">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm text-ink-tertiary mb-2">Besucher (geschätzt)</p>
        <div aria-live="polite" className="inline-flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-ink-primary" aria-hidden>
            {display}
          </span>
          <span className="text-sm text-ink-secondary">Nutzer</span>
        </div>
        <p className="text-xs text-ink-tertiary mt-3">Anzeigewert basiert auf einem Startwert und zählt pro Gerät einmal.</p>
      </div>
    </div>
  );
}
