
import "../app/settings/styles/globals.scss";

export const metadata = {
  title: "Gold'N Patrimoine | Agence immobilière",
  description: "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
  openGraph: {
  title: "Gold'N Patrimoine | Agence immobilière",
  description: "Accompagnement immobilier personnalisé pour acheter, vendre ou investir.",
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
    </html>
  );
}
