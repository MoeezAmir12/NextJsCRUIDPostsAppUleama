"use client";

import { Button } from "@/Components/ui/button";
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
import { DeleteIcon, EyeIcon, PencilIcon } from "lucide-react";
import { useCallback } from "react";




const DataTablePosts = ({postData,setPopupModalValues}: {postData:IPost[], setPopupModalValues: (data: {
    isOpen: boolean;
    action: string;
    selectedPostsData: IPost
}) => void}) => {
    const handleActionClick = useCallback((post: IPost, action: string) => () => {
    setPopupModalValues({
        isOpen: true,
        action,
        selectedPostsData: post
    })
    },[])
    return(
    <Table>
  <TableCaption>Posts Data</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Post ID</TableHead>
      <TableHead className="w-[100px]">Title</TableHead>
      <TableHead className="w-[400px]">Body</TableHead>
      <TableHead className="text-right w-[250px]">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {postData?.map(post => {
   return (
    <TableRow className="h-[3rem]">
        <TableCell className="font-medium">{post?.id}</TableCell>
        <TableCell className="font-medium w-full overflow-x-auto">{post?.title}</TableCell>
        <TableCell className="font-medium w-full h-full overflow-y-auto">{post?.body}</TableCell>
        <TableCell className="flex flex-row w-[3rem] gap-1 text-right">
            <span onClick={handleActionClick(post,'viewPost')}><EyeIcon color="#0000CD" size={24}/></span>
            <span onClick={handleActionClick(post,'editPost')}><PencilIcon color="#0000CD" size={24}/></span>
            <span onClick={handleActionClick(post,'createPost')}><DeleteIcon color="#ef4444" size={24}/></span>
        </TableCell>
    </TableRow>
   )
   })}
  </TableBody>
</Table>
    )

}

export default DataTablePosts;