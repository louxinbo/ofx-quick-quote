import { useState, useCallback } from 'react';

export const useToggle = (initial: boolean) => {
  const [boolValue, setBoolValue] = useState(initial);
  const toggle = useCallback(() => setBoolValue((x) => !x), []);

  return [boolValue, toggle] as const;
};
