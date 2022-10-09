import React from 'react';
import { IPostsContextData } from '../../../../../hooks/usePostsData';
import styles from './userlink.css';

interface IUserLink{
  author: string;
  avatar: string;
}

export function UserLink({author, avatar}: IUserLink) {
  
  return (
    <div className={styles.userLink}>
    <img className={styles.avatar} src={avatar} alt={author} />
    <a className={styles.username} href="#user-url">{author}</a>
  </div>
  );
}
