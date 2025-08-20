"use client";

import FussballDeWidget from "@/components/utility/FussballDeWidget";

export default function NextMatchWidget() {
  return (
    <section aria-labelledby="next-match-heading" className="py-8 md:py-12">
      <div className="container-site">
        <div className="card max-w-4xl mx-auto">
          <header className="mb-4">
            <p className="eyebrow">Nächstes Spiel</p>
            <h2 id="next-match-heading" className="text-2xl md:text-3xl font-heading font-semibold text-ink-primary">
              Mulsower SV 61 – Nächste Spiele (Verein)
            </h2>
          </header>
          <FussballDeWidget
            id="c53ad333-5ed6-4cae-884c-efb3a100404f"
            type="club-matches"
            className="w-full"
            title="Nächste Spiele – FUSSBALL.DE"
          />
        </div>
      </div>
    </section>
  );
}
