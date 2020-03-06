import { createStore } from 'redux';
import students from '../api/students';

const initialState = {
  students: students.data,
  currentStudentsData: students.data,
  isSortedBy: 'id',
}

function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_FIELD') {
    return Object.assign(state, action.payload)
  }
  return state;
}

export const store = createStore(reducer);