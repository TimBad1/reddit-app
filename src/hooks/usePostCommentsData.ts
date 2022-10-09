import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";

export interface IPostsCommentsContextData {
    author: string;
    id: string;
    body: string;
    likes: number;
    subreddit: string;
    fullname: string;
    created_utc: number;
    replies?: IPostsCommentsContextData[];
}

export interface IChildrenComments {
    data:IPostsCommentsContextData
}

interface IPostsCommentsDataSrc {
    1: {
        data: {
            children: IChildrenComments[]
        }
    }
    
}

export function usePostsCommentsData(id: string) {
    const token = useContext(tokenContext);
    const [comments, setComments] = useState<IPostsCommentsContextData[]>([]);
    // console.log('вызов usePostsComments')

    function createPostsCommentsData(data: any[]){
        console.log(data)
        return data.map(item => {
            const el:IPostsCommentsContextData = {
                author: '',
                id: '',
                body: '',
                likes: 0,
                subreddit: '',
                fullname: '',
                created_utc: 0,
            }

            el.id = item.data.id;
            el.author = item.data.author;
            el.body = item.data.body;
            el.likes = item.data.likes;
            el.subreddit = item.data.subreddit;
            el.fullname = item.data.author_fullname;
            el.created_utc = item.data.created_utc
            if(item.data.replies) {
                el.replies = createPostsCommentsData(item.data.replies.data.children)
            }
            return el
        })
        .filter(item => item.body !== '[removed]' && item.body !== undefined)
    }

    useEffect(() => {
        if(token) {
            // console.log('вызов PostsComments', id)
            axios.get<IPostsCommentsDataSrc>(`https://oauth.reddit.com/comments/${id}`, {
                headers: { Authorization: `bearer ${token}` }
            })
            .then(({data}) => {
                const commentsData = createPostsCommentsData(data[1].data.children);
                console.log(commentsData)
                // console.log(data)
                setComments( commentsData );
            })
            .catch(console.log);
        }
    }, [token]);
    return [comments]
}