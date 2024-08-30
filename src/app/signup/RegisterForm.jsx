'use client';
import { PrivateRoutes, PublicRoutes } from "../routes/routes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "./FormInput";
import { inputs } from "./registerInputs";
import Loader from "../components/Loader";
import { signUpUser } from "@/libs/api-methods";

function RegisterForm() {
    const router = useRouter();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [userValueError, setUserValueError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setUserValueError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await signUpUser(values.username, values.password, values.email);

            if (data.saved === true) {
                const userData = data.data;
                //persistAuthToken(userData.id);
                router.push("/" + PrivateRoutes.AUTH + "/" + userData.id);
            } else {
                setUserValueError(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            id="form"
            className="inline-block items-center justify-center mr-12 w-full text-center h-[450px]"
            onSubmit={handleSubmit}
        >
            <h2 className="text-secondary text-3xl my-6 pt-6 font-bold">Registro</h2>
            <div className="bg-stone-900 h-[405px] w-full mx-auto">
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
            </div>
            {loading && <Loader />}
            <span className="text-red-600 text-lg font-bold mt-6" style={userValueError ? { display: "block" } : { display: "none" }}
            >
                {userValueError}
            </span>
            <div className="block mt-6">
                <input
                    className="w-36 border-none font-bold text-base p-[0.31em] cursor-pointer bg-secondary h-12 transition-all m-auto text-black hover:bg-primary"
                    type="submit"
                    value="Registrarse"
                    id="register-button"
                />
            </div>
            <Link className="block no-underline ml-2 text-secondary font-bold transition-all hover:text-white mt-6" href={`/${PublicRoutes.LOGIN}`}>
                ¿Ya tienes una cuenta?               
            </Link>
        </form>
    );
}

export default RegisterForm;