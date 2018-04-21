
export class Snake {
    constructor(options = {}) {
        const {
            name,
            BLOCK_SIZE,
            size,
            y,
            x,
            direction,
            nextDirection,
        } = options;
        this.name = name;
        this.BLOCK_SIZE = BLOCK_SIZE || 20;
        this.COLOR_DEAD_BLOCK = 'red';
        this.direction = direction || 'right';
        this.nextDirection = nextDirection || 'right';
        this.x = x || 0;
        this.y = y || 0;

        if (!Array.isArray(this.nextDirection)) {
            this.nextDirection = [this.nextDirection];
        }

        this.isDead = false;
        this.action = 'kill';

        this.pieces = new Set();
        this.head = null;
        this.removedPiece = null;

        this.round = 0;

        this.kills = 0;

        if (size) {
            this.size(size);
        }
    }

    size(number) {
        for (let i = 0; i < number; i++) {
            this.grow();
        }
    }

    color(index) {
        if (this.isDead && index === 0) {
            return this.COLOR_DEAD_BLOCK;
        }
        return index % 2 === 0  ? 'green' : 'lightgreen';
    }

    update() {
        if (this.isDead) {
            return;
        }

        this.direction = this.nextDirection.shift() || this.direction;

        switch (this.direction) {
            case 'left':
                this.x--;
                break;
            case 'up':
                this.y--;
                break;
            case 'right':
                this.x++;
                break;
            case 'down':
                this.y++;
                break;
        }
    }

    die() {
        this.isDead = true;
    }

    grow() {
        if (this.isDead) {
            return;
        }

        const BLOCK_SIZE = this.BLOCK_SIZE;

        const piece = new Path2D();
        piece.rect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        piece.x = this.x;
        piece.y = this.y;
        this.pieces.add(piece);
        this.head = piece;
        this.removedPiece = null;
    }

    move() {
        if (this.isDead) {
            this.removedPiece = null;
            return;
        }
        this.grow();
        this.removedPiece = this.pieces.values().next().value;
        this.pieces.delete(this.removedPiece);
    }

    getNextDirection() {
        return this.nextDirection[this.nextDirection.length - 1] || this.direction;
    }

    down() {
        if (this.getNextDirection() !== 'up') {
            this.nextDirection.push('down');
        }
    }

    up() {
        if (this.getNextDirection() !== 'down') {
            this.nextDirection.push('up');
        }
    }

    left() {
        if (this.getNextDirection() !== 'right') {
            this.nextDirection.push('left');
        }
    }

    right() {
        if (this.getNextDirection() !== 'left') {
            this.nextDirection.push('right');
        }
    }
}
