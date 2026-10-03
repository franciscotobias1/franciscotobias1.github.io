const passa = document.querySelector("#passa");
const pinta = document.querySelector("#pinta");
const zona = document.querySelector("#zona");
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

function mover(evento) {
  zona.textContent = "x: " + evento.clientX + "  y: " + evento.clientY;
  zona.style.backgroundColor = "hsl(" + (evento.clientX % 360) + ", 70%, 90%)";
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
  mover,
  alternarTamanho,
  contar,
});
