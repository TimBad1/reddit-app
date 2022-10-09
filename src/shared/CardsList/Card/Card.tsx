import React, { useContext, useState } from 'react';
import { IPostsContextData } from '../../../hooks/usePostsData';
import { generateId } from '../../../utils/generateRandomIndex';
import { commentFocusContext } from '../../context/commentFocusContext';
import { PostsContext } from '../../context/postsContext';
import { Dropdown } from '../../Dropdown';
import { GenericList } from '../../GenericList';
import styles from './card.css';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

const LIST = [ 
  { As: 'li' as const, className: 'menuItem', text: 'Скрыть'}, 
  { As: 'li' as const, className: 'menuItem', text: 'Пожаловаться'}, 
].map(generateId)



export function Card({id, author, title, rating, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}: IPostsContextData) {
  const [commentFocus, setCommentFocus] = useState('');
  const CommentFocusProvider = commentFocusContext.Provider;
  return (
    <CommentFocusProvider value={{
      author: commentFocus,
      onClick: setCommentFocus
    }}> 
    <li className={styles.card}>
      <TextContent 
        title={title} 
        author={author} 
        avatar={avatar} 
        datePostUtc={datePostUtc} 
        id={id} 
        rating={rating} 
        commentsCount={commentsCount} 
        previewImg={previewImg}
        description={description}
        subreddit={subreddit}
        />
      <Preview title={title} previewImg={previewImg}/>
      <Dropdown button={<button />} id={id} author={author}>
        <GenericList list={LIST} />
      </Dropdown>
      <Controls commentsCount={commentsCount} rating={rating}/>
    </li>
    </CommentFocusProvider>
  );
}
