import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { FussballDeWidget } from "@/components/utility/FussballDeWidget";
import { generatePageMetadata, siteConfig } from "../../config/site";

const juniorTeams = [
  {
    name: "E-Junioren",
    age: "Jahrgänge 2013/2014",
    training: [
      { day: "Dienstag", time: "17:00 – 18:30 Uhr", location: "Sportplatz Mulsow" },
      { day: "Donnerstag", time: "17:00 – 18:30 Uhr", location: "Sportplatz Mulsow" },
    ],
    contact: {
      name: "Martin Staack",
      mail: "info@mulsower-sv.de",
      phone: "0160 96074971",
    },
    focusColor: "from-sky-400 to-brand-primary",
  },
  {
    name: "F-Junioren",
    age: "Jahrgänge 2013/2014",
    training: [
      { day: "Dienstag", time: "17:00 – 18:30 Uhr", location: "Sportplatz Mulsow" },
      { day: "Donnerstag", time: "17:00 – 18:30 Uhr", location: "Sportplatz Mulsow" },
    ],
    contact: {
      name: "Martin Staack",
      mail: "info@mulsower-sv.de",
      phone: "0160 96074971",
    },
    focusColor: "from-amber-400 to-orange-500",
  },
  {
    name: "Bambini",
    age: "Jahrgänge 2019 und jünger",
    training: [
      { day: "Mittwoch", time: "16:30 – 17:30 Uhr", location: "Sporthalle Mulsow" },
    ],
    contact: {
      name: "Martin Staack",
      mail: "info@mulsower-sv.de",
      phone: "0160 96074971",
    },
    focusColor: "from-emerald-400 to-teal-500",
  },
] as const;

export const metadata: Metadata = generatePageMetadata({
  title: "Junioren",
  description:
    "Die Nachwuchsteams des Mulsower SV 61 – E-, F- und Bambini-Mannschaften mit Trainingszeiten, Ansprechpartnern und Spielplänen.",
  path: "/unsere-aktiven/junioren"
});

