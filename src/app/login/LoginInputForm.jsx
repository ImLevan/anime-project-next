'use client';

import Link from "next/link";
import { useState } from "react";
import Loader from "../components/Loader";
import { loginUser } from "@/libs/api-methods";
import { useRouter } from "next/navigation";

function LoginInputForm() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showSpanPasswordOrUser, setShowSpanPasswordOrUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        setShowSpanPasswordOrUser(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await loginUser(credentials.username, credentials.password);
            if (data.auth) {
                router.refresh();
            } else {
                setShowSpanPasswordOrUser(true);
                setErrorMessage(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="inline-block items-center justify-center mr-12 w-full text-center h-[450px]"
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <h2 className="text-secondary text-3xl my-6 pt-6 font-bold">Bienvenido</h2>
            <div className="bg-stone-900 h-[235px] w-full">
                <div className="pt-11">
                    <label className="placeholder-text">
                        <div className="text-white w-fit ml-[9%]">Usuario</div>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="text-black w-4/5 h-6 focus:outline-none focus:border-b-secondary"
                        onChange={(e) => handleChange(e)}
                        value={credentials.username}
                        required
                    />
                </div>
                <div className="pt-11">
                    <label className="placeholder-text">
                        <div className="text-white w-fit ml-[9%]">Contraseña</div>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="text-black w-4/5 h-6 focus:outline-none focus:border-b-secondary"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <div class="flex mt-4 ml-[9%]">
                        <input type="checkbox" class="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500" onClick={() => setShowPassword(!showPassword)}/>
                        <label class="text-sm text-gray-500 ms-3 mt-0.5">Mostrar contraseña</label>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
            <span
                className="text-red-600 text-lg font-bold mt-6"
                id="login-span"
                style={
                    (showSpanPasswordOrUser)
                        ? { display: "block" }
                        : { display: "none" }
                }
            >
                {errorMessage}
            </span>
            <div className="block mt-6">
                <input
                    className="w-36 border-none font-bold text-base p-[0.31em] cursor-pointer bg-secondary h-12 transition-all m-auto text-black hover:bg-primary"
                    type="submit"
                    value="Acceder"
                    id="sign-in-button"
                />
            </div>
            <div className="mt-6 flex justify-center">
                <p>¿No tienes una cuenta?</p>
                <Link href={"/signup"} className="no-underline ml-2 text-secondary font-bold transition-all hover:text-white">
                    Crear cuenta
                </Link>
            </div>
        </form>
    );
}

export default LoginInputForm;