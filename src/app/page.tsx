
import { JsonPlaceHolderAPIEnum } from "@/Enums";
import type { IPost } from "@/interfaces";
import { Toaster } from "sonner";
import PostComponent from "@/Components/PostComponent/PostComponent";
const fetchPostsISR = async () => {
  const postsData = await fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}`, {
    method: 'GET',
    next: {
      revalidate: 60
    }
  }).then(response => response?.json()).catch(error => console.error(error?.message))
  return postsData;
}

export default async function LandingPage() {
  // Incremental-Static-Regeneration is being used here for best Next.js practices, for admin page React-Query is used
  const postData = await fetchPostsISR();
  if (!postData || postData?.length === 0) {
    return <div className="p-4 text-red-400">Posts not found or failed to load.</div>;
  }
  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-bold text-black dark:text-gray-50 text-start">Posts Listing</h2>
      <div className="lg:w-[50%] flex flex-col gap-10 w-[80%] items-center lg:items-start">
        {Array.isArray(postData) && postData?.length > 0 && postData?.map((post: IPost) => {
          return (
            <div key={post?.id}>
            <PostComponent post={post} />
            </div>
          )
        })}
      </div>
      <Toaster duration={5000} />
    </div>
  );
}
