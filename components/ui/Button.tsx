import * as React from "react";
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
      const isExternal = target === "_blank" || href.startsWith("http");
      
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={anchorRel}
          download={download}
          className={classes}
          role="button"
          {...(isExternal && !rest["aria-label"] && {
            "aria-label": `${typeof children === "string" ? children : "Link"} - Öffnet in neuem Tab`
          })}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
          {isExternal && (
            <span className="sr-only">
              (öffnet in neuem Tab)
            </span>
          )}
        </a>
      );
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
