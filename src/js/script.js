// eslint-disable-next-line import/extensions
import keyboardEng from './keyboardEn.js';

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
  const textArea = document.querySelector('.textarea');
  const keyCode = e.code;
  const keyInput = e.key;
  if (keyCode === 'Enter') {
    textArea.value += '\n';
  } else if (keyCode === 'ArrowLeft') {
    textArea.value += '\u25C4';
  } else if (keyCode === 'ArrowRight') {
    textArea.value += '\u25BA';
  } else if (keyCode === 'ArrowUp') {
    textArea.value += '\u25B2';
  } else if (keyCode === 'ArrowDown') {
    textArea.value += '\u25BC';
  } else if (keyCode === 'Backspace') {
    textArea.value = textArea.value.slice(0, -1);
  } else if (keyCode === 'Delete') {
    textArea.value = textArea.value.substring(1);
  } else if (keyCode === 'Tab') {
    textArea.value += '    ';
  } else if (keyCode !== 'CapsLock') {
    textArea.value += keyInput;
  }
  button.forEach((btn) => {
    if (btn.dataset.code === keyCode) {
      textArea.focus();
      btn.classList.add('active');
    }
    if (keyCode === 'CapsLock') {
      btn.classList.toggle('caps');
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

document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('key')) {
    const textArea = document.querySelector('.textarea');
    const keyInput = e.target.innerText;
    textArea.focus();
    if (keyInput === 'Enter') {
      textArea.value += '\n';
    } else if (keyInput === 'Backspace') {
      textArea.value = textArea.value.slice(0, -1);
    } else if (keyInput === 'Del') {
      textArea.value = '';
    } else if (keyInput === 'Tab') {
      textArea.value += '    ';
    } else if (keyInput !== 'CapsLock') {
      textArea.value += keyInput;
    }
    e.target.classList.add('active');
  }
});

document.addEventListener('mouseup', (e) => {
  e.preventDefault();
  if (e.target.closest('.key')) {
    e.target.classList.remove('active');
  }
});
createButton();
