// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para criar um orientador
async function criarOrientador(matricula, nome, titulacao, areaAtuacao, email) {
  // Valida os parâmetros de entrada
  if (!matricula || !nome || !titulacao || !areaAtuacao || !email) {
    throw new Error('Todos os campos do orientador são obrigatórios.');
  }

  const sql = 'INSERT INTO Orientador (matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador) VALUES (?, ?, ?, ?, ?)';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao criar orientador: ' + err.message);
  }
}

// Função para deletar um orientador
async function deletarOrientador(id_orientador) {
  // Valida o parâmetro de entrada
  if (!id_orientador) {
    throw new Error('O ID do orientador é obrigatório.');
  }

  const sql = 'DELETE FROM Orientador WHERE id_orientador = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [id_orientador]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao deletar orientador: ' + err.message);
  }
}

// Função para atualizar um orientador
async function atualizarOrientador(id_orientador, matricula, nome, titulacao, areaAtuacao, email) {
  // Valida os parâmetros de entrada
  if (!id_orientador || !matricula || !nome || !titulacao || !areaAtuacao || !email) {
    throw new Error('Todos os campos do orientador são obrigatórios.');
  }

  const sql = 'UPDATE Orientador SET matricula_orientador = ?, nome_orientador = ?, titulacao = ?, area_atuacao = ?, email_orientador = ? WHERE id_orientador = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email, id_orientador]);
    return result; // Retorna o resultado da atualização
  } catch (err) {
    throw new Error('Erro ao atualizar orientador: ' + err.message);
  }
}

// Função para listar todos os orientadores
async function listarOrientadores() {
  const sql = 'SELECT * FROM Orientador'; // Seleciona todos os orientadores da tabela

  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar orientadores: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarOrientador, deletarOrientador, atualizarOrientador, listarOrientadores };