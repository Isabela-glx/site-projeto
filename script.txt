let timer;
let isRunning = false;
let seconds = 0;

const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const previewBtn = document.getElementById('previewBtn');
const voiceSelect = document.getElementById('voiceSelect');

// Iniciar/Parar cronômetro
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Iniciar';
    } else {
        timer = setInterval(updateTimer, 1000);
        startStopBtn.textContent = 'Parar';
    }
    isRunning = !isRunning;
});

// Resetar cronômetro
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    timerDisplay.textContent = '00:00';
    startStopBtn.textContent = 'Iniciar';
    isRunning = false;
});

// Atualizar cronômetro
function updateTimer() {
    seconds++;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Prévia da voz
previewBtn.addEventListener('click', () => {
    const voiceChoice = voiceSelect.value;
    if (voiceChoice === 'system') {
        const msg = new SpeechSynthesisUtterance('Prévia da voz do sistema');
        speechSynthesis.speak(msg);
    } else {
        const msg = new Audio('voz_pregravada.mp3');
        msg.play();
    }
});
