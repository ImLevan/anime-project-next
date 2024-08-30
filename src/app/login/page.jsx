'use client';
import LoginInputForm from "./LoginInputForm";

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