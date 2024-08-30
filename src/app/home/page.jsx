import HomeContent from "./HomeContent";

export const metadata = {
    title: 'Anime Table',
    description: 'List of your animes, edit or delete them and track them',
    openGraph: {
        title: 'Anime Table',
        description: 'List of your animes, edit or delete them and track them',
        url: 'https://anime-project-next-jet.vercel.app/home',
        siteName: 'Anime Tracker',
        images: [
            {
                url: 'https://anime-project-next-jet.vercel.app/og-image.webp',
                width: 800,
                height: 450,
                alt: "Anime Tracker - A simple app to track your animes"
            },
        ],
        locale: 'es-AR',
        type: 'website',
    },
    twitter: {
        title: "Anime Table",
        description: "List of your animes, edit or delete them and track them",
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
}

function Home() {


    return (
        <div className="h-screen overflow-y-auto mb-20">
            <HomeContent />
        </div>
    );
}

export default Home;