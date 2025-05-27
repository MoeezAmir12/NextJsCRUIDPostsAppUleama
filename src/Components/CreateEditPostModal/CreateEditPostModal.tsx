


import { Button } from "@/Components/ui/button"
import { Loader2 } from "lucide-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import { act, useCallback, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createPost, updatePost } from "@/Reducers/postsAPIReducer";

export default function CreateEditPostModal({lgwidth, mobileWidth, open, action, onOpenChange, selectedPostData, handleSuccess, handleError}: {lgwidth: string; mobileWidth: string; action: string; open: boolean; onOpenChange: (value: boolean) => void, selectedPostData: IPost, handleSuccess: (data:IPost) => void; handleError: (error:Error) => void;}) {

  const [formData,setFormData] = useState({
    id: null,
    title: "",
    body: "",
    userId: null
  });

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
  if(selectedPostData && (action === "editPost" || action === "viewPost"))
  {
    setFormData(selectedPostData);
  }
  },[selectedPostData])
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className={`w-[${mobileWidth}] lg:[${lgwidth}] bg-slate-200 dark:bg-slate-700 h-fit`}>
        <DialogHeader>
          <DialogTitle className="text-center lg:text-start">{handlePostHeader()}</DialogTitle>
        </DialogHeader>
        {action === "viewPost" &&  <div  className="flex flex-col w-full items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1">
    <span className="text-xl font-bold text-slate-800 dark:text-slate-50 w-full h-4 border-b border-b-purple-700 dark:border-purple-400">{formData?.title}</span>
    <div className="w-full h-[4rem] overflow-y-auto scrollbar-hide">
    <p className="text-slate-700 dark:text-slate-200 text-base line-clamp-1 break-words">{formData?.body}</p>
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
        <ReactQuill theme="snow" value={formData?.body} onChange={handlePostBodyInput}/>
        </div>
        <DialogFooter className="justify-start lg:justify-end">
          <DialogClose asChild>
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
