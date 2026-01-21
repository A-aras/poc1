import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTab, removeTab, setActiveTab, clearTabs } from '../store/tabsSlice';
import type { TabItem } from '../types';

export const useTabManager = () => {
  const dispatch = useAppDispatch();
  const { tabs, activeTabId } = useAppSelector((state) => state.tabs);

  const openTab = useCallback(
    (tab: TabItem) => {
      dispatch(addTab(tab));
    },
    [dispatch]
  );

  const closeTab = useCallback(
    (tabId: string) => {
      dispatch(removeTab(tabId));
    },
    [dispatch]
  );

  const switchTab = useCallback(
    (tabId: string) => {
      dispatch(setActiveTab(tabId));
    },
    [dispatch]
  );

  const resetTabs = useCallback(() => {
    dispatch(clearTabs());
  }, [dispatch]);

  return {
    tabs,
    activeTabId,
    openTab,
    closeTab,
    switchTab,
    resetTabs,
  };
};
