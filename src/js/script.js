// eslint-disable-next-line import/extensions
import keyboardEng from './keyboardEn.js';
/* global document */

function createButton() {
  const title = document.createElement('h2');
  title.className = 'title';
  title.innerText = 'Virtual Keyboard';
  const paragraph = document.createElement('p');
  paragraph.className = 'keyboard-title';
  paragraph.innerText = 'Клавиатура создана в операционной системе Windows';
  const paragraph2 = document.createElement('p');
  paragraph2.className = 'keyboard-title';
  paragraph2.innerText = 'Для переключения языка комбинация: Ctrl + Alt';
  const textArea = document.createElement('textarea');
  textArea.className = 'textarea';
  const divWrapper = document.createElement('div');
  divWrapper.className = 'container';
  const row = document.createElement('div');
  row.className = 'row';
  divWrapper.append(row);
  keyboardEng.forEach((btn) => {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = btn.key;
    buttonEl.className = 'key';
    buttonEl.dataset.code = btn.code;
    if (btn.code === 'Backspace' || btn.code === 'CapsLock' || btn.code === 'ShiftLeft') {
      buttonEl.classList.add('backspace');
    } else if (btn.code === 'Enter' || btn.code === 'ShiftRight') {
      buttonEl.classList.add('shift');
    } else if (btn.code === 'Space') {
      buttonEl.classList.add('space');
    } else if (btn.code === 'Tab') {
      buttonEl.classList.add('tab');
    } else if (btn.code === 'Delete') {
      buttonEl.classList.add('del');
    } else if (btn.code === 'AltRight'
    || btn.code === 'ArrowLeft'
    || btn.code === 'ArrowDown'
    || btn.code === 'ArrowRight'
    || btn.code === 'ControlRight'
    || btn.code === 'AltLeft'
    || btn.code === 'MetaLeft'
    || btn.code === 'ControlLeft'
    || btn.code === 'ShiftRight'
    || btn.code === 'ArrowUp') {
      buttonEl.classList.add('btn-colored');
    }
    row.appendChild(buttonEl);
  });
  document.body.append(title, paragraph, paragraph2, textArea, divWrapper);
}
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const button = document.querySelectorAll('.key');
  const keyCode = e.code;
  button.forEach((btn) => {
    if (btn.dataset.code === keyCode) {
      btn.classList.add('active');
    }
  });
});

document.addEventListener('keyup', (e) => {
  e.preventDefault();
  const button = document.querySelectorAll('.key');
  const keyCode = e.code;
  button.forEach((btn) => {
    if (btn.dataset.code === keyCode) {
      btn.classList.remove('active');
    }
  });
});
createButton();
