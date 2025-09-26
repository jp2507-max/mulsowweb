"use client";

import { FussballDeWidget } from "@/components/utility/FussballDeWidget";
import FacebookWidget from "./FacebookWidget";

export default function NextMatchWidget() {
  return (
    <section aria-labelledby="next-match-heading" className="section-spacing-tight">
      <div className="container-site">
          <div className="max-w-4xl mx-auto">
            {/* Render two separate cards next to each other so each widget is independent */}
            <div className="grid gap-6 md:grid-cols-5 md:gap-8">
              <div className="md:col-span-2">
                <div className="card card-hover h-full">
                  <div className="p-6">
                    <p className="eyebrow">Nächstes Spiel</p>
                    <h2 id="next-match-heading" className="text-2xl md:text-3xl font-heading font-semibold text-ink-primary mb-6">
                      Mulsower SV 61 – Nächste Spiele (Verein)
                    </h2>
                    <FussballDeWidget
                      id="9c5ae118-657e-4663-891b-a5d86cb22c5c"
                      type="club-matches"
                      host="www.fussball.de"
                      engine="script"
                      className="w-full"
                      title="Nächste Spiele – FUSSBALL.DE"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <FacebookWidget height={700} />
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
