import RegisterForm from "./RegisterForm";

export const metadata = {
    title: 'Sign Up',
    description: 'Register to be able to access the tracking of your animes',
    openGraph: {
        title: 'Sign Up',
        description: 'Register to be able to access the tracking of your animes',
        url: 'https://anime-project-next-jet.vercel.app/signup',
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
        title: "Sign Up",
        description: "Register to be able to access the tracking of your animes",
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
function SignupPage() {

    return (
        <div className="h-full w-full">
            <div className="min-h-screen items-center justify-center my-[5em] mx-auto text-center lg:w-1/2 md:w-2/3 sm:w-full">
                <RegisterForm />
            </div>
        </div>
    );
}

export default SignupPage