
import React from "react"
import DarkModePlugin from "../DarkModePlugin/DarkModePlugin";
const Navbar = () => {
return (
    <div className="w-full fixed rounded-md flex flex-row items-center h-[5rem] bg-gray-100 dark:bg-black z-[9999] p-2">
     <span className="text-center font-bold text-lg text-black dark:text-gray-50">Posts Cruid App</span>
     <div className="w-full h-full flex flex-row justify-end">
     <DarkModePlugin/>
     </div>
    </div>
)
}

export default Navbar;