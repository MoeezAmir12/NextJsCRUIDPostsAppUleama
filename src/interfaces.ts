import { ReactNode } from "react";


export interface IDarkModePlugin {
    containerClassName?: string;
      sunClassName?: string;
      moonClassName?: string;
  }
  
export interface IPost {
userId: number | null ;
id?: number | undefined | null;
title: string;
body: string;
}  


export interface IQueryClientProviderWrapper {
    children: ReactNode
}