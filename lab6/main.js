// declaração de variaveis
      const nodeInputNumero = document.querySelector("form input[type='number']");
      const nodeUlSubmit = document.querySelector("form input[type='submit']");
      const nodeUlColecao = document.querySelector("#colecao ul");
      const colecao = [];
      const nodeForm = document.querySelector("form");
      const nodeSpanTotal = document.querySelector("#colecao h3 span");

      // Event Handlers

      function guardaCarta() {
          const numero = Number(nodeInputNumero.value);
          colecao.push(numero);
          colecao.sort((a, b) => a - b);
          atualizaLista(colecao, nodeUlColecao);
          nodeSpanTotal.textContent = colecao.length;
      }

      function atualizaLista(colecao, nodeUlColecao) {
          nodeUlColecao.innerHTML = "";
          colecao.forEach(numero => {
            nodeUlColecao.innerHTML += "<li>" + numero + "</li>";
          })
      }

      // Event Listeners

      nodeForm.addEventListener("submit", event => {
        event.preventDefault();
        guardaCarta();
      })
