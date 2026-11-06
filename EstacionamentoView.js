export class EstacionamentoView {
  obterDadosFormulario(formulario) {
    const dados = Object.fromEntries(new FormData(formulario).entries());
    dados.placa = dados.placa.trim().toUpperCase();
    dados.proprietario = dados.proprietario.trim();
    dados.apartamento = dados.apartamento.trim();
    dados.bloco = dados.bloco.trim();
    dados.modelo = dados.modelo.trim();
    dados.cor = dados.cor.trim();
    return dados;
  }

  renderizarReservas(reservas) {
    const corpo = document.getElementById("lista-reservas");
    if (!corpo) return;
    corpo.innerHTML = reservas.map(reserva => `
      <tr>
        <td><span class="spot-tag">Vaga ${this.escapar(reserva.vaga)}</span></td>
        <td><span class="plate">${this.escapar(reserva.placa)}</span><br><span class="vehicle-name">${this.escapar(reserva.modelo)} • ${this.escapar(reserva.cor)}</span></td>
        <td>${this.escapar(reserva.proprietario)}</td>
        <td>${this.escapar(reserva.apartamento)}</td>
        <td>${this.escapar(reserva.bloco)}</td>
        <td><button class="remove-button" data-remover="${reserva.id}" type="button">Remover</button></td>
      </tr>`).join("");
    const vazio = document.getElementById("mensagem-vazia");
    if (vazio) vazio.hidden = reservas.length > 0;
  }

  renderizarIndicadores(total, ocupadas, disponiveis) {
    const elementos = {
      "total-vagas": total,
      "vagas-ocupadas": ocupadas,
      "vagas-livres": disponiveis
    };
    Object.entries(elementos).forEach(([id, valor]) => {
      const elemento = document.getElementById(id);
      if (elemento) elemento.textContent = valor;
    });
  }

  renderizarOpcoesDeVaga(vagas) {
    const select = document.getElementById("vaga-select");
    if (!select) return;
    select.innerHTML = '<option value="">Selecione uma vaga disponível</option>' +
      vagas.map(vaga => `<option value="${vaga}">Vaga ${vaga}</option>`).join("");
  }

  renderizarVagas(vagasDisponiveis, reservas, total) {
    const grade = document.getElementById("grade-vagas");
    if (!grade) return;
    const ocupadas = reservas.map(reserva => reserva.vaga);
    const todas = Array.from({ length: total }, (_, indice) => String(indice + 1).padStart(2, "0"));
    grade.innerHTML = todas.map(vaga => {
      const ocupada = ocupadas.includes(vaga);
      const reserva = reservas.find(item => item.vaga === vaga);
      const conteudo = `<span class="spot-top"><span class="spot-number">${vaga}</span><span class="spot-status">${ocupada ? "OCUPADA" : "LIVRE"}</span></span>
        <span class="spot-hint">${ocupada ? this.escapar(reserva.placa) : "Clique para reservar"}</span>`;
      return ocupada
        ? `<div class="parking-spot occupied">${conteudo}</div>`
        : `<a class="parking-spot" href="cadastro.html" data-vaga-livre="${vaga}">${conteudo}</a>`;
    }).join("");
    const quantidade = document.getElementById("quantidade-disponiveis");
    if (quantidade) quantidade.textContent = vagasDisponiveis.length;
    const vazio = document.getElementById("sem-vagas");
    if (vazio) vazio.hidden = vagasDisponiveis.length > 0;
  }

  escapar(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[caractere]);
  }
}