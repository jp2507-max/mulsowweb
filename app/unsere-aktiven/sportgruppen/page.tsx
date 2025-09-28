import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata, siteConfig } from "../../config/site";

const groupIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const groups = [
  {
    name: "Frauensportgruppe Clausdorf",
    schedule: "Montag 18:00 – 19:00 Uhr",
    location: "Dorfgemeinschaftshaus Clausdorf",
  },
  {
    name: "Männersportgruppe Clausdorf",
    schedule: "Donnerstag 18:30 – 19:30 Uhr",
    location: "Dorfgemeinschaftshaus Clausdorf",
  },
] as const;

const contact = {
  name: "Ines Pillat-May",
  mail: "Ines.pillat@kinaesthetics-net.de",
  phone: "0179 5265795",
};

// Normalize telephone for href (keep leading + if present, strip other non-digit chars)
function makeTelHref(phone: string) {
  if (!phone) return "";
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return `tel:${hasPlus ? "+" : ""}${digits}`;
}

export const metadata: Metadata = generatePageMetadata({
  title: "Sportgruppen",
  description: "Sportgruppen des Mulsower SV 61 – Fitnessangebote in Clausdorf mit Ansprechpartnerin und Trainingszeiten.",
  path: "/unsere-aktiven/sportgruppen"
});

export default function SportgruppenPage() {
  return (
    <main className="relative overflow-hidden" role="main" id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: `${siteConfig.baseUrl}/` },
          { name: "Unsere Aktiven", url: `${siteConfig.baseUrl}/unsere-aktiven/` },
          { name: "Sportgruppen", url: `${siteConfig.baseUrl}/unsere-aktiven/sportgruppen/` },
        ]}
      />

      <section className="relative isolate py-20 text-ink-primary md:py-24">
        <div className="container-site">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-secondary/80">Breitensport</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-heading font-black tracking-tight text-ink-primary md:text-5xl lg:text-6xl">
            Sportgruppen in Clausdorf
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-secondary md:text-xl">
            Bewegung, Gemeinschaft und Gesundheit stehen im Mittelpunkt unserer Sportgruppen. Ob Frauen- oder Männersport – jede
            Einheit ist voller Energie und guter Stimmung.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="mailto:Ines.pillat@kinaesthetics-net.de" variant="primary" className="shadow-lg">
              Anmeldung & Fragen
            </Button>
            <Button
              href={makeTelHref(contact.phone)}
              variant="outline"
              className="bg-white/70 backdrop-blur transition duration-200 hover:bg-white"
            >
              Direkter Anruf
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-neutral-200/70" aria-hidden="true" />
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((group, index) => (
            <article
              key={group.name}
              className="card relative overflow-hidden border border-neutral-200/70 bg-white/90 p-8 shadow-xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-10"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" aria-hidden="true" />
              <div className="flex items-center gap-3 text-brand-primary">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  {groupIcon}
                </span>
                <h2 className="text-2xl font-heading font-semibold text-ink-primary md:text-3xl">{group.name}</h2>
              </div>
              <dl className="mt-6 space-y-2 text-sm text-ink-secondary">
                <div>
                  <dt className="uppercase tracking-wide text-brand-secondary">Trainingszeit</dt>
                  <dd className="mt-1 text-lg font-semibold text-ink-primary">{group.schedule}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wide text-brand-secondary">Ort</dt>
                  <dd className="mt-1 text-base">{group.location}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <article className="card border border-brand-primary/15 bg-gradient-to-br from-white/90 to-neutral-50/90 p-8 shadow-lg md:p-10">
            <h2 className="text-3xl font-heading font-semibold text-ink-primary">Ansprechpartnerin & Übungsleiterin</h2>
            <p className="mt-4 text-ink-secondary">
              Ines Pillat-May begleitet beide Sportgruppen mit viel Erfahrung in Bewegungs- und Gesundheitskursen. Sie sorgt für
              abwechslungsreiche Einheiten und eine herzliche Atmosphäre.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-neutral-200/70 bg-white/80 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-brand-secondary/70">Name</p>
                <p className="mt-2 text-base font-semibold text-ink-primary">{contact.name}</p>
              </div>
              <div className="rounded-xl border border-neutral-200/70 bg-white/80 px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-brand-secondary/70">Kontakt</p>
                <p className="mt-2 text-sm">
                  <a className="font-medium text-brand-primary hover:text-brand-secondary" href={`mailto:${contact.mail}`}>
                    {contact.mail}
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a className="font-medium text-brand-primary hover:text-brand-secondary" href={makeTelHref(contact.phone)}>
                    {contact.phone}
                  </a>
                </p>
              </div>
            </div>
          </article>

          <aside className="card border border-neutral-200/70 bg-white/90 p-8 text-sm text-ink-secondary shadow-lg">
            <h3 className="text-2xl font-heading font-semibold text-ink-primary">Was dich erwartet</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Mobilisation, Kräftigung und Stretching für jedes Fitnesslevel.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Motivierende Gruppendynamik in persönlicher Runde.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Fokus auf gesunde Bewegung und Spaß – keine Vorkenntnisse nötig.</span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-brand-primary/15 bg-brand-primary/5 px-5 py-4 text-brand-primary">
              <p className="text-xs uppercase tracking-wide text-brand-secondary/70">Hinweis</p>
              <p className="mt-2 text-sm">
                Neue Teilnehmerinnen und Teilnehmer sind jederzeit willkommen. Bitte melde dich vorab kurz bei Ines.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
