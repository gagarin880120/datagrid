import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Row.module.css';

export default function HeaderRow(props) {
  const isSortedBy = useSelector(state => state.isSortedBy);
  const isNameColumnVisible = useSelector(state => state.isNameColumnVisible);
  const isGithubColumnVisible = useSelector(state => state.isGithubColumnVisible);
  const isEmailColumnVisible = useSelector(state => state.isEmailColumnVisible);
  const isLocationColumnVisible = useSelector(state => state.isLocationColumnVisible);
  const isRoleColumnVisible = useSelector(state => state.isRoleColumnVisible);
  const isActiveColumnVisible = useSelector(state => state.isActiveColumnVisible);

  const activeItemStyles = {
    background: '#7fffd4'
  }

  const activeRowStyles = {
    background: '#ff00ff'
  }

  const notVisibleStyles = {
    display: 'none'
  }

  const visibleStyles = {
    display: 'inline'
  }

  return (
    <div 
      id={props.id}
      style={props.id === Number(props.activeRowId) || props.activeRowsArray.includes(`${props.id}`) ? Object.assign(activeRowStyles, props.style) : props.style}
      className={styles.wrapper} 
      onClick={props.onRowClick} 
    >
      <div 
        className={styles.item} 
        style={isSortedBy === 'id' ? activeItemStyles: null}
      >
        {props.id}
      </div>
      <div 
        className={styles.item} 
        style={
          (isNameColumnVisible && isSortedBy === 'name') ? Object.assign(visibleStyles, activeItemStyles) : isNameColumnVisible ? visibleStyles : notVisibleStyles
        }
        >
          {props.name}
        </div>
      <div
        className={styles.item} 
        style={
          (isGithubColumnVisible && isSortedBy === 'github') ? Object.assign(visibleStyles, activeItemStyles) : isGithubColumnVisible ? visibleStyles : notVisibleStyles
        }
      >
        {props.github}
      </div>
      <div
        className={styles.item} 
        style={
          (isEmailColumnVisible && isSortedBy === 'email') ? Object.assign(visibleStyles, activeItemStyles) : isEmailColumnVisible ? visibleStyles : notVisibleStyles
        }
      >
        {props.email}
      </div>
      <div
        className={styles.item} 
        style={
          (isLocationColumnVisible && isSortedBy === 'location') ? Object.assign(visibleStyles, activeItemStyles) : isLocationColumnVisible ? visibleStyles : notVisibleStyles
        }
      >
        {props.location}
      </div>
      <div
        className={styles.item} 
        style={isRoleColumnVisible ? visibleStyles : notVisibleStyles}
      >
        {props.role}
      </div>
      <div
        className={styles.item} 
        style={isActiveColumnVisible ? visibleStyles : notVisibleStyles}
      >
        {props.isActive ? 'yes' : 'no'}
      </div>
    </div>
  )
}