import React, { useEffect, useRef, useState } from 'react';
import styles from './menu.css';
import { BlockIcon, CommentIcon, SaveIcon, ShareIcon, WarningIcon } from '../../../Icons';
import { Text, EColors } from '../../../Text';
import ReactDOM from 'react-dom';
import { MenuItemsList } from './MenuItemsList';

interface IMenuProps {
  postId: string;
  author: string;
  onClose?: () => void;
  isDropdownOpen: boolean;
  coordinates?: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

export function Menu({ postId, author, onClose, coordinates, isDropdownOpen}: IMenuProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  function getPositionMenu (coordinates: any) {
    const screenWidth = screen.width;
    const y = coordinates.top + pageYOffset + coordinates.height;
    const x = screenWidth - (coordinates.left + pageXOffset) - (screenWidth >= 1024? coordinates.width / 2 : coordinates.width)  
    
    return {top: y, rigth: x}
  }

  const position = getPositionMenu(coordinates)
  
  useEffect(() => {
    function handleClick(event: MouseEvent) {
        onClose?.()
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const node = document.querySelector('#dropdown_root');
  
  if(!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.menu} style={{top: position.top, right: position.rigth}}>
      <MenuItemsList postId={postId} author={author} direction={'column'} />

      <button className={styles.closeButton}>
        <Text mobileSize={12} size={14} color={EColors.grey66}>
          Закрыть
        </Text>
      </button>
    </div>
    ), node);
}
