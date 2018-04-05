export function keyboard({ read, write, keyMap }) {
    const keyboardListener = !keyMap ? event => {
        switch (event.keyCode) {
            case 37: return write.left && write.left();
            case 38: return write.up && write.up();
            case 39: return write.right && write.right();
            case 40: return write.down && write.down();
            case 13: return write.play && write.play();
            case 80: return write.togglePause && write.togglePause();
            case 82: return write.stop && write.stop();
        }
    } : event => {
        const action = keyMap[event.key];
        if (action && write[action]) {
             write[action]();
        }
    };

    read.addEventListener('keydown', keyboardListener);

    return function removeKeyboardListeners() {
        read.removeEventListener('keydown', keyboardListener);
    }
}
