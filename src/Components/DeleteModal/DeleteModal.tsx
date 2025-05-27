


import { Button } from "@/Components/ui/button"
import { DeleteIcon, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { IPost } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deletePost} from "@/Reducers/postsAPIReducer";

export default function DeleteConfirmationModal({lgwidth, mobileWidth, open, action, onOpenChange, selectedPostData, handleSuccess, handleError}: {lgwidth: string; mobileWidth: string; action: string; open: boolean; onOpenChange: (value: boolean) => void, selectedPostData: IPost, handleSuccess: (data:IPost) => void; handleError: (error:Error) => void;}) {

  const [formData,setFormData] = useState(selectedPostData);

  const [updatingData,setUpdatingData] = useState(false);

  const handleDeletePost = useCallback(async() => {
    const payload = {...formData};
    setUpdatingData(true);
  await DeletePostHandler(payload)
  setUpdatingData(false);
  },[formData,action]) 

  const {mutateAsync: DeletePostHandler} = useMutation({
    mutationFn: deletePost,
    onSuccess: (data: IPost) => {
     handleSuccess(data);
    },
    onError: (error:Error) => {
      handleError(error);
    }
  })
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className={`w-[${mobileWidth}] lg:[${lgwidth}] bg-slate-200 dark:bg-slate-700 h-fit`}>
        <DialogHeader>
          <DialogTitle className="text-center lg:text-start">Delete Post</DialogTitle>
        </DialogHeader>
        <div className="flex w-full">
        <p className="text-slate-700 dark:text-slate-200 text-base break-words">Do you wish to delete the selected Post ?</p>     
        </div>
        <DialogFooter className="justify-start lg:justify-end">
          <DialogClose asChild>
           {updatingData === false && <Button type="submit" variant={"destructive"} onClick={handleDeletePost}>
            <DeleteIcon color="#ef4444" size={24} />
              Delete Post
            </Button>
           }
           {updatingData === true &&  <Button disabled variant={"destructive"}>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
