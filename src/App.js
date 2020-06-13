import React from 'react';
import './App.css';
import TimerSet from './TimerSet.js';
import * as NoSleep from 'nosleep.js';

import {
  BrowserRouter as Router,
} from "react-router-dom";

var noSleep = new NoSleep();
document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  console.log('enabling no sleep');
  noSleep.enable();
}, false);


function App() {  
  return (
    <Router>
      <div className="App">
	<TimerSet />
      </div>
    </Router>
  );
}

export default App;
