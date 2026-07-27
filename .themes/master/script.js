const slides = [...document.querySelectorAll(".product-slide")];
const pages = [...document.querySelectorAll(".slider-pages button")];
const counter = document.querySelector(".slider-counter strong");
const slider = document.querySelector(".product-slider");
let activeSlide = 0;
let autoplay;
let touchStart = 0;

function showSlide(index, userInitiated = false) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === activeSlide));
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === activeSlide);
    page.setAttribute("aria-current", i === activeSlide ? "true" : "false");
  });
  counter.textContent = `0${activeSlide + 1}`;
  if (userInitiated) playTone("signal");
  restartAutoplay();
}
function restartAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => showSlide(activeSlide + 1), 7000);
}
document.querySelector(".slider-next").addEventListener("click", () => showSlide(activeSlide + 1, true));
document.querySelector(".slider-prev").addEventListener("click", () => showSlide(activeSlide - 1, true));
pages.forEach(page => page.addEventListener("click", () => showSlide(Number(page.dataset.go), true)));
slider.addEventListener("pointerenter", () => clearInterval(autoplay));
slider.addEventListener("pointerleave", restartAutoplay);
slider.addEventListener("touchstart", e => { touchStart = e.touches[0].clientX; }, {passive:true});
slider.addEventListener("touchend", e => {
  const distance = e.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 45) showSlide(activeSlide + (distance < 0 ? 1 : -1), true);
}, {passive:true});
addEventListener("keydown", e => {
  if (e.key === "ArrowRight") showSlide(activeSlide + 1, true);
  if (e.key === "ArrowLeft") showSlide(activeSlide - 1, true);
});

document.querySelector(".product-hero").addEventListener("pointermove", e => {
  const board = slides[activeSlide].querySelector(".teachmint-board,.vision-dashboard");
  if (!board) return;
  const nx = e.clientX / innerWidth - .5;
  const ny = e.clientY / innerHeight - .5;
  board.style.transform = `rotateY(${8 + nx * 5}deg) rotateX(${ny * -3}deg) translateY(9%)`;
});

const themeToggle = document.querySelector(".theme-toggle");
function syncThemeControl() {
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-pressed", isLight);
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  themeToggle.querySelector(".theme-label").textContent = isLight ? "Dark" : "Light";
  themeToggle.querySelector(".theme-icon").textContent = isLight ? "◐" : "☼";
}
syncThemeControl();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  syncThemeControl();
});

document.querySelectorAll(".solution-cards article").forEach(card => {
  card.addEventListener("pointermove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${((e.clientX - rect.left) / rect.width - .5) * 5}deg`);
    card.style.setProperty("--card-y", `${((e.clientY - rect.top) / rect.height - .5) * -5}deg`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--card-x"); card.style.removeProperty("--card-y");
  });
});

document.addEventListener("pointerdown", e => {
  if (!e.target.closest("a,button,.solution-cards article")) return;
  const ripple = document.createElement("span");
  ripple.className = "click-ripple";
  ripple.style.left = `${e.clientX}px`; ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});

let audioContext;
let soundOn = true;
const soundToggle = document.querySelector(".sound-toggle");
function unlockSound(e) {
  if (e.target.closest(".sound-toggle")) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.resume();
  document.removeEventListener("pointerdown", unlockSound, true);
}
document.addEventListener("pointerdown", unlockSound, true);
function playTone(type = "pebble") {
  if (!soundOn || !audioContext) return;
  const now=audioContext.currentTime,osc=audioContext.createOscillator(),gain=audioContext.createGain();
  const tones={pebble:[230,105,.1],signal:[210,560,.18],breeze:[520,690,.08]};
  const [start,end,duration]=tones[type]||tones.pebble;
  osc.type=type==="pebble"?"triangle":"sine";osc.frequency.setValueAtTime(start,now);osc.frequency.exponentialRampToValueAtTime(end,now+duration);
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.03,now+.01);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain).connect(audioContext.destination);osc.start();osc.stop(now+duration+.02);
}
soundToggle.addEventListener("click", () => {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  soundOn = !soundOn;
  soundToggle.setAttribute("aria-pressed", soundOn);
  soundToggle.querySelector(".sound-label").textContent = soundOn ? "Sound on" : "Sound off";
  if (soundOn) playTone("signal");
});
document.querySelectorAll(".sound-target").forEach(el => {
  el.addEventListener("pointerenter", () => playTone("breeze"));
  if (el !== soundToggle) el.addEventListener("click", () => playTone("pebble"));
});

showSlide(0);
