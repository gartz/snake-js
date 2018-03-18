
const sourceElement = document.getElementById('source');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');

sourceElement.width = window.innerWidth;
sourceElement.height = window.innerHeight;

const body = document.body;
const ctx = sourceElement.getContext('2d');

const BLOCK_SIZE = 20;
const maxWidth = Math.floor(sourceElement.width / BLOCK_SIZE) - 1;
const maxHeight = Math.floor(sourceElement.height / BLOCK_SIZE) - 1;

function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document) 
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}

function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;
    
    return document[prop];
}

export class SnakeGame {
    constructor(previousGame) {
        this.COLOR_BG = 'black';
        this.COLOR_FOOD = '#ff06dc';
        this.COLOR_DEAD_BLOCK = 'red';
        this.INITIAL_SIZE = 4;

        this.nextMoveInterval = null;

        this.keyboardControls = (event) => {
            if (!this.nextMoveInterval && this.snake.length) {
                switch(event.keyCode) {
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        this.continue();
                }
            }

            switch (event.keyCode) {
                case 82:
                    this.stopGame();
                    this.reset();
                    return;
                case 37:
                    if (this.lastMove !== 'right') {
                        this.lastKey = 'left';
                    }
                    return;
                case 38:
                    if (this.lastMove !== 'down') {
                        this.lastKey = 'up';
                    }
                    return;
                case 39:
                    if (this.lastMove !== 'left') {
                        this.lastKey = 'right';
                    }
                    return;
                case 40:
                    if (this.lastMove !== 'up') {
                        this.lastKey = 'down';
                    }
                    return;
                case 13:
                    if (!this.nextMoveInterval) {
                        if (this.snake.length) {
                            this.continue();
                        } else {
                            this.startGame();
                        }
                    }
                    return;
                case 80:
                    if (this.nextMoveInterval) {
                        this.pause();
                    } else {
                        this.continue();
                    }
                    
                    return;
            }
        }

        this.reset(previousGame);

        if (this.snakeFood) {
            this.continue();
        }

        body.addEventListener('keydown', this.keyboardControls);
    }

    snakeColor(index) {
        return index % 2 === 0  ? 'lightgreen' : 'green';
    }

    snakeDrawn() {
        if (this.snake.length) {
            this.snake.forEach((snakePiece, index) => {
                ctx.fillStyle = this.snakeColor(index);
                ctx.fill(snakePiece);
            });
        }
    }

    destroy() {
        body.removeEventListener('keydown', this.keyboardControls);
        this.pause();
    }

    reset(previousGame = {}) {
        ctx.fillStyle = this.COLOR_BG;
        ctx.fillRect(0, 0, sourceElement.width, sourceElement.height);

        this.x = previousGame.x || 0;
        this.y = previousGame.y || 0;

        this.lastKey = previousGame.lastKey || 'right';
        this.lastMove = previousGame.lastMove || 'right';

        this.unavailableBlocks = previousGame.unavailableBlocks || {};
        this.snake = previousGame.snake || [];

        if (previousGame.snakeFood) {
            this.addSnakeFood(previousGame.snakeFood);
        } else {
            this.snakeFood = null;
        }

        this.snakeDrawn();
    }

    addSnakeFood(previousSnakeFood) {        
        let snakeFood = this.snakeFood = previousSnakeFood;
        while(!snakeFood || this.unavailableBlocks[`${snakeFood.x}_${snakeFood.y}`]) {
            snakeFood = this.snakeFood = {
                x: Math.floor(Math.random() * Math.floor(maxWidth)),
                y: Math.floor(Math.random() * Math.floor(maxHeight)),
            };
        }

        const food = new Path2D();
        food.rect(snakeFood.x * BLOCK_SIZE, snakeFood.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillStyle = this.COLOR_FOOD;
        ctx.fill(food);
    }

    hasSnakeCollide() {
        return this.unavailableBlocks[`${this.x}_${this.y}`];
    }

    move() {
        if (this.x < 0) {
            this.x = maxWidth;
        }
        if (this.x > maxWidth) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = maxHeight;
        }
        if (this.y > maxHeight) {
            this.y = 0;
        }

        const snake = this.snake;
        const unavailableBlocks = this.unavailableBlocks;
        const snakeFood = this.snakeFood;

        if (this.hasSnakeCollide()) {
            const piece = this.snake[0];
            this.unavailableBlocks[`${piece.x}_${piece.y}`] = false;
            ctx.fillStyle = this.COLOR_DEAD_BLOCK;
            ctx.fill(piece);
            this.stopGame();
            return;
        }

        const snakePiece = new Path2D();
        snakePiece.rect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        snakePiece.x = this.x;
        snakePiece.y = this.y;
        unavailableBlocks[`${this.x}_${this.y}`] = true;
        snake.unshift(snakePiece)


        if (snakeFood && (this.x !== snakeFood.x || this.y !== snakeFood.y)) {
            const piece = snake.pop();
            unavailableBlocks[`${piece.x}_${piece.y}`] = false;
            ctx.fillStyle = this.COLOR_BG;
            ctx.fill(piece);
        } else {
            // TODO: apply every 10 frames
            ctx.fillStyle = this.COLOR_BG;
            ctx.fillRect(0, 0, sourceElement.width, sourceElement.height);
            snake.length > this.INITIAL_SIZE && this.addSnakeFood();
        }

        this.snakeDrawn();
    }

    pause() {
        clearInterval(this.nextMoveInterval);
        this.nextMoveInterval = null;
    }

    continue() {
        if (!this.snake.length) {
            return;
        }

        this.nextMoveInterval = setInterval(() => {
            if (isHidden()) {
                console.log('is hidden');
                this.pause();
                return;
            }

            this.lastMove = this.lastKey;
            switch (this.lastKey) {
                case 'left':
                    --this.x;
                    break;
                case 'up':
                    --this.y;
                    break;
                case 'right':
                    ++this.x
                    break;
                case 'down':
                    ++this.y
                    break;
            }
            this.move();
        }, 1e3 * .1)
    }

    startGame() {
        messageElement.style.display = 'none';
        this.snake = [];
        this.unavailableBlocks = {};
        this.snakeFood = null;

        this.reset();
        this.move();
        this.continue();
    }

    stopGame() {
        clearInterval(this.nextMoveInterval);
        this.nextMoveInterval = null;
        
        scoreElement.textContent = this.snake.length > this.INITIAL_SIZE + 1
            ? `Your score is: ${this.snake.length - (this.INITIAL_SIZE + 1)}`
            : ''
        ;
        messageElement.style.display = 'block';

        this.snake = [];
    }
}
