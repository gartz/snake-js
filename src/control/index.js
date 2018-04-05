const uniqueValues = {};
function unique(value) {
    const prev = uniqueValues[value] || 1;
    uniqueValues[value] = prev + 1;
    return prev > 1 ? `${value}${prev}` : value;
}

const undefSnake = () => console.warn('Snake is undefined');

export class Control {
    constructor({ name, platform, snake, device, read, ...options }) {
        this.name = unique(name || 'device');
        this.options = options;
        this.read = read;

        this.setDevice(device);
        this.setPlatform(platform);
        this.setSnake(snake);
    }

    setDevice(device) {
        this.device = device;

        this.setPlatform(this.platform);
        this.setSnake(this.snake);
    }

    setPlatform(platform) {
        const {
            device,
            read,
        } = this;

        this.platform = platform;

        if (!platform || !device) {
            return;
        }

        const write = {
            pause: () => this.platform.pause(),
            'continue': () => this.platform.continue(),
            togglePause: () => this.platform.isPaused
                ? this.platform.continue()
                : this.platform.pause(),
            play: () => this.platform.play(),
            stop: () => this.platform.stop(),
        };

        this.platformDevice = device({
            ...(this.options || {}),
            read: read || document.body,
            write,
        });

    }

    setSnake(snake) {
        const {
            device,
            read,
        } = this;

        this.snake = snake;

        if (!snake || !device) {
            return;
        }

        const turnLeftMap = {
            up: 'left',
            left: 'down',
            down: 'right',
            right: 'up',
        }

        const turnRightMap = {
            up: 'right',
            right: 'down',
            down: 'left',
            left: 'up',
        }

        const turnLeft = () => {
            const {
                direction,
                nextDirection,
            } = this.snake;

            if (nextDirection === direction) {
                return this.snake[turnLeftMap[direction]]();
            }
            if (nextDirection !== turnLeftMap[direction]) {
                return this.snake[turnLeftMap[nextDirection]]();
            }
        }

        const turnRight = () => {
            const {
                direction,
                nextDirection,
            } = this.snake;

            if (nextDirection === direction) {
                return this.snake[turnRightMap[direction]]();
            }
            if (nextDirection !== turnRightMap[direction]) {
                return this.snake[turnRightMap[nextDirection]]();
            }
        }

        const write = {
            up: () => this.snake.up(),
            down: () => this.snake.down(),
            left: () => this.snake.left(),
            right: () => this.snake.right(),
            turnLeft,
            turnRight,
        };

        this.snakeDevice = device({
            ...(this.options || {}),
            read: read || document.body,
            write,
        });
    }

    destroy() {
        if (this.platformDevice) {
            this.platformDevice();
        }
        if (this.snakeDevice) {
            this.snakeDevice();
        }
    }
}
