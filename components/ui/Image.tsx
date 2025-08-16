import * as React from "react";
import { cx } from "@/lib/utils/cx";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
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

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
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
        // Performance optimizations
        style={{
          // Prevent layout shift by reserving space
          ...(width && height && {
            aspectRatio: `${width} / ${height}`,
          }),
          // Optimize rendering
          imageRendering: "auto",
          ...rest.style,
        }}
        {...rest}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;