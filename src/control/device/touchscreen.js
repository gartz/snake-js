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
    const emptyBlock = document.createElement('div');
    const rightButton = document.createElement('div');

    leftButton.innerText = '<';
    rightButton.innerText = '>';

    controlBody.appendChild(leftButton);
    controlBody.appendChild(emptyBlock);
    controlBody.appendChild(rightButton);

    controlBody.style.position = 'fixed';
    controlBody.style.fontSize = '6rem';
    controlBody.style.color = '#FFF';
    controlBody.style.bottom = '0';
    controlBody.style.fontWeight = 'bold';
    controlBody.style.display = 'flex';
    controlBody.style.width = '100%';
    controlBody.style.padding = '10%';
    controlBody.style.boxSizing = 'border-box';
    controlBody.style.userSelect = 'none';

    leftButton.style.opacity = .5;
    leftButton.style.border = '8px solid #FFF'
    leftButton.style.borderRadius = '100%'
    leftButton.style.textAlign = 'center';
    leftButton.style.width = '80px';
    leftButton.style.height = '80px';
    leftButton.style.lineHeight = '80px';

    emptyBlock.style.flex = '1 1'

    rightButton.style.opacity = .5;
    rightButton.style.border = '8px solid #FFF'
    rightButton.style.borderRadius = '100%'
    rightButton.style.textAlign = 'center';
    rightButton.style.width = '80px';
    rightButton.style.height = '80px';
    rightButton.style.lineHeight = '80px';


    read.appendChild(controlBody);

    const leftListener = event => event.preventDefault() || write.invertLeft();
    const rightListener = event => event.preventDefault() || write.invertRight();

    leftButton.addEventListener('touchstart', leftListener);
    leftButton.addEventListener('mousedown', leftListener);
    rightButton.addEventListener('touchstart', rightListener);
    rightButton.addEventListener('mousedown', leftListener);

    return function removeKeyboardListeners() {
        leftButton.removeEventListener('touchstart', leftListener);
        leftButton.removeEventListener('mousedown', leftListener);
        rightButton.removeEventListener('touchstart', rightListener);
        rightButton.removeEventListener('mousedown', rightListener);
        read.removeChild(controlBody);
    }
}
