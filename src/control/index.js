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
        this.platform = platform;
        this.snake = snake || {
            up: undefSnake,
            down: undefSnake,
            left: undefSnake,
            right: undefSnake,
        };

        const write = {
            up: () => this.snake.up(),
            down: () => this.snake.down(),
            left: () => this.snake.left(),
            right: () => this.snake.right(),
            pause: () => this.platform.pause(),
            'continue': () => this.platform.continue(),
            togglePause: () => this.platform.isPaused
                ? this.platform.continue()
                : this.platform.pause(),
            play: () => this.platform.play(),
            stop: () => this.platform.stop(),
        };

        this.device = device({
            ...options,
            read: read || document.body,
            write,
        });
    }
}
