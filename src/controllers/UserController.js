const State = require('../models/State'); // puxa a tabela de State

module.exports = {
  getStates: async (req, res) => {
    let states = await State.find(); // vai pegar todos os dados da tabela state

    res.json({ states }) // para retornar como json
  },
  info: async (req, res) => {
    
  },
  editAction: async (req, res) => {
    
  }
}