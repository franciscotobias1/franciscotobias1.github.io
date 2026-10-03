const LIMITE = 50;
const TEXTO_ESTADO = "Interage com a página para ver os eventos em ação.";
const TEXTO_LEGENDA =
  "Passa o cursor sobre o gráfico. Clica para alternar a versão a preto e branco.";

const estado = document.querySelector("#estado");
const valor = document.querySelector("#valor");
const situacao = document.querySelector("#situacao");
const preenchimento = document.querySelector("#preenchimento");
const area = document.querySelector("#area");
const guiaX = document.querySelector("#guia-x");
const guiaY = document.querySelector("#guia-y");
const coordenadas = document.querySelector("#coordenadas");
const grafico = document.querySelector("#grafico");
const legenda = document.querySelector("#legenda");

let total = 0;
let monocromatico = false;

function atualizar() {
  const percentagem = Math.round((total / LIMITE) * 100);
  let cor = "#16a34a";
  let texto = "Lotação normal";

  if (total === 0) {
    texto = "Sala vazia";
  } else if (total >= LIMITE) {
    cor = "#dc2626";
    texto = "Lotação máxima atingida";
  } else if (percentagem >= 80) {
    cor = "#d97706";
    texto = "Lotação quase completa";
  }

  valor.textContent = total;
  valor.style.color = cor;
  valor.style.transform = "scale(1.08)";
  setTimeout(() => {
    valor.style.transform = "scale(1)";
  }, 120);

  situacao.textContent =
    texto + " (" + total + " de " + LIMITE + " pessoas, " + percentagem + "%)";
  preenchimento.style.width = percentagem + "%";
  preenchimento.style.backgroundColor = cor;
}

function alterar(n) {
  total = Math.min(LIMITE, Math.max(0, total + n));
  atualizar();
}

function adicionarGrupo() {
  alterar(5);
}

function reiniciar() {
  total = 0;
  atualizar();
}

function dica(texto) {
  estado.textContent = texto || TEXTO_ESTADO;
}

function entrarArea() {
  guiaX.style.opacity = "1";
  guiaY.style.opacity = "1";
}

function seguirRato(evento) {
  const caixa = area.getBoundingClientRect();
  const x = Math.round(evento.clientX - caixa.left);
  const y = Math.round(evento.clientY - caixa.top);
  const px = Math.round((x / caixa.width) * 100);
  const py = Math.round((y / caixa.height) * 100);

  guiaX.style.left = x + "px";
  guiaY.style.top = y + "px";
  area.style.backgroundColor = "hsl(217, 70%, " + (96 - px * 0.14) + "%)";
  coordenadas.textContent =
    "x: " + x + " px (" + px + "%)   y: " + y + " px (" + py + "%)";
}

function sairArea() {
  guiaX.style.opacity = "0";
  guiaY.style.opacity = "0";
  area.style.backgroundColor = "";
  coordenadas.textContent = "Cursor fora da área de medição.";
}

function realcar() {
  grafico.style.transform = "scale(1.02)";
  grafico.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.18)";
  legenda.textContent =
    "Pico de ocupação à sexta-feira, com cerca de 42 pessoas.";
}

function repor() {
  grafico.style.transform = "";
  grafico.style.boxShadow = "";
  legenda.textContent = TEXTO_LEGENDA;
}

function alternarCor() {
  monocromatico = !monocromatico;
  grafico.style.filter = monocromatico ? "grayscale(1)" : "";
  legenda.textContent = monocromatico
    ? "Versão a preto e branco, adequada para impressão."
    : "Versão a cores reposta.";
}

Object.assign(window, {
  alterar,
  adicionarGrupo,
  reiniciar,
  dica,
  entrarArea,
  seguirRato,
  sairArea,
  realcar,
  repor,
  alternarCor,
});
