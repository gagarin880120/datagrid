import { createStore, compose } from 'redux';
import DevTools from './DevTools';
import students from '../api/students';

const initialState = {
  students: students.data,
  // currentStudentsData: students.data,
  isSortedBy: 'id',
  activeArrowId: 'arrow1',
  isNameColumnVisible: true,
  isGithubColumnVisible: true,
  isEmailColumnVisible: true,
  isLocationColumnVisible: true,
  isRoleColumnVisible: true,
  isActiveColumnVisible: true,
}

const enhancer = compose(
  DevTools.instrument()
);

function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_FIELD') {
    return Object.assign(state, action.payload)
  }
  return state;
}

export const store = createStore(reducer, enhancer);