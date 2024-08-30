import Link from "next/link";
import { PublicRoutes } from "./routes/routes";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Página no encontrada</h1>
          <p className="mt-6 text-base leading-7 text-gray-300">Lo siento, no pudimos encontrar la página que estabas buscando.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${PublicRoutes.LANDING}`}
              className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Vuelve al inicio
            </Link>
          </div>
        </div>
      </main>
  );
}