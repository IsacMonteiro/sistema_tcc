// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para criar um curso
async function criarCurso(nome_curso) {
  // Valida o parâmetro de entrada
  if (!nome_curso) {
    throw new Error('O nome do curso é obrigatório.');
  }

  // SQL para inserir um novo curso
  const sql = 'INSERT INTO Curso (nome_curso) VALUES (?)';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [nome_curso]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao criar curso: ' + err.message);
  }
}

// Função para deletar um curso
async function deletarCurso(id_curso) {
  // Valida o parâmetro de entrada
  if (!id_curso) {
    throw new Error('O ID do curso é obrigatório.');
  }

  // SQL para deletar o curso com base no id fornecido
  const sql = 'DELETE FROM Curso WHERE id_curso = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [id_curso]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao deletar curso: ' + err.message);
  }
}

// Função para atualizar um curso
async function atualizarCurso(id_curso, nome_curso) {
  // Valida os parâmetros de entrada
  if (!id_curso || !nome_curso) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para atualizar o nome do curso
  const sql = 'UPDATE Curso SET nome_curso = ? WHERE id_curso = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [nome_curso, id_curso]);
    return result; // Retorna o resultado da atualização
  } catch (err) {
    throw new Error('Erro ao atualizar curso: ' + err.message);
  }
}

// Função para listar todos os cursos
async function listarCursos() {
  // SQL para selecionar todos os cursos
  const sql = 'SELECT * FROM Curso';

  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar cursos: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarCurso, deletarCurso, atualizarCurso, listarCursos };