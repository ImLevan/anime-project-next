import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: {
    default: "Anime Tracker - Una aplicación para gestionar tus animes",
    template: "%s | Anime Tracker - Una aplicación para gestionar tus animes",
  },
  description: "Anime Tracker - la aplicación que te ayuda a llevar el hilo de tus animes favoritos. Crea tu propia agenda de anime para que lleves tu cuenta!.",
  keywords: ["Anime", "Tracker", "Animes", "Tracker", "App", "AnimeManagment", "AnimeList", "AnimeTracker"],
  author: "Valentin Chianese",
  openGraph: {
    title: "Anime Tracker - Una aplicación para gestionar tus animes",
    description: "Anime Tracker - la aplicación que te ayuda a llevar el hilo de tus animes favoritos. Crea tu propia agenda de anime para que lleves tu cuenta!.",
    url: "https://anime-project-next-jet.vercel.app/",
    siteName: "Anime Tracker",
    images: [
      {
        url: "https://anime-project-next-jet.vercel.app/og-image.webp",
        width: 800,
        height: 450,
        alt: "Anime Tracker - la aplicación que te ayuda a llevar el hilo de tus animes favoritos. Crea tu propia agenda de anime para que lleves tu cuenta!."
      },
    ],
    locale: "es-AR",
    type: "website",
  },
  twitter: {
    title: "Anime Tracker - Una aplicación para gestionar tus animes",
    description: "Anime Tracker - la aplicación que te ayuda a llevar el hilo de tus animes favoritos. Crea tu propia agenda de anime para que lleves tu cuenta!.",
    card: "summary_large_image",
    creator: "@valentin_chianese",
    images: [
      {
        url: "https://anime-project-next-jet.vercel.app/og-image.webp",
        width: 800,
        height: 450,
        alt: "Anime Tracker - Una aplicación para gestionar tus animes"
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
