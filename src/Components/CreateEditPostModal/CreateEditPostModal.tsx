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
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { IPost } from "@/interfaces";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost, updatePost } from "@/Reducers/postsAPIReducer";
import JoditEditor from 'jodit-react';

export default function CreateEditPostModal({ lgwidth, mobileWidth, open, action, onOpenChange, selectedPost, handleSuccess, handleError }: { lgwidth: string; mobileWidth: string; action: string; open: boolean; onOpenChange: (value: boolean) => void, selectedPost: { selectedPostsData: IPost | null }, handleSuccess: (data: IPost) => void; handleError: (error: Error) => void;}) {

  const editor = useRef(null);

  const [formData, setFormData] = useState<IPost>({
    id: null,
    title: "",
    body: "",
    userId: null
  });

  const [updatingData, setUpdatingData] = useState(false);
  const [contentBody,setContentBody] = useState('');

  const handlePostHeader = () => {
    if (action === 'createPost') {
      return "Create New Post"
    }
    else if (action === 'editPost') {
      return "Update Post"
    }
    else {
      return "View Post"
    }
  }

  const { mutateAsync: updateOrCreatePostHandler } = useMutation({
    mutationFn: action === 'createPost' ? createPost : updatePost,
    onSuccess: (data: IPost) => {
      handleSuccess(data);
    },
    onError: (error: Error) => {
      handleError(error);
    }
  })

  useEffect(() => {
    if (selectedPost && (action === "editPost" || action === "viewPost")) {
      if (selectedPost?.selectedPostsData) {
        setFormData(selectedPost?.selectedPostsData);
      }
    }
  }, [selectedPost,action])
  const config = useMemo(() => ({
    readonly: false,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    placeholder: 'Write about your post...'
  }),
    [])
    const handlePostTitleInput = useCallback((e: {
      target: {
        value: string;
      }
    }) => {
      setFormData({ ...formData, title: e?.target?.value })
    }, [formData])
  
  
    const handlePostBodyInput = useCallback((value: string) => {
      const plainTextBody = value.replace(/<[^>]*>?/gm, '');
      setFormData({ ...formData, body: plainTextBody })
    }, [formData])
  
    const handleSubmitPost = useCallback(async () => {
      const payload = { ...formData, userId: 1 };
      setUpdatingData(true);
     await updateOrCreatePostHandler(payload);
      setUpdatingData(false);
  }, [formData, updateOrCreatePostHandler])
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className={`${mobileWidth} ${lgwidth} bg-slate-200 dark:bg-slate-700 h-fit`}>
        <DialogHeader>
          <DialogTitle className="text-center">{handlePostHeader()}</DialogTitle>
        </DialogHeader>
        {action === "viewPost" && <div className={`flex flex-col w-full lg:h-[20rem] h-[25rem] items-center justify-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] transition-shadow duration-300`}>
          <div className="w-full border-b border-b-purple-700 dark:border-purple-400 p-2 pb-4 overflow-y-auto scrollbar-hide">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-50 break-words" title={formData?.title}>{formData?.title}</span>
          </div>
          <div className="w-full h-full p-2 overflow-y-scroll scrollbar-hide">
            <p className="text-slate-700 dark:text-slate-200 text-base">{formData?.body}</p>
          </div>
        </div>}
        {(action === "editPost" || action === "createPost") &&
          <form className="flex flex-col gap-4 w-full justify-center lg:justify-start p-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-800 dark:text-slate-200 after:content-['*'] after:text-red-500 after:dark:text-red-200">Post Title</label>
              <Input required className="w-full p-1 focus-visible:border-ring focus-visible:ring-purple-700 border-purple-500 data-[state=active]:border-purple-500 text-sm text-slate-800 dark:text-slate-200" value={formData?.title} onChange={handlePostTitleInput} />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-slate-800 dark:text-slate-200 after:content-['*'] after:text-red-500 after:dark:text-red-200">Post Body</label>
              <JoditEditor
                className="!min-w-full !max-w-full"
                ref={editor}
                value={formData?.body}
                config={config}
                tabIndex={1}
                onBlur={handlePostBodyInput}
                onChange={(content) => setContentBody(content)}
              />
            </div>
            <DialogFooter className="justify-start lg:justify-end">
              <DialogClose>
                {updatingData === false && <Button className="cursor-pointer" type="submit" disabled={formData?.title?.length === 0 || contentBody?.length === 0} color="#E0F2FE" onClick={handleSubmitPost}>
                  {action === 'createPost' ? 'Create Post' : 'Update Post'}
                </Button>
                }
                {updatingData === true && <Button disabled>
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
