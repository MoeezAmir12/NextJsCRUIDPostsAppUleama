import Image from "next/image";
import { JsonPlaceHolderAPIEnum } from "@/Enums";
import type { IPost } from "@/interfaces";
import { toast, Toaster } from "sonner";
const fetchPostsISR = async() => {
  const postsData = await fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}`,{
    method: 'GET',
    next: {
      revalidate: 5
    }
  }).then(response => response?.json()).catch(error => console.error(error?.message))
  return postsData;
}

export default async function LandingPage() {
  // Incremental-Static-Regeneration is being used here for best Next.js practices, for admin page React-Query is used
  const postData = await fetchPostsISR();
  const handlePostBody = (body: string) => {
  if(body?.length >= 100)
  {
  const slicedPostBody = body?.slice(0,101);
  return `${slicedPostBody}...`;
  }
  else
  {
    return body;
  }
  }
  return (
  <div className="w-full h-full flex flex-col gap-4 dark:bg-black">
  <h2 className="text-2xl font-bold text-black dark:text-gray-50 text-center">Posts Listing</h2>
  <div className="lg:w-[30%] flex flex-col gap-2 w-[50%]">
  {Array.isArray(postData) && postData?.length > 0 && postData?.map((post: IPost) => {
   return (
    <div className="flex flex-col w-full h-[6rem] items-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1">
    <span className="text-xl font-bold text-slate-800 dark:text-slate-50 w-full h-4 border-b border-b-purple-700 dark:border-purple-400">{post?.title}</span>
    <div className="w-full h-[4rem]">
    <p className="text-slate-700 dark:text-slate-200 text-base line-clamp-1">{handlePostBody(post?.body)}</p>
    </div>
     </div> 
   )
  })}
  </div>
  <Toaster duration={5000}/>
  </div>
  );
}
