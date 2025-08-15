import * as React from "react";

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

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function secureRel(rel: string | undefined, target?: React.HTMLAttributeAnchorTarget): string | undefined {
  if (target === "_blank") {
    const base = rel ? rel.split(/\s+/) : [];
    if (!base.includes("noopener")) base.push("noopener");
    if (!base.includes("noreferrer")) base.push("noreferrer");
    return base.join(" ");
  }
  return rel;
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
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={anchorRel}
          download={download}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
