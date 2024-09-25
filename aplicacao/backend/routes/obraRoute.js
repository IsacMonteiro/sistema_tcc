const express = require('express');
const router = express.Router();
const { criarObra, deletarObra, atualizarObra, listarObras } = require('../controllers/obraController');

// Rota para criar uma obra
router.post('/', async (req, res) => {
  const { titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor } = req.body;
  
  try {
    const result = await criarObra(titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor);
    res.status(201).json({ message: 'Obra criada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a obra', details: error });
  }
});

// Rota para listar todas as obras
router.get('/', async (req, res) => {
  try {
    const obras = await listarObras();
    res.status(200).json(obras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar as obras', details: error });
  }
});

// Rota para deletar uma obra por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deletarObra(req.params.id);
    res.status(200).json({ message: 'Obra deletada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a obra', details: error });
  }
});

// Rota para atualizar uma obra por ID
router.put('/:id', async (req, res) => {
  const { titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor } = req.body;

  try {
    const result = await atualizarObra(req.params.id, titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor);
    res.status(200).json({ message: 'Obra atualizada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a obra', details: error });
  }
});

module.exports = router;