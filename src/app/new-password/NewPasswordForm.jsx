'use client';
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSearchParams } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { getUser, modifyUserPassword } from "@/libs/api-methods";
import { toast } from "sonner";

function NewPasswordForm() {
    const [showInput, setShowInput] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showSpanPassword, setShowSpanPassword] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    useEffect(() => {
        const data = async () => {
            try {
                if (token) {
                    const response = await getUser(token);
                    setUsername(response.username)
                }
            } catch (error) {
                console.log(error)
            }
        }
        data()
    })
    const handleChange = (e) => {
        setPassword(e.target.value);
        setShowSpanPassword(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await modifyUserPassword(password, username);
            if(data.saved) {
                toast.success(data.message);
                setShowInput(false);
            }else{
                setShowSpanPassword(true);
                setResponseMessage(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="inline-block items-center justify-center w-full text-center h-[450px]"
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <h2 className="text-secondary text-3xl mb-6 font-bold">Crear nueva contraseña</h2>
            <h4 className="text-gray-400 text-lg text-center">Para proteger tu cuenta, escoge una contraseña de entre 8 y 20 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial.</h4>
            <div className="bg-stone-900 h-[235px] w-full my-10">
                {showInput ? (
                    <div className="pt-11">
                        <label className="placeholder-text">
                            <div className="text-white w-fit ml-[9%]">Nueva contraseña</div>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="text-black w-4/5 h-6 focus:outline-none focus:border-b-secondary"
                            onChange={(e) => handleChange(e)}
                            value={password}
                            required
                        />
                        <div className="flex mt-4 ml-[9%]">
                            <input type="checkbox" className="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500" onClick={() => setShowPassword(!showPassword)} />
                            <label className="text-sm text-gray-500 ms-3 mt-0.5">Mostrar contraseña</label>
                        </div>
                    </div>
                ) : (
                    <div className="text-secondary font-bold">Muchas gracias!</div>
                )}

            </div>
            {loading && <Loader />}
            <span
                className="text-red-600 text-lg font-bold mt-6"
                style={
                    (showSpanPassword)
                        ? { display: "block" }
                        : { display: "none" }
                }
            >
                {responseMessage}
            </span>
            <div className="block mt-6">
                {showInput ? (
                    <input
                        className="w-40 border-none font-bold text-base p-[0.31em] cursor-pointer bg-secondary h-12 transition-all m-auto text-black hover:bg-primary"
                        type="submit"
                        value="Cambiar contraseña"
                    />
                ) : (
                    null
                )}
            </div>
        </form>
    );
}

export default NewPasswordForm;