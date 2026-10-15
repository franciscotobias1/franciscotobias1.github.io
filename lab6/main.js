const nodeInputNumero = document.querySelector("form input[type='number']");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeForm = document.querySelector("form");
const nodeSpanTotal = document.querySelector("#colecao h3 span");
const nodeSpanTotalRepetidos = document.querySelector("#repetidos h3 span");
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];
let totalRepetidos = repetidos.length;

function guardaStorage() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    totalRepetidos++;
    atualizaLista(repetidos, nodeUlRepetidos);
    nodeSpanTotalRepetidos.textContent = totalRepetidos;
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    atualizaLista(colecao, nodeUlColecao);
    nodeSpanTotal.textContent = colecao.length;
  }
  guardaStorage();
}

function atualizaLista(lista, nodeUl) {
  nodeUl.innerHTML = "";
  lista.forEach(numero => {
    if (lista === repetidos) {
      nodeUl.innerHTML += "<li>" + numero + " <button>Eliminar</button></li>";
    } else {
      nodeUl.innerHTML += "<li>" + numero + "</li>";
    }
  });
  if (lista === repetidos) {
    associaEventosEliminar();
  }
}

function eliminaRepetido(indice) {
  repetidos.splice(indice, 1);
  totalRepetidos--;
  nodeSpanTotalRepetidos.textContent = totalRepetidos;
  atualizaLista(repetidos, nodeUlRepetidos);
  guardaStorage();
}

function associaEventosEliminar() {
  const botoes = document.querySelectorAll("#repetidos li button");
  botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
      eliminaRepetido(indice);
    });
  });
}

nodeForm.addEventListener("submit", event => {
  event.preventDefault();
  guardaCarta();
});

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
nodeSpanTotal.textContent = colecao.length;
nodeSpanTotalRepetidos.textContent = totalRepetidos;
