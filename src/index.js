import OfflinePluginRuntime from 'offline-plugin/runtime';

import { Platform } from './platform';
import { keyboard } from './control/device/keyboard';
import { Snake } from './snake';
const versionImport = import('./version');

function initGame(Platform, Snake, keyboard, restore) {
    const snakeGame = new Platform({
        restore,
        Snake,
    });

    snakeGame.addControl(keyboard, {
        name: 'Keyboard',
    });
    snakeGame.addControl(keyboard, {
        name: 'Alternative Keyboard',
        keyMap: {
            a: 'left',
            s: 'down',
            d: 'right',
            w: 'up',
        }
    });

    if (module.hot) {
        window.snakeGame = snakeGame;
    }

    return snakeGame;
}

let snakeGame = initGame(Platform, Snake, keyboard);

OfflinePluginRuntime.install({
    // More details at: https://github.com/NekR/offline-plugin-pwa/blob/master/src/main.js#L3
    onInstalled: function() {
        if (process.env.NODE_ENV === 'development') {
            console.info('New offline version installed.');
        }
    },

    onUpdating: () => {
        console.info('New version available. Updating...');
    },

    onUpdateReady: async () => {
        const { VERSION } = await versionImport;
        console.info(`Version ${VERSION} installed.`);

        OfflinePluginRuntime.applyUpdate();
    },

    onUpdated: () => {
        if (!module.hot) {
//             JSON.stringify(snakeGame)
//             window.location.reload();
        }
    }
});

if (module.hot) {
    module.hot.accept(['./snake.js', './platform.js'], () => {
        const { Platform } = require('./platform');
        const { Snake } = require('./snake');
        const { keyboard } = require('./control/device/keyboard');
        const oldSnakeGame = snakeGame;
        snakeGame = initGame(Platform, Snake, keyboard, snakeGame);
        oldSnakeGame.destroy();
    });
}
