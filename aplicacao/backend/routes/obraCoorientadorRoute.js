const express = require('express');
const router = express.Router();
const { 
  associarObraCoorientador, 
  desassociarObraCoorientador, 
  listarObraCoorientadores 
} = require('../controllers/obraCoorientadorController');

// Rota para associar uma obra a um coorientador
router.post('/', async (req, res) => {
  const { fk_id_obra, fk_id_coorientador } = req.body;
  if (!fk_id_obra || !fk_id_coorientador) {
    return res.status(400).json({ error: 'Os campos fk_id_obra e fk_id_coorientador são obrigatórios' });
  }

  try {
    // Verifique se a obra e o coorientador existem
    const obraExistente = await verificarObraExistente(fk_id_obra); 
    const coorientadorExistente = await verificarCoorientadorExistente(fk_id_coorientador);

    if (!obraExistente) {
      return res.status(404).json({ error: 'Obra não encontrada' });
    }
    if (!coorientadorExistente) {
      return res.status(404).json({ error: 'Coorientador não encontrado' });
    }

    const result = await associarObraCoorientador(fk_id_obra, fk_id_coorientador);
    res.status(201).json({ message: 'Associação criada com sucesso', data: result });
  } catch (error) {
    console.error(error); // Log do erro para diagnóstico
    res.status(500).json({ error: 'Erro ao associar obra a coorientador', details: error.message });
  }
});

// Função para verificar se a obra existe
async function verificarObraExistente(fk_id_obra) {
  // Implementar a verificação da existência da obra no banco de dados
  return true; // Retorne true se a obra existir, caso contrário false
}

// Função para verificar se o coorientador existe
async function verificarCoorientadorExistente(fk_id_coorientador) {
  // Implementar a verificação da existência do coorientador no banco de dados
  return true; // Retorne true se o coorientador existir, caso contrário false
}

// Rota para desassociar uma obra de um coorientador
router.delete('/:fk_id_obra/:fk_id_coorientador', async (req, res) => {
  const { fk_id_obra, fk_id_coorientador } = req.params;

  try {
    const result = await desassociarObraCoorientador(fk_id_obra, fk_id_coorientador);
    if (!result) {
      return res.status(404).json({ error: 'Associação não encontrada ou já removida' });
    }
    res.status(200).json({ message: 'Associação removida com sucesso', data: result });
  } catch (error) {
    console.error(error); // Log do erro para diagnóstico
    res.status(500).json({ error: 'Erro ao desassociar obra de coorientador', details: error.message });
  }
});

// Rota para listar todas as associações de obras e coorientadores
router.get('/', async (req, res) => {
  try {
    const associations = await listarObraCoorientadores();
    if (Array.isArray(associations)) {  // Verifica se a resposta é um array
      return res.status(200).json(associations);  // Retorna diretamente o array
    } else {
      return res.status(404).json(associations);  // Retorna a mensagem de erro se não for um array
    }
  } catch (error) {
    console.error(error);  // Log do erro para diagnóstico
    res.status(500).json({ error: 'Erro ao listar associações de obras e coorientadores', details: error.message });
  }
});

// Exporta as rotas para que possam ser utilizadas em outros módulos
module.exports = router;