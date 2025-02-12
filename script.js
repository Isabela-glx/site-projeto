let params = new URLSearchParams(window.location.search);
let tempoTotal = params.get('tempo') * 60;
let segundosRestantes = tempoTotal;
let aviso1 = params.get('aviso1');
let aviso2 = params.get('aviso2');
let musicaSelecionada = params.get('musica');
let intervalo;

let musica = document.getElementById("musica");
document.getElementById("musicaSource").src = `assets/${musicaSelecionada}`;
musica.load();

function tocarAviso() {
    document.getElementById('avisoSom').play();
}

function atualizarCronometro() {
    let minutos = Math.floor(segundosRestantes / 60);
    let segundos = segundosRestantes % 60;
    document.getElementById('cronometro').textContent = 
        (minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
    
    if (segundosRestantes == aviso1 || segundosRestantes == aviso2) {
        tocarAviso();
    }
    
    if (segundosRestantes > 0) {
        segundosRestantes--;
    } else {
        clearInterval(intervalo);
    }
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
    segundosRestantes = tempoTotal;
    atualizarCronometro();
}

function toggleMusica() {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
    
function abrirCronometro() {
    let tempo = document.getElementById('tempo').value;
    let aviso1 = document.getElementById('aviso1').value;
    let aviso2 = document.getElementById('aviso2').value;
    let musica = document.getElementById('musica').value;
    let video = document.getElementById('video').value;
    
    let url = `cronometro.html?tempo=${tempo}&aviso1=${aviso1}&aviso2=${aviso2}&musica=${musica}&video=${video}`;
    window.open(url, '_blank', 'width=800,height=600');
}

}

atualizarCronometro();
