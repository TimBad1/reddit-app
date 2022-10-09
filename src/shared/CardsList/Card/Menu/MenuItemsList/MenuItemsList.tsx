import React, { useEffect, useRef, useState } from 'react';
import styles from './menuitemslist.css';
import { BlockIcon, CommentIcon, SaveIcon, ShareIcon, WarningIcon } from '../../../../Icons';
import { Text, EColors } from '../../../../Text';
import ReactDOM from 'react-dom';

interface IMenuItemsListProps {
  postId: string;
  direction: string;
  author: string;
}

export function MenuItemsList({ postId, author, direction = 'column'}: IMenuItemsListProps) {

  function clickFocus() {
    // textareaRef.current?.focus()
  }
  
  return (
    <ul className={styles.menuItemList} style={{flexDirection: direction, display: 'flex'}}>
      <li className={styles.menuItem} onClick={clickFocus}>
        <CommentIcon />
        <Text size={12} color={EColors.grey66}>Комментарии</Text>
      </li>

      <li className={styles.menuItem} onClick={() => console.log('Поделиться')}>
        <ShareIcon />
        <Text size={12} color={EColors.grey66}>Поделиться</Text>
      </li>

      <li className={styles.menuItem} onClick={() => console.log(postId)}>
        <BlockIcon />
        <Text size={12} color={EColors.grey66}>Скрыть</Text>
      </li>

      <li className={styles.menuItem}>
        <SaveIcon />
        <Text size={12} color={EColors.grey66}>Сохранить</Text>
      </li>

      <li className={styles.menuItem}>
        <WarningIcon />
        <Text size={12} color={EColors.grey66}>Пожаловаться</Text>
      </li>
    </ul>
    );
}
