import logo from './logo.svg';
import './App.css';
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { List } from './list/List';

const generateItems = () => {
  let result = [];

  for (let i = 0; i < 33300; i++) {
    result[i] = i + 1
  }

  return result
}

const items = generateItems();


function App() {
  const [items, setItems] = useState(generateItems());
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(100);
  const [topBoundary, setTopBoundary] = useState();
  const [bottomBoundary, setBottomBoundary] = useState();
  const [options, setOptions] = useState({ root: null });
  const [bottomObserver, setBottomObserver] = useState()
  const [topObserver, setTopObserver] = useState();
  const [firstItem, setFirstItem] = useState();
  const scrollCallback = useRef(() => { });

  const [selected]

  const onClick = useCallback(() => {

  }, [])

  const renderItem = useCallback((x) => {
    if (x % 2 === 0) {
      return <div key={`${x}-even`} className='even' onClick={onClick}>{x}</div>
    }

    return <div className='odd' key={`${x}-odd`}>{x} - oddd</div>
  }, [setFirstItem])

  useEffect(() => {
    setOptions({
      root: document.getElementById('scrollArea'),
      rootMargin: '0px',
      threshold: 1
    })
  }, [])

  useEffect(() => {
    let observer = new IntersectionObserver((entries, observer) => {
      console.log('loadBottom', entries, observer)
      const { isIntersecting, intersectionRatio } = entries[0];

      if (!isIntersecting) return;

      setStartIndex(prev => prev + 70);
      setEndIndex(prev => {
        const end = prev + 70;

        return end > items.length ? items.length : end
      })
    }, options);
    setBottomObserver(observer);
    return () => {
      console.log('loadBottom disconnetc')

      observer.disconnect()
    }
  }, [setBottomObserver, setStartIndex, setEndIndex, items])

  useEffect(() => {
    if (!bottomBoundary || !bottomObserver) return;
    console.log(bottomBoundary)

    bottomObserver.observe(bottomBoundary)

    return () => {
      bottomObserver.unobserve(bottomBoundary)
    }
  }, [bottomBoundary, bottomObserver])

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      console.log('loadTop')
      const { isIntersecting, intersectionRatio } = entries[0];

      if (!isIntersecting) return;

      scrollCallback.current = () => firstItem.scrollIntoView()
      setStartIndex(prev => {
        const start = prev - 70

        return start < 0 ? 0 : start
      });
      setEndIndex(prev => prev - 70)
    }, options);
    setTopObserver(observer)

    return () => {
      console.log('loadTop disconnetc')

      observer.disconnect()
    }
  }, [setTopObserver, setEndIndex, setStartIndex, firstItem])

  useEffect(() => {
    if (!topBoundary || !topObserver) return;
    console.log(topBoundary)

    topObserver.observe(topBoundary)

    return () => {
      topObserver.unobserve(topBoundary)
    }
  }, [topBoundary, topObserver])

  const calculatedItems = useMemo(() => items.slice(startIndex, endIndex), [startIndex, endIndex]);

  useLayoutEffect(() => {
    scrollCallback.current()
    scrollCallback.current = () => { }
  }, [calculatedItems])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <List
        items={generateItems()}
        loadMoreCount={70}
        onRenderItem={renderItem}
        renderedItemsCount={100}
      />
      {/* <div id='scrollArea' className='container'>
        {startIndex > 0 && <div id='top-more' style={{ height: '21px' }} ref={setTopBoundary} />}

        {calculatedItems.map(renderItem)}

        {endIndex < items.length - 1 && <div id='bottom-more' style={{ height: '20px' }} ref={setBottomBoundary} />}
      </div> */}
    </div>
  );
}

export default App;
