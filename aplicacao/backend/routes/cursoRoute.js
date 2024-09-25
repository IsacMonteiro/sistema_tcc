const express = require('express');
const router = express.Router();
const { criarCurso, deletarCurso, atualizarCurso, listarCursos } = require('../controllers/cursoController');

// Rota para criar um curso
router.post('/', async (req, res) => {
  const { nome_curso } = req.body;

  try {
    const result = await criarCurso(nome_curso);
    res.status(201).json({ message: 'Curso criado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o curso', details: error });
  }
});

// Rota para listar todos os cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await listarCursos();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os cursos', details: error });
  }
});

// Rota para deletar um curso por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deletarCurso(req.params.id);
    res.status(200).json({ message: 'Curso deletado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o curso', details: error });
  }
});

// Rota para atualizar um curso por ID
router.put('/:id', async (req, res) => {
  const { nome_curso } = req.body;

  try {
    const result = await atualizarCurso(req.params.id, nome_curso);
    res.status(200).json({ message: 'Curso atualizado com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o curso', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;