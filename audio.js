// Synthesized Mechanical Keyboard Audio Engine
// Uses Web Audio API to procedurally generate keypress/click sounds.

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Muted by default to respect browser autoplay policies
    this.volume = 0.35;
  }

  // Initialize the Audio Context after a user interaction
  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted && this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.isMuted;
  }

  setMute(state) {
    this.isMuted = state;
    if (!this.isMuted && this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Generates a simulated mechanical switch tick/click (tactile blue/brown switch)
  playClick(pitchFactor = 1.0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    
    // Resume context if suspended (browser behavior)
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // --- Node 1: High-frequency transient "click" ---
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    
    clickOsc.type = "sine";
    // Pitch slide from high to medium
    clickOsc.frequency.setValueAtTime(2800 * pitchFactor, now);
    clickOsc.frequency.exponentialRampToValueAtTime(1000 * pitchFactor, now + 0.008);
    
    clickGain.gain.setValueAtTime(0.08 * this.volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
    
    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);

    // --- Node 2: Low-frequency "thud/bottom-out" ---
    const thudOsc = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    
    thudOsc.type = "triangle";
    // Pitch slide for low frequencies
    thudOsc.frequency.setValueAtTime(180 * pitchFactor, now);
    thudOsc.frequency.exponentialRampToValueAtTime(75 * pitchFactor, now + 0.025);
    
    thudGain.gain.setValueAtTime(0.18 * this.volume, now);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);
    
    thudOsc.connect(thudGain);
    thudGain.connect(this.ctx.destination);

    // --- Node 3: White noise transient for tactile crispness ---
    const bufferSize = this.ctx.sampleRate * 0.01; // 10ms burst
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 3500 * pitchFactor;
    noiseFilter.Q.value = 3.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05 * this.volume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    // Start nodes
    clickOsc.start(now);
    clickOsc.stop(now + 0.01);
    
    thudOsc.start(now);
    thudOsc.stop(now + 0.03);

    noiseSource.start(now);
    noiseSource.stop(now + 0.01);
  }

  // Soft keypress tick (for keyboard typing animations)
  playType(pitchFactor = 1.0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1500 * pitchFactor, now);
    osc.frequency.exponentialRampToValueAtTime(500 * pitchFactor, now + 0.006);

    gain.gain.setValueAtTime(0.05 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.007);
  }

  // Soft menu navigation tic sound
  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(3200, now);
    
    gain.gain.setValueAtTime(0.012 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.004);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.005);
  }
}

// Export a single global audio instance
window.PortfolioAudio = new AudioEngine();
