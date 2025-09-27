"use client";

import React, { Suspense } from 'react';

const Monitor = process.env.NODE_ENV === 'production'
  ? null
  : React.lazy(() => import('./PerformanceMonitor.client'));

export default function PerformanceMonitorLoader() {
  // Render nothing in production because the client monitor is a no-op there.
  if (!Monitor) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Monitor />
    </Suspense>
  );
}
