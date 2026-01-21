import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import tabsReducer from './tabsSlice';
import navigationReducer from './navigationSlice';
import type { RootState } from '../types';

export const createStore = () => {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
      tabs: tabsReducer,
      navigation: navigationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export { useAppDispatch, useAppSelector } from './hooks';
export * from './dashboardSlice';
export * from './tabsSlice';
export * from './navigationSlice';
