import React, { useEffect, useMemo, useState } from 'react';
import { BottomIntersectionElement } from './BottomIntersectionElement';
import { TopIntersectionElement } from './TopIntersectionElement';
import { useCalculatedItems } from './UseCalculatedItems';
import { useInterSectionpParameters } from './UseIntersectionParameters';
import { useItemRender } from './UseItemRender';
import { useItemsIndexes } from './UseItemsIndexes';

export const List = ({ items, onRenderItem, loadMoreCount, renderedItemsCount }) => {
  const [startIndex, endIndex, setNextBoundaries, setPreviousBoundaries] = useItemsIndexes(loadMoreCount, renderedItemsCount, items.length);
  const [renderItem, firstItemElement] = useItemRender(onRenderItem);
  const [setScrollContainer, intersectionParameters] = useInterSectionpParameters()

  const calculatedItems = useCalculatedItems(items, startIndex, endIndex);

  return (
    <div ref={setScrollContainer} id='scrollArea' className='container'>
      <TopIntersectionElement
        startIndex={startIndex}
        firstItemElement={firstItemElement}
        setPreviousBoundaries={setPreviousBoundaries}
        intersectionParameters={intersectionParameters}
      />

      {calculatedItems.map(renderItem)}

      <BottomIntersectionElement
        endIndex={endIndex}
        itemsLength={items.length}
        setNextBoundaries={setNextBoundaries}
        intersectionParameters={intersectionParameters}
      />
    </div>
  );
}