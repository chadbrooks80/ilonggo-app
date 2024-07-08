// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import
import './index.css';
import App from './App';

import store from './redux/store'
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
