var itensPedido = document.querySelectorAll(".item-pedido");
var totalPedido = document.getElementById("total-pedido");
var resumoPedido = document.getElementById("resumo-pedido");
var botaoFinalizar = document.getElementById("finalizar-pedido");
var mensagemPedido = document.getElementById("mensagem-pedido");

function atualizarPedido() {
  if (!totalPedido || !resumoPedido) {
    return;
  }

  var total = 0;
  var resumo = [];
  var i = 0;

  for (i = 0; i < itensPedido.length; i++) {
    var item = itensPedido[i];
    var preco = Number(item.dataset.preco);
    var nome = item.dataset.nome;
    var quantidade = Number(item.querySelector(".quantidade").textContent);

    total = total + preco * quantidade;

    if (quantidade > 0) {
      resumo.push(nome + ": " + quantidade);
    }
  }

  totalPedido.textContent = "R$ " + total.toFixed(2).replace(".", ",");

  if (resumo.length > 0) {
    resumoPedido.textContent = resumo.join(" | ");
  } else {
    resumoPedido.textContent = "Nenhum item escolhido.";
  }
}

if (itensPedido.length > 0) {
  for (var i = 0; i < itensPedido.length; i++) {
    var item = itensPedido[i];
    var botaoMais = item.querySelector(".aumentar");
    var botaoMenos = item.querySelector(".diminuir");
    var quantidade = item.querySelector(".quantidade");

    adicionarEventoMais(botaoMais, quantidade);
    adicionarEventoMenos(botaoMenos, quantidade);
  }

  atualizarPedido();
}

function adicionarEventoMais(botaoMais, quantidade) {
  botaoMais.addEventListener("click", function () {
    quantidade.textContent = Number(quantidade.textContent) + 1;
    atualizarPedido();
  });
}

function adicionarEventoMenos(botaoMenos, quantidade) {
  botaoMenos.addEventListener("click", function () {
    var valorAtual = Number(quantidade.textContent);

    if (valorAtual > 0) {
      quantidade.textContent = valorAtual - 1;
      atualizarPedido();
    }
  });
}

if (botaoFinalizar) {
  botaoFinalizar.addEventListener("click", function () {
    if (resumoPedido.textContent === "Nenhum item escolhido.") {
      mensagemPedido.textContent =
        "Escolha pelo menos um item antes de finalizar.";
    } else {
      mensagemPedido.textContent =
        "Pedido montado com sucesso. Agora basta entrar em contato com a loja.";
    }
  });
}

var formularioContato = document.getElementById("formulario-contato");
var mensagemFormulario = document.getElementById("mensagem-formulario");

if (formularioContato) {
  formularioContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    mensagemFormulario.textContent =
      "Mensagem enviada com sucesso. Em breve responderemos o contato.";

    formularioContato.reset();
  });
}
