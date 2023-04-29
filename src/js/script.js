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

const createKeyboard = () => {
  const divWrapper = document.createElement('div');
  divWrapper.className = 'container';

  const row = document.createElement('div');
  row.className = 'row';
  divWrapper.append(row);

  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  keyboard.forEach(({ key, code }) => {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = isCaps || isShiftPressed ? key.toUpperCase() : key;
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

const insertCursor = (cursor) => {
  const textArea = document.querySelector('.textarea');
  const kursorEnd = textArea.selectionEnd;
  const kursorStart = textArea.selectionStart;
  const newCursorPosition = kursorStart + cursor.length;
  textArea.value = textArea.value.substring(0, kursorStart) + cursor
  + textArea.value.substring(kursorEnd);
  textArea.setSelectionRange(newCursorPosition, newCursorPosition);
};

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const button = document.querySelectorAll('.key');
  const textArea = document.querySelector('.textarea');
  const kursorEnd = textArea.selectionEnd;
  const kursorStart = textArea.selectionStart;
  const keyboard = currentLanguage === 'keyboardEng' ? keyboardEng : keyboardRu;
  const keyboardObj = keyboard.find((key) => key.code === e.code);
  if (keyboardObj === undefined) {
    return;
  }
  const keyInput = isShiftPressed ? keyboardObj.key2 : keyboardObj.key;
  if ((e.code === 'AltLeft' && e.ctrlKey)
  || (e.code === 'AltRight' && e.ctrlKey)
  || (e.code === 'ControlLeft' && e.altKey)
  || (e.code === 'ControlRight' && e.altKey)) {
    switchKeyboard();
  }
  if (e.code === 'Enter') {
    insertCursor('\n');
  } else if (e.code === 'ArrowLeft') {
    textArea.value += '\u21D0';
  } else if (e.code === 'ArrowRight') {
    textArea.value += '\u21D2';
  } else if (e.code === 'ArrowUp') {
    textArea.value += '\u21D1';
  } else if (e.code === 'ArrowDown') {
    textArea.value += '\u21D3';
  } else if (e.code === 'Backspace') {
    if (kursorStart > 0) {
      textArea.value = textArea.value.slice(0, kursorStart - 1) + textArea.value.slice(kursorStart);
      textArea.setSelectionRange(kursorStart - 1, kursorStart - 1);
    }
  } else if (e.code === 'Delete') {
    textArea.value = textArea.value.slice(0, kursorEnd) + textArea.value.slice(kursorEnd + 1);
    textArea.selectionEnd = kursorEnd;
  } else if (e.code === 'Tab') {
    insertCursor('    ');
  } else if (e.code === 'Space') {
    insertCursor(' ');
  } else if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
    isShiftPressed = true;
    renderNewKeyboard();
  } else if (e.code === 'CapsLock') {
    isCaps = !isCaps;
    renderNewKeyboard();
  } else if (e.code !== 'CapsLock'
  && e.code !== 'ShiftRight'
  && e.code !== 'ShiftLeft'
  && e.code !== 'ControlLeft'
  && e.code !== 'ControlLeft'
  && e.code !== 'ControlRight'
  && e.code !== 'AltRight'
  && e.code !== 'AltLeft'
  && e.code !== 'MetaLeft') {
    if (isCaps) {
      insertCursor(keyInput.toUpperCase());
    } else {
      insertCursor(keyInput);
    }
  }
  button.forEach((btn) => {
    if (btn.dataset.code === e.code) {
      textArea.focus();
      btn.classList.add('active');
    }
    if (e.code === 'CapsLock') {
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
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft' || e.code === 'CapsLock') {
    isShiftPressed = false;
    renderNewKeyboard();
  }
  button.forEach((btn) => {
    if (btn.dataset.code === e.code) {
      btn.classList.remove('active');
    }
  });
});

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('key')) {
    const textArea = document.querySelector('.textarea');
    const kursorEnd = textArea.selectionEnd;
    const kursorStart = textArea.selectionStart;
    const button = document.querySelectorAll('.key');
    const keyInput = e.target.innerText;
    if (keyInput === 'Enter') {
      insertCursor('\n');
    } else if (keyInput === 'Backspace') {
      if (kursorStart > 0) {
        textArea.value = textArea.value.slice(0, kursorStart - 1)
        + textArea.value.slice(kursorStart);
        textArea.setSelectionRange(kursorStart - 1, kursorStart - 1);
      }
    } else if (keyInput === 'Del') {
      textArea.value = textArea.value.slice(0, kursorEnd) + textArea.value.slice(kursorEnd + 1);
      textArea.selectionEnd = kursorEnd;
    } else if (keyInput === 'Shift') {
      isShiftPressed = true;
      renderNewKeyboard();
    } else if (keyInput === 'CapsLock') {
      isCaps = !isCaps;
      renderNewKeyboard();
    } else if (keyInput === 'Tab') {
      insertCursor('    ');
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
        insertCursor(keyInput.toUpperCase());
      } else {
        insertCursor(keyInput);
      }
    }
    textArea.focus();
    e.target.classList.add('active');
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
  const textArea = document.querySelector('.textarea');
  const keyInput = e.target.innerText;
  if (keyInput === 'Shift') {
    isShiftPressed = false;
    renderNewKeyboard();
  }
  if (e.target.closest('.key')) {
    textArea.focus();
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

createKeyboard();
