export { useAppDispatch, useAppSelector } from '../store/hooks';
export { useCardManager } from './useCardManager';
export { useTabManager } from './useTabManager';

import React from 'react';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
