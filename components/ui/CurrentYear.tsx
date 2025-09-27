"use client";

import type { HTMLAttributes } from "react";

type CurrentYearProps = HTMLAttributes<HTMLTimeElement>;

export function CurrentYear({ className, ...rest }: CurrentYearProps) {
  const year = new Date().getFullYear();
  return (
    <time dateTime={String(year)} className={className} {...rest}>
      {year}
    </time>
  );
}

export default CurrentYear;
