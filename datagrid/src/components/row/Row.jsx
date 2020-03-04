import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Row.module.css';

export default function HeaderRow(props) {
  const isSortedBy = useSelector(state => state.isSortedBy);

  const activeItemStyles = {
    background: '#7fffd4'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.item} style={isSortedBy === 'id' ? activeItemStyles: null}>{props.id}</div>
      <div className={styles.item} style={isSortedBy === 'name' ? activeItemStyles: null}>{props.name}</div>
      <div className={styles.item} style={isSortedBy === 'github' ? activeItemStyles: null}>{props.github}</div>
      <div className={styles.item} style={isSortedBy === 'email' ? activeItemStyles: null}>{props.email}</div>
      <div className={styles.item} style={isSortedBy === 'location' ? activeItemStyles: null}>{props.location}</div>
      <div className={styles.item} style={isSortedBy === 'role' ? activeItemStyles: null}>{props.role}</div>
      <div className={styles.item} style={isSortedBy === 'isActive' ? activeItemStyles: null}>{props.isActive ? 'yes' : 'no'}</div>
    </div>
  )
}