// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para associar uma obra a um coorientador
async function associarObraCoorientador(fk_id_obra, fk_id_coorientador) {
  // Valida os parâmetros de entrada
  if (!fk_id_obra || !fk_id_coorientador) {
    throw new Error('Os IDs da obra e do coorientador são obrigatórios.');
  }

  // SQL para inserir uma associação de obra e coorientador na tabela ObraCoorientador
  const sql = 'INSERT INTO ObraCoorientador (fk_id_obra, fk_id_coorientador) VALUES (?, ?)';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [fk_id_obra, fk_id_coorientador]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao associar obra ao coorientador: ' + err.message);
  }
}

// Função para desassociar uma obra de um coorientador
async function desassociarObraCoorientador(fk_id_obra, fk_id_coorientador) {
  // Valida os parâmetros de entrada
  if (!fk_id_obra || !fk_id_coorientador) {
    throw new Error('Os IDs da obra e do coorientador são obrigatórios.');
  }

  // SQL para deletar a associação de uma obra com um coorientador com base nos IDs
  const sql = 'DELETE FROM ObraCoorientador WHERE fk_id_obra = ? AND fk_id_coorientador = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [fk_id_obra, fk_id_coorientador]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao desassociar obra do coorientador: ' + err.message);
  }
}

// Função para listar todas as associações de obras e coorientadores
async function listarObraCoorientadores() {
  // SQL para selecionar todas as associações da tabela ObraCoorientador
  const sql = 'SELECT * FROM ObraCoorientador';

  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar associações de obras e coorientadores: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { associarObraCoorientador, desassociarObraCoorientador, listarObraCoorientadores };