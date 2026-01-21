import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationItem, NavigationState } from '../types';

const initialState: NavigationState = {
  items: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Dashboard',
      path: '/dashboard',
    },
    {
      id: 'apps',
      label: 'Applications',
      icon: 'Apps',
      path: '/apps',
      children: [
        {
          id: 'app1',
          label: 'Application 1',
          icon: 'Extension',
          path: '/apps/1',
        },
        {
          id: 'app2',
          label: 'Application 2',
          icon: 'Extension',
          path: '/apps/2',
        },
        {
          id: 'app3',
          label: 'Application 3',
          icon: 'Extension',
          path: '/apps/3',
        },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/settings',
    },
  ],
  selectedItemId: 'dashboard',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationItems: (state, action: PayloadAction<NavigationItem[]>) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const { setNavigationItems, setSelectedItem } = navigationSlice.actions;

export default navigationSlice.reducer;
