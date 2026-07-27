const room=document.querySelector(".spatial-ui"),windows=[...document.querySelectorAll(".glass-window")];
document.querySelector(".hero").addEventListener("pointermove",e=>{const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;windows.forEach(w=>{const d=Number(w.dataset.depth);w.style.setProperty("--wx",`${nx*d*-18}px`);w.style.setProperty("--wy",`${ny*d*-12}px`);w.style.setProperty("--rx",`${ny*d*-2}deg`);w.style.setProperty("--ry",`${nx*d*3}deg`)})});
const icons=[...document.querySelectorAll(".app-icon")],views=[...document.querySelectorAll(".app-view")];
function openApp(key){icons.forEach(x=>x.classList.toggle("active",x.dataset.app===key));views.forEach(x=>x.classList.toggle("active",x.dataset.view===key));tone("shift")}
icons.forEach(icon=>icon.onclick=()=>openApp(icon.dataset.app));
let context,sound=true;const toggle=document.querySelector(".sound-toggle");
function unlock(e){if(e.target.closest(".sound-toggle"))return;context=new(window.AudioContext||window.webkitAudioContext)();document.removeEventListener("pointerdown",unlock,true)}document.addEventListener("pointerdown",unlock,true);
function tone(type="tap"){if(!sound||!context)return;const n=context.currentTime,o=context.createOscillator(),g=context.createGain(),v=type==="shift"?[180,650,.18]:[300,150,.08];o.type=type==="shift"?"sine":"triangle";o.frequency.setValueAtTime(v[0],n);o.frequency.exponentialRampToValueAtTime(v[1],n+v[2]);g.gain.setValueAtTime(.03,n);g.gain.exponentialRampToValueAtTime(.0001,n+v[2]);o.connect(g).connect(context.destination);o.start();o.stop(n+v[2])}
toggle.onclick=()=>{if(!context)context=new(window.AudioContext||window.webkitAudioContext)();sound=!sound;toggle.setAttribute("aria-pressed",sound);toggle.querySelector("span").textContent=sound?"Sound on":"Sound off";if(sound)tone("shift")};document.querySelectorAll(".sound-target").forEach(x=>{if(x!==toggle)x.addEventListener("click",()=>tone("tap"))});
openApp("neo");
