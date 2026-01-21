import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCards, setLoading, setError, setSelectedCard } from '../store/dashboardSlice';
import type { Card } from '../types';

export const useCardManager = () => {
  const dispatch = useAppDispatch();
  const { cards, isLoading, error, selectedCard } = useAppSelector((state) => state.dashboard);

  const updateCards = useCallback(
    (newCards: Card[]) => {
      dispatch(setCards(newCards));
    },
    [dispatch]
  );

  const setCardLoading = useCallback(
    (loading: boolean) => {
      dispatch(setLoading(loading));
    },
    [dispatch]
  );

  const setCardError = useCallback(
    (err: string | null) => {
      dispatch(setError(err));
    },
    [dispatch]
  );

  const selectCard = useCallback(
    (card: Card | null) => {
      dispatch(setSelectedCard(card));
    },
    [dispatch]
  );

  return {
    cards,
    isLoading,
    error,
    selectedCard,
    updateCards,
    setCardLoading,
    setCardError,
    selectCard,
  };
};
