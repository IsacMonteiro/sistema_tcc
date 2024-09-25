// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para registrar uma ação no log
async function registrarLog(fk_id_administrador, fk_id_obra, acao, descricao) {
  // Valida os parâmetros de entrada
  if (!fk_id_administrador || !fk_id_obra || !acao || !descricao) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para inserir um novo registro de ação no log
  const sql = 'INSERT INTO LogAcoes (fk_id_administrador, fk_id_obra, acao, data_registro, descricao) VALUES (?, ?, ?, NOW(), ?)';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [fk_id_administrador, fk_id_obra, acao, descricao]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao registrar log: ' + err.message);
  }
}

// Função para listar todos os registros de log
async function listarLogs() {
  // SQL para selecionar todos os registros de log
  const sql = 'SELECT * FROM LogAcoes';

  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar logs: ' + err.message);
  }
}

// Função para excluir registros de log antigos
async function excluirLogsAntigos(dataLimite) {
  // Valida o parâmetro de entrada
  if (!dataLimite) {
    throw new Error('A data limite é obrigatória.');
  }

  // SQL para deletar os registros de log com data de registro anterior à data limite
  const sql = 'DELETE FROM LogAcoes WHERE data_registro < ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [dataLimite]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao excluir logs: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { registrarLog, listarLogs, excluirLogsAntigos };