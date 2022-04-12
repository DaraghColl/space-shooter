import './style.css';

const player = document.getElementById('player');
const playerRect = document.getElementById('player-rect');
const enemy = document.getElementById('enemy');
const enemy2 = document.getElementById('enemy2');
const test = document.getElementById('test');
const allEnemies = document.querySelectorAll('.enemy');

player.style.left = `10px`;

window.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    const currentPosition = parseInt(player.style.left.slice(0, -2));
    const newPosition = currentPosition - 10;
    player.style.left = `${newPosition}px`;
  } else if (e.key === 'd') {
    const currentPosition = parseInt(player.style.left.slice(0, -2));
    const newPosition = currentPosition + 10;
    player.style.left = `${newPosition}px`;
  }

  if (e.key === ' ') {
    const positionY = playerRect.getBoundingClientRect().top - 20;
    const positionX =
      playerRect.getBoundingClientRect().x +
      playerRect.getBoundingClientRect().width -
      35;

    const bullet = createBullet(positionX, positionY);

    document.getElementById('app').insertAdjacentElement('beforeend', bullet);
  }
});

const createBullet = (x, y) => {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet-div');

  bullet.style.left = `${x}px`;
  bullet.style.top = `${y}px`;

  setTimeout(() => {
    bullet.style.top = `-10rem`;

    const checkBulletCollisionInterval = window.setInterval(function () {
      checkCollision(bullet);
    }, 17);

    setTimeout(() => {
      bullet.remove();
      clearInterval(checkBulletCollisionInterval);
    }, 1500);
  });

  return bullet;
};

function checkCollision(bullet) {
  const bulletPositon = bullet.getBoundingClientRect();

  allEnemies.forEach((enemy) => {
    const enemyPositon = enemy.getBoundingClientRect();

    if (
      bulletPositon.y < enemyPositon.bottom &&
      bulletPositon.y > enemyPositon.top &&
      bulletPositon.x > enemyPositon.left - 5 &&
      bulletPositon.x < enemyPositon.right - 5
    ) {
      enemy.remove();
    }
  });
}
