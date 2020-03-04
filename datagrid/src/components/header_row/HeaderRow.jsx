import React from 'react';
import styles from './HeaderRow.module.css';

export default function HeaderRow() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>#</div>
      <div className={styles.header}>Name</div>
      <div className={styles.header}>github</div>
      <div className={styles.header}>email</div>
      <div className={styles.header}>Location</div>
      <div className={styles.header}>Role</div>
      <div className={styles.header}>Active</div>
    </div>
  )
}