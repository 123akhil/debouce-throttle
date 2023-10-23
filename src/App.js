import "./styles.css";
import { useState, useRef } from "react";

function debounce(cb, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.call(this, ...args);
    }, wait);
  };
}

function throttle(func, wait = 0) {
  const throttleRef = useRef(false);
  return function (...args) {
    if (throttleRef.current) {
      return;
    }
    throttleRef.current = true;
    setTimeout(function () {
      throttleRef.current = false;
    }, wait);
    func.call(this, ...args);
  };
}

export default function App() {
  const [counter, setCounter] = useState(0);
  const [countDebbounce, setCountDebbounce] = useState(0);
  const [countThrottle, setCountThrottle] = useState(0);

  const throttleIncrement = throttle(
    () => setCountThrottle(countThrottle + 1),
    2000
  );

  const handleDebounce = debounce(
    () => setCountDebbounce(countDebbounce + 1),
    1000
  );
  const handleThrottle = () => {
    throttleIncrement();
  };
  const handleClick = () => {
    setCounter(counter + 1);
  };
  return (
    <div className="App">
      <div>
        <button onClick={handleClick}>Counter</button>
        <p>Counter:{counter} </p>
      </div>
      <div>
        <button onClick={handleDebounce}>Debounce</button>
        <p>Debounce Counter:{countDebbounce} </p>
      </div>
      <div>
        <button onClick={handleThrottle}>Throttle</button>
        <p>Throttle Counter:-{countThrottle} </p>
      </div>
    </div>
  );
}
