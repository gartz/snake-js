export function keyboard({ read, write, keyMap }) {
    const keyboardListener = !keyMap ? event => {
        switch (event.keyCode) {
            case 37: return write.left();
            case 38: return write.up();
            case 39: return write.right();
            case 40: return write.down();
            case 13: return write.play();
            case 80: return write.togglePause();
            case 82: return write.stop();
        }
    } : event => {
        const action = keyMap[event.key];
        if (action) {
            write[action]();
        }
    };

    read.addEventListener('keydown', keyboardListener);

    return function removeKeyboardListeners() {
        read.removeEventListener('keydown', keyboardListener);
    }
}
