export function touchscreen({ read, write, keyMap }) {

    if (!write) {
        return;
    }

    if (write.play && write.continue) {
        const message = read.querySelector('#message');
        const onclick = event => write.play();
        const ontouch = event => write.continue();

        message.addEventListener('click', onclick);
        read.addEventListener('touchstart', ontouch);

        return () => {
            message.removeEventListener('click', onclick);
            read.removeEventListener('touchstart', ontouch);
        };
    }

    if (!write.turnLeft || !write.turnRight) {
        return () => {};
    }

    const controlBody = document.createElement('div');
    const leftButton = document.createElement('div');
    const upButton = document.createElement('div');
    const emptyBlock = document.createElement('div');
    const downButton = document.createElement('div');
    const rightButton = document.createElement('div');

    [leftButton, upButton, downButton, rightButton].forEach(button => {
        button.innerText = '<';
        button.style.opacity = '.5';
        button.style.border = '6px solid #FFF';
        button.style.borderRadius = '100%';
        button.style.textAlign = 'center';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.lineHeight = '49px';
        button.style.margin = '6px';
    });

    upButton.style.transform = 'rotate(90deg)';
    rightButton.style.transform = 'rotate(180deg)';
    downButton.style.transform = 'rotate(270deg)';

    controlBody.appendChild(leftButton);
    controlBody.appendChild(upButton);
    controlBody.appendChild(emptyBlock);
    controlBody.appendChild(downButton);
    controlBody.appendChild(rightButton);

    controlBody.style.position = 'fixed';
    controlBody.style.fontSize = '4rem';
    controlBody.style.color = '#FFF';
    controlBody.style.bottom = '0';
    controlBody.style.fontWeight = 'bold';
    controlBody.style.display = 'flex';
    controlBody.style.width = '100%';
    controlBody.style.padding = '20px';
    controlBody.style.boxSizing = 'border-box';
    controlBody.style.userSelect = 'none';
    controlBody.style.fontFamily = 'monospace';

    emptyBlock.style.flex = '1 1';

    read.appendChild(controlBody);

    const leftListener = event => event.preventDefault() || write.left();
    const rightListener = event => event.preventDefault() || write.right();
    const upListener = event => event.preventDefault() || write.up();
    const downListener = event => event.preventDefault() || write.down();

    leftButton.addEventListener('touchstart', leftListener);
    leftButton.addEventListener('mousedown', leftListener);
    rightButton.addEventListener('touchstart', rightListener);
    rightButton.addEventListener('mousedown', rightListener);
    upButton.addEventListener('touchstart', upListener);
    upButton.addEventListener('mousedown', upListener);
    downButton.addEventListener('touchstart', downListener);
    downButton.addEventListener('mousedown', downListener);

    return function removeKeyboardListeners() {
        leftButton.removeEventListener('touchstart', leftListener);
        leftButton.removeEventListener('mousedown', leftListener);
        rightButton.removeEventListener('touchstart', rightListener);
        rightButton.removeEventListener('mousedown', rightListener);
        upButton.removeEventListener('touchstart', upListener);
        upButton.removeEventListener('mousedown', upListener);
        downButton.removeEventListener('touchstart', downListener);
        downButton.removeEventListener('mousedown', downListener);
        read.removeChild(controlBody);
    }
}
