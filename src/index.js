import OfflinePluginRuntime from 'offline-plugin/runtime';

import { SnakeGame } from './snake';
import('./version');

OfflinePluginRuntime.install();

let snakeGame = new SnakeGame();

if (module.hot) {
    module.hot.accept('./snake.js', () => {
        const { SnakeGame } = require('./snake');
        const previousGame = snakeGame;
        try {
            snakeGame = new SnakeGame(snakeGame);
            previousGame.destroy();
        } catch(error) {
            console.log(error);
        }
    });
}
