import * as React from "react";

export interface CardProps {
  title?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
  hover?: boolean; // apply interactive hover styles
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

export function Card({ title, href, target, rel, children, className, hover }: CardProps) {
  const interactive = Boolean(href);
  const applyHover = hover ?? interactive;
  const classes = cx("card", applyHover && "card-hover", className);

  const content = (
    <div className={classes}>
      {title ? <h3 className="text-xl font-semibold mb-2">{title}</h3> : null}
      {children}
    </div>
  );

  if (!href) return content;

  const anchorRel = secureRel(rel, target ?? "_blank");

  return (
    <a href={href} target={target ?? "_blank"} rel={anchorRel} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl">
      {content}
    </a>
  );
}

export default Card;
