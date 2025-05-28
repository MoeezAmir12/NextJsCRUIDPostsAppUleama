"use client";


import { Button } from "@/Components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { IPost } from "@/interfaces";
import {  useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost, updatePost } from "@/Reducers/postsAPIReducer";

export default function CreateEditPostModal({lgwidth, mobileWidth, open, action, onOpenChange, selectedPost, handleSuccess, handleError}: {lgwidth: string; mobileWidth: string; action: string; open: boolean; onOpenChange: (value: boolean) => void, selectedPost: {selectedPostsData: IPost}, handleSuccess: (data:IPost) => void; handleError: (error:Error) => void;}) {

  const [formData,setFormData] = useState({
    id: null,
    title: "",
    body: "",
    userId: null
  });

  console.log("Selected Post Data",selectedPost);

  const [updatingData,setUpdatingData] = useState(false);

  const handlePostHeader = () => {
    if(action === 'createPost')
    {
      return "Create New Post"
    }
    else if(action === 'editPost')
    {
      return "Update Post"
    }
    else{
      return "View Post"
    }
  }

  const handlePostTitleInput = useCallback((e: {
    target: {
      value: string;
    }
  }) => {
  setFormData({...formData,title: e?.target?.value})
  },[formData])

  
  const handlePostBodyInput = useCallback((value: string) => {
  setFormData({...formData,body: value})
  },[formData])

  const handleSubmitPost = useCallback(async() => {
    const payload = {...formData};
    setUpdatingData(true);
  await updateOrCreatePostHandler(payload)
  setUpdatingData(false);
  },[formData,action]) 

  const {mutateAsync: updateOrCreatePostHandler} = useMutation({
    mutationFn: action === 'createPost' ? createPost : updatePost,
    onSuccess: (data: IPost) => {
     handleSuccess(data);
    },
    onError: (error:Error) => {
      handleError(error);
    }
  })

  useEffect(() => {
  if(selectedPost && (action === "editPost" || action === "viewPost"))
  {
    console.log("Selected",selectedPost);
    setFormData(selectedPost?.selectedPostsData);
  }
  },[selectedPost])
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className={`w-[${mobileWidth}] lg:[${lgwidth}] bg-slate-200 dark:bg-slate-700 h-fit`}>
        <DialogHeader>
          <DialogTitle className="text-center lg:text-start">{handlePostHeader()}</DialogTitle>
        </DialogHeader>
        {action === "viewPost" &&  <div className="flex flex-col lg:w-[25rem] w-[15rem] lg:h-[20rem] h-[25rem] items-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] transition-shadow duration-300" onClick={() => router.push(`/posts/${post?.id}`)}>
      <div className="w-full border-b border-b-purple-700 dark:border-purple-400 p-2 pb-4 h-[40%] overflow-y-scroll scrollbar-hide">
    <span className="text-lg font-bold text-slate-800 dark:text-slate-50" title={formData?.title}>{formData?.title}</span>
    </div>
    <div className="w-full h-full p-2 overflow-y-scroll scrollbar-hide">
    <p className="text-slate-700 dark:text-slate-200 text-base">{formData?.body}</p>
    </div>
     </div>}
        {(action === "editPost" || action === "createPost") && 
        <form className="flex flex-col gap-3 w-full justify-center lg:justify-start p-1">
         <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-800 dark:text-slate-200">Post Title</label>
        <Input required className="w-full p-1 focus:outline-purple-500 data-[state=active]:outline-purple-500 text-sm text-slate-800 dark:text-slate-200" value={formData?.title} onChange={handlePostTitleInput}/>
         </div>
         <div className="flex flex-col gap-1 w-full">
        <label className="text-sm text-slate-800 dark:text-slate-200">Post Body</label>
    
        </div>
        <DialogFooter className="justify-start lg:justify-end">
          <DialogClose>
           {updatingData === false && <Button type="submit" color="#E0F2FE" onClick={handleSubmitPost}>
              Create Post
            </Button>
           }
           {updatingData === true &&  <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>}
          </DialogClose>
        </DialogFooter>
        </form>
}
      </DialogContent>
    </Dialog>
  )
}
