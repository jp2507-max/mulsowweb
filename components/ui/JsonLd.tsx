import * as React from "react";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data)
    // Escape the opening bracket to avoid closing the <script> tag when
    // the JSON contains '</script>' sequences.
    .replace(/</g, "\\u003c")
    // Escape line separator characters which are valid in JS strings but
    // break inline script embedding in HTML.
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
    // Optionally escape HTML comment closers to be extra-safe.
    .replace(/-->/g, "--\\u003e");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}

type Crumb = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}
