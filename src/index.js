//import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';


import NoSleep from 'nosleep.js';
window.noSleep = null;
document.addEventListener('click',  () => {
  if (window.nosleep) window.nosleep.disable(); // Just to be sure if you forgot to disable.
  window.nosleep = new NoSleep();
  alert('nosleep')
  window.nosleep.enable();
}, false);


//import App from './App';

//import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
