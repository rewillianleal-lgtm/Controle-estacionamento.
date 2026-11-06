import { EstacionamentoModel } from "./models/EstacionamentoModel.js";
import { EstacionamentoView } from "./views/EstacionamentoView.js";
import { EstacionamentoController } from "./controllers/EstacionamentoController.js";

const model = new EstacionamentoModel();
const view = new EstacionamentoView();
const controller = new EstacionamentoController(model, view);

document.addEventListener("DOMContentLoaded", () => {
  controller.atualizarTela();

  const formulario = document.getElementById("form-cadastro");
  if (formulario) {
    formulario.addEventListener("submit", evento => {
      evento.preventDefault();
      if (!formulario.reportValidity()) return;

      try {
        const dados = view.obterDadosFormulario(formulario);
        controller.salvar(dados);
        alert("Cadastro realizado com sucesso!");
        formulario.reset();
        window.location.href = "index.html";
      } catch (erro) {
        alert(erro.message);
      }
    });
  }

  const lista = document.getElementById("lista-reservas");
  if (lista) {
    lista.addEventListener("click", evento => {
      const botao = evento.target.closest("[data-remover]");
      if (!botao) return;
      const confirmar = window.confirm("Tem certeza de que deseja remover esta reserva?");
      if (confirmar) {
        controller.remover(botao.dataset.remover);
        controller.atualizarTela();
      }
    });
  }

  const busca = document.getElementById("busca");
  if (busca) busca.addEventListener("input", () => controller.filtrar(busca.value));

  document.querySelectorAll("[data-vaga-livre]").forEach(link => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("vagaSelecionada", link.dataset.vagaLivre);
    });
  });

  const selectVaga = document.getElementById("vaga-select");
  if (selectVaga) {
    const vagaSelecionada = sessionStorage.getItem("vagaSelecionada");
    if (vagaSelecionada && [...selectVaga.options].some(opcao => opcao.value === vagaSelecionada)) {
      selectVaga.value = vagaSelecionada;
    }
    sessionStorage.removeItem("vagaSelecionada");
  }
});