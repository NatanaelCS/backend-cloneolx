const mongoose = require('mongoose')
const bcrypt = require('bcrypt'); // para incriptar a senha
const { validationResult, matchedData } = require('express-validator')

const User = require('../models/User')
const State = require('../models/State')

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({error: errors.mapped()})
      return;
    } // se não esta vasil mas deu erro


    // verificando se email já existe
    const data = matchedData(req); // para pegar os dados

    // validando o e-mail
    const user = await User.findOne({ email: data.email }) // verifica se tem o email
    if (!user) {
      res.json({ error: 'E-mail e/ou senha errados!'})
      return;
    }

    // validando a senha
    const match = await bcrypt.compare(data.password, user.passwordHash) // vai comparar as senhas
    if (!match) {
      res.json({ error: 'E-mail e/ou senha errados!'})
      return;
    }

    const payload = (Date.now() + Math.random()).toString() // gera um token aleatorio
    const token = await bcrypt.hash(payload, 10); //criptogafou

    user.token = token;
    await user.save();

    res.json({ token, email: data.email })

  },
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({error: errors.mapped()})
      return;
    } // se não esta vasil mas deu erro


    // verificando se email já existe
    const data = matchedData(req); // para pegar os dados

    const user = await User.findOne({
      email: data.email
    }); // procura se tem algum email na tabela igual ao que foi mandado

    if (user) {
      res.json({
        error: {
          email: {
            msg: 'E-meil já existe!'
          }
        }
      });
      return;
    } // verifica se já existe e manda a mensagem de erro

    // verificando se estado é valido
    if (mongoose.Types.ObjectId.isValid(data.state)) {

      const stateItem = await State.findById(data.state)
      if (!stateItem) {
        res.json({
          error: {
            state: {
              msg: 'Estado não existe'
            }
          }
        })
        return;
      }
    } else {
      res.json({
        error: {
          state: {
            msg: 'Código de estado invalido!'
          }
        }
      })
      return;
    }

    // criar o usuario
    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString() // gera um token aleatorio
    const token = await bcrypt.hash(payload, 10); //criptogafou

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state
    }) // cria o novo usuario
    await newUser.save(); // salva

    res.json({token})
  }
}