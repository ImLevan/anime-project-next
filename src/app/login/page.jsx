import LoginInputForm from "./LoginInputForm";

export const metadata = {
  title: 'Login',
  description: 'Login to be able to access the tracking of your animes',
  openGraph: {
      title: 'Login',
      description: 'Login to be able to access the tracking of your animes',
      url: 'https://anime-project-next-jet.vercel.app/login',
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

function LoginPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="lg:w-1/2 md:w-2/3 sm:w-full mx-auto p-4">
        <LoginInputForm />
      </div>
    </div>
  );
}

export default LoginPage;