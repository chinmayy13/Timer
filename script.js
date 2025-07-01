const resetBtn = document.getElementById("reset");
const playBtn = document.getElementById("play");
const timerEl = document.getElementById("timer");
const root = document.querySelector(":root");
const minutesInput = document.getElementById("minutesInput");
const setBtn = document.getElementById("setBtn");

// Initial setup

let totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);

// Run the run() function every second
const timerInterval = setInterval(run, 1000);

// Event Listeners
playBtn.addEventListener("click", () => {
  playing = !playing;
  playBtn.classList.toggle("play");
  playBtn.classList.toggle("bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");
});

// Reset Button functioning
resetBtn.addEventListener("click", resetAll);

// Run the timer
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty("--degrees", calcDeg());
  }
}

// Calculate degrees
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

// Reset the timer

function resetAll() {
  playing = false;
  playBtn.classList.remove("play");
  playBtn.classList.remove("bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(currentSeconds);
  root.style.setProperty("--degrees", "0deg");
}

// Format Time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${newSeconds
    .toString()
    .padStart(2, "0")}`;
}

// Customize timer

setBtn.addEventListener("click", () => {
  const minutes = parseInt(minutesInput.value);

  if (!isNaN(minutes) && minutes > 0) {
    totalSeconds = minutes * 60; // update totalSeconds
    currentSeconds = totalSeconds; // reset current time
    playing = false; // pause timer when setting new time
    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty("--degrees", "0deg");

    // Reset play button appearance
    playBtn.classList.remove("play");
    playBtn.classList.remove("bg-green-500");
    const playIcon = playBtn.querySelector("i");
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
});
