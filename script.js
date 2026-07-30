// ============================================
// ELEMENTOS DO DOM
// ============================================

const inputField = document.getElementById('inputValue');
const inputLabel = document.getElementById('inputLabel');
const inputHint = document.getElementById('inputHint');
const resultValue = document.getElementById('resultValue');
const resultUnit = document.getElementById('resultUnit');
const resultArea = document.getElementById('resultArea');
const btnCopy = document.getElementById('btnCopy');
const copyText = document.getElementById('copyText');
const btnClear = document.getElementById('btnClear');
const btnClearHistory = document.getElementById('btnClearHistory');
const historyList = document.getElementById('historyList');
const modeBtns = document.querySelectorAll('.mode-btn');

// ============================================
// ESTADO DA APLICACAO
// ============================================

let currentMode = 'ms-to-s';
let history = JSON.parse(localStorage.getItem('timeconv_history') || '[]');
let lastResult = '';
let historyTimeout = null;

// Configuracao de cada modo de conversao
const modeConfig = {
  'ms-to-s': {
    label: 'Minutos:Segundos',
    placeholder: 'Ex: 3:45',
    hint: 'Digite no formato minutos:segundos',
    unit: 'segundos',
  },
  's-to-ms': {
    label: 'Segundos',
    placeholder: 'Ex: 225',
    hint: 'Digite a quantidade de segundos',
    unit: 'min:seg',
  },
};

// Nomes curtos para exibir no historico
const modeNames = {
  'ms-to-s': 'min → seg',
  's-to-ms': 'seg → min',
};

// ============================================
// FUNCOES DE CONVERSAO
// ============================================

/**
 * Converte minutos:segundos para total de segundos.
 * Aceita formatos: "3:45", "03:05", "0:30"
 */
