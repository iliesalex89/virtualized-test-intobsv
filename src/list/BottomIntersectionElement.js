import React, { useMemo, useState } from 'react';
import { useBottomIntersectionObserver } from './UseBottomIntersectionObserver';

export const BottomIntersectionElement = ({ endIndex, itemsLength, setNextBoundaries, intersectionParameters }) => {
  const [bottomBoundary, setBottomBoundary] = useState();

  const islastSetOfItems = useMemo(() => endIndex === itemsLength - 1, [endIndex, itemsLength]);

  useBottomIntersectionObserver(bottomBoundary, setNextBoundaries, intersectionParameters)

  return !islastSetOfItems && <div id='top-more' style={{ height: '2px' }} ref={setBottomBoundary} />
}