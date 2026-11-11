/**
 * Levi's Reading Adventure - Audio and Speech Synthesis Engine (`window.LeviAudio`)
 * Synthesizes cheerful sound effects using Web Audio API and provides narration/word highlighting via Web Speech API.
 */
(function() {
    'use strict';

    class LeviAudioEngine {
        constructor() {
            this.muted = false;
            this.audioCtx = null;
            this.currentUtterance = null;
            this.fallbackTimer = null;
        }

        /**
         * Lazy-initialize and resume AudioContext on user interaction.
         */
        _getAudioContext() {
            if (!this.audioCtx) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                    this.audioCtx = new AudioContextClass();
                }
            }
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume().catch(() => {});
            }
            return this.audioCtx;
        }

        /**
         * Toggle mute state.
         * @returns {boolean} New muted state
         */
        toggleMute() {
            this.muted = !this.muted;
            if (this.muted) {
                this.stopSpeech();
            }
            return this.muted;
        }

        /**
         * Helper to check if sound effects can play.
         */
        _canPlay() {
            if (this.muted) return false;
            const ctx = this._getAudioContext();
            return ctx !== null;
        }

        /**
         * playPickup(): Soft, bubbly upward pop (sine/triangle sweep 300Hz -> 550Hz, 90ms).
         */
        playPickup() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(550, now + 0.09);
                
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.09);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playDrop(): Gentle wooden/cushion thud (160Hz -> 90Hz, 100ms).
         */
        playDrop() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(90, now + 0.1);
                
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.1);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playPop(): Bright cork/lid pop (400Hz -> 850Hz quick pop).
         */
        playPop() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(850, now + 0.06);
                
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.06);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playClink(): Glass jar or key metallic chime (high sine harmonics ~1200Hz & 1800Hz).
         */
        playClink() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                [1200, 1800, 2400].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now);
                    
                    const vol = 0.15 / (i + 1);
                    gain.gain.setValueAtTime(vol, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(now);
                    osc.stop(now + 0.15);
                });
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playMunch(): Playful 3-bite crunch/munch sound (three quick bursts spaced 90ms apart).
         */
        playMunch() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                for (let i = 0; i < 3; i++) {
                    const startTime = now + (i * 0.08);
                    
                    // Triangle base
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(180 + (i * 40), startTime);
                    osc.frequency.linearRampToValueAtTime(120, startTime + 0.06);
                    
                    gain.gain.setValueAtTime(0.25, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(startTime);
                    osc.stop(startTime + 0.06);
                }
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playUnlock(): Mechanical latch click followed by a magical ascending two-note chime.
         */
        playUnlock() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                // Click
                const oscClick = ctx.createOscillator();
                const gainClick = ctx.createGain();
                oscClick.type = 'square';
                oscClick.frequency.setValueAtTime(80, now);
                gainClick.gain.setValueAtTime(0.2, now);
                gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                oscClick.connect(gainClick);
                gainClick.connect(ctx.destination);
                oscClick.start(now);
                oscClick.stop(now + 0.04);
                
                // Chime notes (E5, B5)
                [659.25, 987.77].forEach((freq, idx) => {
                    const noteTime = now + 0.05 + (idx * 0.09);
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, noteTime);
                    
                    gain.gain.setValueAtTime(0.3, noteTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(noteTime);
                    osc.stop(noteTime + 0.25);
                });
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playSplash(): Gentle watering/pouring sound (rippling arpeggio).
         */
        playSplash() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                [400, 550, 480, 620, 700].forEach((freq, i) => {
                    const t = now + (i * 0.035);
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);
                    
                    gain.gain.setValueAtTime(0.15, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(t);
                    osc.stop(t + 0.08);
                });
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playSwitch(): Crisp click + warm hum.
         */
        playSwitch() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
                
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.08);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playStepSuccess(): Cheerful 2-note chime (C5 -> G5).
         */
        playStepSuccess() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                [523.25, 783.99].forEach((freq, idx) => {
                    const t = now + (idx * 0.1);
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);
                    
                    gain.gain.setValueAtTime(0.3, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(t);
                    osc.stop(t + 0.18);
                });
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playError(): Gentle, non-scary comical "boing/wobble" (220Hz -> 150Hz -> 180Hz).
         */
        playError() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(150, now + 0.12);
                osc.frequency.linearRampToValueAtTime(180, now + 0.22);
                
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.22);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playFootstep(): Cute tiny Mario-world map step blip.
         */
        playFootstep() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(350, now);
                osc.frequency.setValueAtTime(450, now + 0.03);
                
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(now);
                osc.stop(now + 0.06);
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * playVictoryFanfare(): 5-note major arpeggio fanfare (C5 - E5 - G5 - C6 - E6).
         */
        playVictoryFanfare() {
            if (!this._canPlay()) return;
            try {
                const ctx = this.audioCtx;
                const now = ctx.currentTime;
                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
                
                notes.forEach((freq, i) => {
                    const t = now + (i * 0.12);
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    
                    osc.type = i === notes.length - 1 ? 'sine' : 'triangle';
                    osc.frequency.setValueAtTime(freq, t);
                    
                    const duration = i === notes.length - 1 ? 0.4 : 0.15;
                    gain.gain.setValueAtTime(0.35, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(t);
                    osc.stop(t + duration);
                });
            } catch (e) {
                console.warn('Audio error:', e);
            }
        }

        /**
         * Select best English voice.
         */
        _getBestVoice() {
            if (!window.speechSynthesis) return null;
            const voices = window.speechSynthesis.getVoices();
            if (!voices || voices.length === 0) return null;

            const preferredNames = ['Samantha', 'Ava', 'Allison', 'Victoria', 'Karen', 'Google US English', 'Moira'];
            
            for (const name of preferredNames) {
                const v = voices.find(voice => voice.name.includes(name));
                if (v) return v;
            }

            // Fallback to any en-US or en-GB voice
            const enVoice = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB' || voice.lang.startsWith('en'));
            return enVoice || voices[0];
        }

        /**
         * speakSentence(text, options = {}): Web Speech narration with word highlighting and robust fallback timer.
         */
        speakSentence(text, options = {}) {
            if (this.muted || !window.speechSynthesis) {
                if (options.onEnd) options.onEnd();
                return;
            }

            this.stopSpeech();

            if (!text || typeof text !== 'string') {
                if (options.onEnd) options.onEnd();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            this.currentUtterance = utterance;

            utterance.rate = options.rate !== undefined ? options.rate : 0.92;
            utterance.pitch = options.pitch !== undefined ? options.pitch : 1.05;

            const bestVoice = this._getBestVoice();
            if (bestVoice) {
                utterance.voice = bestVoice;
            }

            const words = text.split(/\s+/).filter(Boolean);
            let wordFiredCount = 0;
            let hasFiredBoundary = false;

            // Word boundary handler
            utterance.onboundary = (event) => {
                if (event.name === 'word' && typeof options.onWord === 'function') {
                    hasFiredBoundary = true;
                    // Find word index corresponding to event.charIndex
                    let charCount = 0;
                    let targetWordIdx = 0;
                    for (let i = 0; i < words.length; i++) {
                        if (event.charIndex >= charCount) {
                            targetWordIdx = i;
                        }
                        charCount += words[i].length + 1; // +1 for space
                    }
                    if (targetWordIdx >= words.length) targetWordIdx = words.length - 1;
                    
                    options.onWord(targetWordIdx, event.charIndex);
                    wordFiredCount = targetWordIdx + 1;
                }
            };

            let endedCalled = false;
            const handleEnd = () => {
                if (endedCalled) return;
                endedCalled = true;
                if (this.fallbackTimer) {
                    clearInterval(this.fallbackTimer);
                    this.fallbackTimer = null;
                }
                if (this.currentUtterance === utterance) {
                    this.currentUtterance = null;
                }
                if (typeof options.onEnd === 'function') {
                    options.onEnd();
                }
            };

            utterance.onend = handleEnd;
            utterance.onerror = handleEnd;

            // Fallback timer in case onboundary doesn't fire (common on mobile)
            // Estimate duration based on word count and rate (~250ms per word at rate 0.92)
            const estimatedTotalMs = Math.max(1000, words.length * 300 / utterance.rate);
            const intervalMs = estimatedTotalMs / Math.max(1, words.length);

            window.speechSynthesis.speak(utterance);

            // Start fallback timer after a short delay if boundary hasn't fired
            setTimeout(() => {
                if (this.currentUtterance === utterance && !hasFiredBoundary && words.length > 0) {
                    let currentIdx = 0;
                    this.fallbackTimer = setInterval(() => {
                        if (currentIdx < words.length) {
                            if (typeof options.onWord === 'function') {
                                // approximate char index
                                let charIdx = 0;
                                for (let i = 0; i < currentIdx; i++) {
                                    charIdx += words[i].length + 1;
                                }
                                options.onWord(currentIdx, charIdx);
                            }
                            currentIdx++;
                        } else {
                            if (this.fallbackTimer) {
                                clearInterval(this.fallbackTimer);
                                this.fallbackTimer = null;
                            }
                        }
                    }, intervalMs);
                }
            }, 100);

            // Safety timeout to guarantee onEnd is called even if synthesis hangs
            setTimeout(() => {
                if (!endedCalled && window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    handleEnd();
                }
            }, estimatedTotalMs + 2500);
        }

        /**
         * speakWord(word): speaks a single word clearly at rate 0.88.
         */
        speakWord(word) {
            if (this.muted || !window.speechSynthesis || !word) return;
            this.stopSpeech();

            const utterance = new SpeechSynthesisUtterance(word);
            this.currentUtterance = utterance;
            utterance.rate = 0.88;
            utterance.pitch = 1.05;

            const bestVoice = this._getBestVoice();
            if (bestVoice) {
                utterance.voice = bestVoice;
            }

            utterance.onend = () => {
                if (this.currentUtterance === utterance) {
                    this.currentUtterance = null;
                }
            };

            window.speechSynthesis.speak(utterance);
        }

        /**
         * stopSpeech(): Cancels current speech and clears fallback timers.
         */
        stopSpeech() {
            if (this.fallbackTimer) {
                clearInterval(this.fallbackTimer);
                this.fallbackTimer = null;
            }
            if (window.speechSynthesis) {
                try {
                    window.speechSynthesis.cancel();
                } catch (e) {}
            }
            this.currentUtterance = null;
        }
    }

    // Expose global singleton
    window.LeviAudio = new LeviAudioEngine();

    // Ensure voices are loaded for Web Speech API
    if (window.speechSynthesis && typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
})();
