let segundos = 0;
let intervalo;
let musica = document.getElementById("musica");

function atualizarCronometro() {
    const cronometro = document.getElementById("cronometro");
    let minutos = Math.floor(segundos / 60);
    let seg = segundos % 60;
    cronometro.textContent = 
        (minutos < 10 ? "0" : "") + minutos + ":" + (seg < 10 ? "0" : "") + seg;
    segundos++;
}

function iniciarCronometro() {
    if (!intervalo) {
        intervalo = setInterval(atualizarCronometro, 1000);
    }
}

function pararCronometro() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciarCronometro() {
    pararCronometro();
    segundos = 0;
    document.getElementById("cronometro").textContent = "00:00";
}

function toggleMusica() {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}
