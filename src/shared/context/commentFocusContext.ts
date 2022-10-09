import React from "react";

type CommentFocusContextType = {
  author: string;
  onClick: (value: string) => void;
}

export const commentFocusContext = React.createContext<CommentFocusContextType>({
  author: '',
  onClick: () => {},
});