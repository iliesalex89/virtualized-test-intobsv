import { cloneElement, useCallback, useState } from 'react';

export const useItemRender = (onRenderItem) => {
  const [firstItem, setFirstItem] = useState();

  const renderItem = useCallback((item, index) => {
    const elementref = index === 0 ? setFirstItem : undefined;

    const element = onRenderItem(item, index);

    return cloneElement(element, { ref: elementref })
  }, [setFirstItem, onRenderItem])

  return [renderItem, firstItem]
}