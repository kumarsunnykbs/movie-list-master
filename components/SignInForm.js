'use client';
import { Button, Input, Checkbox } from "@nextui-org/react";
import Vectors from "@/assets/images/Vectors.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Login } from "@/API-Calls/Auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {

    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: true,
    });

    const initialValidation = { email: { hasEmail: false, message: "" }, password: false, submited: false }

    const [loading, setLoading] = useState(false);
    const [hasError, setError] = useState({ message: "", status: null });
    const [validation, setValidationError] = useState(initialValidation);

    const validator = (formData) => {
        const { email, password } = formData
        let notField = {}
        const validEmail = email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        if (email && !validEmail) {
            notField.email = { hasEmail: true, message: "Please enter a valid email" }
        }
        if (!email) {
            notField.email = { hasEmail: true, message: "Please enter an email" }
        }
        if (!password) {
            notField.password = true
        }
        return notField
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isAllFilled = validator(formData)
        if (isAllFilled?.email?.hasEmail || isAllFilled?.password) {
            setValidationError((prevState) => ({ ...prevState, submited: true, email: isAllFilled?.email || { hasEmail: false, message: "" }, password: isAllFilled?.password || false }))
            return
        } else {
            setValidationError(initialValidation)
        }
        setLoading(true)
        const result = await Login(formData)
        if (result) {
            setError((prevState) => ({ ...prevState, message: result.data.message, status: result.data.status }))
            if (result.status === 200) {
                if (result.data.userDetails.rememberMe) {
                    localStorage.setItem("session", result.data.userDetails._id)
                }
                router.push("/movie-list");
            }
        }
        setLoading(false)
    }

    const handleInputChange = (event) => {
        const { name, value, checked } = event.target;
        const fieldValue = name === 'rememberMe' ? checked : value;

        setFormData({
            ...formData,
            [name]: fieldValue,
        });

        if (validation.submited) {
            const isAllFilled = validator({ ...formData, [name]: fieldValue })
            if (isAllFilled?.email?.hasEmail || isAllFilled?.password) {
                setValidationError((prevState) => ({ ...prevState, email: isAllFilled?.email || { hasEmail: false, message: "" }, password: isAllFilled?.password || false }))
            } else {
                setValidationError(initialValidation)
            }
        }

    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex flex-1 flex-col justify-center">
                <div className="flex flex-1 flex-col justify-center ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="mt-10 text-center text-5xl text-white font-bold leading-9 tracking-tight ">
                            Sign in
                        </h1>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={(evt) => handleSubmit(evt)}>
                            <div>
                                <div className="mt-2">
                                    <Input type="email" label="Email" name="email" onChange={handleInputChange} isInvalid={validation.email.hasEmail} errorMessage={validation.email.message} />
                                </div>
                            </div>

                            <div>
                                <div className="mt-2">
                                    <Input type="password" label="Password" name="password" onChange={handleInputChange} isInvalid={validation.password} errorMessage={validation.password ? "Please enter a password" : ""} />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Checkbox defaultSelected name="rememberMe" onChange={handleInputChange}>
                                    <p className="text-gray-300">Remamber me</p>
                                </Checkbox>
                            </div>

                            <div>
                                <Button size="lg" color="success" type="submit" isLoading={loading}>
                                    <p className={`${!loading ? "w-[330px]" : "w-[290px]"} text-white`}>Sign in</p>
                                </Button>
                            </div>
                            {hasError.message && (
                                <div className="flex justify-center">
                                    <p className={`${hasError.status === 200 ? "text-green-700" : "text-rose-700"}`}>{hasError.message}</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Image src={Vectors} alt="footer" className="mx-auto block" style={{ maxWidth: "100%" }} />
            </div>
        </div>
    );
}
