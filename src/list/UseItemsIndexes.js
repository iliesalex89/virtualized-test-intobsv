import { useCallback, useEffect, useState } from 'react';

export const useItemsIndexes = (loadMoreCount, renderedItemsCount, itemsLength) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    setEndIndex(renderedItemsCount)
  }, [renderedItemsCount])

  const setNextBoundaries = useCallback(() => {
    setStartIndex(prev => prev + loadMoreCount);
    setEndIndex(prev => {
      const end = prev + loadMoreCount;

      return end > itemsLength ? itemsLength : end
    })
  }, [loadMoreCount, setStartIndex, setEndIndex, itemsLength])


  const setPreviousBoundaries = useCallback(() => {
    setStartIndex(prev => {
      const start = prev - loadMoreCount

      return start < 0 ? 0 : start
    });
    setEndIndex(prev => prev - loadMoreCount)
  }, [loadMoreCount, setStartIndex, setEndIndex])

  return [startIndex, endIndex, setNextBoundaries, setPreviousBoundaries]
}