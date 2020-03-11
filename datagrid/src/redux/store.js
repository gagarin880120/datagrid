import { createStore, compose } from 'redux';
import DevTools from './DevTools';
import students from '../api/students';

const initialState = {
  students: localStorage.getItem('students')
    ? JSON.parse(localStorage.getItem('students'))
    : students.data,
  isSortedBy: localStorage.getItem('isSortedBy') || 'id',
  activeArrowId: localStorage.getItem('activeArrowId') || '1arrow',
  isNameColumnVisible: localStorage.getItem('isNameColumnVisible')
    ? JSON.parse(localStorage.getItem('isNameColumnVisible'))
    : true,
  isGithubColumnVisible: localStorage.getItem('isGithubColumnVisible')
    ? JSON.parse(localStorage.getItem('isGithubColumnVisible'))
    : true,
  isEmailColumnVisible: localStorage.getItem('isEmailColumnVisible')
    ? JSON.parse(localStorage.getItem('isEmailColumnVisible'))
    : true,
  isLocationColumnVisible: localStorage.getItem('isLocationColumnVisible')
    ? JSON.parse(localStorage.getItem('isLocationColumnVisible'))
    : true,
  isRoleColumnVisible: localStorage.getItem('isRoleColumnVisible')
    ? JSON.parse(localStorage.getItem('isRoleColumnVisible'))
    : true,
  isActiveColumnVisible: localStorage.getItem('isActiveColumnVisible')
    ? JSON.parse(localStorage.getItem('isActiveColumnVisible'))
    : true
};

const enhancer = compose(DevTools.instrument());

function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_FIELD') {
    return Object.assign(state, action.payload);
  }
  return state;
}

export const store = createStore(reducer, enhancer);
