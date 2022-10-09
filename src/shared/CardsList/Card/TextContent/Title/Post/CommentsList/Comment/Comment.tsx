import React from 'react';
import { IPostsCommentsContextData } from '../../../../../../../../hooks/usePostCommentsData';
import { ago } from '../../../../../../../functions/ago';
import { KarmaCounter } from '../../../../../Controls/KarmaCounter';
import { MenuItemsList } from '../../../../../Menu/MenuItemsList';
import { TextContent } from '../../../../TextContent';
import styles from './comment.css';



export function Comment({ id, author, body, likes, subreddit, replies, fullname, created_utc} :IPostsCommentsContextData) {
  return (
    <li className={styles.commentItem}>
      <div className={styles.commentItemLeft}>
      <KarmaCounter />
      <div className={styles.commentItemRecomment} />
      </div>
      
      <div>
        <div className={styles.commentWrap}>
          <p className={styles.commentFullname}>{author}</p>
          <p className={styles.commentCreated}>{ago(created_utc)}</p>
          <p className={styles.commentSubreddit}>{subreddit}</p>
        </div>
        <p className={styles.commentBody}>{body}</p>
        <MenuItemsList author={author} postId={id} direction='row'/>

        {replies && 
        <ul className={styles.commentsList} >
          {replies.map(({ id, author, body, likes, subreddit, replies, fullname, created_utc}) => 
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
          />)}
        </ul>}
      </div>
    </li>
  );
}
