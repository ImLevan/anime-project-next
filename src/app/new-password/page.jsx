import { Toaster } from "sonner";
import NewPasswordForm from "./NewPasswordForm";

export const metadata = {
  title: 'Cambiar contraseña',
  robots: {
    index: false,
    follow: false
  }
}

function NewPasswordPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Toaster richColors position='top-center' closeButton />
      <div className="lg:w-1/2 md:w-2/3 sm:w-full mx-auto p-4">
        <NewPasswordForm />
      </div>
    </div>
  );
}

export default NewPasswordPage;