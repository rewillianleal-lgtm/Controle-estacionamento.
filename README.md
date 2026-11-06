# VagaCerta — Sistema de Controle de Estacionamento

Projeto acadêmico desenvolvido para a disciplina **Desenvolvimento Web**, utilizando somente HTML5, CSS3 e JavaScript puro, sem frameworks.

## Funcionalidades

- Listagem de reservas cadastradas.
- Cadastro de reserva com placa, proprietário, apartamento, bloco, modelo, cor e número da vaga.
- Exibição das vagas disponíveis e ocupadas.
- Remoção de reservas com confirmação.
- Pesquisa de reservas por placa, proprietário, vaga, modelo, apartamento ou bloco.
- Validação de campos, prevenção de placa duplicada e de reserva em vaga ocupada.
- Persistência dos dados no `localStorage` do navegador.
- Exibição dos dados cadastrados no `console.log` e mensagem de sucesso por `alert`.

## Estrutura do projeto

```text
controle-estacionamento/
├── index.html
├── cadastro.html
├── disponiveis.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── models/
│   │   └── EstacionamentoModel.js
│   ├── views/
│   │   └── EstacionamentoView.js
│   └── controllers/
│       └── EstacionamentoController.js
└── README.md
```

## Padrão de arquitetura: MVC

- **Model:** `EstacionamentoModel.js` gerencia os dados e as operações de listar, salvar, remover e consultar vagas disponíveis.
- **View:** `EstacionamentoView.js` apresenta os dados nas telas e coleta os valores do formulário.
- **Controller:** `EstacionamentoController.js` coordena as ações e as regras de negócio.
- **Inicialização:** `app.js` conecta os módulos e registra os eventos da interface.

## Como executar

Como o projeto utiliza módulos JavaScript (`type="module"`), execute-o por um servidor local:

1. Extraia a pasta do projeto.
2. Abra a pasta no Visual Studio Code.
3. Inicie um servidor local, por exemplo, com a extensão **Live Server**.
4. Abra o arquivo `index.html` pelo Live Server.

Também é possível publicar gratuitamente no GitHub Pages.

## Dados demonstrativos

Na primeira execução, o sistema cria cinco reservas fictícias entre doze vagas. Os dados são armazenados no `localStorage` e permanecem no navegador utilizado. Para reiniciar a demonstração, abra o console do navegador e execute:

```javascript
localStorage.removeItem("vagacerta_reservas");
location.reload();
```

## Publicação no GitHub

1. Crie um repositório público chamado `controle-estacionamento`.
2. Envie todos os arquivos e pastas deste projeto, mantendo a estrutura.
3. Acesse **Settings > Pages** no repositório.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`, depois salve.
6. Após a publicação, copie o endereço do GitHub Pages para testar e, se o professor aceitar, inclua-o junto ao link do repositório na entrega.

## Observação acadêmica

O projeto é exclusivamente front-end. O `localStorage` simula a persistência no próprio navegador; não existe servidor ou banco de dados compartilhado. As reservas iniciais são fictícias, conforme permitido no enunciado.
