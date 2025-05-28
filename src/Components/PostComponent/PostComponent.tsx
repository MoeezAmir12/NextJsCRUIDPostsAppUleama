"use client";

import { IPost } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
const PostComponent = ({ post }: { post: IPost }) => {
    const router = useRouter();
    const handlePostBody = (body: string) => {
        if (body?.length >= 200) {
            const slicedPostBody = body?.slice(0, 201);
            return `${slicedPostBody}...`;
        }
        else {
            return body;
        }
    }
    const handlePostTItle = (title: string) => {
        if (title?.length >= 100) {
            const slicedPostTitle = title?.slice(0, 101);
            return `${slicedPostTitle}...`;
        }
        else {
            return title;
        }
    }
    return (
        <div className="flex flex-col w-full lg:h-[10rem] h-[12rem] items-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] transition-shadow duration-300" onClick={() => router.push(`/posts/${post?.id}`)}>
            <div className="w-full border-b border-b-purple-700 dark:border-purple-400 p-2 pb-4">
                <span className="text-lg font-bold text-slate-800 dark:text-slate-50 line-clamp-1" title={post?.title}>{handlePostTItle(post?.title)}</span>
            </div>
            <div className="w-full h-full p-2">
                <p className="text-slate-700 dark:text-slate-200 text-base line-clamp-4">{handlePostBody(post?.body)}</p>
            </div>
        </div>
    )
}

export default PostComponent;