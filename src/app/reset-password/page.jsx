import { Toaster } from "sonner";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: 'Restablecer contraseña',
  description: 'Recupera tu contraseña en el caso de que la hayas olvidado'
}

function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Toaster richColors position='top-center' closeButton />
      <div className="lg:w-1/2 md:w-2/3 sm:w-full mx-auto p-4">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPasswordPage;