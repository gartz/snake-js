const sourceElement = document.getElementById('source');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');

sourceElement.width = window.innerWidth;
sourceElement.height = window.innerHeight;

const body = document.body;

let lastKey = 'right';
let lastMove = 'right';

const ctx = sourceElement.getContext('2d');

const COLOR_BG = 'black';
const COLOR_SNAKE = 'lightgreen';
const COLOR_FOOD = '#ff06dc';
const COLOR_DEAD_BLOCK = 'red';
const BLOCK_SIZE = 20;

const unavailableBlocks = {};

const maxWidth = Math.floor(sourceElement.width / BLOCK_SIZE);
const maxHeight = Math.floor(sourceElement.height / BLOCK_SIZE) - 1;

const snake = [];

let x;
let y;
let snakeFood = {};

function reset() {
    ctx.fillStyle = COLOR_BG;
    ctx.fillRect(0, 0, sourceElement.width, sourceElement.height);

    x = 0;
    y = 0;

    lastKey = 'right';
    lastMove = 'right';
}


function addSnakeFood() {
    snakeFood = {
        x: Math.floor(Math.random() * Math.floor(maxWidth)),
        y: Math.floor(Math.random() * Math.floor(maxHeight)),
    }
    const food = new Path2D();
    food.rect(snakeFood.x * BLOCK_SIZE, snakeFood.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.fillStyle = COLOR_FOOD;
    ctx.fill(food);
}

function hasSnakeCollide() {
    return unavailableBlocks[`${x}_${y}`];
}

function move() {
    if (x < 0) {
        x = maxWidth;
    }
    if (x > maxWidth) {
        x = 0;
    }
    if (y < 0) {
        y = maxHeight;
    }
    if (y > maxHeight) {
        y = 0;
    }

    if (hasSnakeCollide()) {
        const piece = snake[snake.length - 1];
        unavailableBlocks[`${piece.x}_${piece.y}`] = false;
        ctx.fillStyle = COLOR_DEAD_BLOCK;
        ctx.fill(piece);
        stopGame();
        return;
    }

    const snakePiece = new Path2D();
    snakePiece.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    snakePiece.x = x;
    snakePiece.y = y;
    unavailableBlocks[`${x}_${y}`] = true;
    snake.push(snakePiece)

    ctx.fillStyle = COLOR_SNAKE;
    ctx.fill(snakePiece);

    if (snake.length > 1 && (x !== snakeFood.x || y !== snakeFood.y)) {
        const piece = snake.shift();
        unavailableBlocks[`${piece.x}_${piece.y}`] = false;
        ctx.fillStyle = COLOR_BG;
        ctx.fill(piece);
    } else {
        addSnakeFood();
    }
}

let game;
function startGame() {
    messageElement.style.display = 'none';

    let piece;
    while (piece = snake.shift()) {
        unavailableBlocks[`${piece.x}_${piece.y}`] = false;
        ctx.fillStyle = COLOR_BG;
        ctx.fill(piece);
    }

    reset();

    game = setInterval(() => {
        lastMove = lastKey;
        switch (lastKey) {
            case 'left':
                --x;
                break;
            case 'up':
                --y;
                break;
            case 'right':
                ++x
                break;
            case 'down':
                ++y
                break;
        }
        move();
    }, 1e3 * .1)
}

function stopGame() {
    clearInterval(game);
    game = null;
    scoreElement.textContent = `Your score is: ${snake.length}`;
    messageElement.style.display = 'block';
}

body.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            if (lastMove !== 'right') {
                lastKey = 'left';
            }
            return;
        case 38:
            if (lastMove !== 'down') {
                lastKey = 'up';
            }
            return;
        case 39:
            if (lastMove !== 'left') {
                lastKey = 'right';
            }
            return;
        case 40:
            if (lastMove !== 'up') {
                lastKey = 'down';
            }
            return;
        case 13:
            if (!game) {
                startGame();
            }
            return;
    }
});