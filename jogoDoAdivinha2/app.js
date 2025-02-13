let listaNumerosSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatório();
let tentativas = 1;
//função retorno(parametro)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirTextoNaTela('h1', 'Jogo do numero secreto');
exibirTextoNaTela('p', 'escolha um numero entre 1 e 10');

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Voce acertou com ${tentativas} ${palavraTentativas} `;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o numero secreto e menor');
        } else {
            exibirTextoNaTela('p', 'o numero secreto e maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatório() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteado.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteado = [];
    }
    //se a lista de numero sorteados, incluir o numero escolhido, sortear novamente
    if (listaNumerosSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAleatório();
    } else {
        listaNumerosSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'escolha um numero entre 1 e 10');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatório();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
