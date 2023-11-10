const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const timeKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(currentTimeRunner, 1000));

function currentTimeRunner(data) {
  const currentTime = data.seconds;
  localStorage.setItem(timeKey, currentTime);
}

const savedTime = localStorage.getItem(timeKey);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}
