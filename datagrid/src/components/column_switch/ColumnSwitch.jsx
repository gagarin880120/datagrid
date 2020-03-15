import React from 'react';
import styles from './ColumnSwitch.module.css';
import { useSelector, useDispatch } from 'react-redux';

export default function ColumnSwitch() {
  const isNameColumnVisible = useSelector(state => state.isNameColumnVisible);
  const isGithubColumnVisible = useSelector(state => state.isGithubColumnVisible);
  const isEmailColumnVisible = useSelector(state => state.isEmailColumnVisible);
  const isLocationColumnVisible = useSelector(state => state.isLocationColumnVisible);
  const isRoleColumnVisible = useSelector(state => state.isRoleColumnVisible);
  const isActiveColumnVisible = useSelector(state => state.isActiveColumnVisible);
  const dispatch = useDispatch();

  function changeField(field, value) {
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        [field]: value
      }
    });
  }

  function addItem(value) {
    return dispatch({
      type: 'ADD_ITEM',
      payload: value
    });
  }

  function deleteItem(value) {
    return dispatch({
      type: 'DELETE_ITEM',
      payload: value
    });
  }

  function handleCheckboxChange(e, field, column) {
    changeField(field, e.target.checked);
    localStorage.setItem(field, e.target.checked);
    if (e.target.checked) {
      deleteItem(column);
    } else {
      addItem(column);
    }
  }

  return (
    <div className={styles.wrapper}>
      Visible columns:
      <label htmlFor="nameColumn">
        <input
          id="nameColumn"
          type="checkbox"
          checked={isNameColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isNameColumnVisible', 'name')}
        />
        name
      </label>
      <label htmlFor="githubColumn">
        <input
          id="githubColumn"
          type="checkbox"
          checked={isGithubColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isGithubColumnVisible', 'github')}
        />
        github
      </label>
      <label htmlFor="emailColumn">
        <input
          id="emailColumn"
          type="checkbox"
          checked={isEmailColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isEmailColumnVisible', 'email')}
        />
        email
      </label>
      <label htmlFor="locationColumn">
        <input
          id="locationColumn"
          type="checkbox"
          checked={isLocationColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isLocationColumnVisible', 'location')}
        />
        location
      </label>
      <label htmlFor="roleColumn">
        <input
          id="roleColumn"
          type="checkbox"
          checked={isRoleColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isRoleColumnVisible', 'role')}
        />
        role
      </label>
      <label htmlFor="activeColumn">
        <input
          id="activeColumn"
          type="checkbox"
          checked={isActiveColumnVisible}
          onChange={e => handleCheckboxChange(e, 'isActiveColumnVisible', 'isActive')}
        />
        active members
      </label>
    </div>
  );
}
