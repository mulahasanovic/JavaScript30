let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeleft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeleft(secondsLeft);
  }, 1000);

}

function displayTimeleft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

buttons.forEach(button => button.addEventListener("click", startTimer));

function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

document.customForm.addEventListener("submit", function(event){
  event.preventDefault();
  const minutes = this.minutes.value;
  this.reset();
  timer(minutes * 60);
});