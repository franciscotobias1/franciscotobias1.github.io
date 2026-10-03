const passa = document.querySelector("#passa");
const pinta = document.querySelector("#pinta");
const corpo = document.querySelector("body");
const mensagem = document.querySelector("#mensagem");
const campo = document.querySelector("#cor");
const tamanho = document.querySelector("#tamanho");
const imagem = document.querySelector("#imagem");
const contador = document.querySelector("#contador");

let grande = false;
let total = 0;

function entrar() {
  passa.textContent = "Obrigado por passares!";
  passa.style.color = "crimson";
}

function sair() {
  passa.textContent = "Passa por aqui!";
  passa.style.color = "";
}

function pintar(cor) {
  pinta.textContent = "Pintado de " + cor + "!";
  pinta.style.color = cor;
}

function pintarFundo() {
  const cor = campo.value.trim().toLowerCase();

  if (cor === "") {
    corpo.style.backgroundColor = "";
    mensagem.textContent = "Escreve uma cor em inglês:";
  } else if (CSS.supports("color", cor)) {
    corpo.style.backgroundColor = cor;
    mensagem.textContent = "Fundo pintado de " + cor + "!";
  } else {
    mensagem.textContent = "Não conheço a cor " + cor + ". Tenta outra:";
  }
}

function alternarTamanho() {
  grande = !grande;
  imagem.style.width = grande ? "200px" : "100px";
  tamanho.textContent = grande
    ? "Imagem grande. Duplo clique outra vez:"
    : "Faz duplo clique na imagem:";
}

function contar() {
  total++;
  contador.textContent = total;
  contador.style.color = total >= 10 ? "crimson" : "";
}

Object.assign(window, {
  entrar,
  sair,
  pintar,
  pintarFundo,
  alternarTamanho,
  contar,
});
