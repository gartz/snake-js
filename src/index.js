import OfflinePluginRuntime from 'offline-plugin/runtime';

import { SnakeGame } from './snake';
const versionImport = import('./version');

let snakeGame = new SnakeGame();

if (module.hot) {
    window.snakeGame = snakeGame;
}

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
