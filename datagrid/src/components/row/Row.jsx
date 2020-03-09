import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Row.module.css';

export default function HeaderRow(props) {
  const isSortedBy = useSelector(state => state.isSortedBy);

  const activeItemStyles = {
    background: '#7fffd4'
  }

  const activeRowStyles = {
    background: '#ff00ff'
  }

  return (
    <div 
      id={props.id}
      style={props.id === Number(props.activeRowId) ? Object.assign(activeRowStyles, props.style) : props.style}
      className={styles.wrapper} 
      onClick={props.onRowClick} 
    >
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