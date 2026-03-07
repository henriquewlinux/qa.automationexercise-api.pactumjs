# API Automation Testing

Projeto de automação de testes de API para a [ServeRest](https://serverest.dev), uma API REST gratuita que simula um e-commerce. Os testes cobrem os fluxos de usuários, autenticação e produtos.

---

## Tecnologias

| Ferramenta | Finalidade |
|---|---|
| [Node.js](https://nodejs.org) | Runtime |
| [Mocha](https://mochajs.org) | Framework de testes |
| [PactumJS](https://pactumjs.github.io) | Client HTTP para os requests |
| [Chai](https://www.chaijs.com) | Assertions |
| [Joi](https://joi.dev) | Validação de schema do response |
| [Faker.js](https://fakerjs.dev) | Geração de dados dinâmicos |
| [dotenv](https://github.com/motdotla/dotenv) | Gerenciamento de variáveis de ambiente |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | Relatório HTML dos testes |

---

## Pré-requisitos

- Node.js >= 18
- npm >= 9

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd api-automation-testing

# Instale as dependências
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto com a URL base da API:

```env
URL=https://serverest.dev
```

---

## Execução dos Testes

### Todos os testes com relatório HTML
```bash
npm test
```
O relatório será gerado em `reports/test-report.html`. Abra no browser após a execução.

### Um arquivo específico (via terminal)
```bash
npx mocha src/tests/users/post-users-test.js
```

### Debug no VSCode
Abra o arquivo de teste desejado e pressione `F5` (requer configuração de `launch.json`).

---

## Estrutura do Projeto

```
api-automation-testing/
├── src/
│   ├── builders/               # Construtores de payload para os requests
│   │   ├── createUser-builder.js
│   │   ├── createProduct-builder.js
│   │   └── headers-builder.js
│   │
│   ├── data/
│   │   └── test-data.json      # Dados centralizados: requestBody e mensagens de response
│   │
│   ├── routes/                 # Funções que encapsulam as chamadas HTTP
│   │   ├── login/
│   │   │   └── post-login-route.js
│   │   ├── products/
│   │   │   ├── get-products-route.js
│   │   │   └── post-products-route.js
│   │   └── users/
│   │       ├── delete-users-route.js
│   │       └── post-users-route.js
│   │
│   ├── schemas/                # Schemas Joi para validação da estrutura dos responses
│   │   ├── login/
│   │   │   └── post-login-schema.js
│   │   ├── products/
│   │   │   ├── get-products-schema.js
│   │   │   └── post-products-schema.js
│   │   └── users/
│   │       ├── delete-users-schema.js
│   │       └── post-users-schema.js
│   │
│   └── tests/                  # Suítes de testes organizadas por rota
│       ├── login/
│       │   └── post-login-test.js
│       ├── products/
│       │   ├── get-products-test.js
│       │   └── post-products-test.js
│       └── users/
│           ├── delete-users-test.js
│           └── post-users-test.js
│
├── reports/                    # Relatórios gerados pelo Mochawesome (gerado em runtime)
├── .env                        # Variáveis de ambiente (não versionar)
├── package.json
└── README.md
```

---

## Cenários de Teste

### POST /usuarios
| Cenário | Status Esperado |
|---|---|
| Criar conta com sucesso | 201 |
| Falha ao criar conta com email já utilizado | 400 |
| Falha ao criar conta com email inválido | 400 |

### DELETE /usuarios/:id
| Cenário | Status Esperado |
|---|---|
| Excluir usuário com sucesso | 200 |
| Falha ao excluir com ID inválido | 200 |

### POST /login
| Cenário | Status Esperado |
|---|---|
| Login com sucesso | 200 |
| Falha com email inexistente | 401 |
| Falha com password em branco | 400 |
| Falha com email em branco | 400 |

### POST /produtos
| Cenário | Status Esperado |
|---|---|
| Criar produto com sucesso | 201 |
| Falha ao criar produto com nome já utilizado | 400 |

### GET /produtos
| Cenário | Status Esperado |
|---|---|
| Buscar produto por ID com sucesso (valida nome retornado) | 200 |
| Buscar produto com ID inexistente (retorna lista vazia) | 200 |

---

## Padrões Adotados

- **Arrange / Action / Assert**: todos os testes seguem esse padrão de organização interna.
- **Builders**: os payloads de request são montados via classes builder, permitindo sobrescrever campos específicos (ex: `.withWriter(email)`, `.withName(name)`).
- **Dados centralizados**: o arquivo `test-data.json` centraliza tanto os payloads de request quanto as mensagens de response esperadas, evitando strings hardcoded nos testes.
- **Validação dupla**: cada teste valida o `statusCode`, o conteúdo do response (mensagem ou campo específico) e a estrutura completa via schema Joi.
- **Dados dinâmicos**: emails e nomes de produto são gerados com Faker.js para evitar conflitos entre execuções.
- **Autenticação**: rotas que exigem token (como `/produtos`) recebem o Bearer token via `HeadersBuilder.withAuthorization()`.
