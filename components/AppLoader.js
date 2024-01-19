import { Spinner } from "@nextui-org/react";
import React from "react";

export default function AppLoader() {
    return <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Spinner size="lg" color="success" />
    </div>
}
