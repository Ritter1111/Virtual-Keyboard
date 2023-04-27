import keyboardEng from './keyboardEn.js';
import keyboardRu from './keyboardRu.js';

let currentLanguage = localStorage.getItem('keyboardLanguage') || 'keyboardEng';
let isCaps = false;
let isShiftPressed = false;

const createPage = () => {
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
  textArea.placeholder = 'Type some text here...';
  document.body.append(title, paragraph, paragraph2, textArea);
};

const createButton = () => {
  const divWrapper = document.createElement('div');
  divWrapper.className = 'container';
  const row = document.createElement('div');
  row.className = 'row';
  divWrapper.append(row);
  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  keyboard.forEach(({ key, code }) => {
    const buttonEl = document.createElement('button');
    if (isCaps || isShiftPressed) {
      buttonEl.innerHTML = key.toUpperCase();
    } else {
      buttonEl.innerHTML = key;
    }
    buttonEl.className = 'key';
    buttonEl.dataset.code = code;
    if (code === 'Backspace' || code === 'CapsLock' || code === 'ShiftLeft') {
      buttonEl.classList.add('backspace');
    } else if (code === 'Enter' || code === 'ShiftRight') {
      buttonEl.classList.add('shift');
    } else if (code === 'Space') {
      buttonEl.classList.add('space');
    } else if (code === 'Tab') {
      buttonEl.classList.add('tab');
    } else if (code === 'Delete') {
      buttonEl.classList.add('del');
    } else if (code === 'AltRight'
   || code === 'ArrowLeft'
    || code === 'ArrowDown'
    || code === 'ArrowRight'
    || code === 'ControlRight'
    || code === 'AltLeft'
    || code === 'MetaLeft'
    || code === 'ControlLeft'
    || code === 'ShiftRight'
    || code === 'ArrowUp') {
      buttonEl.classList.add('btn-colored');
    }
    row.appendChild(buttonEl);
  });
  document.body.append(divWrapper);
};

const switchKeyboard = () => {
  currentLanguage = currentLanguage === 'keyboardEng' ? 'keyboardRu' : 'keyboardEng';
  localStorage.setItem('keyboardLanguage', currentLanguage);
  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  const button = document.querySelectorAll('.key');
  button.forEach((butn, idx) => {
    const btn = butn;
    btn.innerHTML = keyboard[idx].key;
    btn.dataset.code = keyboard[idx].code;
  });
};

const renderNewKeyboard = () => {
  const buttons = document.querySelectorAll('.key');
  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  buttons.forEach((butn, idx) => {
    const btn = butn;
    if (isShiftPressed) {
      btn.innerHTML = keyboard[idx].key2;
      btn.dataset.code = keyboard[idx].code;
    } else {
      btn.innerHTML = keyboard[idx].key;
      btn.dataset.code = keyboard[idx].code;
    }
  });
};

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const button = document.querySelectorAll('.key');
  const textArea = document.querySelector('.textarea');
  const kursor = textArea.selectionEnd;
  const kursorStart = textArea.selectionStart;
  const keyCode = e.code;
  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  const keyboardObj = keyboard.find((key) => key.code === e.code);
  if (keyboardObj === undefined) {
    return;
  }
  const keyInput = isShiftPressed ? keyboardObj.key2 : keyboardObj.key;
  if ((keyCode === 'AltLeft' && e.ctrlKey)
  || (keyCode === 'AltRight' && e.ctrlKey)
  || (keyCode === 'ControlLeft' && e.altKey)
  || (keyCode === 'ControlRight' && e.altKey)) {
    switchKeyboard();
  }
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
    if (kursorStart > 0) {
      textArea.value = textArea.value.slice(0, kursorStart - 1) + textArea.value.slice(kursorStart);
      textArea.setSelectionRange(kursorStart - 1, kursorStart - 1);
    }
  } else if (keyCode === 'Delete') {
    textArea.value = textArea.value.slice(0, kursor) + textArea.value.slice(kursor + 1);
    textArea.selectionEnd = kursor;
  } else if (keyCode === 'Tab') {
    textArea.value += '    ';
  } else if (keyCode === 'Space') {
    textArea.value += ' ';
  } else if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    isShiftPressed = true;
    renderNewKeyboard();
  } else if (keyCode === 'CapsLock') {
    isCaps = !isCaps;
    renderNewKeyboard();
  } else if (keyCode !== 'CapsLock'
  && keyCode !== 'ShiftRight'
  && keyCode !== 'ShiftLeft'
  && keyCode !== 'ControlLeft'
  && keyCode !== 'ControlLeft'
  && keyCode !== 'ControlRight'
  && keyCode !== 'AltRight'
  && keyCode !== 'AltLeft'
  && keyCode !== 'MetaLeft') {
    if (isCaps) {
      textArea.value += keyInput.toUpperCase();
    } else {
      textArea.value += keyInput;
    }
  }
  button.forEach((btn) => {
    if (btn.dataset.code === keyCode) {
      textArea.focus();
      btn.classList.add('active');
    }
    if (keyCode === 'CapsLock') {
      if (!btn.classList.contains('del')
      && !btn.classList.contains('backspace')
      && !btn.classList.contains('shift')
      && !btn.classList.contains('btn-colored')
      && !btn.classList.contains('tab')) {
        btn.classList.toggle('caps');
      }
    }
  });
});

