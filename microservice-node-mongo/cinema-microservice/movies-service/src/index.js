/**
 * File: Index.js
 * Author: Glaucia Lemos
 * Description: Arquivo responsável por levantar o servidor da aplicação via Node.js
 * Date: 20/08/2018
 */

'use strict'

// const events = require('node:events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')
const mongoClient = require('mongodb').MongoClient

const uri  = `mongodb://${config.dbSettings.user}:${config.dbSettings.pass}@${config.dbSettings.servers[0]}/?retryWrites=true&w=majority`

mongoClient.connect(uri, function(err, db) {

  if (err) throw err;  

  var dbo = db.db(config.dbSettings.db);

  let rep = repository.connect(dbo)
  .then(repo => {
      console.log('Aplicação conectada ao repositório. Iniciando o serviço!')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        repo
      })
    })
    .then(app => {
      console.log(`Aplicação conectada com sucesso. Executando na porta: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })

});

console.log('---- Serviços dos Filmes ---- ')
console.log('Conectando com os repositórios dos filmes....')

process.on('uncaughtException', (error) => {
  console.error('Ocorreu um erro de Exception aqui', error)
})

process.on('uncaughtException', (error, promise) => {
  console.error('Ocorreu um erro de Rejection aqui', error)
})