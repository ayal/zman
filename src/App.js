import React from 'react';
import './App.css';
import TimerSet from './TimerSet.js';

import {
  BrowserRouter as Router,
} from "react-router-dom";


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
