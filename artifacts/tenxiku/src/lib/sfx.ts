type Ctx = AudioContext & { _ambient?: { stop: () => void } | null };

let ctx: Ctx | null = null;
let masterGain: GainNode | null = null;
let muted = false;
let unlocked = false;

function getCtx(): Ctx | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    if (!AC) return null;
    ctx = new AC() as Ctx;
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

export function isMuted() {
  return muted;
}
export function setMuted(v: boolean) {
  muted = v;
  if (masterGain) masterGain.gain.value = v ? 0 : 0.5;
  if (v) stopAmbient();
}

export function unlockAudio() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  unlocked = true;
}

function tone(opts: {
  freq: number;
  dur: number;
  type?: OscillatorType;
  vol?: number;
  attack?: number;
  release?: number;
  slideTo?: number;
}) {
  if (muted) return;
  const c = getCtx();
  if (!c || !masterGain) return;
  if (c.state === "suspended" && unlocked) c.resume();

  const { freq, dur, type = "sine", vol = 0.25, attack = 0.005, release = 0.08, slideTo } = opts;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);

  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur + release);

  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + dur + release + 0.05);
}

function noise(dur: number, vol = 0.15, filterFreq = 1200) {
  if (muted) return;
  const c = getCtx();
  if (!c || !masterGain) return;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = filterFreq;
  const g = c.createGain();
  g.gain.value = vol;
  src.connect(filter);
  filter.connect(g);
  g.connect(masterGain);
  src.start();
}

export const sfx = {
  click() {
    tone({ freq: 880, dur: 0.04, type: "triangle", vol: 0.18, slideTo: 660 });
  },
  hover() {
    tone({ freq: 1320, dur: 0.03, type: "sine", vol: 0.07 });
  },
  reveal() {
    tone({ freq: 520, dur: 0.12, type: "sine", vol: 0.08, slideTo: 780 });
  },
  boom() {
    tone({ freq: 90, dur: 0.6, type: "sawtooth", vol: 0.35, slideTo: 40, release: 0.4 });
    noise(0.5, 0.18, 600);
    setTimeout(() => tone({ freq: 220, dur: 0.4, type: "sine", vol: 0.18, slideTo: 110 }), 80);
  },
  whoosh() {
    noise(0.45, 0.12, 2400);
  },
  chime() {
    [660, 880, 1320].forEach((f, i) =>
      setTimeout(() => tone({ freq: f, dur: 0.18, type: "sine", vol: 0.12 }), i * 90),
    );
  },
};

export function startAmbient() {
  const c = getCtx();
  if (!c || !masterGain || muted) return;
  stopAmbient();
  if (c.state === "suspended" && unlocked) c.resume();

  const o1 = c.createOscillator();
  const o2 = c.createOscillator();
  const o3 = c.createOscillator();
  o1.type = "sine"; o1.frequency.value = 110;
  o2.type = "sine"; o2.frequency.value = 165;
  o3.type = "triangle"; o3.frequency.value = 55;

  const g = c.createGain();
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.05, c.currentTime + 2.5);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 700;

  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 80;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  o1.connect(filter); o2.connect(filter); o3.connect(filter);
  filter.connect(g);
  g.connect(masterGain);

  o1.start(); o2.start(); o3.start(); lfo.start();

  ctx!._ambient = {
    stop: () => {
      try {
        g.gain.cancelScheduledValues(c.currentTime);
        g.gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
        setTimeout(() => {
          [o1, o2, o3, lfo].forEach((n) => { try { n.stop(); } catch { /* ignore */ } });
        }, 600);
      } catch { /* ignore */ }
    },
  };
}

export function stopAmbient() {
  if (ctx?._ambient) {
    ctx._ambient.stop();
    ctx._ambient = null;
  }
}
