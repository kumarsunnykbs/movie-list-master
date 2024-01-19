"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import uploadIcon from "@/assets/images/uploadIcon.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createMovie, getMovieById, updateMovie } from "@/API-Calls/Others";
import AppLoader from "./AppLoader";

const CreateAndUpdateForm = (props) => {
    const { title, buttonText } = props
    const router = useRouter()
    const searchParams = useSearchParams()
    const _id = searchParams.get('id')

    const [State, setState] = useState({
        image: "",
        title: "",
        year: "",
        userId: null
    });

    const initialValidation = {
        image: { hasError: false, message: "" },
        title: { hasError: false, message: "" },
        year: { hasError: false, message: "" },
        submited: false
    }

    const [isLoading, setLoading] = useState(false);
    const [isLoadingData, setLoadingData] = useState(false);
    const [validation, setValidationError] = useState(initialValidation);

    function fileToBlobUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (validation.submited) {
                    setValidationError((prevState) => ({ ...prevState, image: { hasError: false, message: "" } }))
                }
                setState((prevState) => ({ ...prevState, image: reader.result }));
                const blob = new Blob([reader.result], { type: file.type });
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    const handleInputChange = async (event, type) => {
        if (type === "file") {
            await fileToBlobUrl(event.target.files[0])
        } else {
            const { name, value } = event.target;
            setState((prevState) => ({ ...prevState, [name]: value }));
        }

        if (validation.submited) {
            if (type !== "file") {
                const { name, value } = event.target;
                const isAllFilled = validator({ ...State, [name]: value })
                if (isAllFilled?.email?.hasEmail || isAllFilled?.password) {
                    setValidationError((prevState) => ({ ...prevState, email: isAllFilled?.email || { hasEmail: false, message: "" }, password: isAllFilled?.password || false }))
                } else {
                    setValidationError(initialValidation)
                }
            }
        }
    }

    const validator = (formData) => {
        const { year, title, image } = formData
        let notField = {}
        if (!year) {
            notField.year = { hasError: true, message: "Please enter a year" }
        }
        if (!title) {
            notField.title = { hasError: true, message: "Please enter a title" }
        }
        if (!image) {
            notField.image = { hasError: true, message: "Please select an image" }
        }
        return notField
    }

    const handleSubmit = async () => {
        const isAllFilled = validator(State)
        if (isAllFilled?.year?.hasError || isAllFilled?.title?.hasError || isAllFilled?.image?.hasError) {
            setValidationError((prevState) => ({
                ...prevState,
                submited: true,
                year: isAllFilled?.year || initialValidation.year,
                title: isAllFilled?.title || initialValidation.title,
                image: isAllFilled?.image || initialValidation.image
            }))
            return
        } else {
            setValidationError(initialValidation)
        }
        setLoading(true)
        if (buttonText === "Submit") {
            await createMovie(State)
            router.push("/movie-list")
        } else {
            await updateMovie(State)
            router.push("/movie-list")
        }
        setLoading(false)
    }

    const handleCancle = () => {
        router.push("/movie-list")
    }

    const getSingleMovie = async () => {
        setLoadingData(true)
        const data = await getMovieById(_id)
        if (data) {
            setState((prevState) => ({ ...prevState, ...data }))
        }
        setLoadingData(false)
    }

    useEffect(() => {
        const id = localStorage.getItem("session")
        setState((prevState) => ({ ...prevState, userId: id }))
        if (buttonText === "Update" && _id) {
            getSingleMovie()
        }
        // eslint-disable-next-line
    }, []);

    if (_id && isLoadingData) {
        return <AppLoader />
    }

    return (
        <>
            <div className="max-w-[800px] m-auto flex relative min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 text-white items-center">
                <div
                    className="sm:max-w-lg w-full p-10 rounded-xl z-10"
                    style={{ background: "transparent" }}
                >
                    <h2 className="mt-5 text-3xl font-bold text-white mb-5">{title}</h2>
                    <div className="">
                        <div>
                            <div className="grid grid-cols-1 space-y-2" style={{ backgroundImage: `url(${State.image})`, backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                                <div className="flex w-full">
                                    <label className="flex flex-col rounded-lg border-dotted border-2 w-80 h-80 p-10 group ">
                                        <div className="h-full w-full flex flex-col items-center justify-center items-center">
                                            {!State.image && (
                                                <p className="pointer-none text-gray-500">
                                                    <Image src={uploadIcon} alt="Upload image" width={"40"} height={"40"} />
                                                </p>
                                            )}
                                            <span className="text-sm">Drop an image here</span>
                                        </div>
                                        <input type="file" className="hidden" onChange={(evt) => handleInputChange(evt, "file")} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {validation.image.hasError && (
                            <div className="flex justify-center">
                                <p className={`text-rose-700`}>{validation.image.message}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <div className="mb-2 bg-gray-600 w-[350px]">
                        <Input
                            size="sm"
                            type="text"
                            name="title"
                            label="Title"
                            value={State.title}
                            backgroundColor="default"
                            isInvalid={validation.title.hasError}
                            errorMessage={validation.title.message}
                            onChange={(evt) => handleInputChange(evt, "text")}
                        />
                    </div>
                    <div className="w-[250px]">
                        <Input
                            size="sm"
                            name="year"
                            type="number"
                            value={State.year}
                            label="Publishsing Year"
                            backgroundColor="default"
                            isInvalid={validation.year.hasError}
                            errorMessage={validation.year.message}
                            onChange={(evt) => handleInputChange(evt, "text")}
                        />
                    </div>
                    <div className="flex flex-wrap gap-4 items-center mt-20 ">
                        <Button color="default" className="w-[165px]" onClick={() => handleCancle()}>
                            Cancel
                        </Button>
                        <Button color="success" className="w-[165px]" onClick={() => handleSubmit()} isLoading={isLoading}>
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateAndUpdateForm;
