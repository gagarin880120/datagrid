import React from 'react';
import styles from './Row.module.css';

export default function HeaderRow(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>{props.id}</div>
      <div className={styles.item}>{props.name}</div>
      <div className={styles.item}>{props.github}</div>
      <div className={styles.item}>{props.email}</div>
      <div className={styles.item}>{props.location}</div>
      <div className={styles.item}>{props.role}</div>
      <div className={styles.item}>{props.isActive ? 'yes' : 'no'}</div>
    </div>
  )
}