import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppLayout from './App';
import { createStore } from '@monorepo/common';
import './main.css';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root') || document.body).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </React.StrictMode>
);
