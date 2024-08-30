import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Anime Tracker",
  description: "Anime tracker app",
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
