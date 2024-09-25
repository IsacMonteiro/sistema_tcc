const express = require('express');
const router = express.Router();
const { criarAutor, listarAutores, deletarAutor, atualizarAutor } = require('../controllers/autorController');

// Rota para criar um autor
router.post('/', async (req, res) => {
  const { matricula, nome, email } = req.body;
  try {
    const result = await criarAutor(matricula, nome, email);
    res.status(201).json({ message: 'Autor criado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar autor' });
  }
});

// Rota para listar todos os autores
router.get('/', async (req, res) => {
  try {
    const autores = await listarAutores();
    res.status(200).json(autores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar autores' });
  }
});

// Rota para deletar um autor
router.delete('/:id', async (req, res) => {
  try {
    const result = await deletarAutor(req.params.id);
    res.status(200).json({ message: 'Autor deletado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar autor' });
  }
});

// Rota para atualizar um autor
router.put('/:id', async (req, res) => {
  const { matricula, nome, email } = req.body;
  try {
    const result = await atualizarAutor(req.params.id, matricula, nome, email);
    res.status(200).json({ message: 'Autor atualizado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar autor' });
  }
});

module.exports = router;