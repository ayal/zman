import * as NoSleep from 'nosleep.js';
var noSleep = new NoSleep();
document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  console.log('enabling no sleep');
  noSleep.enable();
}, false);
