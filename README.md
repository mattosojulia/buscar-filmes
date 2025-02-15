# 🎬 Catálogo de Filmes - Node.js e Express

Este é um projeto simples de um catálogo de filmes criado com **Node.js** e **Express**, exibindo uma lista de filmes e permitindo buscar filmes por título.

## 🚀 Funcionalidades

- Exibe uma lista de filmes em uma página web.
- Permite buscar um filme pelo título.
- Exibe os detalhes do filme selecionado.

## 🛠 Tecnologias Utilizadas

- Node.js
- Express.js
- HTML + Bootstrap 5
- JavaScript

---

## 📂 Estrutura do Projeto

📁 projeto-filmes │-- 📄 package.json │-- 📄 package-lock.json │-- 📄 server.js │-- 📄 filmes.json │-- 📄 dadosFilmes.html │-- 📄 buscar-filme.html

### 📄 server.js
Servidor Node.js que carrega os filmes e serve as páginas HTML.

javascript
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const port = 3001

const filmesPath = path.join(__dirname, 'filmes.json')
const filmesData = fs.readFileSync(filmesPath, 'utf-8')
const filmes = JSON.parse(filmesData)

function criarCard(filme) {
    return `
    <div class="card mb-3 w-25 h-50 shadow px-0">
        <div class="card-body">
            <div class="col">
                <img src="${filme.url_cartaz}" class="card-img
