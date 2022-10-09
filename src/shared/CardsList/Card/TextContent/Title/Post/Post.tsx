import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IPostsCommentsContextData } from '../../../../../../hooks/usePostCommentsData';
import { CommentForm } from '../../../../../CommentForm';
import { PostsCommentsContext } from '../../../../../context/postCommentsContext';
import { ago } from '../../../../../functions/ago';
import { KarmaCounter } from '../../../Controls/KarmaCounter';
import { MenuItemsList } from '../../../Menu/MenuItemsList';
import { TextContent } from '../../TextContent';
import { UserLink } from '../../UserLink';
import { CommentsList } from './CommentsList';
import styles from './post.css';

interface IPost {
  title: string;
  id: string;
  onClose?: () => void;
  author: string;
  rating: number;
  commentsCount: number;
  avatar: string;
  previewImg: string;
  datePostUtc: number;
  description: string;
  subreddit: string;
  }
 
export function Post({id, title, onClose, author, rating, commentsCount, avatar, previewImg, datePostUtc, description, subreddit}: IPost) {
  const ref = useRef<HTMLDivElement>(null);
  const comments = useContext<IPostsCommentsContextData[]>(PostsCommentsContext)
  console.log('comments', comments, id)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if(event.target instanceof Node && !ref.current?.contains(event.target)) {
        // console.log(event.target)
        onClose?.()
      }
    }
    // console.log(event.target)
    
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const node = document.querySelector('#modal_root');
  if(!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <div className={styles.modalHeadingWrap}>
        <KarmaCounter rating={rating}/>
        <div className={styles.modalHeadingTextWrap}>
          <h2>{title}</h2>
          <div className={styles.modalHeadingWrap}>
            <span className={styles.publishedLabel}>Опубликовано {ago(datePostUtc)}</span>
            <UserLink author={author} avatar={avatar} />
            <div className={styles.modalSubreddit}>{subreddit}</div>
          </div>
        </div>
      </div>
        <img className={styles.modalImg} src={previewImg} alt={title} />
      <p>
        {description}
      </p>
      <MenuItemsList author={author} postId={id} direction={'row'} />
      <CommentForm />
      <CommentsList />
    </div>
  ), node);
}
