import { useEffect, useState } from 'react';

export const useTopIntersectionObserver = (topBoundary, setPreviousBoundaries, parameters) => {
  const [topObserver, setTopObserver] = useState();

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];

      if (!isIntersecting) return;

      setPreviousBoundaries()
    }, parameters);
    setTopObserver(observer)

    return () => {
      observer.disconnect()
    }
  }, [setTopObserver, setPreviousBoundaries, parameters])

  useEffect(() => {
    if (!topBoundary || !topObserver) return;

    topObserver.observe(topBoundary)

    return () => {
      topObserver.unobserve(topBoundary)
    }
  }, [topBoundary, topObserver])
}