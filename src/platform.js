import { Control } from './control'
import { isHidden } from './control/browserTab';

const sourceElement = document.getElementById('source');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');

sourceElement.width = window.innerWidth;
sourceElement.height = window.innerHeight;

const ctx = sourceElement.getContext('2d');

const BLOCK_SIZE = 20;
const maxWidth = Math.floor(sourceElement.width / BLOCK_SIZE) - 1;
const maxHeight = Math.floor(sourceElement.height / BLOCK_SIZE) - 1;

export class Platform {
    constructor(options) {
        this.Snake = options.Snake;
        this.COLOR_BG = options.COLOR_BG || '#000000';
        this.COLOR_FOOD = '#ff06dc';
        this.INITIAL_SIZE = options.INITIAL_SIZE || 7;
        this.SPEED = 100;

        // Set of snakes playing
        this.snakes = new Set();

        // Map of power-ups in the blocks
        this.powerUp = null;

        // State of the blocks with x_y key format
        this.blocks = {};

        this.controls = new Set();

        this.isPaused = false;
        this.isStarted = false;

        this.deadSnakes = 0;

        this.draw();
    }

    destroy() {
        // Remove all controls
        for (let control of this.controls) {
            control.destroy();
            this.controls.delete(control);
        }
        this.stop();
    }

    addSnake(restore) {
        const snake = new this.Snake(restore);
        this.snakes.add(snake);
        return snake;
    }

    addControl(device, options = {}) {
        const control = new Control({
            ...options,
            device,
            platform: this,

        });

        this.controls.add(control);
    }

    async updateSnakes() {
        for (let snake of this.snakes) {
            snake.update();

            // Outbound teleport
            if (snake.x < 0) {
                snake.x = maxWidth;
            }
            if (snake.x > maxWidth) {
                snake.x = 0;
            }
            if (snake.y < 0) {
                snake.y = maxHeight;
            }
            if (snake.y > maxHeight) {
                snake.y = 0;
            }

            const block = this.getBlock(snake);
            if (block) {
                if (block.action === 'kill' && !snake.isDead) {
                    snake.die();
                    this.deadSnakes++;
                    if (snake !== block) {
                        block.kills++;
                    }
                    return;
                }
                if (block.action === 'grow') {
                    snake.grow();
                    this.setBlock(snake.head, snake);
                    this.powerUp = null;
                    return;
                }
            }

            snake.move();
            if (snake.removedPiece && this.getBlock(snake.removedPiece) === snake) {
                this.setBlock(snake.removedPiece, null);
            }
            this.setBlock(snake.head, snake);
        }
    }

    async updatePowerUp() {
        if (!this.powerUp) {
            let snakeFood = this.powerUp;
            while(!snakeFood || this.getBlock(snakeFood)) {
                snakeFood = await new Promise(resolve => requestAnimationFrame(() => {
                    resolve({
                        x: Math.floor(Math.random() * Math.floor(maxWidth)),
                        y: Math.floor(Math.random() * Math.floor(maxHeight)),
                        action: 'grow',
                    });
                }));
            }
            this.setBlock(snakeFood, snakeFood);
            this.powerUp = snakeFood;
        }
    }

    getBlock({x, y}) {
        return this.blocks[`${x}_${y}`];
    }

    setBlock({x, y}, value) {
        this.blocks[`${x}_${y}`] = value;
    }

    drawPowerUp() {
        const powerUp = this.powerUp;
        if (!powerUp) {
            return;
        }
        const path = new Path2D();
        path.rect(powerUp.x * BLOCK_SIZE, powerUp.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillStyle = this.COLOR_FOOD;
        ctx.fill(path);
    }

    drawSnake() {
        for (let snake of this.snakes) {
            if (snake.removedPiece && !this.getBlock(snake.removedPiece)) {
                ctx.fillStyle = this.COLOR_BG;
                ctx.fill(snake.removedPiece);
            }

            let index = snake.pieces.size - 1;
            snake.pieces.forEach(snakePiece => {
                ctx.fillStyle = snake.color(index--);
                ctx.fill(snakePiece);
            });
        }
    }

    draw() {
        // Rainbow colors
        //this.COLOR_BG = '#' + this.COLOR_BG.substr(1).split('').map(n => `${Math.floor(Math.random() * 10)}`).join('');
        ctx.fillStyle = this.COLOR_BG;
        ctx.fillRect(0, 0, sourceElement.width, sourceElement.height);

        this.drawSnake();
        this.drawPowerUp();
    }

    continue() {
        if (!this.isStarted) {
            return;
        }
        
        this.draw();
        this.isPaused = false;
        let frame = 0;
        this.interval = setInterval(() => {
            if (isHidden()) {
                return this.pause();
            }

            this.updateSnakes();
            this.updatePowerUp();
            if (frame++ >50) {
                this.draw();
                frame = 0;
            } else {
                this.drawSnake();
                this.drawPowerUp();
            }
            if (this.deadSnakes === this.snakes.size) {
                this.stop();
            }
        }, this.SPEED);
    }

    play() {
        if (!this.isStarted) {
            messageElement.style.display = 'none';

            const controls = this.controls.values();

            const snake = this.addSnake({
                name: 'Green Snake',
                size: this.INITIAL_SIZE,
            });
            controls.next().value.setSnake(snake);

            const snake2 = this.addSnake({
                name: 'Blue Snake',
                size: this.INITIAL_SIZE,
                y: maxHeight,
                x: maxWidth,
                direction: 'left',
                nextDirection: 'left',
            });
            snake2.color = function (index) {
                if (this.isDead && index === 0) {
                    return 'red';
                }
                return index % 2 === 0  ? 'blue' : 'lightblue';
            };
            controls.next().value.setSnake(snake2);

            controls.next().value.setSnake(snake);

            this.isStarted = true;
        }
        this.continue();
    }

    stop() {
        this.pause();
        this.isStarted = false;

        scoreElement.innerHTML = '';
        for (let snake of this.snakes) {
            const killScore = snake.kills * 10;
            const sizeScore = snake.pieces.size - this.INITIAL_SIZE;
            scoreElement.innerHTML += `<div>${snake.name} score is: ${killScore + sizeScore}</div>`;
        }
        messageElement.style.display = 'block';

        this.snakes.clear();
        this.powerUp = null;
        this.deadSnakes = 0;
        this.blocks = {};
    }

    pause() {
        this.isPaused = true;
        clearInterval(this.interval);
    }
}