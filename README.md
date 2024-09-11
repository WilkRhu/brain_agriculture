# Brain Agriculture

Brain Agriculture é uma aplicação web para o gerenciamento e cadastro de produtores rurais. O projeto é dividido em duas partes principais: um backend (API) e um frontend (React), com integração de banco de dados PostgreSQL. A API está documentada com Swagger para facilitar a visualização e teste dos endpoints.

## Sumário

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Configuração do Backend](#configuração-do-backend)
3. [Configuração do Frontend](#configuração-do-frontend)
4. [Rodando a Aplicação com Docker](#rodando-a-aplicação-com-docker)
5. [Swagger](#swagger)
6. [Como Contribuir](#como-contribuir)

## Tecnologias Utilizadas

**Backend:**
- Node.js com NestJS como framework principal
- PostgreSQL como banco de dados
- TypeORM para ORM (Mapeamento Objeto-Relacional)
- Swagger para documentação da API
- Docker para containerização

**Frontend:**
- React como biblioteca de construção da interface
- Vite como bundler para desenvolvimento rápido
- Nginx para servir a aplicação em produção
- Docker para containerização

## Configuração do Backend

### Requisitos
- Node.js (versão 20+)
- PostgreSQL (versão 13+)

### Passos para rodar o backend localmente

1. **Instalar dependências:**

   No diretório `brain_agriculture`, execute:

   ```bash
   npm install

## Configuração do Banco de Dados

1. **Certifique-se de ter o PostgreSQL rodando e crie um banco de dados com o nome `brain_agriculture`.**
2. **Configure as credenciais de conexão no arquivo `.env` dentro do diretório `brain_agriculture`.**

   Exemplo de um arquivo `.env`:

   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=123
   POSTGRES_DB=brain_agriculture
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432

### Swagger
A documentação da API está disponível em:
```
http://localhost:3001/api
```
#### Através da interface do Swagger, você pode testar os endpoints e verificar a documentação completa da API.

Rodando a Aplicação com Docker
A aplicação está preparada para rodar via Docker, tanto backend quanto frontend, em um ambiente integrado.

Passos para Rodar com Docker
Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.

No diretório raiz do projeto (onde está o docker-compose.yml), execute:

bash
Copiar código
docker-compose up --build
Isso irá:

Construir e iniciar o backend, frontend e o PostgreSQL.
```
A aplicação backend estará disponível em http://localhost:3001.
Verificar o Swagger
O Swagger estará disponível na URL:

http://localhost:3001/api
```
O Swagger é uma ferramenta para documentar a API de forma interativa. Você pode acessar a documentação e testar os endpoints diretamente pelo navegador.

