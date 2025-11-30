const sounds = [
  { title: "Heavy Rain + Thunder", icon: "fa-cloud-rain", url: "sounds/rain-thunder.mp3" },
  { title: "Ocean Waves",          icon: "fa-water",       url: "sounds/ocean.mp3" },
  { title: "Forest Birds",         icon: "fa-tree",        url: "sounds/forest.mp3" },
  { title: "Cozy Campfire",        icon: "fa-fire",        url: "sounds/campfire.mp3" },
  { title: "Peaceful River",       icon: "fa-tint",        url: "sounds/river.mp3" },
  { title: "Night Crickets",       icon: "fa-moon",        url: "sounds/crickets.mp3" },
  { title: "Wind in Trees",        icon: "fa-wind",        url: "sounds/wind.mp3" },
  { title: "Rain on Window",       icon: "fa-cloud-rain",  url: "sounds/rain-window.mp3" }
];

const audio = document.getElementById("audioPlayer");
let currentIndex = 0;

function loadSounds() {
  const grid = document.getElementById("soundsGrid");
  sounds.forEach((sound, index) => {
    const card = document.createElement("div");
    card.className = "sound-card";
    card.innerHTML = `
      <i class="fas ${sound.icon}"></i>
      <h3>${sound.title}</h3>
      <p>Click to play • Loop enabled</p>
    `;
    card.onclick = () => playSound(index);
    grid.appendChild(card);
  });
}

function playSound(index) {
  currentIndex = index;
  audio.src = sounds[index].url;
  audio.play();
  updatePlayingUI();
  document.getElementById("currentTitle").textContent = sounds[index].title;
}

function updatePlayingUI() {
  document.querySelectorAll(".sound-card").forEach((card, i) => {
    card.classList.toggle("playing", i === currentIndex);
  });
}

// Controls
document.getElementById("playPauseBtn").onclick = () => {
  if (audio.paused) {
    audio.play();
    document.querySelector("#playPauseBtn i").className = "fas fa-pause";
  } else {
    audio.pause();
    document.querySelector("#playPauseBtn i").className = "fas fa-play";
  }
};

document.getElementById("stopBtn").onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  document.querySelector("#playPauseBtn i").className = "fas fa-play";
};

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % sounds.length;
  playSound(currentIndex);
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + sounds.length) % sounds.length;
  playSound(currentIndex);
};

document.getElementById("volumeSlider").oninput = (e) => {
  audio.volume = e.target.value / 100;
};

document.getElementById("backBtn").onclick = () => {
  window.location.href = "dashboard.html";
};

// Auto loop
audio.loop = true;

// Load on start
document.addEventListener("DOMContentLoaded", loadSounds);