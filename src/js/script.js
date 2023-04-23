// eslint-disable-next-line import/extensions
import keyboardEng from './keyboardEn.js';
/* global document */

function createButton() {
  console.log('dss');
  const title = document.createElement('h2');
  title.className = 'title';
  title.innerText = 'Virtual Keyboard';
  const paragraph = document.createElement('p');
  paragraph.className = 'keyboard-title';
  paragraph.innerText = 'Клавиатура создана в операционной системе Windows';
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
    }
    row.appendChild(buttonEl);
  });
  document.body.append(title, paragraph, textArea, divWrapper);
}

createButton();
