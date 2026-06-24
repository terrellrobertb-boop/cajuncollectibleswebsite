import type { Metadata } from "next";
import { Alfa_Slab_One, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Heavy geometric sans for impact UI text (e.g. hero category row).
// Loaded at 800 + 900 only — used sparingly.
const montserrat = Montserrat({
  variable: "--font-impact",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cajuncollectibles.com"),
  title: {
    default: "Cajun Collectibles — Where the Past Comes Alive, One Memory at a Time",
    template: "%s — Cajun Collectibles",
  },
  description:
    "Louisiana-based collectibles brand for sports cards, retro video games, comic books, and vintage toys. The Hunt. The Find. The Story.",
  keywords: [
    "Cajun Collectibles",
    "sports cards",
    "retro video games",
    "comic books",
    "vintage toys",
    "collectibles",
    "Louisiana",
    "Gumbeaux the Gator",
  ],
  openGraph: {
    title: "Cajun Collectibles",
    description:
      "Sports Cards • Retro Games • Comics • Vintage Toys — Where the Past Comes Alive, One Memory at a Time.",
    url: "https://cajuncollectibles.com",
    siteName: "Cajun Collectibles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cajun Collectibles",
    description:
      "Sports Cards • Retro Games • Comics • Vintage Toys — Where the Past Comes Alive, One Memory at a Time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alfaSlabOne.variable} ${dmSans.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="bg-cream text-charcoal min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
