"use client";

import { useEffect, useRef, useCallback } from "react";

function generateImpulseResponse(ctx: AudioContext): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 2.5; // 2.5 seconds
  const buffer = ctx.createBuffer(2, length, sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // Exponentially decaying white noise
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
    }
  }

  return buffer;
}

export default function SoundEngine({
  enabled,
  cursorX,
  cursorY,
}: {
  enabled: boolean;
  cursorX: number;
  cursorY: number;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const padOscRef = useRef<OscillatorNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const reverbRef = useRef<ConvolverNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const lastActivityRef = useRef(0);

  const init = useCallback(() => {
    if (ctxRef.current) return;

    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Reverb
      const reverb = ctx.createConvolver();
      reverb.buffer = generateImpulseResponse(ctx);
      reverb.connect(masterGain);
      reverbRef.current = reverb;

      // Dry path
      const dryGain = ctx.createGain();
      dryGain.gain.value = 0.3;
      dryGain.connect(masterGain);
      dryGainRef.current = dryGain;

      // Wet path gain
      const wetGain = ctx.createGain();
      wetGain.gain.value = 0.7;
      wetGain.connect(reverb);

      // Ambient pad: two detuned oscillators
      const pad1 = ctx.createOscillator();
      pad1.type = "sine";
      pad1.frequency.value = 55; // A1
      pad1.detune.value = -5;

      const pad2 = ctx.createOscillator();
      pad2.type = "sine";
      pad2.frequency.value = 82.5; // E2
      pad2.detune.value = 5;

      const padGain = ctx.createGain();
      padGain.gain.value = 0.15;
      pad1.connect(padGain);
      pad2.connect(padGain);
      padGain.connect(wetGain);
      padGain.connect(dryGain);
      padGainRef.current = padGain;

      pad1.start();
      pad2.start();
      padOscRef.current = pad1;

      // Fade in master
      masterGain.gain.setTargetAtTime(0.4, ctx.currentTime, 1.0);
    } catch {
      // AudioContext creation failed, feature disabled
    }
  }, []);

  // Initialize on enable
  useEffect(() => {
    if (enabled) {
      lastActivityRef.current = Date.now();
      init();
    }
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
        padOscRef.current = null;
        padGainRef.current = null;
        reverbRef.current = null;
        dryGainRef.current = null;
        masterGainRef.current = null;
      }
    };
  }, [enabled, init]);

  // Cursor modulation
  useEffect(() => {
    if (!enabled || !padOscRef.current || !ctxRef.current) return;

    lastActivityRef.current = Date.now();

    // Modulate pad frequency slightly based on cursor position
    const baseFreq = 55;
    const modulation = (cursorX * 0.5 + cursorY * 0.3) * 5;
    padOscRef.current.frequency.setTargetAtTime(
      baseFreq + modulation,
      ctxRef.current.currentTime,
      0.3
    );
  }, [enabled, cursorX, cursorY]);

  // Idle detection: fade to silence after 10s, restore on activity
  useEffect(() => {
    if (!enabled || !masterGainRef.current || !ctxRef.current) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - lastActivityRef.current) / 1000;
      if (elapsed > 10 && masterGainRef.current && ctxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.05, ctxRef.current.currentTime, 2.0);
      } else if (masterGainRef.current && ctxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.4, ctxRef.current.currentTime, 0.5);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled]);

  return null;
}
