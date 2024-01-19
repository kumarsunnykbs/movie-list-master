"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Vectors from "@/assets/images/Vectors.png";
import AppNavbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import AppLoader from "../AppLoader";

export default function AppLayout({ children }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = localStorage.getItem("session");
        if (!sessionId && pathname !== "/sign-in") {
            router.push("/sign-in")
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return (
            <AppLoader />
        );
    }

    return (
        <div>
            <AppNavbar />
            {children}
            <Image src={Vectors} alt="footer" />
        </div>
    )
}
