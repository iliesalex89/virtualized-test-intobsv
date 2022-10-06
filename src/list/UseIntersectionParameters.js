import { useEffect, useState } from 'react';

export const useInterSectionpParameters = () => {
  const [scrollContainer, setScrollContainer] = useState()
  const [parameters, setParameters] = useState({});

  useEffect(() => {
    setParameters({
      root: scrollContainer,
      rootMargin: '0px',
      threshold: 1
    })
  }, [scrollContainer])

  return [setScrollContainer, parameters]
}