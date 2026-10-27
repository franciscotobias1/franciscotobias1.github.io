// A. Estado e variáveis com referência de elementos do DOM
const produtosSection = document.querySelector("#produtos")
const cestoSection = document.querySelector("#cesto")
const totalElemento = document.querySelector("#total")

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]))
}

// B. Funções utilitárias
function lerCesto() {
  return JSON.parse(localStorage.getItem("produtos-selecionados"))
}

function guardarCesto(lista) {
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista))
}

function adicionarAoCesto(produto) {
  const lista = lerCesto()
  lista.push(produto)
  guardarCesto(lista)
  atualizaCesto()
}

function removerDoCesto(produto) {
  const lista = lerCesto()
  const indice = lista.findIndex(function (item) {
    return item.id === produto.id
  })
  if (indice !== -1) {
    lista.splice(indice, 1)
  }
  guardarCesto(lista)
  atualizaCesto()
}

function criarProduto(produto) {
  const article = document.createElement("article")

  const titulo = document.createElement("h3")
  titulo.textContent = produto.title

  const imagem = document.createElement("img")
  imagem.src = produto.image
  imagem.alt = produto.title

  const descricao = document.createElement("p")
  descricao.textContent = produto.description

  const preco = document.createElement("p")
  preco.textContent = produto.price.toFixed(2) + " €"

  const rating = document.createElement("p")
  rating.textContent = "Rating: " + produto.rating.rate + " (" + produto.rating.count + ")"

  const botao = document.createElement("button")
  botao.textContent = "+ Adicionar ao cesto"
  botao.addEventListener("click", function () {
    adicionarAoCesto(produto)
  })

  article.append(titulo, imagem, descricao, preco, rating, botao)
  return article
}

function criarProdutoCesto(produto) {
  const article = document.createElement("article")

  const titulo = document.createElement("h3")
  titulo.textContent = produto.title

  const imagem = document.createElement("img")
  imagem.src = produto.image
  imagem.alt = produto.title

  const preco = document.createElement("p")
  preco.textContent = produto.price.toFixed(2) + " €"

  const botao = document.createElement("button")
  botao.textContent = "- Remover do cesto"
  botao.addEventListener("click", function () {
    removerDoCesto(produto)
  })

  article.append(titulo, imagem, preco, botao)
  return article
}

// C. Event handlers
function renderizarProdutos(produtos) {
  produtos.forEach(function (produto) {
    produtosSection.append(criarProduto(produto))
  })
}

function atualizaCesto() {
  const lista = lerCesto()

  cestoSection.replaceChildren()
  lista.forEach(function (produto) {
    cestoSection.append(criarProdutoCesto(produto))
  })

  const total = lista.reduce(function (soma, produto) {
    return soma + produto.price
  }, 0)
  totalElemento.textContent = "Total: " + total.toFixed(2) + " €"
}

// E. Inicialização
renderizarProdutos(produtos)
atualizaCesto()
