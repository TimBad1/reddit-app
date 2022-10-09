import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";

export interface IPostsContextData {
    id: string;
    author: string;
    title: string;
    rating: number;
    commentsCount: number;
    avatar: string;
    previewImg: string;
    datePostUtc: number;
    description: string;
    subreddit: string;
}

export interface IChildren {
    data:IPostsContextData
}

interface IPostsDataSrc {
    data: {
        children: IChildren[]
    }
}

function createPostsData(data: any[]){
    // console.log('Посты получены')
    // console.log(data)
    return data.map(item => {
        const el:IPostsContextData = {
            id: "",
            author: "",
            title: "",
            rating: 0,
            commentsCount: 0,
            avatar: "",
            previewImg: '',
            datePostUtc: 0,
            description: "",
            subreddit: "",
        };     
        // console.log(item.data.sr_detail.public_description)
        el.id = item.data.id;
        el.author = item.data.author;
        el.title = item.data.title;
        el.rating = item.data.ups;
        el.commentsCount = item.data.num_comments;
        el.previewImg = item.data.thumbnail || "https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/movies/frames/41159194-1147476.jpg";
        el.avatar = item.data.sr_detail.icon_img || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png';
        el.datePostUtc = item.data.created_utc;
        el.description = item.data.sr_detail.public_description;
        el.subreddit = item.data.subreddit;

        return el
    })
}

export function usePostsData() {
    const token = useContext(tokenContext);
    const [posts, setPosts] = useState<IPostsContextData[]>([]);

    useEffect(() => {
        if(token) {
            axios.get<IPostsDataSrc>('https://oauth.reddit.com/best.json?sr_detail=true', {
                headers: { Authorization: `bearer ${token}` }
            })
            .then(({data}) => {
                const postsData = createPostsData(data.data.children);
                setPosts( postsData );
            })
            .catch(console.log);
        }
    }, [token]);
    return [posts]
}
