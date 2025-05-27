

export interface IDarkModePlugin {
    containerClassName?: string;
      sunClassName?: string;
      moonClassName?: string;
  }
  
export interface IPost {
userId: number | null;
id: number | null ;
title: string;
body: string;
}  