document.addEventListener('keyup', (e) => {
  e.preventDefault();
  const button = document.querySelectorAll('.key');
  const keyCode = e.code;
  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft' || e.code === 'CapsLock') {
    isShiftPressed = false;
    renderNewKeyboard();
  }
  button.forEach((btn) => {
    if (btn.dataset.code === keyCode) {
      btn.classList.remove('active');
    }
  });
});

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('key')) {
    const textArea = document.querySelector('.textarea');
    const kursor = textArea.selectionEnd;
    const kursorStart = textArea.selectionStart;
    const keyInput = e.target.innerText;
    textArea.focus();
    if (keyInput === 'Enter') {
      textArea.value += '\n';
    } else if (keyInput === 'Backspace') {
      if (kursorStart > 0) {
        textArea.value = textArea.value.slice(0, kursorStart - 1)
        + textArea.value.slice(kursorStart);
        textArea.setSelectionRange(kursorStart - 1, kursorStart - 1);
      }
    } else if (keyInput === 'Del') {
      textArea.value = textArea.value.slice(0, kursor) + textArea.value.slice(kursor + 1);
      textArea.selectionEnd = kursor;
    } else if (keyInput === 'Shift') {
      isShiftPressed = true;
      renderNewKeyboard();
    } else if (keyInput === 'CapsLock') {
      isCaps = !isCaps;
      renderNewKeyboard();
    } else if (keyInput === 'Tab') {
      textArea.value += '    ';
    } else if (keyInput !== 'CapsLock'
    && keyInput !== 'Shift'
    && keyInput !== 'ShiftLeft'
    && keyInput !== 'Ctrl'
    && keyInput !== 'Alt'
    && keyInput !== 'Win'
    && keyInput !== 'AltRight'
    && keyInput !== 'AltLeft'
    && keyInput !== 'MetaLeft') {
      if (isCaps) {
        textArea.value += keyInput.toUpperCase();
      } else {
        textArea.value += keyInput;
      }
    }
    e.target.classList.add('active');
    const button = document.querySelectorAll('.key');
    button.forEach((btn) => {
      if (keyInput === 'CapsLock') {
        if (!btn.classList.contains('del')
        && !btn.classList.contains('backspace')
        && !btn.classList.contains('shift')
        && !btn.classList.contains('btn-colored')
        && !btn.classList.contains('tab')) {
          btn.classList.toggle('caps');
        }
      }
    });
  }
});

document.addEventListener('mouseup', (e) => {
  const keyInput = e.target.innerText;
  if (keyInput === 'Shift') {
    isShiftPressed = false;
    renderNewKeyboard();
  }
  if (e.target.closest('.key')) {
    e.target.classList.remove('active');
  }
});

document.addEventListener('mouseout', (e) => {
  const keyInput = e.target.innerText;
  if (keyInput !== 'CapsLock') {
    e.target.classList.remove('active');
  }
});

createPage();

createButton();
