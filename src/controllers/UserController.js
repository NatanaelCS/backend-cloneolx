const bcryp = require('bcrypt')
const { validationResult, matchedData } = require('express-validator')
const State = require('../models/State'); // puxa a tabela de State
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

module.exports = {
  getStates: async (req, res) => {
    let states = await State.find(); // vai pegar todos os dados da tabela state

    res.json({ states }) // para retornar como json
  },
  info: async (req, res) => {
    let token = req.query.token; // para pegar o token.

    const user = await User.findOne({token}); //pegar o token da tabela
    const state = await State.findById(user.state); // pegar o state
    const ads = await Ad.find({idUser: user._id.toString()}); // pega o usuário que esta logado

    let adList = [];
    for(let i in ads) {

      const cat = await Category.findById(ads[i].category); 

      adList.push({ ...ads[i], category: cat.slug })
    } // para preencher o ads
    
    res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList
    })
  },
  editAction: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({error:errors.mapped()});
      return;
    }

    const data = matchedData(req)

    let updates = {}

    if (data.name) { // se mandou nome vai trocar
      updates.name = data.name;
    }

    if (data.email) { // se mandou email
      const emailCheck = await User.findOne({email: data.email});
      if (emailCheck) {
        res.json({error: 'E-mail já existente!'});
        return;
      }
      updates.email = data.email
    }

    if(data.state) { // se mandou data
      if(Mongoose.Types.ObjectId.isValid(data.state)) { // verifica se é um objeto valido
        const stateCheck = await State.findById(data.state) // verifica se tem state
        if(!stateCheck) {
          res.json({error: 'Estado não existe'});
          return
        }
        updates.state = data.state;
      } else {
        res.json({error: 'Código de estado inválido!'});
        return;
      }
    }

    if(data.password) { // se mandou senha
      updates.passwordHash = await bcrypt.hash(data.password, 10) // para criar a nova senha
    }

    await User.findOneAndUpdate({token: data.token}, {$set: updates})

    res.json({})
  }
}