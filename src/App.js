import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { List } from './list/List';

const generateItems = () => {
  let result = [];

  for (let i = 0; i < 33300; i++) {
    result[i] = i + 1
  }

  return result
}



function App() {
  const [selected, setSelected] = useState();
  const prevStyle = useRef()

  const onClick = useCallback((ev) => {
    if (selected) {
      selected.style.opacity = prevStyle.current.opacity;
      selected.style.backgroundColor = prevStyle.current.backgroundColor
    }

    ev.target.style.transition = 'all 0.5s ease-out';

    setSelected(ev.target);
    prevStyle.current = { opacity: ev.target.style.opacity, backgroundColor: ev.target.style.backgroundColor };
    ev.target.style.opacity = 0.7;
    ev.target.style.backgroundColor = 'pink'
  }, [selected])


  const renderItem = useCallback((x) => {
    if (x % 2 === 0) {
      return <div key={`${x}-even`} className='even' onClick={onClick}>{x}</div>
    }

    return <div className='odd' key={`${x}-odd`} onClick={onClick}>{x} - oddd</div>
  }, [onClick])

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
        loadMoreCount={50}
        onRenderItem={renderItem}
        renderedItemsCount={70}
      />
    </div>
  );
}

export default App;
