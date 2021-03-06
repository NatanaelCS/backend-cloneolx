const { checkSchema } = require('express-validator'); // importando a biblioteca

module.exports = {
  signup: checkSchema({
    name: {
      trim: true, // remove todos os espaços do começo e do fim
      isLength: {
        options: { min: 2 }
      }, // para colocar um tamanho minimo
      errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
    },
    email: {
      isEmail: true, // verifica se é email
      normalizeEmail: true,
      errorMessage: 'E-mail inválido'
    },
    password: {
      isLength: {
        options: { min: 6 }
      },
      errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
    },
    state: {
      notEmpty: true, // tem que ser preenchido
      errorMessage: 'Estado não preenchido'
    }
  }), // vai verificar todos os campos que forem colocados aqui, caso esteja errado manda mensagem de erro, coloca os campos que seram validados, no caso os campos de cadastro
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'E-mail inválido'
    },
    password: {
      isLength: {
        options: { min: 2 }
      },
      errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
    }
  })
};