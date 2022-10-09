import React, { useContext} from 'react';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { UserContext } from '../../context/userContext';

export function SearchBlock() {
  const { iconImg, name } = useContext(UserContext)
  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={iconImg} username={name}/>
    </div>
  );
}
