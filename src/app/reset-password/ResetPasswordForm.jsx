'use client';
import { useState } from "react";
import Loader from "../components/Loader";
import { resetPassword } from "@/libs/api-methods";

function ResetPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [showSpanEmail, setShowSpanEmail] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [email, setEmail] = useState("");
    const [showInput, setShowInput] = useState(true);

    const handleChange = (e) => {
        setEmail(e.target.value);
        setShowSpanEmail(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await resetPassword(email);
            setShowSpanEmail(true);
            setResponseMessage(data.message);

            if (data.saved) {
                setShowInput(false);
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
            <h2 className="text-secondary text-3xl mb-6 font-bold">Restablecer contraseña</h2>
            <h4 className="text-gray-400 text-lg text-center">Se enviará un correo parar restablecer tu contraseña a tu dirección de correo.</h4>
            <div className="bg-stone-900 h-[235px] my-10 w-full">
                {showInput ? (
                    <div className="pt-11">
                        <label className="placeholder-text">
                            <div className="text-white w-fit ml-[9%]">Dirección de email</div>
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="text-black w-4/5 h-6 focus:outline-none focus:border-b-secondary"
                            onChange={(e) => handleChange(e)}
                            value={email}
                            required
                        />
                    </div>
                ) : (
                    <div className="items-center">
                        <p className="text-secondary font-bold">Muchas gracias!</p>
                    </div>
                )}

            </div>
            {loading && <Loader />}
            <span
                className="text-red-600 text-lg font-bold mt-6"
                style={
                    (showSpanEmail)
                        ? { display: "block" }
                        : { display: "none" }
                }
            >
                {responseMessage}
            </span>
            <div className="block mt-6">
                {showInput ? (
                    <input
                        className="w-36 border-none font-bold text-base p-[0.31em] cursor-pointer bg-secondary h-12 transition-all m-auto text-black hover:bg-primary"
                        type="submit"
                        value="Enviar"

                    />
                ) : (
                   null
                )}
            </div>
        </form>
    );
}

export default ResetPasswordForm