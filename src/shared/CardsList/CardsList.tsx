import React, { useContext } from 'react';
import { IPostsContextData } from '../../hooks/usePostsData';
import { PostsContext } from '../context/postsContext';
import { Card } from './Card';
import styles from './cardslist.css';

export function CardsList() {
  const posts = useContext<IPostsContextData[]>(PostsContext)

  // console.log(posts);
  if(posts && posts.length > 0) {
    return (
      <ul className={styles.cardsList}>
        {posts.map(({id, author, title, rating, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}) => 
          <Card 
            key={id}
            id={id}
            author={author}
            title={title}
            rating={rating}
            commentsCount={commentsCount}
            avatar={avatar}
            previewImg={previewImg}
            datePostUtc={datePostUtc} 
            description={description}
            subreddit={subreddit}/>)}
      </ul>
    )
  } else {
    return (
      <h2>Авторизуйтесь для загрузки постов</h2>
    )
  }
}
