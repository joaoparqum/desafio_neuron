# DESAFIO NEURON

Repositório para hospedar desafio full-stack da vaga Estágio Desenvolvedor Web

## ✒️ Autores
* **João Paulo Arquim** - *Software Developer* - [joaoparqum](https://github.com/joaoparqum)

## 🖥  Print
![Captura de tela 2024-09-15 170617](https://github.com/user-attachments/assets/cef4d174-01b4-4569-96be-e778bbe2ce3b)

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

<ul>
  <li>Node.Js</li>
  <li>PostgreSQL</li>
  <li>VS Code</li>
</ul>

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Acesse o arquivo app.module.ts do projeto Nest.Js, altere o nome de usuário e senha do que você queira usar, preferencialmente escolhemos o PostgresSQL:

```
TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'voo-db',
      entities: [Voo],
      synchronize: true,  
    }),
    VooModule,
  ],
```
Crie um banco de dados no PostgreSQL com o nome de voo-db:

```
CREATE DATABASE voo-db;
```

Em seguida para rodar a API, no terminal entre na pasta do back-end:

```
cd api-gerenciamento-voo
```

E execute esse comando para rodar o back-end na sua máquina:
```
npm run start
```

Para executar o front-end, entre na pasta do front:
```
cd front-gerencamento
```
Em segunda execute o comando:
```
npm run dev
```
No seu navegador acesse o link: http://localhost:5173/

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Nest.Js](https://docs.nestjs.com/) - Framework back-end 
* [Vue + Vite](https://vitejs.dev/guide/) - Framework Front-end
* [Vuex](https://vuex.vuejs.org/guide/#the-simplest-store) - Padrão de gerenciamento de estado
* [Ant Design of Vue](https://antdv.com/docs/vue/introduce) - Biblioteca Vue UI antd
* [PostgreSQL](https://www.postgresql.org/docs/15/index.html) - O SGBD usado 

## 📌 Versão

Estou usando o [GitHub](http://github.com/) para controle de versão
