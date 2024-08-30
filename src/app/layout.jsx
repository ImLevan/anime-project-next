import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: {
    default: "Anime Tracker - A simple app to track your animes",
    template: "%s | Anime Tracker - A simple app to track your animes",
  },
  description: "A simple app to track your animes",
  keywords: ["Anime", "Tracker", "Animes", "Tracker", "App", "AnimeManagment", "AnimeList", "AnimeTracker"],
  author: "Valentin Chianese",
  openGraph: {
    title: "Anime Tracker - A simple app to track your animes",
    description: "A simple app to track your animes",
    url: "https://anime-project-next-jet.vercel.app/",
    siteName: "Anime Tracker",
    images: [
      {
        url: "https://anime-project-next-jet.vercel.app/og-image.webp",
        width: 800,
        height: 450,
        alt: "Anime Tracker - A simple app to track your animes"
      },
    ],
    locale: "es-AR",
    type: "website",
  },
  twitter: {
    title: "Anime Tracker - A simple app to track your animes",
    description: "A simple app to track your animes",
    card: "summary_large_image",
    creator: "@valentin_chianese",
    images: [
      {
        url: "https://anime-project-next-jet.vercel.app/og-image.webp",
        width: 800,
        height: 450,
        alt: "Anime Tracker - A simple app to track your animes"
      },
    ],
  },
  icons: {
    icon: [
      '/favicon.ico?v=1',
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/apple-touch-icon.png',
    ],
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Header />
        <div className="mx-auto h-full max-w-7xl">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
