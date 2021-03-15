const paineis = document.querySelectorAll('.painel');
const iniciar = document.querySelector('#inicia')
let rodada = document.querySelector('span')

let guardaSequencia = [];
let limiteRodada = 0;
let atual = 0;
let notasMusicais = ['sine', 'square', 'triangle', 'sawtooth', 'triangle'];
let sequencia = {};

function geraSequencia() {
    let first = Math.floor(Math.random() * 5);
    sequencia = { numero: first, nota: notasMusicais[first] }
    guardaSequencia.push(sequencia);
    limiteRodada = guardaSequencia.length;
    rodada.innerHTML = limiteRodada
}

function acende() {
    let i = 1;
    guardaSequencia.map(x => {
        setTimeout(() => {
            paineis[x.numero].style.border = "solid white";
            toca(x.nota);
        }, i * 1000)
        i++;
    })
}

function apaga() {
    let i = 1;
    guardaSequencia.map(x => {
        setTimeout(() => {
            paineis[x.numero].style.border = "";
        }, i * 1000)
        i++;
    })
}

function clicou(event) {
    let numeroTela = guardaSequencia[atual].numero + 1;
    if (event.target.innerText == numeroTela) {
        toca(notasMusicais[event.target.innerText - 1]);
        atual++;

        if (limiteRodada == atual) {
            atual = 0;
            main();
        }
    } else {
        if (Number(event.target.innerText)) {
            alert('ERROU FIOTE!');
            guardaSequencia = [];
            atual = 0;
            sequencia = {};
            context = null;
        }
    }
}

function main() {
    geraSequencia();
    acende();
    setTimeout(apaga, 1000);
}

addEventListener('click', clicou);


let context,
    oscillator,
    contextGain,
    x = 1,
    type = '';

function start() {
    context = new AudioContext();
    oscillator = context.createOscillator();
    contextGain = context.createGain();

    oscillator.type = type;
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    oscillator.start(0);
}

function stop() {
    start();
    contextGain.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + x
    )

    if (context.currentTime == 0) {
        context.currentTime += x
    }
}

function inicia() {
    main();
}

iniciar.addEventListener('click', inicia)

function toca(nota) {
    console.log(nota);
    type = nota;
    stop();
};


