'use client'

import Loader from "@/app/components/Loader";
import FormInput from "@/app/signup/FormInput";
import { inputToken } from "@/app/signup/registerInputs";
import { sendCode } from "@/libs/api-methods";
import { useRouter } from "next/navigation";
import { useState } from "react"

function AuthForm({ user_id }) {
    const router = useRouter();

    const [userCodeError, setUserCodeError] = useState("");
    const [loading, setLoading] = useState(false);
    const [userCode, setUserCode] = useState({
        id: user_id,
        code: ""
    });

    const onChange = (e) => {
        setUserCode({ ...userCode, [e.target.name]: e.target.value });
        setUserCodeError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await sendCode(userCode.id, userCode.code);
            if (data.auth === true) {
                router.refresh();
            } else {
                setUserCodeError(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };


    return (
        <form className="inline-block items-center justify-center mr-12 w-full text-center h-[450px]" onSubmit={handleSubmit}>
            <h2 className="text-secondary text-3xl">Código de autenticación</h2>
            <p className="text-white">Ingrese el código de autenticación que le enviamos a su mail para poder acceder a tu cuenta.</p>
            <FormInput
                key={inputToken.id}
                {...inputToken}
                value={userCode[inputToken.name]}
                onChange={onChange}
            />
            {loading && <Loader />}
            <span className="text-red-600 text-lg font-bold mt-6" style={userCodeError ? { display: "block" } : { display: "none" }}
            >
                {userCodeError}
            </span>
            <div className="block mt-6">
                <input
                    className="w-36 border-none font-bold text-base p-[0.31em] cursor-pointer bg-secondary h-12 transition-all m-auto text-black hover:bg-primary"
                    type="submit"
                    value="Enviar código"
                    id="auth-button"
                />
            </div>
        </form>
    );
}

export default AuthForm;