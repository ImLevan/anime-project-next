'use client';

import { useState } from "react";

function FormInput(props) {
    const [isInvalid, setIsInvalid] = useState(false);
    const { label, errorMessage, onChange, ...inputProps } = props;

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const isValid = new RegExp(inputProps.pattern).test(inputValue);
        setIsInvalid(!isValid);
        onChange(event);
    };

    return (
        <div className="pt-11 flex flex-col justify-center ">
            <label className="placeholder-text">
                <div className="w-fit text-start items-start ml-[53.1px]">{label}</div>
            </label>
            <input className="w-4/5 h-6 focus:outline-none text-black mx-auto"
                {...inputProps}
                onChange={handleInputChange}
            />
            {isInvalid && <span className="text-red-600 text-sm font-bold">{errorMessage}</span>}
        </div>
    );
}

export default FormInput