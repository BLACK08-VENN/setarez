const rooms = {
  classroom: {
    number: "01", title: "Classroom",
    description: "A learning space where every wall can teach. Bring remote and in-room students into one shared, responsive environment.",
    features: ["Intelligent content sharing", "Hybrid learner presence", "One-touch room control"]
  },
  boardroom: {
    number: "02", title: "Boardroom",
    description: "Decisions move faster when the room gets out of the way. Crystal-clear presence, intuitive control and ideas visible everywhere.",
    features: ["Executive-grade collaboration", "Spatial audio", "Secure wireless presentation"]
  },
  office: {
    number: "03", title: "Executive office",
    description: "A private command space designed for focused conversations, confident leadership and effortless global connection.",
    features: ["Personal telepresence", "Discreet integrated technology", "Precision lighting and sound"]
  },
  auditorium: {
    number: "04", title: "Auditorium",
    description: "Turn a large audience into an active participant. Broadcast, present and perform with every seat connected to the moment.",
    features: ["Cinematic sound and display", "Live production workflow", "Audience-wide engagement"]
  }
};

const panel = document.querySelector(".room-panel");
const backdrop = document.querySelector(".panel-backdrop");
const closeButton = document.querySelector(".panel-close");
let lastFocused;

function openRoom(key) {
  const room = rooms[key];
  lastFocused = document.activeElement;
  panel.querySelector(".panel-number").textContent = room.number;
  panel.querySelector("#room-title").textContent = room.title;
  panel.querySelector(".panel-description").textContent = room.description;
  panel.querySelector(".panel-features").innerHTML = room.features.map(item => `<li>${item}</li>`).join("");
  panel.hidden = false;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
  playTone("open");
}
function closeRoom() {
  panel.hidden = true;
  backdrop.hidden = true;
  document.body.style.overflow = "";
  playTone("close");
  lastFocused?.focus();
}
document.querySelectorAll(".orb").forEach(orb => orb.addEventListener("click", () => openRoom(orb.dataset.room)));
closeButton.addEventListener("click", closeRoom);
backdrop.addEventListener("click", closeRoom);
addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closeRoom(); });

const world = document.querySelector(".village-world");
const village = document.querySelector(".village");
village.addEventListener("pointermove", e => {
  const x = (e.clientX / innerWidth - .5) * -10;
  const y = (e.clientY / innerHeight - .5) * -6;
  world.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
});

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
let rx = 0, ry = 0, mx = 0, my = 0;
addEventListener("pointermove", e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
});
function cursorLoop() {
  rx += (mx-rx)*.14; ry += (my-ry)*.14;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(cursorLoop);
}
cursorLoop();
document.querySelectorAll("a,button").forEach(el => {
  el.addEventListener("pointerenter", () => ring.classList.add("active"));
  el.addEventListener("pointerleave", () => ring.classList.remove("active"));
});

let audioContext;
let soundOn = false;
const soundToggle = document.querySelector(".sound-toggle");
function playTone(type = "hover") {
  if (!soundOn || !audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const frequencies = { hover: [520, 690], click: [310, 465], open: [220, 540], close: [420, 250] };
  const pair = frequencies[type] || frequencies.hover;
  osc.type = "sine";
  osc.frequency.setValueAtTime(pair[0], now);
  osc.frequency.exponentialRampToValueAtTime(pair[1], now + .09);
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(type === "hover" ? .022 : .045, now + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, now + (type === "hover" ? .07 : .16));
  osc.connect(gain).connect(audioContext.destination);
  osc.start(now); osc.stop(now + .18);
}
soundToggle.addEventListener("click", () => {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  soundOn = !soundOn;
  soundToggle.setAttribute("aria-pressed", soundOn);
  soundToggle.querySelector(".sound-label").textContent = soundOn ? "Sound on" : "Sound off";
  if (soundOn) playTone("open");
});
document.querySelectorAll(".sound-target").forEach(el => {
  el.addEventListener("pointerenter", () => playTone("hover"));
  if (el !== soundToggle) el.addEventListener("click", () => playTone("click"));
});
