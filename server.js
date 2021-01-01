require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
  useFindAndModify:false,
  useNewUrlParser:true,
  useUnifiedTopology:true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log("Error: ", error.message)
});

const server = express();

server.use(cors());
server.use(express.json()); // para usar json
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname + "/public")); // para conseguir acessar os arquivos de public

server.use('/', apiRoutes); // para fazer a conexão com as rotas

server.listen(process.env.PORT, () => {
  console.log(`Rodando no endereço: ${process.env.BASE}`)
})