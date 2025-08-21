import * as React from "react";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";
import { secureRel } from "../../lib/utils/secure-rel";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  download?: boolean | string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      target,
      download,
      rel,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = cx(
      "btn",
  /* touch-feedback provides short :active scale/opacity for touch devices */
  "touch-feedback",
      size === "sm" && "btn-sm",
      size === "md" && "btn-md",
      size === "lg" && "btn-lg",
      variant === "primary" && "btn-primary",
      variant === "outline" && "btn-outline",
      variant === "ghost" && "btn-ghost",
      className
    );

    if (href) {
      const anchorRel = secureRel(rel, target);

      // Treat as external when:
      // - target is _blank
      // - href starts with a scheme (e.g. mailto:, tel:, data:, etc.)
      // - href starts with protocol-relative '//' or explicit http(s) schemes
      const schemeRegex = /^[a-z][a-z0-9+.-]*:/i;
      const isProtocolRelative = href.startsWith("//");
      const isHttp = href.startsWith("http://") || href.startsWith("https://");
      const isScheme = schemeRegex.test(href);
      const isExternal = target === "_blank" || isProtocolRelative || isHttp || isScheme;

      // Use Next.js Link for internal navigation, anchor for external links
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={anchorRel}
            download={download}
            className={classes}
            // Intentionally do NOT compute or append an aria-label here —
            // keep the visible / screen-reader text below to announce
            // "öffnet in neuem Tab" and allow any aria-* attributes passed
            // by callers to be forwarded via the rest props cast.
            {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
            <span className="sr-only">(öffnet in neuem Tab)</span>
          </a>
        );
      } else {
        // Internal link - use Next.js Link for client-side navigation
        return (
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            // Keep aria-labels passed via rest instead of computing one here.
            {...(download && { download })}
            {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </Link>
        );
      }
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        type={rest.type || "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
