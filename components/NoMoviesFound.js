"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const NoMoviesFound = () => {
    const route = useRouter()
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl text-white mb-10">Your movie list is empty</h1>
                <Button color="success" className="px-6 py-3 bg-green-500 text-white w-48" onClick={()=> route.push("/create-movie")}>Add a new movie</Button>
            </div>
        </div>
    );
};

export default NoMoviesFound;
