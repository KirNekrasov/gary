import "./index.css";

import { registerSW } from "virtual:pwa-register";

// Register service worker for offline support
registerSW({ immediate: true });

const btn = document.getElementById("btn") as HTMLButtonElement;
const gary = document.getElementById("gary") as HTMLImageElement;
const tapAudio = new Audio("gary.mp3");
const partyAudio = new Audio("song.mp3");
const allSounds = [tapAudio, partyAudio];

for (const sound of allSounds) {
  sound.preload = "auto";
  sound.load();
}

const PARTY_TAP_COUNT = 5;
const PARTY_WINDOW_MS = 2000;
const PARTY_BPM = 160;
const BEATS_PER_BAR = 4;
const PARTY_BAR_DURATION_S = (60 / PARTY_BPM) * BEATS_PER_BAR;

let pressTimestamps: number[] = [];
let isPartyActive = false;

const resetPressWindow = () => {
  pressTimestamps = [];
};

const stopParty = () => {
  partyAudio.pause();
  partyAudio.currentTime = 0;

  isPartyActive = false;
  gary.classList.remove("party-sway");
  gary.style.removeProperty("--party-bar-duration");
  gary.classList.remove("shaking");
  resetPressWindow();
};

const startParty = () => {
  if (isPartyActive) {
    return;
  }

  isPartyActive = true;
  resetPressWindow();

  gary.style.setProperty("--party-bar-duration", `${PARTY_BAR_DURATION_S}s`);
  gary.classList.add("party-sway");

  partyAudio.currentTime = 0;
  partyAudio.play().catch(() => {
    stopParty();
    console.log("Party audio requires user interaction or silent mode is off.");
  });
};

partyAudio.addEventListener("ended", stopParty);

const registerPress = () => {
  const now = Date.now();

  pressTimestamps.push(now);
  pressTimestamps = pressTimestamps.filter(
    (timestamp) => now - timestamp <= PARTY_WINDOW_MS,
  );

  if (pressTimestamps.length >= PARTY_TAP_COUNT) {
    if (isPartyActive) {
      stopParty();
      return;
    }

    startParty();
  }
};

// Handle button press
btn.addEventListener("pointerdown", () => {
  registerPress();

  if (isPartyActive) {
    return;
  }

  tapAudio.currentTime = 0;
  tapAudio.play().catch(() => {
    console.log("Audio requires user interaction or silent mode is off.");
  });

  // Start shaking Gary
  gary.classList.add("shaking");
});

// Stop shaking when released
const stopShaking = () => {
  if (isPartyActive) {
    return;
  }

  gary.classList.remove("shaking");
};

window.addEventListener("pointerup", stopShaking);
window.addEventListener("pointercancel", stopShaking);
