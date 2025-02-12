document.addEventListener("DOMContentLoaded", function() {
    // Função para iniciar o cronômetro
    function startCountdown() {
        const videoFile = document.getElementById("video").files[0];
        const musicaFile = document.getElementById("musica").files[0];
        const vozTipo = document.getElementById("voz").value;
        const tempo = document.getElementById("tempo").value;

        if (videoFile && musicaFile && tempo) {
            // Armazena os dados no localStorage para usar na segunda etapa
            localStorage.setItem('video', URL.createObjectURL(videoFile));
            localStorage.setItem('musica', URL.createObjectURL(musicaFile));
            localStorage.setItem('voz', vozTipo);
            localStorage.setItem('tempo', tempo);

            // Exibe a tela de aviso e esconde a tela de configuração
            document.getElementById("configContainer").style.display = "none";
            document.getElementById("avisosContainer").style.display = "block";

            // Exibe a mensagem de aviso com voz, se configurada
            const avisoMessage = document.getElementById("avisoMessage");
            const vozTipo = localStorage.getItem('voz');

            if (vozTipo === 'sistema') {
                const msg = new SpeechSynthesisUtterance("Preparando para a contagem");
                speechSynthesis.speak(msg);
            } else if (vozTipo === 'pre-gravada') {
                // Aqui, adicione código para tocar uma voz pré-gravada se necessário
                const audio = new Audio('caminho/para/voz-pre-gravada.mp3');
                audio.play();
            }

            avisoMessage.style.opacity = 1;

            setTimeout(function() {
                startFinalCountdown(); // Começa a contagem regressiva após os avisos
            }, 5000); // Tempo para exibir o aviso (5 segundos)
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    }

    // Função para iniciar a contagem regressiva final
    function startFinalCountdown() {
        const video = localStorage.getItem('video');
        const musica = localStorage.getItem('musica');
        const tempo = parseInt(localStorage.getItem('tempo'));
        const timerDisplay = document.getElementById("timer");
        const videoElement = document.getElementById("videoBackground");

        // Configura o vídeo de fundo
        videoElement.src = video;
        videoElement.style.display = "block";

        // Reproduz a música
        const audio = new Audio(musica);
        audio.play();

        // Inicia a contagem regressiva
        let countdown = tempo;
        timerDisplay.style.display = "block";

        const interval = setInterval(function() {
            if (countdown <= 0) {
                clearInterval(interval);
                timerDisplay.textContent = "Tempo esgotado!";
                // Finaliza o áudio após a contagem
                audio.pause();
                audio.currentTime = 0;
            } else {
                timerDisplay.textContent = countdown;
                countdown--;
            }
        }, 1000);
    }

    // Função para exibir mensagens de aviso antes da contagem regressiva
    function showMessage(message, duration = 2000) {
        const avisoMessage = document.getElementById("avisoMessage");
        avisoMessage.textContent = message;
        avisoMessage.style.opacity = 1;
        setTimeout(function() {
            avisoMessage.style.opacity = 0;
        }, duration);
    }

    // Função para alterar o vídeo e a música
    function updateVideoAndMusic() {
        const videoFile = document.getElementById("video").files[0];
        const musicaFile = document.getElementById("musica").files[0];

        if (videoFile) {
            const videoElement = document.getElementById("videoBackground");
            videoElement.src = URL.createObjectURL(videoFile);
        }

        if (musicaFile) {
            const audio = new Audio(URL.createObjectURL(musicaFile));
            audio.play();
        }
    }

    // Função para limpar as configurações do cronômetro
    function resetSettings() {
        document.getElementById("video").value = "";
        document.getElementById("musica").value = "";
        document.getElementById("voz").value = "sistema";
        document.getElementById("tempo").value = 30;
        document.getElementById("videoBackground").style.display = "none";
        document.getElementById("timer").style.display = "none";
    }

    // Exemplo de uso das funções adicionais
    const resetButton = document.createElement("button");
    resetButton.textContent = "Resetar Configurações";
    resetButton.onclick = resetSettings;
    document.body.appendChild(resetButton);

    // Associando a função de iniciar o cronômetro ao botão
    document.querySelector("button").onclick = startCountdown;

    // Monitorando mudanças nos arquivos de vídeo ou música
    document.getElementById("video").addEventListener("change", updateVideoAndMusic);
    document.getElementById("musica").addEventListener("change", updateVideoAndMusic);
});
