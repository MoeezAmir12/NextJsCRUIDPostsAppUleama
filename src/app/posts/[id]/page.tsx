import { JsonPlaceHolderAPIEnum } from "@/Enums";
import { fetchPosts } from "@/Reducers/postsAPIReducer";
import { toast } from "sonner";


export async function getPostDetail(id: number) {
    const postData = await fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}/${id}`,{
        method: 'GET',
        next: {
          revalidate: 5
        }
      }).then(res => res?.json()).catch(error => console.error(error?.message))
      return postData;
}

const PostDetailPage = async({params}: {
    params: { id: number }
  }) => {
  const postData = await getPostDetail(params?.id);
  return (
    <div className="w-full h-full flex flex-col gap-4 dark:bg-black">
    <h2 className="text-2xl font-bold text-black dark:text-gray-50 text-center">Post Detail</h2>
    <div className="lg:w-[30%] flex flex-col gap-2 w-[50%]">
    <div id={postData?.id.toString()} className="flex flex-col w-full h-fit items-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1">
    <span className="text-xl font-bold text-slate-800 dark:text-slate-50 w-full h-4 border-b border-b-purple-700 dark:border-purple-400">{postData?.title}</span>
    <div className="w-full h-[10rem] overflow-y-auto scrollbar-hide">
    <p className="text-slate-700 dark:text-slate-200 text-base line-clamp-3">{postData?.body}</p>
    </div>
    </div>
    </div>
     </div> 
  )
}

export default PostDetailPage;