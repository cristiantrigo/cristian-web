import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";

const ppNeueBit = localFont({
  src: "../public/fonts/PPNeueBit-Bold.otf",
  display: "swap",
  variable: "--font-neuebit",
  weight: "700",
});

export const metadata = {
  title: "Cristian Trigo — Lead Product Designer",
  description:
    "Portfolio of Cristian Trigo, Lead Product Designer at BBVA. Crafting digital products for over 8 years across startups, scale-ups, and global companies.",
  keywords: [
    "product designer",
    "lead designer",
    "BBVA",
    "portfolio",
    "design engineering",
    "Cristian Trigo",
  ],
  authors: [{ name: "Cristian Trigo" }],
  creator: "Cristian Trigo",
  metadataBase: new URL("https://cristiantrigo.es"),
  openGraph: {
    title: "Cristian Trigo — Lead Product Designer",
    description:
      "Crafting digital products for over 8 years. Lead Product Designer at BBVA.",
    url: "https://cristiantrigo.es",
    siteName: "Cristian Trigo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Trigo — Lead Product Designer",
    description:
      "Crafting digital products for over 8 years. Lead Product Designer at BBVA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ppNeueBit.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Cristian Trigo",
              jobTitle: "Lead Product Designer",
              worksFor: {
                "@type": "Organization",
                name: "BBVA",
              },
              url: "https://cristiantrigo.es",
              email: "hello@cristiantrigo.es",
            }),
          }}
        />
      </body>
    </html>
  );
}
