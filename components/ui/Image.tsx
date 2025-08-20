import * as React from "react";
import { cx } from "@/lib/utils/cx";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /**
   * Mark the image as purely decorative. When true, the component
   * will set alt to an empty string, add aria-hidden, and make the
   * image non-draggable for improved UX and accessibility.
   */
  decorative?: boolean;
}

/**
 * Optimized Image component for static export
 * Uses native lazy loading and performance optimizations
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      className,
      sizes,
      loading,
      decoding = "async",
      decorative = false,
      ...rest
    },
    ref
  ) => {
  // Determine loading strategy
  const loadingStrategy = loading || (priority ? "eager" : "lazy");
    
    // Generate srcset for responsive images if sizes provided
    const srcSet = React.useMemo(() => {
      if (!sizes || !src.includes('.')) return undefined;
      
      // For static export, we assume images are pre-optimized
      // This is a placeholder for future responsive image implementation
      return undefined;
    }, [src, sizes]);

    // Extract potentially provided draggable/style from rest so we can
    // compute sensible defaults when the image is decorative.
  const { draggable: restDraggable, style: restStyle, ...restProps } = rest as Partial<ImageProps>;

    const finalAlt = decorative ? "" : alt;
    const ariaHidden = decorative ? true : undefined;
    const draggableAttr = typeof restDraggable !== "undefined" ? restDraggable : decorative ? false : undefined;

    return (
      <img
        {...restProps}
        ref={ref}
        src={src}
        alt={finalAlt}
        width={width}
        height={height}
        loading={loadingStrategy}
        decoding={decoding}
        srcSet={srcSet}
        sizes={sizes}
        className={cx(
          // Base image styles for performance
          "max-w-full h-auto",
          // Prevent layout shift if dimensions provided
          (width && height) ? "aspect-auto" : undefined,
          className
        )}
        // Accessibility and drag behavior
        aria-hidden={ariaHidden}
        draggable={draggableAttr}
        // Performance optimizations
        style={{
          // Prevent layout shift by reserving space
          ...(width && height && {
            aspectRatio: `${width} / ${height}`,
          }),
          // Optimize rendering
          imageRendering: "auto",
          ...(restStyle || {}),
        }}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;