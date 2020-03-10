import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DevTools from './redux/DevTools';

ReactDOM.render(
  <Provider store={store}>
    <DevTools />
    <App />
  </Provider>,
  document.getElementById('root')
);