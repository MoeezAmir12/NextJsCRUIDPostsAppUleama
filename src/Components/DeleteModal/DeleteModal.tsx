


import { Button } from "@/Components/ui/button"
import { Loader2, Trash2Icon } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import { IPost } from "@/interfaces";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/Reducers/postsAPIReducer";

export default function DeleteConfirmationModal({ lgwidth, mobileWidth, onOpenChange, selectedPost, handleSuccess, handleError }: {
    lgwidth: string; mobileWidth: string; action: string; open: boolean; onOpenChange: (value: boolean) => void, selectedPost: {
        selectedPostsData: IPost | null
    }, handleSuccess: (data: IPost) => void; handleError: (error: Error) => void;
}) {

    const [formData] = useState(selectedPost?.selectedPostsData);

    const [updatingData, setUpdatingData] = useState(false);

    const { mutateAsync: DeletePostHandler } = useMutation({
        mutationFn: deletePost,
        onSuccess: (data: IPost) => {
            handleSuccess(data);
        },
        onError: (error: Error) => {
            handleError(error);
        }
    })
    const handleDeletePost = useCallback(async () => {
        const payload = { ...formData };
        const {id} = payload;
        setUpdatingData(true);
        if(id)
        {
        await DeletePostHandler(id)
        }
        setUpdatingData(false);
    }, [formData,DeletePostHandler])
    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent className={`${mobileWidth} ${lgwidth} bg-slate-200 dark:bg-slate-700 h-fit`}>
                <DialogHeader>
                    <DialogTitle className="text-center lg:text-start">Delete Post</DialogTitle>
                </DialogHeader>
                <div className="flex w-full">
                    <p className="text-slate-700 dark:text-slate-200 text-base break-words">Do you wish to delete the selected Post ?</p>
                </div>
                <DialogFooter className="justify-start lg:justify-end">
                    <DialogClose>
                        {updatingData === false && <Button className="cursor-pointer" type="submit" variant={"destructive"} onClick={handleDeletePost}>
                            <Trash2Icon color="#E53935" size={24} />
                            Delete Post
                        </Button>
                        }
                        {updatingData === true && <Button disabled variant={"destructive"}>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </Button>}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
