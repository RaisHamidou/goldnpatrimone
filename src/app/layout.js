
import CookieConsent from "@/components/Layout/CookieConsent/CookieConsent";
import "../app/settings/styles/globals.scss";

export const metadata = {
  title: "Gold'N Patrimoine | Conseil & Investissement Immobilier",
  description: "Achetez, investissez et développez votre patrimoine immobilier. Découvrez des opportunités adaptées à votre budget et un accompagnement personnalisé.",
  openGraph: {
  title: "Gold'N Patrimoine | Conseil & Investissement Immobilier",
  description: "Achetez, investissez et développez votre patrimoine immobilier. Découvrez des opportunités adaptées à votre budget et un accompagnement personnalisé.",
  url: "https://goldnpatrimoine.com",
  siteName: "Gold'N Patrimoine",
  type: "website",
  images: [
    {
      url: "https://goldnpatrimoine.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Gold'N Patrimoine",
    },
  ],
},
};
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
      <CookieConsent/>
    </html>
  );
}
