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

  // Extract any user-provided onClick so callers can't override the close behavior.
  const { onClick: userOnClick, ...otherProps } = rest as React.HTMLAttributes<HTMLDivElement>;

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // Call user-provided onClick first so they can call e.preventDefault()
    try {
      if (typeof userOnClick === 'function') userOnClick(e)
    } catch {
      // Swallow errors from user handler to avoid breaking overlay logic
    }

    // Only call onClose when the user handler didn't prevent default
    if (!e.defaultPrevented && typeof onClose === 'function') onClose()
  }

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={handleBackdropClick}
      {...otherProps}
    >
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
