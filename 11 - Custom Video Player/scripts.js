const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

const skipButtons = player.querySelectorAll("[data-skip]");
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚❚';
}

skipButtons.forEach(button => button.addEventListener("click", skip));
function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

const ranges = player.querySelectorAll(".player__slider");
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
function handleRangeUpdate(){
  video[this.name] = this.value;
}

const progressBar = player.querySelector(".progress__filled");
video.addEventListener("timeupdate", handleProgress);
function handleProgress(){
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const progress = player.querySelector(".progress");
progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousemove", event => mousedown && scrub(event));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
progress.addEventListener("mouseleave", () => mousedown = false);
function scrub(event){
  const scrubTime = event.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

const fullscreen = player.querySelector(".fullscreen");
let isFullscreen = false;
document.addEventListener("fullscreenchange", () => isFullscreen = !isFullscreen);
fullscreen.addEventListener("click", toggleFullscreen);
function toggleFullscreen(){
  if(!isFullscreen)
    video.requestFullscreen();
  else
    document.exitFullscreen();
}