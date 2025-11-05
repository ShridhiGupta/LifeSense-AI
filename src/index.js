import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './styles/index.css';

// Suppress ResizeObserver error
const resizeObserverLoopErrCallback = () => {};
window.addEventListener('error', event => {
  if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
    const resizeObserverErr = event.error;
    if (resizeObserverErr) {
      event.stopImmediatePropagation();
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);