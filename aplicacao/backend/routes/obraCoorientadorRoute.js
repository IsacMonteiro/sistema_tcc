const express = require('express');
const router = express.Router();
const { 
  associarObraCoorientador, 
  desassociarObraCoorientador, 
  listarObraCoorientadores 
} = require('../controllers/obraCoorientadorController');

// Rota para associar uma obra a um coorientador
router.post('/associar', async (req, res) => {
  const { fk_id_obra, fk_id_coorientador } = req.body;
  try {
    const result = await associarObraCoorientador(fk_id_obra, fk_id_coorientador);
    res.status(201).json({ message: 'Associação criada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar obra a coorientador', details: error });
  }
});

// Rota para desassociar uma obra de um coorientador
router.delete('/desassociar', async (req, res) => {
  const { fk_id_obra, fk_id_coorientador } = req.body;
  try {
    const result = await desassociarObraCoorientador(fk_id_obra, fk_id_coorientador);
    res.status(200).json({ message: 'Associação removida com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desassociar obra de coorientador', details: error });
  }
});

// Rota para listar todas as associações de obras e coorientadores
router.get('/', async (req, res) => {
  try {
    const associations = await listarObraCoorientadores();
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar associações de obras e coorientadores', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;