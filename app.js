const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const timeEl = document.querySelector('#time');
const colors = [
  '#ac1616',
  '#9c257e',
  '#4c4adb',
  '#36ce28',
  '#110a77',
  '#b5e62f',
  '#4debe3',
];

startBtn.addEventListener('click', event => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score += 1;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  let color = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// function getRandomColor() {
//   const index = Math.floor(Math.random() * colors.length);
//   let color = '';
//   return (color = colors[index]);
// }

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);

  return colors[index];
}
