import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, DashboardState } from '../types';

const initialState: DashboardState = {
  cards: [],
  isLoading: false,
  error: null,
  selectedCard: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;
    },
    clearDashboard: (state) => {
      state.cards = [];
      state.selectedCard = null;
      state.error = null;
    },
  },
});

export const {
  setCards,
  setLoading,
  setError,
  setSelectedCard,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
