// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para criar um orientador
function criarOrientador(matricula, nome, titulacao, areaAtuacao, email) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Orientador (matricula_orientador, nome_orientador, titulacao, area_atuacao, email_orientador) VALUES (?, ?, ?, ?, ?)';
    // Executa o SQL, substituindo os '?' pelos valores fornecidos
    pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para deletar um orientador
function deletarOrientador(id_orientador) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar o orientador com base no id fornecido
    const sql = 'DELETE FROM Orientador WHERE id_orientador = ?';
    pool.execute(sql, [id_orientador], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da exclusão
    });
  });
}


// Função para atualizar um orientador
function atualizarOrientador(id_orientador, matricula, nome, titulacao, areaAtuacao, email) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para atualizar os dados do orientador
    const sql = 'UPDATE Orientador SET matricula_orientador = ?, nome_orientador = ?, titulacao = ?, area_atuacao = ?, email_orientador = ? WHERE id_orientador = ?';
    pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email, id_orientador], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da atualização
    });
  });
}


// Função para listar todos os orientadores
function listarOrientadores() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Orientador'; // Seleciona todos os orientadores da tabela
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Rejeita a Promise em caso de erro
      resolve(results); // Resolve a Promise com os resultados da consulta
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarOrientador, deletarOrientador, atualizarOrientador, listarOrientadores };