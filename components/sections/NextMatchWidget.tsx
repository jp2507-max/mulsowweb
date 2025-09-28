"use client";

import FacebookWidget from "./FacebookWidget";

export default function NextMatchWidget() {
  return (
    <section aria-labelledby="next-match-heading" className="section-spacing-tight">
    <div className="container-site">
  <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="space-y-4">
            <p className="eyebrow">Vereinsleben</p>
            <h2 id="next-match-heading" className="text-3xl font-heading font-semibold text-ink-primary md:text-4xl">
              Mulsower SV 61 auf Facebook
            </h2>
            <p className="text-base text-ink-secondary md:text-lg">
              Aktuelle Nachrichten, Spielimpressionen und Vereinsaktionen – folge uns für tägliche Updates.
            </p>
          </div>

          <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
            <div className="mx-auto">
              <FacebookWidget height={520} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
