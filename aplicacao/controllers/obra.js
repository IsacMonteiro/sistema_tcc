// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para criar uma obra
function criarObra(titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para inserir uma nova obra na tabela
    const sql = `
      INSERT INTO Obra (titulo, tipo, data_apresentacao, resumo, palavras_chave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Executa o SQL, substituindo os '?' pelos valores fornecidos
    pool.execute(sql, [titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para deletar uma obra
function deletarObra(id_obra) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar a obra com base no id fornecido
    const sql = 'DELETE FROM Obra WHERE id_obra = ?';
    pool.execute(sql, [id_obra], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da exclusão
    });
  });
}


// Função para atualizar uma obra
function atualizarObra(id_obra, titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para atualizar os dados da obra
    const sql = `
      UPDATE Obra 
      SET titulo = ?, tipo = ?, data_apresentacao = ?, resumo = ?, palavras_chave = ?, arquivo = ?, fk_id_curso = ?, fk_id_orientador = ?, fk_id_autor = ?
      WHERE id_obra = ?
    `;
    pool.execute(sql, [titulo, tipo, dataApresentacao, resumo, palavrasChave, arquivo, fk_id_curso, fk_id_orientador, fk_id_autor, id_obra], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da atualização
    });
  });
}


// Função para listar todas as obras
function listarObras() {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para selecionar todas as obras da tabela
    const sql = 'SELECT * FROM Obra';
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Rejeita a Promise em caso de erro
      resolve(results); // Resolve a Promise com os resultados da consulta
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarObra, deletarObra, atualizarObra, listarObras };