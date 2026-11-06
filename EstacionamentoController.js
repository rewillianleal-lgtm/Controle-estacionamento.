export class EstacionamentoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  atualizarTela() {
    const reservas = this.model.listar();
    const disponiveis = this.model.listarVagasDisponiveis();
    this.view.renderizarReservas(reservas);
    this.view.renderizarIndicadores(this.model.obterTotalVagas(), reservas.length, disponiveis.length);
    this.view.renderizarOpcoesDeVaga(disponiveis);
    this.view.renderizarVagas(disponiveis, reservas, this.model.obterTotalVagas());
  }

  salvar(dados) {
    const reserva = this.model.salvar(dados);
    console.log("Reserva cadastrada com sucesso:", reserva);
    return reserva;
  }

  remover(id) {
    this.model.remover(id);
    console.log("Reserva removida. ID:", id);
  }

  filtrar(termo) {
    const busca = termo.trim().toLowerCase();
    const filtradas = this.model.listar().filter(item =>
      [item.placa, item.proprietario, item.vaga, item.modelo, item.apartamento, item.bloco]
        .some(valor => String(valor).toLowerCase().includes(busca))
    );
    this.view.renderizarReservas(filtradas);
  }
}