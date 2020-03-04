import React from 'react';
import styles from './HeaderRow.module.css';
import { useSelector, useDispatch } from 'react-redux';

export default function HeaderRow() {
  const students = useSelector(state => state.students);
  const dispatch = useDispatch();

  const activeArrowStyle = {
    color: 'red'
  }

  function changeField(field, value) {
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        [field]: value
      }
    })
  }

  function sortDataUpward(category) {
    const array = students;
    array.sort((a, b) => a[category] > b[category] ? 1 : a[category] < b[category] ? -1 : 0)
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        students: [...array]
      }
    })
  }

  function sortDataDownward(category) {
    const array = students;
    array.sort((a, b) => a[category] > b[category] ? -1 : a[category] < b[category] ? 1 : 0)
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        students: [...array]
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        # 
        <span 
          className={styles.arrow} 
          onClick={(e) => {
            sortDataUpward('id'); 
            changeField('isSortedBy', 'id');
          }}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={(e) => {
            sortDataDownward('id'); 
            changeField('isSortedBy', 'id');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        Name
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('name'); changeField('isSortedBy', 'name')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('name'); changeField('isSortedBy', 'name')}}
        >▼</span>
      </div>
      <div className={styles.header}>
        github
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('github'); changeField('isSortedBy', 'github')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('github'); changeField('isSortedBy', 'github')}}
        >▼</span>
      </div>
      <div className={styles.header}>
        email
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('email'); changeField('isSortedBy', 'email')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('email'); changeField('isSortedBy', 'email')}}
        >▼</span>
      </div>
      <div className={styles.header}>
        Location
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('location'); changeField('isSortedBy', 'location')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('location'); changeField('isSortedBy', 'location')}}
        >▼</span>
      </div>
      <div className={styles.header}>
        Role
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('role'); changeField('isSortedBy', 'role')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('role'); changeField('isSortedBy', 'role')}}
        >▼</span>
      </div>
      <div className={styles.header}>
        Active
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataUpward('isActive'); changeField('isSortedBy', 'isActive')}}
        >▲</span>
        <span 
          className={styles.arrow} 
          onClick={() => {sortDataDownward('isActive'); changeField('isSortedBy', 'isActive')}}
        >▼</span>
      </div>
    </div>
  )
}