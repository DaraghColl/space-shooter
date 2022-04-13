import './style.css';

const player = document.getElementById('player');
const playerRect = document.getElementById('player-rect');
const allEnemies = document.querySelectorAll('.enemy');
let keyState;
let isShooting = false;
let shootingInterval;

const initGame = () => {
  player.style.left = `10px`;

  gameLoop();
};

const gameLoop = () => {
  update();
  window.requestAnimationFrame(gameLoop);
};

// update to be called repeatedely from game loop
const update = () => {
  // handle player position based on key state
  let position = parseInt(player.style.left.slice(0, -2));

  if (keyState === 'a') {
    position -= 5;
    player.style.left = position;
  } else if (keyState === 'd') {
    position += 5;
    player.style.left = `${position}px`;
  }
};

/** key up and down handler **/
// key down handler
document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    keyState = 'a';
  } else if (e.key === 'd') {
    keyState = 'd';
  }

  if (e.key === ' ') {
    if (!isShooting) {
      shootBullet();
      shootingInterval = setInterval(shootBullet, 200);
      isShooting = true;
    }
  }
});

// key up handler
document.addEventListener('keyup', (e) => {
  if (e.key === 'a') {
    keyState = '';
  } else if (e.key === 'd') {
    keyState = '';
  }

  if (e.key === ' ') {
    isShooting = false;
    clearInterval(shootingInterval);
  }
});

/** bullet functionality **/
// create bullet
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

// shoot bullet
const shootBullet = () => {
  const positionY = playerRect.getBoundingClientRect().top - 20;
  const positionX =
    playerRect.getBoundingClientRect().x +
    playerRect.getBoundingClientRect().width -
    35;

  const bullet = createBullet(positionX, positionY);

  document.getElementById('app').insertAdjacentElement('beforeend', bullet);
};

/** collision detection **/
const checkCollision = (bullet) => {
  const bulletPositon = bullet.getBoundingClientRect();

  allEnemies.forEach((enemy) => {
    const enemyPositon = enemy.getBoundingClientRect();

    if (
      elementsCollide(
        bulletPositon.x,
        bulletPositon.y,
        bulletPositon.width,
        bulletPositon.height,
        enemyPositon.x,
        enemyPositon.y,
        enemyPositon.width,
        enemyPositon.height
      )
    ) {
      enemy.remove();
    }
  });
};

// check elements overlap
const elementsCollide = (x1, y1, w1, h1, x2, y2, w2, h2) => {
  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
    return false;
  }
  return true;
};

initGame();
