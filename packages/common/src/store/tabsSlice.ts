import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabItem, TabsState } from '../types';

const initialState: TabsState = {
  tabs: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      type: 'dashboard',
      isDashboard: true,
    },
  ],
  activeTabId: 'dashboard',
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<TabItem>) => {
      const existingTab = state.tabs.find((tab) => tab.id === action.payload.id);
      if (!existingTab) {
        state.tabs.push(action.payload);
      }
      state.activeTabId = action.payload.id;
    },
    removeTab: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      if (state.activeTabId === action.payload) {
        state.activeTabId = state.tabs[state.tabs.length - 1]?.id || 'dashboard';
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    clearTabs: (state) => {
      state.tabs = [
        {
          id: 'dashboard',
          label: 'Dashboard',
          type: 'dashboard',
          isDashboard: true,
        },
      ];
      state.activeTabId = 'dashboard';
    },
  },
});

export const { addTab, removeTab, setActiveTab, clearTabs } = tabsSlice.actions;

export default tabsSlice.reducer;
