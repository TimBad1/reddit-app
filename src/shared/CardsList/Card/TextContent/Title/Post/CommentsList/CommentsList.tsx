import React, { useContext } from 'react';
import { IPostsCommentsContextData } from '../../../../../../../hooks/usePostCommentsData';
import { PostsCommentsContext } from '../../../../../../context/postCommentsContext';
import { Comment } from './Comment/Comment';
import styles from './commentslist.css';

export function CommentsList() {
  const comments = useContext<IPostsCommentsContextData[]>(PostsCommentsContext);
  console.log(comments)

  if(comments && comments.length > 0) {
    return (
      <ul className={styles.commentsList}>
        {comments.map(({ id, author, body, likes, subreddit, replies, fullname, created_utc}) => 
          <Comment 
            key={id}
            id={id}
            author={author}
            body={body}
            likes={likes}
            subreddit={subreddit}
            replies={replies}
            fullname={fullname}
            created_utc={created_utc}
          />
        )}
      </ul>
    );
  } else {
    return(
      <p>пока нет комментариев</p>
    )
    
  }
}
