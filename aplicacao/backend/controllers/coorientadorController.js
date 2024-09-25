// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para criar um coorientador
async function criarCoorientador(matricula, nome, titulacao, areaAtuacao, email) {
  // Valida os parâmetros de entrada
  if (!matricula || !nome || !titulacao || !areaAtuacao || !email) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para inserir um novo coorientador na tabela
  const sql = 'INSERT INTO Coorientador (matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador) VALUES (?, ?, ?, ?, ?)';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao criar coorientador: ' + err.message);
  }
}

// Função para deletar um coorientador
async function deletarCoorientador(id_coorientador) {
  // Valida o parâmetro de entrada
  if (!id_coorientador) {
    throw new Error('O ID do coorientador é obrigatório.');
  }

  // SQL para deletar o coorientador com base no id fornecido
  const sql = 'DELETE FROM Coorientador WHERE id_coorientador = ?';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [id_coorientador]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao deletar coorientador: ' + err.message);
  }
}

// Função para atualizar um coorientador
async function atualizarCoorientador(id_coorientador, matricula, nome, titulacao, areaAtuacao, email) {
  // Valida os parâmetros de entrada
  if (!id_coorientador || !matricula || !nome || !titulacao || !areaAtuacao || !email) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para atualizar os dados do coorientador
  const sql = 'UPDATE Coorientador SET matricula_coorientador = ?, nome_coorientador = ?, titulacao = ?, area_atuacao = ?, email_coorientador = ? WHERE id_coorientador = ?';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email, id_coorientador]);
    return result; // Retorna o resultado da atualização
  } catch (err) {
    throw new Error('Erro ao atualizar coorientador: ' + err.message);
  }
}

// Função para listar todos os coorientadores
async function listarCoorientadores() {
  // SQL para selecionar todos os coorientadores da tabela
  const sql = 'SELECT * FROM Coorientador';
  
  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar coorientadores: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarCoorientador, deletarCoorientador, atualizarCoorientador, listarCoorientadores };