"use client";

import React from "react"
import { useParams, useRouter } from "next/navigation";
import DarkModePlugin from "../DarkModePlugin/DarkModePlugin";
import { SendToBackIcon, StepBackIcon } from "lucide-react";
const Navbar = () => {
    const router = useRouter();
    const params = useParams();
    return (
        <div className="w-full sticky top-0 rounded-md flex flex-row items-center h-fit justify-between bg-slate-100 dark:bg-slate-800 k z-[9999] p-2">
            {params?.id && <span onClick={() => router.push('/')}><StepBackIcon size={24} color="#0000CD" /></span>}
            <span className="flex flex=row w-full justify-center font-bold text-lg text-black dark:text-gray-50">Posts Cruid App</span>
            <div className="flex flex-row justify-end">
                <DarkModePlugin />
            </div>
        </div>
    )
}

export default Navbar;