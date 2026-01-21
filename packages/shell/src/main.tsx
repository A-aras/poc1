import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from '@monorepo/common';
import AppLayout from './App';
import './main.css';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </React.StrictMode>
);
