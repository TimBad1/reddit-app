import React, { Children } from "react";
import { IChildren, IPostsContextData, usePostsData } from "../../hooks/usePostsData";



export const PostsContext = React.createContext<IPostsContextData[]>([])

export function PostsContentProvider({children}: { children: React.ReactNode}) {
  const [posts] = usePostsData()
  
  return (
    <PostsContext.Provider value={posts}>
      {children}
    </PostsContext.Provider>
  )
}