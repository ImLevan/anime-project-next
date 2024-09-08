import { Toaster } from "sonner";
import HomeContent from "./HomeContent";

export const metadata = {
    title: 'Anime Table',
    description: 'Tu lista de animes, edita o elimina tus animes y lleva un control de cada uno de ellos.',
    openGraph: {
        title: 'Anime Table',
        description: 'Tu lista de animes, edita o elimina tus animes y lleva un control de cada uno de ellos.',
        url: 'https://anime-project-next-jet.vercel.app/home',
        siteName: 'Anime Tracker',
        images: [
            {
                url: 'https://anime-project-next-jet.vercel.app/og-image.webp',
                width: 800,
                height: 450,
                alt: "Anime Tracker - Una aplicación para gestionar tus animes"
            },
        ],
        locale: 'es-AR',
        type: 'website',
    },
    twitter: {
        title: "Anime Table",
        description: "Tu lista de animes, edita o elimina tus animes y lleva un control de cada uno de ellos.",
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
}

function Home() {


    return (
        <div className="min-h-screen overflow-y-auto mb-20">
            <Toaster richColors position='top-center' closeButton />
            <HomeContent />
        </div>
    );
}

export default Home;