const express = require('express');
const router = express.Router();
const { listarAdministradores } = require('../controllers/administradorController');

// Rota para listar todos os administradores
router.get('/', async (req, res) => {
  try {
    const administradores = await listarAdministradores();
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar administradores', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;