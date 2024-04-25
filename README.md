# API RESTful Catálogo de Filmes 🎬

RESTful API, utilizando TypeScript, para administrar(CRUD) catálogo de filmes para usuários autenticados(JWT).

## Funcionalidades: 🛠️

### Usuários do sistema 👤

- Cadastro
- Login

### Filmes 🎥

- Cadastrar
- Listar
- Detalhar
- Editar
- Remover

## Banco de dados 🗄️

A API acessa o banco de dados `film_catalog` do `PostgreSQL` e persiste e manipula os dados de _usuarios_ e _filmes_ da aplicação. A interação é feita com o `typeORM`.

```sql
create database film_catalog;
```

## Configurações e Execução 🚀

Para executar os exercícios, você precisará de um ambiente com o [Node.js](https://nodejs.org/) instalado.

### ⚙️ Configuração

- Faça o clone deste repositório:

```bash
git clone git@github.com:Andressavcon/api-catalogo-filmes-orm.git
```

- Abrir a pasta do projeto no editor de código

```bash
cd api-catalogo-filmes-orm
```

- Instalar as dependências

```bash
npm install
```

### ▶️ Execução do projeto

- Abrir o banco de dados `film_catalog` no `PostgreSQL`

- Inserir suas credenciais no arquivo .env

- Executar as migrations

```bash
npm run migration:run
```

- Executar o projeto

```bash
## Servidor em Desenvolvimento
npm run dev
```

- Teste de requisições

 <Insomnia>

## Endpoits 📝

### **Cadastro de usuário**

#### `POST` `/users`

Rota de cadastro para um novo usuario no sistema.

_Requisição_: um objeto no body que contendo: `name`, `email`, `password`

_Verificações_: O `email` é verificado se ja existe. A `password` é criptografada

### **Login do usuário**

#### `POST` `/login`

Rota de acesso do usuario cadastrado para acessar o sistema.

_Requisição_: um objeto no body que contendo: `email`, `password`

_Verificações_: O `email` é verificado se ja existe. A `password` é validada com seu respectivo email. O `token` de autenticação é gerado

### Todos os endpoints a partir daqui exigem o token de autenticação do usuário logado

_Verificações_: O `token` enviado(e válido) no header da requisição (Bearer Token). É validado com seu respectivo `id` do usuário cadastrado.

### **Cadastrar Filme**

#### `POST` `/film`

Rota de cadastro para um novo filme no sistema.

_Requisição_: um objeto no body que contendo: `title`,``gender`, `synopsis`

_Verificações_: O `title` é verificado se ja existe

### **Listar Filmes**

#### `GET` `/film`

Rota para listagem de todos os filmes cadastrados.

### **Detalhar um Filme**

#### `GET` `/film/:id`

Rota para detalhar um filme cadastrado.

_Requisição_: o `id` do filme precisa ser enviado como parâmetro de rota do endpoint.

_Verificações_: o `id` do filme é verificado se existe

### **Atualizar Filme**

#### `PUT` `/film/:id`

Rota para atualizar um filme cadastrado.

_Requisição_: o `id` do filme como parâmetro de rota do endpoint. E um objeto no body que contendo: `title`, `gender`, `synopsis`

_Verificações_: o `id` do filme é verificado se existe. O `title` é verificado se ja existe

### **Excluir Filme**

#### `DELETE` `/film/:id`

Rota para excluir um filme cadastrado.

_Requisição_: o `id` do filme como parâmetro de rota do endpoint.

_Verificações_: o `id` do filme é verificado se existe
