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
    : true,
  notVisibleColumns: localStorage.getItem('notVisibleColumns')
    ? JSON.parse(localStorage.getItem('notVisibleColumns'))
    : []
};

const enhancer = compose(DevTools.instrument());

function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_FIELD') {
    return Object.assign(state, action.payload);
  }
  if (action.type === 'ADD_ITEM') {
    const arr = state.notVisibleColumns;
    arr.push(action.payload);
    localStorage.setItem('notVisibleColumns', JSON.stringify(arr));
    return Object.assign(state, { notVisibleColumns: arr });
  }
  if (action.type === 'DELETE_ITEM') {
    const arr = state.notVisibleColumns.filter(v => v !== action.payload);
    localStorage.setItem('notVisibleColumns', JSON.stringify(arr));
    return Object.assign(state, {
      notVisibleColumns: arr
    });
  }
  return state;
}

export const store = createStore(reducer, enhancer);