function msToSeconds(input) {
  // Regex exige a string inteira valida: parseInt aceitaria "3:45abc"
  const match = input.match(/^(\d+):([0-5]?\d)$/);
  if (!match) return null;

  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

/**
 * Converte total de segundos para formato minutos:segundos.
 */
function secondsToMs(input) {
  // Aceita "225" e "225.5" / "225,5"; recusa qualquer outro caractere
  if (!/^\d+(?:[.,]\d+)?$/.test(input)) return null;

  const sec = parseFloat(input.replace(',', '.'));
  if (isNaN(sec)) return null;

  const totalSec = Math.round(sec);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;

  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

/**
 * Formata a entrada de minutos:segundos automaticamente.
 * Ex: "3:5" -> exibe "03:05" no resultado
 */
function formatMsInput(input) {
  const parts = input.split(':');
  if (parts.length !== 2) return input;

  const m = parts[0].padStart(2, '0');
  const s = parts[1].padStart(2, '0');
  return m + ':' + s;
}

// ============================================
// CONVERSAO PRINCIPAL
// ============================================

function convert() {
  const raw = inputField.value.trim();

  // Campo vazio: reseta o resultado
  if (!raw) {
    resetResult();
    return;
  }

  let result = null;

  switch (currentMode) {
    case 'ms-to-s':
      result = msToSeconds(raw);
      break;
    case 's-to-ms':
      result = secondsToMs(raw);
      break;
  }

  if (result === null) {
    showError();
    return;
  }

  // Formatar entrada para exibicao no historico
  const displayInput = currentMode === 'ms-to-s' ? formatMsInput(raw) : raw;
  const displayResult = String(result);

  // Atualizar resultado na tela
  const changed = lastResult !== displayResult;
  lastResult = displayResult;
  resultValue.textContent = displayResult;
  resultArea.classList.add('has-value');
  clearError();
  if (changed) pulseResult();

  // Adicionar ao historico somente apos parar de digitar (800ms)
  clearTimeout(historyTimeout);
  historyTimeout = setTimeout(() => {
    addHistory(displayInput, displayResult, currentMode);
  }, 800);
}

// ============================================
// ESTADO DE ERRO E RESET
// ============================================

function showError() {
  // Limpa o resultado sem apagar o estado de erro
  clearResultDisplay();
  inputField.classList.remove('error');
  void inputField.offsetWidth;
  inputField.classList.add('error');
  inputHint.classList.add('error');
  inputHint.textContent = 'Valor invalido. Verifique o formato.';
}

function clearError() {
  inputField.classList.remove('error');
  inputHint.classList.remove('error');
  inputHint.textContent = modeConfig[currentMode].hint;
}

/** Redispara a animacao de atualizacao do resultado */
function pulseResult() {
  resultValue.classList.remove('updated');
  void resultValue.offsetWidth;
  resultValue.classList.add('updated');
}

/** Zera o painel de resultado (sem mexer no estado de erro) */
function clearResultDisplay() {
  clearTimeout(historyTimeout);
  lastResult = '';
  resultValue.textContent = '\u2014';
  resultValue.classList.remove('updated');
  resultArea.classList.remove('has-value');
}

function resetResult() {
  clearResultDisplay();
  clearError();
}

// ============================================
// TROCA DE MODO
// ============================================

function setMode(mode) {
  currentMode = mode;
  const config = modeConfig[mode];

  // Atualizar botoes
  modeBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Atualizar labels
  inputLabel.textContent = config.label;
  inputField.placeholder = config.placeholder;
  inputHint.textContent = config.hint;
  resultUnit.textContent = config.unit;

  // Limpar campo e resultado ao trocar modo
  inputField.value = '';
  resetResult();
  inputField.focus();
}

// ============================================
// HISTORICO
// ============================================

function addHistory(from, to, mode) {
  // Evitar duplicata consecutiva
  if (history.length > 0) {
    const last = history[0];
    if (last.from === from && last.to === to && last.mode === mode) return;
  }

  history.unshift({ from, to, mode });

  // Limitar a 20 itens
  if (history.length > 20) history.pop();

  localStorage.setItem('timeconv_history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<li class="history-empty">Nenhuma conversao ainda</li>';
    return;
  }

  historyList.innerHTML = history
    .map(
      (item) => `
    <li class="history-item">
      <span class="from">${escapeHtml(item.from)}</span>
      <span class="arrow">\u2192</span>
      <span class="to">${escapeHtml(item.to)}</span>
      <span class="mode-tag">${modeNames[item.mode] || item.mode}</span>
    </li>
  `
    )
    .join('');
}

function clearHistory() {
  history = [];
  localStorage.removeItem('timeconv_history');
  renderHistory();
}

/** Escapa HTML para prevenir XSS */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================
// COPIAR RESULTADO
// ============================================

async function copyResult() {
  if (!lastResult) return;

  try {
    await navigator.clipboard.writeText(lastResult);
    btnCopy.classList.add('copied');
    copyText.textContent = 'Copiado!';

    setTimeout(() => {
      btnCopy.classList.remove('copied');
      copyText.textContent = 'Copiar';
    }, 1500);
  } catch {
    // Fallback para navegadores sem Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = lastResult;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    btnCopy.classList.add('copied');
    copyText.textContent = 'Copiado!';
    setTimeout(() => {
      btnCopy.classList.remove('copied');
      copyText.textContent = 'Copiar';
    }, 1500);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Conversao em tempo real ao digitar
inputField.addEventListener('input', convert);

// Atalhos: Enter copia o resultado, Esc limpa o campo
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    copyResult();
  } else if (e.key === 'Escape') {
    inputField.value = '';
    resetResult();
  }
});

// Limpar campo
btnClear.addEventListener('click', () => {
  inputField.value = '';
  resetResult();
  inputField.focus();
});

// Copiar resultado
btnCopy.addEventListener('click', copyResult);

// Limpar historico
btnClearHistory.addEventListener('click', clearHistory);

// Botoes de modo
modeBtns.forEach((btn) => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

// ============================================
// INICIALIZACAO
// ============================================

renderHistory();
inputField.focus();
