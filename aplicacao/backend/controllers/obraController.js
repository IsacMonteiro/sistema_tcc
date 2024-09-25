// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para criar uma obra
async function criarObra(titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) {
  // Valida os parâmetros de entrada
  if (!titulo || !tipo || !dataApresentacao || !resumo || !palavrasChave || !arquivo || !fk_id_curso || !fk_id_orientador || !fk_id_autor) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para inserir uma nova obra na tabela
  const sql = `
    INSERT INTO Obra (titulo, tipo, data_apresentacao, resumo, palavras_chave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor]);
    return result; // Retorna o resultado da operação
  } catch (err) {
    throw new Error('Erro ao criar obra: ' + err.message);
  }
}

// Função para deletar uma obra
async function deletarObra(id_obra) {
  // Valida o parâmetro de entrada
  if (!id_obra) {
    throw new Error('O ID da obra é obrigatório.');
  }

  // SQL para deletar a obra com base no id fornecido
  const sql = 'DELETE FROM Obra WHERE id_obra = ?';

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [id_obra]);
    return result; // Retorna o resultado da exclusão
  } catch (err) {
    throw new Error('Erro ao deletar obra: ' + err.message);
  }
}

// Função para atualizar uma obra
async function atualizarObra(id_obra, titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) {
  // Valida os parâmetros de entrada
  if (!id_obra || !titulo || !tipo || !dataApresentacao || !resumo || !palavrasChave || !arquivo || !fk_id_curso || !fk_id_orientador || !fk_id_autor) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  // SQL para atualizar os dados da obra
  const sql = `
    UPDATE Obra 
    SET titulo = ?, tipo = ?, data_apresentacao = ?, resumo = ?, palavras_chave = ?, arquivo = ?, fk_id_curso = ?, fk_id_orientador = ?, fk_id_autor = ?
    WHERE id_obra = ?
  `;

  try {
    // Executa o SQL e espera o resultado
    const [result] = await pool.execute(sql, [titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor, id_obra]);
    return result; // Retorna o resultado da atualização
  } catch (err) {
    throw new Error('Erro ao atualizar obra: ' + err.message);
  }
}

// Função para listar todas as obras
async function listarObras() {
  // SQL para selecionar todas as obras da tabela
  const sql = 'SELECT * FROM Obra';

  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar obras: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarObra, deletarObra, atualizarObra, listarObras };