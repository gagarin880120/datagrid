import React, { useState } from 'react';
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
      type: "CHANGE_FIELD",
      payload: {
        [field]: value,
      }
    });
  }

  function handleCheckboxChange(e, field) {
    changeField(field, e.target.checked);
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="nameColumn">
        <input
          id="nameColumn"
          type="checkbox"
          checked={isNameColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isNameColumnVisible')}
        />
        name
      </label>
      <label htmlFor="githubColumn">
        <input
          id="githubColumn"
          type="checkbox"
          checked={isGithubColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isGithubColumnVisible')}
        />
        github
      </label>
      <label htmlFor="emailColumn">
        <input
          id="emailColumn"
          type="checkbox"
          checked={isEmailColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isEmailColumnVisible')}
        />
        email
      </label>
      <label htmlFor="locationColumn">
        <input
          id="locationColumn"
          type="checkbox"
          checked={isLocationColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isLocationColumnVisible')}
        />
        location
      </label>
      <label htmlFor="roleColumn">
        <input
          id="roleColumn"
          type="checkbox"
          checked={isRoleColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isRoleColumnVisible')}
        />
        role
      </label>
      <label htmlFor="activeColumn">
        <input
          id="activeColumn"
          type="checkbox"
          checked={isActiveColumnVisible}
          onChange={(e) => handleCheckboxChange(e, 'isActiveColumnVisible')}
        />
        active members
      </label>

    </div>
  )
}