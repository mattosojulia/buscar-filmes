const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const port=3001

const filmesPath = path.join(__dirname,'filmes.json')
const filmesData = fs.readFileSync(filmesPath, 'utf-8')
const filmes = JSON.parse(filmesData)

function criarCard(filme){
    return `
    <div class="card mb-3 w-25 h-50 shadow px-0">
    <div class="card-body">
    <div class="col">
        <img src="${filme.url_cartaz}"class="card-img-top mb-2" alt="${filme.titulo}"style="height: 400px">
        <h5 class="card-title text-center"> ${filme.titulo}</h5>
        <p class="card-text"> ${filme.ano}</p>
        <p class="card-text"> ${filme.diretor}</p>
        <p class="card-text"> ${filme.genero}</p>
        </div>
    </div>
</div>
`
}
app.get('/', (req,res) => {
    const cardsHtml = filmes.map(filme => criarCard(filme)).join('')
    const pageHtmlPath = path.join(__dirname, 'dadosFilmes.html')
    let pageHtml = fs.readFileSync(pageHtmlPath,'utf-8')
    pageHtml = pageHtml.replace('{{cardsHtml}}', cardsHtml)
    res.send(pageHtml)
})

function buscarFilmePorTitulo(titulo) {
    return filmes.find(filme => filme.titulo.toLowerCase() === titulo.toLowerCase());
  }
 
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dadosFilmes.html'))
})
 
 app.get('/buscar-filme', (req, res) => {
  const tituloDoFilmeBuscado = req.query.titulo;
  const filmeEncontrado = buscarFilmePorTitulo(tituloDoFilmeBuscado);
 
  if (filmeEncontrado) {
    const templatePath = path.join(__dirname, 'buscar-filme.html');
    const templateData = fs.readFileSync(templatePath, 'utf-8');
 
    const html = templateData
      .replace('{{titulo}}', filmeEncontrado.titulo)
      .replace('{{ano}}', filmeEncontrado.ano)
      .replace('{{diretor}}', filmeEncontrado.diretor)
      .replace('{{genero}}', filmeEncontrado.genero)
      .replace('{{cartaz}}', filmeEncontrado.url_cartaz);
     
 
    res.send(html);
  } else {
    res.send('<h1>Filme não encontrado.</h1>');
  }
});

app.listen(port, () => {
    console.log(`servidor iniciado em http://localhost:${port}`)
})