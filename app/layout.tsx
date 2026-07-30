import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://andreviery.github.io/joias/";
const title = "Nubia’s Joias | Semijoias com significado";
const description = "Semijoias hipoalergênicas banhadas a ouro 18k e em prata 925. Beleza para todos os seus momentos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [{ url: `${siteUrl}og.png`, width: 1739, height: 909, alt: "Nubia’s Joias — Peças que contam a sua história." }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
