# API de Gerenciamento de Clientes e Milhas

Este projeto implementa uma API RESTful completa para o gerenciamento de clientes e saldo de milhas, conforme solicitado no desafio técnico.

---

## 1. Configuração e Execução Localmente

### Pré-requisitos
* Node.js (Versão 18+ recomendada).
* npm (Gerenciador de pacotes).

### Passos para Rodar a API

1.  **Clone o repositório:**
    ```bash
    git clone [LINK DO SEU REPOSITÓRIO]
    cd [pasta-do-projeto]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install express
    # Se você tiver outras dependências, instale-as aqui
    ```

3.  **Configuração de Módulos (ES Modules):**
    Para usar a sintaxe `import/export`, certifique-se de que o seu `package.json` contém a linha:
    ```json
    "type": "module"
    ```

4.  **Inicie o Servidor:**
    A API é exportada em `app.js`. Assumindo que você usa um arquivo de inicialização (`server.js` ou similar):
    ```bash
    node [nome-do-arquivo-de-inicializacao.js] 
    # Ex: node server.js
    ```
    O servidor estará rodando na porta `3000` e a rota base é `/clientes`.

---

## 2. Escolha de Tecnologia

**Tecnologia:** **Node.js** com o framework **Express**.

**Motivo:** A escolha do Node.js e Express foi devido à minha experiência e familiaridade com o framework, permitindo a construção rápida da API. Utilizei JavaScript puro em todos os módulos, garantindo uniformidade e facilidade na manutenção do projeto.

---

## 3. Decisões de Design e Trade-offs

1.  **Padrão MCR (Model-Controller-Router):**
    * O projeto adota uma estrutura clara, separando as responsabilidades: `app.js` configura o Express, `clientRoutes.js` mapeia os endpoints, e `clientController.js` trata o fluxo da requisição.

2.  **Implementação do Model (`Client.js`):**
    * O repositório de dados foi implementado como uma **Classe (`export class Client`) com métodos estáticos** (`static getAll()`, `static create()`, `static addMiles()`, etc.).
    * **Trade-off:** Não há injeção de dependência ou abstração de banco de dados, pois o requisito era usar armazenamento em memória. A implementação estática encapsula a lógica de manipulação do array global `clients` de forma organizada.

3.  **Separação da Lógica de Validação:**
    * As regras de validação (formatos de email, campos obrigatórios, tipos de cartão, etc.) foram isoladas no módulo `validateData.js`.
    * O Controller (`clientController.js`) importa esta função e a utiliza antes de chamar o Model, mantendo a lógica de validação fora do fluxo de resposta HTTP principal.

4.  **Tratamento de ID:**
    * O Model trabalha internamente com IDs do tipo `number`, utilizando `parseInt()` para converter o `id` recebido na URL sempre que necessário.

---

## 4. Endpoints da API e Teste da Funcionalidade Adicional

A URL base para os testes é `http://localhost:3000/clientes`.

### Endpoints CRUD
| Método | Endpoint | Controller Função | Observações |
| :--- | :--- | :--- | :--- |
| **GET** | `/clientes` | `getAllClients` | Lista todos os clientes. |
| **GET** | `/clientes/:id` | `getClientById` | Busca um cliente pelo ID. |
| **POST**| `/clientes` | `createClient` | Cria um novo cliente (requer nome, email e cartao). |
| **PUT** | `/clientes/:id` | `updateClient` | Atualiza um cliente existente. |
| **DELETE**| `/clientes/:id` | `deleteClient` | Remove um cliente (retorna 200 com o cliente removido). |

### Teste da Funcionalidade Adicional: Adicionar Milhas

Esta funcionalidade está implementada no endpoint:

* **Endpoint:** `POST /clientes/:id/adicionar-milhas`.

**Como Testar:**

1.  **Método:** `POST`
2.  **URL de Exemplo:** `http://localhost:3000/clientes/1/adicionar-milhas`
3.  **Corpo da Requisição (JSON Body):**
    ```json
    {
        "quantidade": 1500 
    }
    ```
    * O Controller garante que `quantidade` seja um número positivo.
    * A resposta retorna o saldo anterior e o **novo saldo** do cliente.
    
    Desenvolvido para o processo seletivo da Reino Educação.