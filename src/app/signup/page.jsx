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
                url: 'https://anime-project-next-jet.vercel.app/og-image.png',
                width: 800,
                height: 450,
            },
        ],
        locale: 'es-AR',
        type: 'website',
    }
}
function SignupPage() {

    return (
        <div className="h-screen w-full">
            <div className="block items-center justify-center my-[5em] mx-auto w-[45%] text-center">
                <RegisterForm />
            </div>
        </div>
    );
}

export default SignupPage