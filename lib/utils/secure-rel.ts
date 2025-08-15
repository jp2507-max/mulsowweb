import * as React from "react";

/**
 * Ensures secure rel attributes for external links by adding noopener and noreferrer
 * when target="_blank" is used to prevent security vulnerabilities.
 */
export function secureRel(rel: string | undefined, target?: React.HTMLAttributeAnchorTarget): string | undefined {
  if (target === "_blank") {
    const base = rel ? rel.split(/\s+/) : [];
    if (!base.includes("noopener")) base.push("noopener");
    if (!base.includes("noreferrer")) base.push("noreferrer");
    return base.join(" ");
  }
  return rel;
}