/*
ads
- _id
- idUser
- state
- category
- images [{
  url,
  default: true
}]
- dateCreated
- title
- price
- priceNegotiable: true
- description
- views
- status
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // para fazer a conexão global

const modelShema = new mongoose.Schema({
  idUser: String,
  state: String,
  category: String,
  images: [Object],
  dateCreated: Date,
  title: String,
  price: Number,
  priceNegotiable: Boolean,
  description: String,
  views: Number,
  status: String
}); // para criar a tabela

const modelName = 'Ad'; // nome da tabela

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelShema)
} // verifica se existe a conexão com a tabela, caso não tenha vai criar o model()