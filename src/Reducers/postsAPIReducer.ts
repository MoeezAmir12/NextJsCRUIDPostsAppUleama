import { JsonPlaceHolderAPIEnum } from "@/Enums"
import { IPost } from "@/interfaces";





export const fetchPosts = () => {
    const postData = fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}`,{
        method: 'GET'
    }).then(response => response?.json()).catch(error => {
        throw new Error(error?.message);
    })
    return postData;
}


export const createPost = (payload: {
    userId: number;
    title: string;
    body: string;
}) => {
    const postData = fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}`,{
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    }).then(response => response?.json()).catch(error => {
        throw new Error(error?.message);
    })
    return postData;
}

export const updatePost = (payload: IPost) => {
    const postData = fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}/${payload?.id}`,{
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    }).then(response => response?.json()).catch(error => {
        throw new Error(error?.message);
    })
    return postData;
}

export const deletePost = (postID: number) => {
    const postData = fetch(`${JsonPlaceHolderAPIEnum?.baseURL}${JsonPlaceHolderAPIEnum?.posts}/${postID}`,{
        method: 'DELETE'
    }).then(response => response?.json()).catch(error => {
        throw new Error(error?.message);
    })
    return postData;
}