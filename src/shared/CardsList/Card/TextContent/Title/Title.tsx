import React, { useState } from 'react';
import { PostsCommentsContentProvider } from '../../../../context/postCommentsContext';
import { Post } from './Post';
import styles from './title.css';

interface ITitle {
  id: string;
  title: string;
  rating: number;
  author: string;
  commentsCount: number;
  avatar: string;
  previewImg: string;
  datePostUtc: number;
  description: string;
  subreddit: string;
}

export function Title({id, title, rating, author, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}: ITitle) { 
  const [isModalOpened, setIsModalOpened] = useState(false);
  
  return (
    <h2 className={styles.title}>
      <a className={styles.postLink} href='#post-url' onClick={() => {setIsModalOpened(true)}}>
        {title}
      </a>
      {isModalOpened && (
        <PostsCommentsContentProvider postId={id} >
          <Post 
            title={title} 
            id={id} 
            onClose={() => { setIsModalOpened(false)}} 
            author={author} 
            avatar={avatar} 
            datePostUtc={datePostUtc} 
            rating={rating}
            commentsCount={commentsCount}
            previewImg={previewImg}
            description={description}
            subreddit={subreddit}
            />                        
        </PostsCommentsContentProvider>
      )}
    </h2>
  );
}
