// A. Estado e variáveis com referência de elementos do DOM
const API = "https://deisishop.pw.deisi.ulusofona.pt"

const produtosSection = document.querySelector("#produtos")
const cestoSection = document.querySelector("#cesto")
const totalElemento = document.querySelector("#total")
const categoriaSelect = document.querySelector("#categoria")
const ordemSelect = document.querySelector("#ordem")
const pesquisaInput = document.querySelector("#pesquisa")
const estudanteCheckbox = document.querySelector("#estudante")
const cupaoInput = document.querySelector("#cupao")
const comprarBotao = document.querySelector("#comprar")
const resultadoElemento = document.querySelector("#resultado")

let todosProdutos = []

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
  imagem.src = API + produto.image
  imagem.alt = produto.title

  const descricao = document.createElement("p")
  descricao.textContent = produto.description

  const preco = document.createElement("p")
  preco.textContent = Number(produto.price).toFixed(2) + " €"

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
  imagem.src = API + produto.image
  imagem.alt = produto.title

  const preco = document.createElement("p")
  preco.textContent = Number(produto.price).toFixed(2) + " €"

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
  produtosSection.replaceChildren()
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
    return soma + Number(produto.price)
  }, 0)
  totalElemento.textContent = "Total: " + total.toFixed(2) + " €"
}

function atualizarLista() {
  const categoria = categoriaSelect.value
  const texto = pesquisaInput.value.toLowerCase()

  const lista = todosProdutos
    .filter(function (produto) {
      return categoria === "" || produto.category === categoria
    })
    .filter(function (produto) {
      return produto.title.toLowerCase().includes(texto)
    })

  if (ordemSelect.value === "asc") {
    lista.sort(function (a, b) {
      return a.price - b.price
    })
  } else if (ordemSelect.value === "desc") {
    lista.sort(function (a, b) {
      return b.price - a.price
    })
  }

  renderizarProdutos(lista)
}

function carregarCategorias(categorias) {
  categorias.forEach(function (categoria) {
    const opcao = document.createElement("option")
    opcao.value = categoria.name
    opcao.textContent = categoria.name
    categoriaSelect.append(opcao)
  })
}

function comprar() {
  const lista = lerCesto()

  if (lista.length === 0) {
    resultadoElemento.textContent = "O cesto está vazio."
    return
  }

  const pedido = {
    products: lista.map(function (produto) {
      return produto.id
    }),
    student: estudanteCheckbox.checked,
    coupon: cupaoInput.value
  }

  fetch(API + "/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pedido)
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro " + resposta.status)
      }
      return resposta.json()
    })
    .then(function (dados) {
      resultadoElemento.textContent =
        "Referência para pagamento: " + dados.reference + " | Total: " + dados.totalCost + " €"
      guardarCesto([])
      atualizaCesto()
    })
    .catch(function (erro) {
      console.log(erro)
      resultadoElemento.textContent = "Não foi possível concluir a compra."
    })
}

// D. Event Listeners
categoriaSelect.addEventListener("change", atualizarLista)
ordemSelect.addEventListener("change", atualizarLista)
pesquisaInput.addEventListener("input", atualizarLista)
comprarBotao.addEventListener("click", comprar)

// E. Inicialização
fetch(API + "/products")
  .then(function (resposta) {
    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status)
    }
    return resposta.json()
  })
  .then(function (dados) {
    todosProdutos = dados
    atualizarLista()
  })
  .catch(function (erro) {
    console.log(erro)
    produtosSection.textContent = "Não foi possível carregar os produtos."
  })

fetch(API + "/categories")
  .then(function (resposta) {
    if (!resposta.ok) {
      throw new Error("Erro " + resposta.status)
    }
    return resposta.json()
  })
  .then(carregarCategorias)
  .catch(function (erro) {
    console.log(erro)
  })

atualizaCesto()
