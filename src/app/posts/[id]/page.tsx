import { JsonPlaceHolderAPIEnum } from "@/Enums";
import { IPost } from "@/interfaces";


export async function generateStaticParams() {
    const posts = await fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}`, {
        method: 'GET',
    }).then(res => res?.json()).catch(error => console.error(error?.message));
    return posts.map((post: {
        id: number
    }) => ({ id: post?.id.toString() }));
  }
  

const getPostDetail = async(id: string): Promise<IPost> => {
    const postData : IPost = await fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}/${id}`, {
        method: 'GET',
        next: {
            revalidate: 60
        }
    }).then(res => res?.json()).catch(error => console.error(error?.message))
    return postData;
}

const PostDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const postData: IPost = await getPostDetail(id);
    if (!postData) {
        return <div className="p-4 text-red-400">Post not found or failed to load.</div>;
      }
    return (
        <div className="w-full h-full flex flex-col gap-8 p-2">
            <h2 className="text-2xl font-bold text-black dark:text-gray-50 text-start">Post Detail</h2>
            <div className="lg:w-[50%] flex flex-col gap-2 w-[80%] scrollbar-hide">
                <div className="flex flex-col w-full h-fit items-center lg:items-start rounded-md border-2 border-purple-700 dark:border-purple-400 p-2 gap-1">
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-50 w-full border-b border-b-purple-700 dark:border-purple-400 p-2 pb-4">{postData?.title}</span>
                    <div className="w-full h-[10rem] overflow-y-auto scrollbar-hide p-2">
                        <p className="text-slate-700 dark:text-slate-200 text-base break-words">{postData?.body}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetailPage;