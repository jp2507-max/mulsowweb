import { Metadata } from 'next';
import { generatePageMetadata } from '@/app/config/site';

export const dynamic = "error";

export const metadata: Metadata = generatePageMetadata({
  title: "Unsere Sponsoren & Partner",
  description: "Unsere Sponsoren und Partner unterstützen den Mulsower SV 61. Erfahren Sie mehr über die lokalen Unternehmen, die unseren Amateurfußballverein fördern.",
  path: "/sponsoren"
});

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
