"use client";
import * as React from "react";
import useOverlay from '@/lib/utils/useOverlay';

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  labelledBy?: string;
}

export function Overlay({ open, onClose, children, labelledBy, ...rest }: OverlayProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  // Delegate overlay lifecycle behavior to the reusable hook
  useOverlay(open, panelRef, onClose);

  if (!open) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby={labelledBy} onClick={onClose} {...rest}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={panelRef}
      >
        {children}
      </div>
    </div>
  );
}

export default Overlay;
