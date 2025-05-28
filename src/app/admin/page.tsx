"use client";

import type { IPost } from "@/interfaces";
import { fetchPosts } from "@/Reducers/postsAPIReducer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import { Button } from "@/Components/ui/button";
import { toast, Toaster } from "sonner";
import CreateEditPostModal from "@/Components/CreateEditPostModal/CreateEditPostModal";
import DeleteConfirmationModal from "@/Components/DeleteModal/DeleteModal";
import DataTablePosts from "./dataTablePosts";
import { PlusIcon } from "lucide-react";

export default function AdminPage() {
    // React-Query is being used here for mutations, data-fetching from API
    // using query client to perform data-fetching again based on invalidating queries
    const client = useQueryClient();
    // state management for admin page
    const [popupModalPost, setPopupModalPost] = useState<{ isOpen: boolean; action: string; selectedPostsData: IPost | null }>({
        isOpen: false,
        action: '',
        selectedPostsData: null
    });
    const [postData, setPostData] = useState<null | undefined | IPost[]>([]);
    // function to return short post body
    const handlePostBody = (body: string) => {
        if (body?.length >= 100) {
            const slicedPostBody = body?.slice(0, 101);
            return `${slicedPostBody}...`;
        }
        else {
            return body;
        }
    }
    console.log('popupModal', popupModalPost);
    const handleCreateNewPost = useCallback(() => {
        setPopupModalPost({
            isOpen: true,
            action: 'createPost',
            selectedPostsData: null
        })
    }, [])

    const handleSuccessPost = async (data: IPost) => {
        if (popupModalPost?.action === 'createPost') {
            toast.success('Post Created!');
            // state update is handled in client side as on server data is not getting updated when fetching posts again
            const newData = [...postData, data];
            console.log('new Data', newData);
            setPostData(newData);
            // invalidating query to refetch posts data after cruid operation
            await client.invalidateQueries({ queryKey: ['refetch-post'] });

        }
        if (popupModalPost?.action === 'editPost') {
            toast.success('Post Updated!');
            // state update is handled in client side as on server data is not getting updated when fetching posts again
            const copyPostsArr = [...postData];
            const indexToUpdate = postData?.findIndex(ind => ind?.id === popupModalPost?.selectedPostsData?.id);
            if(indexToUpdate && indexToUpdate >= 0)
            {
            copyPostsArr[indexToUpdate] = data;
            }
            setPostData(copyPostsArr);
            // invalidating query to refetch posts data after cruid operation
            await client.invalidateQueries({ queryKey: ['refetch-post'] });
        }
        if (popupModalPost?.action === 'deletePost') {
            toast.success('Post Deleted!');
            // state update is handled in client side as on server data is not getting updated when fetching posts again
            const copyPostsArr = postData?.filter(post => post?.id !== popupModalPost?.selectedPostsData?.id);
            console.log('data', copyPostsArr);
            setPostData(copyPostsArr);
            // invalidating query to refetch posts data after cruid operation
            await client.invalidateQueries({ queryKey: ['refetch-post'] });
        }
        setPopupModalPost({
            isOpen: false,
            action: '',
            selectedPostsData: null
        })
    }

    const handleErrorPost = async (error: Error) => {
        toast.error(error.message);
    }

    // React Query - use Query function is used here to fetch posts, and will refetch after 60 seconds delay
    const { error: fetchingPostsError, data: postsData, isError, isLoading: postsLoading } = useQuery({
        queryFn: async () => await fetchPosts(),
        queryKey: ['refetch-post'],
        refetchOnWindowFocus: false,
        retry: 0,
        refetchInterval: 60000
    })
    useEffect(() => {
        setPostData(postsData)
        // handling error on data-fetching
        if (isError) {
            toast.error(fetchingPostsError?.message);
        }
    }, [isError, postsData])
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full p-2 flex-row">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 text-center w-full">Admin Page</h2>
                <div className="flex flex-row justify-end">
                    <Button className="bg-slate-600 dark:bg-blue-200 border-2 border-[#3B82F6] cursor-pointer hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] transition-shadow duration-300" onClick={handleCreateNewPost}><PlusIcon color="#3B82F6" size={50} /> Create Post</Button>
                </div>
            </div>
            <div className="w-full h-[25rem] p-2">
                {postsLoading === true && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
                {Array.isArray(postData) && postsLoading === false && postData?.length > 0 && <DataTablePosts postData={postData} setPopupModalValues={setPopupModalPost} />}
            </div>
            {popupModalPost?.isOpen === true && (popupModalPost?.action === 'editPost' || popupModalPost?.action === 'createPost' || popupModalPost?.action === 'viewPost') && <CreateEditPostModal handleSuccess={handleSuccessPost} handleError={handleErrorPost} action={popupModalPost?.action} open={popupModalPost?.isOpen} lgwidth="w-[45rem]" mobileWidth="w-[18rem]" onOpenChange={() => {
                setPopupModalPost({
                    isOpen: false,
                    action: '',
                    selectedPostsData: null
                })
                console.log('clicked');
            }} selectedPost={popupModalPost} />}
            {popupModalPost?.isOpen === true && popupModalPost?.action === 'deletePost' && <DeleteConfirmationModal handleSuccess={handleSuccessPost} handleError={handleErrorPost} action={popupModalPost?.action} open={popupModalPost?.isOpen} lgwidth="lg:w-[18rem]" mobileWidth="w-[16rem]" onOpenChange={() => setPopupModalPost({
                isOpen: false,
                action: '',
                selectedPostsData: null
            })} selectedPost={popupModalPost} />}
            <Toaster duration={5000} />
        </div>
    );
}
