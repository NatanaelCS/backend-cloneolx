const User = require('../models/User')

module.exports = {
  private: async (req, res, next) => {
    // aqui verifica o login, se der certo vai para o proximo item

    if (!req.query.token && !req.body.token) { 
      res.json({ notallowed: true });
      return;
    } // verifica se foi enviada algum token

    let token = '';
    if (req.query.token) {
      token = req.query.token;
    }
    if (req.body.token) {
      token = req.body.token;
    } // verifica se mandou pelo query ou body

    if (token == '') {
      res.json({ notallowed: true });
      return;
    } // verifica se não mandou o token

    const user = await User.findOne({ token }); // para pegar o token da tabela

    if (!user) {
      res.json({ notallowed: true });
      return;
    } // caso mande um token que não é valido

    next();
  }
}