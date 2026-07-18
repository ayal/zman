import { useCallback, useRef } from "react";

const BEEP_DURATION = 0.2;
const BEEP_INTERVAL_MS = 250;

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
  }
  return audioContext;
}

function playTone() {
  const ctx = getAudioContext();
  if (!gainNode) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(gainNode);

  gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + BEEP_DURATION);

  osc.start(0);
  osc.stop(ctx.currentTime + BEEP_DURATION);

  osc.onended = () => {
    gain.disconnect(gainNode!);
    osc.disconnect(gain);
  };
}

function beep(times: number) {
  let count = 0;
  const loop = () => {
    playTone();
    count++;
    if (count < times) {
      setTimeout(loop, BEEP_INTERVAL_MS);
    }
  };
  loop();
}

export function useAudio() {
  const resumedRef = useRef(false);

  const ensureResumed = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    resumedRef.current = true;
  }, []);

  const playBeep = useCallback((times: number = 1) => {
    beep(times);
  }, []);

  return { ensureResumed, playBeep };
}
