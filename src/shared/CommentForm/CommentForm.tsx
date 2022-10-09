import React, { ChangeEvent, FormEvent, useContext, useRef } from 'react';
import { commentContext } from '../context/commentContext';
import { commentFocusContext } from '../context/commentFocusContext';
import styles from './commentform.css';

export function CommentForm() {
  const { value, onChange } = useContext(commentContext);
  // const { author, onClick } = useContext( commentFocusContext)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault(); 
    console.log(value);
  }

  function clickFocus() {
    textareaRef.current?.focus()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.input} value={value} onChange={handleChange} ref={textareaRef} placeholder='Комментировать...'/>
      <button type="submit" className={styles.button} onClick={clickFocus}>Комментировать</button>
    </form>
  );
}
