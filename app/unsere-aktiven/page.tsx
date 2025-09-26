import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { generatePageMetadata } from "../config/site";

export const metadata: Metadata = generatePageMetadata({
  title: "Unsere Aktiven",
  description:
    "Weiterleitung zu den Aktivbereichen des Mulsower SV 61 – Herrenmannschaft, Junioren und Sportgruppen.",
  path: "/unsere-aktiven"
});

export default function UnsereAktivenPage() {
  redirect("/unsere-aktiven/herrenmannschaft/");
}
