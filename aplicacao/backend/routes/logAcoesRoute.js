const express = require('express');
const router = express.Router();
const { registrarLog, listarLogs, excluirLogsAntigos } = require('../controllers/logAcoesController');

// Rota para registrar uma nova ação no log
router.post('/', async (req, res) => {
  const { fk_id_administrador, fk_id_obra, acao, descricao } = req.body;

  try {
    const result = await registrarLog(fk_id_administrador, fk_id_obra, acao, descricao);
    res.status(201).json({ message: 'Ação registrada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar a ação', details: error });
  }
});

// Rota para listar todos os registros de log
router.get('/', async (req, res) => {
  try {
    const logs = await listarLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os logs', details: error });
  }
});

// Rota para excluir registros de log antigos
router.delete('/', async (req, res) => {
  const { dataLimite } = req.body;

  try {
    const result = await excluirLogsAntigos(dataLimite);
    res.status(200).json({ message: 'Logs antigos excluídos com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir logs antigos', details: error });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;