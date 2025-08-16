import * as React from "react";
import { cx } from "@/lib/utils/cx";
import { secureRel } from "../../lib/utils/secure-rel";

export interface CardProps {
  title?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
  hover?: boolean; // apply interactive hover styles
}

export function Card({ title, href, target, rel, children, className, hover }: CardProps) {
  const interactive = Boolean(href);
  const applyHover = hover ?? interactive;
  const classes = cx("card", applyHover && "card-hover", className);
  const isExternal = href && (target === "_blank" || href.startsWith("http"));

  const content = (
    <div className={classes}>
      {title ? (
        <h3 className="text-xl font-semibold mb-2">
          {title}
          {isExternal && (
            <span className="sr-only">
              (öffnet externe Website)
            </span>
          )}
        </h3>
      ) : null}
      {children}
    </div>
  );

  if (!href) return content;

  const anchorRel = secureRel(rel, target ?? "_blank");

  return (
    <a 
      href={href} 
      target={target ?? "_blank"} 
      rel={anchorRel} 
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl"
      aria-label={title ? `${title}${isExternal ? " - Öffnet externe Website" : ""}` : undefined}
    >
      {content}
    </a>
  );
}

export default Card;
