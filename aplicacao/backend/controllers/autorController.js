// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para criar um autor
async function criarAutor(matricula, nome, email) {
  // Valida os parâmetros de entrada
  if (!matricula || !nome || !email) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para inserir um novo autor
  const sql = 'INSERT INTO Autor (matricula_autor, nome_autor, email_autor) VALUES (?, ?, ?)';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, email]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao criar autor: ' + err.message);
  }
}

// Função para deletar um autor
async function deletarAutor(id_autor) {
  // Valida o parâmetro de entrada
  if (!id_autor) {
    throw new Error('O ID do autor é obrigatório.');
  }

  // SQL para deletar o autor com base no id fornecido
  const sql = 'DELETE FROM Autor WHERE id_autor = ?';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [id_autor]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao deletar autor: ' + err.message);
  }
}

// Função para atualizar um autor
async function atualizarAutor(id_autor, matricula, nome, email) {
  // Valida os parâmetros de entrada
  if (!id_autor || !matricula || !nome || !email) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para atualizar os dados do autor
  const sql = 'UPDATE Autor SET matricula_autor = ?, nome_autor = ?, email_autor = ? WHERE id_autor = ?';
  
  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [matricula, nome, email, id_autor]);
    return result; // Retorna o resultado da atualização
  } catch (err) {
    throw new Error('Erro ao atualizar autor: ' + err.message);
  }
}

// Função para listar todos os autores
async function listarAutores() {
  // SQL para selecionar todos os autores da tabela
  const sql = 'SELECT * FROM Autor';
  
  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar autores: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarAutor, deletarAutor, atualizarAutor, listarAutores };