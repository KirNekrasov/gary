import { registerSW } from "virtual:pwa-register";

// Register service worker for offline support
registerSW({ immediate: true });

const btn = document.getElementById("btn") as HTMLButtonElement;
const gary = document.getElementById("gary") as HTMLImageElement;
const audio = new Audio("/gary.mp3");

// Handle button press
btn.addEventListener("pointerdown", () => {
  // Play sound
  audio.currentTime = 0;
  audio.play().catch(() => {
    console.log("Audio requires user interaction or silent mode is off.");
  });

  // Start shaking Gary
  gary.classList.add("shaking");
});

// Stop shaking when released
const stopShaking = () => gary.classList.remove("shaking");

window.addEventListener("pointerup", stopShaking);
window.addEventListener("pointercancel", stopShaking);
