import React, { Children } from "react";
import { IChildrenComments, IPostsCommentsContextData, usePostsCommentsData } from "../../hooks/usePostCommentsData";



export const PostsCommentsContext = React.createContext<IPostsCommentsContextData[]>([])

export function PostsCommentsContentProvider({children, postId}: { children: React.ReactNode, postId:string}) {
  const [comments] = usePostsCommentsData(postId)
  // console.log(comments)
  
  return (
    <PostsCommentsContext.Provider value={comments}>
      {children}
    </PostsCommentsContext.Provider>
  )
}