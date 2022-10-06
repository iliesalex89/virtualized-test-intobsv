import { useEffect, useMemo, useState } from 'react';

export const useCalculatedItems = (defaultItems, startIndex, endIndex) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(defaultItems)
  }, [defaultItems])

  return useMemo(() => items.slice(startIndex, endIndex), [startIndex, endIndex, items]);
}