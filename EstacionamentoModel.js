const CHAVE_ARMAZENAMENTO = "vagacerta_reservas";
const TOTAL_VAGAS = 12;

const dadosDemonstrativos = [
  { id: 1, placa: "ABC1D23", proprietario: "Mariana Costa", apartamento: "302", bloco: "A", modelo: "Honda Civic", cor: "Prata", vaga: "01" },
  { id: 2, placa: "DEF2G45", proprietario: "Roberto Lima", apartamento: "104", bloco: "B", modelo: "Toyota Corolla", cor: "Preto", vaga: "02" },
  { id: 3, placa: "GHI3J67", proprietario: "Fernanda Alves", apartamento: "501", bloco: "A", modelo: "Hyundai HB20", cor: "Branco", vaga: "04" },
  { id: 4, placa: "JKL4M89", proprietario: "Carlos Mendes", apartamento: "203", bloco: "C", modelo: "Chevrolet Onix", cor: "Azul", vaga: "07" },
  { id: 5, placa: "MNO5P12", proprietario: "Juliana Rocha", apartamento: "801", bloco: "B", modelo: "Jeep Renegade", cor: "Cinza", vaga: "09" }
];

export class EstacionamentoModel {
  constructor() {
    if (localStorage.getItem(CHAVE_ARMAZENAMENTO) === null) {
      localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dadosDemonstrativos));
    }
  }

  listar() {
    return JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO)) || [];
  }

  salvar(reserva) {
    const reservas = this.listar();
    const placaExiste = reservas.some(item => item.placa === reserva.placa);
    const vagaOcupada = reservas.some(item => item.vaga === reserva.vaga);

    if (placaExiste) throw new Error("Já existe um cadastro para esta placa.");
    if (vagaOcupada) throw new Error("Esta vaga já está ocupada.");

    reserva.id = Date.now();
    reservas.push(reserva);
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(reservas));
    return reserva;
  }

  remover(id) {
    const reservas = this.listar();
    const atualizadas = reservas.filter(item => item.id !== Number(id));
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(atualizadas));
    return atualizadas;
  }

  listarVagasDisponiveis() {
    const ocupadas = this.listar().map(item => item.vaga);
    return Array.from({ length: TOTAL_VAGAS }, (_, indice) =>
      String(indice + 1).padStart(2, "0")
    ).filter(vaga => !ocupadas.includes(vaga));
  }

  obterTotalVagas() {
    return TOTAL_VAGAS;
  }
}