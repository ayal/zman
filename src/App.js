import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimerSet from './TimerSet.js';

function App() {
  return (
    <div className="App">
      <TimerSet timeset={'1,ready?,5 2,work/rest,5/3 2,work/rest,6/4'} />
    </div>
  );
}

export default App;
