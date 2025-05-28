"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { IPost } from "@/interfaces";
import { EyeIcon, PencilIcon, Trash } from "lucide-react";
import { useCallback } from "react";




const DataTablePosts = ({ postData, setPopupModalValues }: {
    postData: IPost[], setPopupModalValues: (data: {
        isOpen: boolean;
        action: string;
        selectedPostsData: IPost
    }) => void
}) => {
    const handleActionClick = useCallback((post: IPost, action: string) => () => {
        setPopupModalValues({
            isOpen: true,
            action,
            selectedPostsData: post
        })
    }, [setPopupModalValues])
    return (
        <div className="w-full overflow-x-auto rounded-md border h-full p-2 overflow-y-auto scrollbar-hide border-gray-300 dark:border-gray-600 bg-slate-400 dark:bg-slate-700">
            <Table>
                <TableCaption>Posts Data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Post ID</TableHead>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead className="w-[100px]">Body</TableHead>
                        <TableHead className="text-center w-[3rem]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {postData?.map(post => {
                        return (
                            <TableRow key={post?.id} className="h-[3rem]">
                                <TableCell className="font-medium truncate max-w-[100px]">{post?.id}</TableCell>
                                <TableCell className="font-medium truncate max-w-[1000px]">{post?.title}</TableCell>
                                <TableCell className="truncate max-w-[1100px]">{post?.body}</TableCell>
                                <TableCell className="flex gap-4 justify-end">
                                    <span className="cursor-pointer" onClick={handleActionClick(post, 'viewPost')}><EyeIcon color="#87CEEB" size={24} /></span>
                                    <span className="cursor-pointer" onClick={handleActionClick(post, 'editPost')}><PencilIcon color="#0000CD" size={24} /></span>
                                    <span className="cursor-pointer" onClick={handleActionClick(post, 'deletePost')}><Trash color="#ef4444" size={24} /></span>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )

}

export default DataTablePosts;