import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimerSet from './TimerSet.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
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
