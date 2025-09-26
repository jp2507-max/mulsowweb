import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import FussballDeWidget from "@/components/utility/FussballDeWidget";
import { generatePageMetadata, siteConfig } from "../../config/site";

const trainingSlots = [
  {
    label: "Dienstag",
    time: "19:00 – 20:30 Uhr",
    location: "Sportplatz Mulsow",
  },
  {
    label: "Donnerstag",
    time: "19:00 – 20:30 Uhr",
    location: "Sportplatz Mulsow",
  },
] as const;

const focusPoints = [
  {
    title: "Teamgeist",
    copy: "Eine eingespielte Mannschaft, in der neue Spielerinnen und Spieler herzlich aufgenommen werden.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Leidenschaft",
    copy: "Heimspiele in echter MSV-Atmosphäre – unterstützt von Fans, Familie und Freunden.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  {
    title: "Weiterentwicklung",
    copy: "Modernes Trainingskonzept mit Fokus auf Technik, Fitness und Taktik.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
] as const;

export const metadata: Metadata = generatePageMetadata({
  title: "Herrenmannschaft",
  description: "Alle Infos zur Herrenmannschaft des Mulsower SV 61 – Trainingszeiten, Highlights und Kontakt.",
  path: "/unsere-aktiven/herrenmannschaft"
});

export default function HerrenmannschaftPage() {
  return (
    <main className="relative overflow-hidden" role="main" id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: `${siteConfig.baseUrl}/` },
          { name: "Unsere Aktiven", url: `${siteConfig.baseUrl}/unsere-aktiven/` },
          { name: "Herrenmannschaft", url: `${siteConfig.baseUrl}/unsere-aktiven/herrenmannschaft/` },
        ]}
      />

      <section className="relative isolate py-20 text-ink-primary md:py-24">
        <div className="container-site">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] xl:gap-14">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-secondary/80">Herren</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-heading font-black tracking-tight text-ink-primary md:text-5xl lg:text-6xl">
                Die Herren des Mulsower SV 61
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-secondary md:text-xl">
                Engagiertes Training, leidenschaftliche Spiele und eine starke Gemeinschaft. Sei dabei und unterstütze das Team
                – ob auf dem Platz oder von der Seitenlinie.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={siteConfig.externalLinks.fussballDe}
                  target="_blank"
                  variant="outline"
                  className="bg-white/80 text-ink-primary backdrop-blur transition duration-200 hover:bg-white"
                >
                  Spielplan & Tabelle auf FUSSBALL.DE
                </Button>
                <Button href="mailto:info@mulsower-sv.de" variant="primary" className="shadow-lg">
                  Kontakt aufnehmen
                </Button>
              </div>
            </div>

            <aside className="card card-hover border border-neutral-200/70 bg-white/95 p-6 shadow-xl">
              <header className="mb-4">
                <p className="eyebrow">Nächstes Spiel</p>
                <h2 className="text-xl font-heading font-semibold text-ink-primary md:text-2xl">
                  Herrenmannschaft – Kommende Partien
                </h2>
              </header>
              <FussballDeWidget
                id="485388d7-75ab-4f46-8717-3e5774a0a750"
                type="team-matches"
                className="w-full"
                title="FUSSBALL.DE – Nächste Spiele Herrenmannschaft"
              />
            </aside>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-neutral-200/70" aria-hidden="true" />
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <article className="card relative overflow-hidden border border-neutral-200/60 bg-white/90 p-8 shadow-xl md:p-10">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" aria-hidden="true" />
              <header className="mb-6">
                <h2 className="text-3xl font-heading font-semibold text-ink-primary">Trainingsablauf</h2>
                <p className="mt-3 text-ink-secondary">
                  Gemeinsam arbeiten wir an Technik, Taktik und Fitness. Die Trainingszeiten sind so gelegt, dass Beruf und
                  Fußball gut vereinbar bleiben.
                </p>
              </header>
              <dl className="grid gap-6 md:grid-cols-2">
                {trainingSlots.map((slot) => (
                  <div
                    key={slot.label}
                    className="rounded-2xl border border-neutral-200/80 bg-white/90 px-5 py-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <dt className="text-sm uppercase tracking-wide text-brand-secondary">{slot.label}</dt>
                    <dd className="mt-2 text-xl font-semibold text-ink-primary">{slot.time}</dd>
                    <dd className="mt-1 text-sm text-ink-secondary">{slot.location}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <aside className="card border border-neutral-200/70 bg-white/95 p-8 shadow-lg">
              <h3 className="text-2xl font-heading font-semibold text-brand-primary">Kontakt</h3>
              <p className="mt-3 text-ink-secondary">
                Du möchtest ein Probetraining vereinbaren oder mehr über das Team erfahren? Wir freuen uns auf deine Nachricht.
              </p>
              <div className="mt-6 space-y-3 text-sm text-ink-primary/90">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V7a2 2 0 012-2z" />
                  </svg>
                  <span>Telefon: <a className="font-semibold text-brand-primary hover:text-brand-secondary" href="tel:01713473604" aria-label="Telefon 0171 3473604">0171 3473604</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a className="font-semibold text-brand-primary hover:text-brand-secondary" href="mailto:info@mulsower-sv.de">
                    info@mulsower-sv.de
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-16">
            <h2 className="text-center text-3xl font-heading font-semibold text-ink-primary">Mehr als nur 90 Minuten</h2>
            <p className="mt-3 text-center text-ink-secondary">
              Unser Verein steht für regionale Verbundenheit, Nachwuchsförderung und ehrlichen Amateurfußball.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {focusPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-neutral-200/70 bg-white/90 p-6 text-center shadow-sm transition duration-200 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    {point.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-heading font-semibold text-ink-primary">{point.title}</h3>
                  <p className="mt-2 text-sm text-ink-secondary">{point.copy}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-site">
          <div className="card mx-auto max-w-4xl border border-neutral-200/80 bg-white text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/12 text-brand-primary">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.104 0 2-.672 2-1.5S13.104 5 12 5s-2 .672-2 1.5S10.896 8 12 8zm0 0v4m0 0c0 1.5-1 3-3 3m3-3c0 1.5 1 3 3 3m6 3v3H6a3 3 0 01-3-3v-2a8 8 0 0116 0v2h2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-heading font-semibold text-ink-primary md:text-4xl">
              Bereit für das nächste Spiel?
            </h2>
            <p className="mt-4 mx-auto max-w-3xl text-base text-ink-secondary md:text-lg">
              Schau im Spielplan nach dem nächsten Heimspiel oder schreib uns, wenn du das Team als Spieler, Betreuer oder
              Unterstützer verstärken möchtest. Wir melden uns schnellstmöglich zurück.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href={siteConfig.externalLinks.fussballDe}
                target="_blank"
                variant="primary"
                className="shadow-lg"
              >
                Spielplan öffnen
              </Button>
              <Button
                href="mailto:info@mulsower-sv.de"
                variant="outline"
                className="bg-white/80 text-ink-primary hover:bg-white"
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
