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
      {
        isNameColumnVisible ?
        <div 
          className={styles.item} 
          style={
            isSortedBy === 'name' ? activeItemStyles : null
          }
        >
          {props.name}
        </div> : null
      }
      {
        isGithubColumnVisible ?
        <div 
          className={styles.item} 
          style={
            isSortedBy === 'github' ? activeItemStyles : null
          }
        >
          {props.github}
        </div> : null
      }      
      {
        isEmailColumnVisible ?
        <div 
          className={styles.item} 
          style={
            isSortedBy === 'email' ? activeItemStyles : null
          }
        >
          {props.email}
        </div> : null
      } 
      {
        isLocationColumnVisible ?
        <div 
          className={styles.item} 
          style={
            isSortedBy === 'location' ? activeItemStyles : null
          }
        >
          {props.location}
        </div> : null
      }
      {
        isRoleColumnVisible ?
        <div 
          className={styles.item}
        >
          {props.role}
        </div> : null
      }
      {
        isActiveColumnVisible ?
        <div 
          className={styles.item}
        >
          {props.isActive ? 'yes' : 'no'}
        </div> : null
      }
    </div>
  )
}