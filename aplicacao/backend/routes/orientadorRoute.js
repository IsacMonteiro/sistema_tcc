const express = require('express');
const router = express.Router();
const { criarOrientador, deletarOrientador, atualizarOrientador, listarOrientadores } = require('../controllers/orientadorController');

// Rota para criar um orientador
router.post('/', async (req, res) => {
  const { matricula, nome, titulacao, areaAtuacao, email } = req.body;
  
  try {
    const result = await criarOrientador(matricula, nome, titulacao, areaAtuacao, email);
    res.status(201).json({ message: 'Orientador criado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o orientador', details: error });
  }
});

// Rota para listar todos os orientadores
router.get('/', async (req, res) => {
  try {
    const orientadores = await listarOrientadores();
    res.status(200).json(orientadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os orientadores', details: error });
  }
});

// Rota para deletar um orientador por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deletarOrientador(req.params.id);
    res.status(200).json({ message: 'Orientador deletado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o orientador', details: error });
  }
});

// Rota para atualizar um orientador por ID
router.put('/:id', async (req, res) => {
  const { matricula, nome, titulacao, areaAtuacao, email } = req.body;

  try {
    const result = await atualizarOrientador(req.params.id, matricula, nome, titulacao, areaAtuacao, email);
    res.status(200).json({ message: 'Orientador atualizado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o orientador', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;