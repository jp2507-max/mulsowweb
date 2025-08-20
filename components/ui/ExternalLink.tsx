import * as React from "react";
import { secureRel } from "../../lib/utils/secure-rel";

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, target = "_blank", rel, ...props }, ref) => {
    const anchorRel = secureRel(rel, target);
    return (
      <a ref={ref} target={target} rel={anchorRel} {...props}>
        {children}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
