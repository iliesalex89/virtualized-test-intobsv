import { useEffect, useState } from 'react';

export const useBottomIntersectionObserver = (bottomBoundary, setNextBoundaries, parameters) => {
  const [bottomObserver, setBottomObserver] = useState()

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];

      if (!isIntersecting) return;

      setNextBoundaries()
    }, parameters);
    setBottomObserver(observer);
    return () => {
      observer.disconnect()
    }
  }, [setBottomObserver, setNextBoundaries, parameters])

  useEffect(() => {
    if (!bottomBoundary || !bottomObserver) return;

    bottomObserver.observe(bottomBoundary)

    return () => {
      bottomObserver.unobserve(bottomBoundary)
    }
  }, [bottomBoundary, bottomObserver])
}