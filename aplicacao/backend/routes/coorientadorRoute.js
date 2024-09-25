const express = require('express');
const router = express.Router();
const { criarCoorientador, deletarCoorientador, atualizarCoorientador, listarCoorientadores } = require('../controllers/coorientadorController');

// Rota para criar um coorientador
router.post('/', async (req, res) => {
  const { matricula, nome, titulacao, areaAtuacao, email } = req.body;

  try {
    const result = await criarCoorientador(matricula, nome, titulacao, areaAtuacao, email);
    res.status(201).json({ message: 'Coorientador criado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o coorientador', details: error });
  }
});

// Rota para listar todos os coorientadores
router.get('/', async (req, res) => {
  try {
    const coorientadores = await listarCoorientadores();
    res.status(200).json(coorientadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os coorientadores', details: error });
  }
});

// Rota para deletar um coorientador por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deletarCoorientador(req.params.id);
    res.status(200).json({ message: 'Coorientador deletado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o coorientador', details: error });
  }
});

// Rota para atualizar um coorientador por ID
router.put('/:id', async (req, res) => {
  const { matricula, nome, titulacao, areaAtuacao, email } = req.body;

  try {
    const result = await atualizarCoorientador(req.params.id, matricula, nome, titulacao, areaAtuacao, email);
    res.status(200).json({ message: 'Coorientador atualizado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o coorientador', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;