"use client";

import type { IDarkModePlugin } from "@/interfaces";
import { useEffect, useState } from "react";
import SunIconSVG from "../Icons/SunIconSVG";
import MoonIconSVG from "../Icons/MoonIconSVG";
import { Switch } from "@/Components/ui/switch"


const DarkModePlugin = (props:IDarkModePlugin) => {
    const [darkMode,setDarkMode] = useState<boolean>(false);
    
  
    const handleDarkModeTrigger = (toggleChecked: boolean) => {
      if(toggleChecked === true)
        {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        }
        else
        {
          setDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
    }
  
    useEffect(()=>{
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      {
        console.log('here');
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    },[])
    return (
      <div data-testid="DarkModePlugin_Container" className={props.containerClassName ? props.containerClassName : "flex flex-row w-fit h-fit gap-1 p-[0.4rem] items-center rounded-full border-2 shadow-md shadow-gray-500 border-indigo-400 dark:bg-slate-700 dark:shadow-gray-700 dark:border-indigo-700 bg-slate-200"}>
      <SunIconSVG
      />
       <Switch
       checked={darkMode}
        onCheckedChange={(val: boolean)=> {
          handleDarkModeTrigger(val);
        }}
       />
       <MoonIconSVG
       />
      </div>
    );
  }
  
  export default DarkModePlugin;