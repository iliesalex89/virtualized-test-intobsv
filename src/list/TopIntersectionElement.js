import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTopIntersectionObserver } from './UseTopIntersectionObserver';

export const TopIntersectionElement = ({ startIndex, setPreviousBoundaries, intersectionParameters, firstItemElement }) => {
  const [topBoundary, setTopBoundary] = useState();

  const isFirstSetOfItems = useMemo(() => startIndex === 0, [startIndex]);

  const prevFirstItem = useRef();

  useEffect(() => {
    prevFirstItem.current = firstItemElement;
  });

  useLayoutEffect(() => {
    if (!prevFirstItem.current) return;

    prevFirstItem.current.scrollIntoView()
  }, [startIndex, prevFirstItem])

  useTopIntersectionObserver(topBoundary, setPreviousBoundaries, intersectionParameters)

  return !isFirstSetOfItems && <div id='top-more' style={{ height: '2px' }} ref={setTopBoundary} />
}