export default function JuniorenPage() {
  return (
    <main className="relative overflow-hidden" role="main" id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: `${siteConfig.baseUrl}/` },
          { name: "Unsere Aktiven", url: `${siteConfig.baseUrl}/unsere-aktiven/` },
          { name: "Junioren", url: `${siteConfig.baseUrl}/unsere-aktiven/junioren/` },
        ]}
      />

      <section className="relative isolate py-20 text-ink-primary md:py-24">
        <div className="container-site">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] xl:gap-14">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-secondary/80">Jugendfußball</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-heading font-black tracking-tight text-ink-primary md:text-5xl lg:text-6xl">
                Nachwuchsarbeit beim Mulsower SV 61
              </h1>
              
              <p className="mt-6 max-w-2xl text-lg text-ink-secondary md:text-xl">
                Wir fördern junge Talente mit Herzblut. Ob erste Ballkontakte bei den Bambini oder ambitioniertes Training bei den
                E- und F-Junioren – der Spaß am Spiel steht immer im Mittelpunkt.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href={siteConfig.externalLinks.fussballDe}
                  target="_blank"
                  variant="outline"
                  className="bg-white/70 backdrop-blur transition duration-200 hover:bg-white"
                >
                  Jugendspielpläne auf FUSSBALL.DE
                </Button>
                <Button href="mailto:info@mulsower-sv.de" variant="primary" className="shadow-lg">
                  Kontakt aufnehmen
                </Button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <aside className="card border border-neutral-200/70 bg-white/95 p-6 shadow-lg">
                  <header className="mb-3">
                    <p className="eyebrow">Nächstes Spiel</p>
                    <h2 className="text-lg font-heading font-semibold text-ink-primary md:text-xl">E-Junioren</h2>
                  </header>
                  <FussballDeWidget
                    id="8bf95935-f5a8-4696-90f3-967aa94d038b"
                    type="next-match"
                    className="w-full"
                    title="FUSSBALL.DE – Nächstes Spiel E-Junioren"
                  />
                </aside>

                <aside className="card border border-neutral-200/70 bg-white/95 p-6 shadow-lg">
                  <header className="mb-3">
                    <p className="eyebrow">Nächstes Spiel</p>
                    <h2 className="text-lg font-heading font-semibold text-ink-primary md:text-xl">F-Junioren</h2>
                  </header>
                  <FussballDeWidget
                    id="eb58e56c-0ea9-4c5d-b1dc-e1b6ceccca65"
                    type="next-match"
                    className="w-full"
                    title="FUSSBALL.DE – Nächstes Spiel F-Junioren"
                  />
                </aside>
              </div>
              
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-neutral-200/70" aria-hidden="true" />
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {juniorTeams.map((team, index) => (
            <article
              key={team.name}
              className="card relative overflow-hidden border border-neutral-200/70 bg-white/90 p-8 shadow-lg transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-10"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${team.focusColor}`} aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.3em] text-ink-tertiary">Nachwuchsteam</span>
              <h2 className="mt-3 text-2xl font-heading font-semibold text-ink-primary md:text-3xl">{team.name}</h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-primary/80">{team.age}</p>

              <div className="mt-6 space-y-4">
                {team.training.map((slot) => (
                  <div
                    key={`${team.name}-${slot.day}`}
                    className="rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-light"
                  >
                    <div className="text-sm uppercase tracking-wide text-brand-secondary">{slot.day}</div>
                    <div className="mt-1 text-lg font-semibold text-ink-primary">{slot.time}</div>
                    <div className="text-sm text-ink-secondary">{slot.location}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-neutral-200/60 bg-neutral-50/70 px-5 py-4 text-sm text-ink-secondary">
                <p className="text-xs uppercase tracking-wide text-brand-secondary/70">Ansprechpartner</p>
                <p className="mt-2 text-base font-semibold text-ink-primary">{team.contact.name}</p>
                <p className="text-sm">
                  <a className="font-medium text-brand-primary hover:text-brand-secondary" href={`mailto:${team.contact.mail}`}>
                    {team.contact.mail}
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a className="font-medium text-brand-primary hover:text-brand-secondary" href={`tel:${team.contact.phone.replace(/[^+\d]/g, "")}`}>
                    {team.contact.phone}
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="card border border-brand-primary/15 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 p-8 shadow-lg md:p-10">
            <h2 className="text-3xl font-heading font-semibold text-brand-primary">Talentförderung beim MSV</h2>
            <p className="mt-4 text-ink-secondary">
              Wir legen Wert auf altersgerechte Trainingsinhalte, Fairplay und Gemeinschaftssinn.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-neutral-200/70 bg-white/80 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-brand-primary">Perspektive</p>
                <p className="mt-2 text-sm text-ink-secondary">
                  Übergang in die älteren Jugendklassen und später in unsere Herrenmannschaft.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200/70 bg-white/80 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-brand-primary">Gemeinschaft</p>
                <p className="mt-2 text-sm text-ink-secondary">
                  Gemeinsame Turniere, Feriencamps und Vereinsaktionen stärken das Teamgefühl.
                </p>
              </div>
            </div>
          </article>

          <aside className="card border border-neutral-200/80 bg-white/90 p-8 shadow-lg">
            <h3 className="text-2xl font-heading font-semibold text-ink-primary">Noch Fragen?</h3>
            <p className="mt-3 text-sm text-ink-secondary">
              Schreib uns für Schnuppertrainings oder weitere Infos zu den Jugendteams.
            </p>
            <div className="mt-5 space-y-3 text-sm text-ink-primary/90">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a className="font-medium text-brand-primary hover:text-brand-secondary" href="mailto:info@mulsower-sv.de">
                  info@mulsower-sv.de
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C8.82 21 3 15.18 3 8V7a2 2 0 012-2z" />
                </svg>
                <span>
                  Telefon: <a className="font-medium text-brand-primary hover:text-brand-secondary" href="tel:+4916096074971">0160 96074971</a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Folge unserem Nachwuchs auf Instagram: <a className="font-medium text-brand-primary hover:text-brand-secondary" href={siteConfig.social.instagramYouth.href} target="_blank" rel="noreferrer">@mulsower_sv.nachwuchs</a></span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
