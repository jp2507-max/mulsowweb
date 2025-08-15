export const dynamic = "error";

export default function SchedulePage() {
  return (
    <main className="container-site py-10">
      <h1 className="text-3xl font-bold mb-4">Spielplan</h1>
      <p className="text-ink-secondary mb-6">
        Der offizielle Spielplan ist auf FUSSBALL.DE verfügbar.
      </p>
      <a
        className="btn btn-primary btn-md"
        href="https://www.fussball.de/verein/mulsower-sv-61-mecklenburg-vorpommern/-/id/00ES8GNBNG000024VV0AG08LVUPGND5I#!/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Spielplan auf FUSSBALL.DE öffnen
      </a>
    </main>
  );
}
