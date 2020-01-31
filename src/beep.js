var FREQUENCY = 440
var INTERVAL = 250
var RAMP_VALUE = 0.0001
var RAMP_DURATION = 1

window.AudioContext = window.AudioContext || window.webkitAudioContext
window.audiocontext = window.audiocontext || new window.AudioContext()

export default function (options) {
  let audiocontext = window.audiocontext;
  if (!options) options = {}
  console.warn('AUDIO', audiocontext.state);
  var frequency = options.frequency || FREQUENCY
  var interval = options.interval || INTERVAL
  var duration = options.duration || RAMP_DURATION;

  var play = function () {
    console.warn('AUDIO play', audiocontext.state);
    var currentTime = audiocontext.currentTime
    var osc = audiocontext.createOscillator()
    var gain = audiocontext.createGain()

    osc.connect(gain)
    gain.connect(audiocontext.destination)

    gain.gain.setValueAtTime(gain.gain.value, currentTime)
    gain.gain.exponentialRampToValueAtTime(RAMP_VALUE, currentTime + duration)

    osc.onended = function () {
      gain.disconnect(audiocontext.destination)
      osc.disconnect(gain)
    }

    osc.type = 'sine'
    osc.frequency.value = frequency
    osc.start(currentTime)
    osc.stop(currentTime + duration)
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
