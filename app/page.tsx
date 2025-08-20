import type { Metadata } from "next";
import Hero from '../components/sections/Hero';
import NextMatchWidget from '../components/sections/NextMatchWidget';
import SponsorTeaser from '../components/sections/SponsorTeaser';
import ContactSnippet from '../components/sections/ContactSnippet';
import { generatePageMetadata } from './config/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Mulsower SV 61 - Amateurfußballverein aus Mecklenburg-Vorpommern',
  description: 'Offizieller Internetauftritt des Mulsower SV 61 - Amateurfußballverein aus Mecklenburg-Vorpommern. Spielplan, Sponsoren, Mitgliedschaft und mehr.',
  path: ''
});

export default function Home() {
  return (
    <main role="main">
      <Hero />
  <NextMatchWidget />
      <SponsorTeaser />
      <ContactSnippet />
    </main>
  );
}
