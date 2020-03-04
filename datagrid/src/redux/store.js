import { createStore } from 'redux';

const initialState = {

}

function reducer(state = initialState, action) {
  if (action.type === 'CHANGE_FIELD') {
    return Object.assign(state, action.payload)
  }
  return state;
}

export const store = createStore(reducer);