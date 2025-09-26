import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { generatePageMetadata, siteConfig } from "../config/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Unsere Aktiven",
  description:
    "Alle aktiven Mannschaften und Sportgruppen des Mulsower SV 61 im Überblick – Herren, Junioren und Breitensport.",
  path: "/unsere-aktiven"
});

const sections = [
  {
    title: "Herrenmannschaft",
    description:
      "Alle Infos zu unserer 1. Herren: Trainingszeiten, Kader und Verbindung zum aktuellen Spielplan.",
    href: "/unsere-aktiven/herrenmannschaft/",
    accent: "from-brand-primary to-brand-secondary",
  },
  {
    title: "Junioren",
    description:
      "E-, F- und Bambini-Teams mit Trainingszeiten, Ansprechpartnern und Links zu Spielplänen.",
    href: "/unsere-aktiven/junioren/",
    accent: "from-amber-400 to-brand-primary",
  },
  {
    title: "Sportgruppen",
    description:
      "Unsere Fitness- und Breitensportgruppen für Frauen und Männer in Clausdorf – inklusive Ansprechpartnerin.",
    href: "/unsere-aktiven/sportgruppen/",
    accent: "from-emerald-400 to-teal-600",
  },
] as const;

export default function UnsereAktivenPage() {
  return (
    <main className="relative overflow-hidden" role="main" id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: `${siteConfig.baseUrl}/` },
          { name: "Unsere Aktiven", url: `${siteConfig.baseUrl}/unsere-aktiven/` },
        ]}
      />

      <section className="relative isolate flex flex-col items-center bg-gradient-to-b from-brand-primary/90 via-brand-primary/80 to-brand-secondary/85 py-20 text-white">
        <div className="absolute inset-0 -z-10 opacity-40 mix-blend-screen" aria-hidden="true">
          <div className="mx-auto h-full w-full max-w-7xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
        </div>
        <div className="container-site text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Gemeinsam Aktiv</p>
          <h1 className="mt-4 text-4xl font-heading font-black tracking-tight md:text-5xl lg:text-6xl">
            Unsere Aktiven Mannschaften
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            Von der Herrenmannschaft bis zu unseren Junioren und Breitensportgruppen: Hier findest du alle Informationen
            rund um das aktive Vereinsleben des Mulsower SV 61.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/unsere-aktiven/herrenmannschaft/" variant="primary" size="md" className="touch-feedback">
              Direkt zur Herrenmannschaft
            </Button>
            <Button href="/unsere-aktiven/junioren/" variant="ghost" size="md" className="bg-white/10 text-white hover:bg-white/20">
              Nachwuchsteams entdecken
            </Button>
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {sections.map((section, index) => (
            <article
              key={section.href}
              className="card relative overflow-hidden border-transparent bg-white/80 p-8 text-left shadow-xl transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-10"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${section.accent}`}
                aria-hidden="true"
              />
              <div className="mb-6 inline-flex rounded-full bg-neutral-100 px-4 py-1 text-sm font-semibold text-ink-secondary">
                {section.title}
              </div>
              <h2 className="text-2xl font-heading font-semibold text-ink-primary md:text-3xl">{section.title}</h2>
              <p className="mt-4 text-base text-ink-secondary md:text-lg">{section.description}</p>
              <div className="mt-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-brand-primary">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <Link
                  href={section.href}
                  className="inline-flex items-center gap-2 text-brand-primary transition-transform duration-200 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  Mehr erfahren
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
