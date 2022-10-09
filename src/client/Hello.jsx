import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import styles from './hello.css';

function HelloComponent () {
  return(
    <main className={styles.main}>
        <h1 className={styles.title}>
            Hello React
        </h1>
    </main>
    
  )
}

export const Hello = hot(HelloComponent)
