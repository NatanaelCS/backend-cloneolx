const Category = require('../models/Category')

module.exports = {
  getCategories: async (req, res) => {
    const cats = await Category.find(); // para pegar todas as categorias

    let categories = [];

    for(let i in cats) {
      categories.push({
        ...cats[i]._doc,
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png` // coloca a imagem do banco de dados, que fica no assets
      })
    } // para preencher
    
    res.json({categories})
  },
  addAction: async (req, res) => {
    
  },
  getList: async (req, res) => {
    
  },
  getItem: async (req, res) => {
    
  },
  editAction: async (req, res) => {
    
  }
}