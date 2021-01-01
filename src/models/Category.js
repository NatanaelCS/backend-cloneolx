/*
categories
- _id
- name
- slug
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // para fazer a conexão global

const modelShema = new mongoose.Schema({
  name: String,
  slug: String
}); // para criar a tabela

const modelName = 'Category'; // nome da tabela

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelShema)
} // verifica se existe a conexão com a tabela, caso não tenha vai criar o model()