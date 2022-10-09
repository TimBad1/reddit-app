import React from 'react';
import styles from './preview.css';

interface IPreview {
  previewImg: string;
  title: string;
}

export function Preview({previewImg, title}: IPreview) {
 
  return (
    <div className={styles.preview}>
      <img 
        className={styles.previewImg} 
        src={previewImg} alt={title} />
    </div>
  );
}
