var INTERVAL = 250
var RAMP_DURATION = 1

window.AudioContext = window.AudioContext || window.webkitAudioContext
window.audiocontext = window.audiocontext || new window.AudioContext()
let audiocontext = window.audiocontext;
var fgain = audiocontext.createGain()
fgain.connect(audiocontext.destination)

export default function (options) {

  if (!options) options = {}
  console.warn('AUDIO', audiocontext.state);
  var interval = options.interval || INTERVAL
  var duration = options.duration || RAMP_DURATION;

  var play = function () {
    console.warn('AUDIO play', audiocontext.state);
    var currentTime = audiocontext.currentTime
    var osc = audiocontext.createOscillator()
    var gain = audiocontext.createGain()
    osc.connect(gain)
    gain.connect(fgain);

    gain.gain.setValueAtTime(gain.gain.value, audiocontext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audiocontext.currentTime + duration);

    osc.start(0);
    osc.stop(currentTime + duration);

    
    osc.onended = function () {
      gain.disconnect(fgain);
      osc.disconnect(gain);
    }
  }

  var beep = function (times) {
    if (!times) times = 1

    ;(function loop (i) {
      play()
      if (++i < times) setTimeout(loop, interval, i)
    })(0)
  }

  beep.destroy = function () {
    if (!options.context) audiocontext.close()
  }

  return beep
}
