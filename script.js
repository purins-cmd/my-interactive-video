const video = document.getElementById('lessonVideo');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

playBtn.addEventListener('click', () => video.play());
pauseBtn.addEventListener('click', () => video.pause());
restartBtn.addEventListener('click', () => {
  video.currentTime = 0;
  video.play();
});