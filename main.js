import './style.css';

const player = document.getElementById('player');
const allEnemies = document.querySelectorAll('.enemy');
let playerActionsState = {
  isShooting: false,
  isMovingLeft: false,
  isMovingRight: false,
};
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

  if (playerActionsState.isMovingLeft && position >= 8) {
    console.warn('is moving keft');
    position -= 5;
    player.style.left = `${position}px`;
  } else if (
    playerActionsState.isMovingRight &&
    position < window.innerWidth - 60
  ) {
    position += 5;
    player.style.left = `${position}px`;
  }
};

/** key up and down handler **/
// key down handler
document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    playerActionsState.isMovingLeft = true;
  } else if (e.key === 'd') {
    playerActionsState.isMovingRight = true;
  }

  if (e.key === ' ') {
    if (!playerActionsState.isShooting) {
      shootBullet();
      shootingInterval = setInterval(shootBullet, 200);
      playerActionsState.isShooting = true;
    }
  }
});

// key up handler
document.addEventListener('keyup', (e) => {
  if (e.key === 'a') {
    playerActionsState.isMovingLeft = false;
  } else if (e.key === 'd') {
    playerActionsState.isMovingRight = false;
  }

  if (e.key === ' ') {
    playerActionsState.isShooting = false;
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
  const positionY = player.getBoundingClientRect().top - 20;
  const positionX =
    player.getBoundingClientRect().x +
    player.getBoundingClientRect().width -
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
