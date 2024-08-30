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
                url: 'https://anime-project-next-jet.vercel.app/og-image.png',
                width: 800,
                height: 450,
            },
        ],
        locale: 'es-AR',
        type: 'website',
    }
}

function Home() {
    

    return (
        <div className="h-screen overflow-y-auto mb-20">
            <HomeContent />
        </div>
    );
}

export default Home;