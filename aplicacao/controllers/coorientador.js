// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para criar um coorientador
function criarCoorientador(matricula, nome, titulacao, areaAtuacao, email) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para inserir um novo coorientador na tabela
    const sql = 'INSERT INTO Coorientador (matricula_coorientador, nome_coorientador, titulacao, area_atuacao, email_coorientador) VALUES (?, ?, ?, ?, ?)';
    // Executa o SQL, substituindo os '?' pelos valores fornecidos
    pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para deletar um coorientador
function deletarCoorientador(id_coorientador) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar o coorientador com base no id fornecido
    const sql = 'DELETE FROM Coorientador WHERE id_coorientador = ?';
    pool.execute(sql, [id_coorientador], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da exclusão
    });
  });
}


// Função para atualizar um coorientador
function atualizarCoorientador(id_coorientador, matricula, nome, titulacao, areaAtuacao, email) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para atualizar os dados do coorientador
    const sql = 'UPDATE Coorientador SET matricula_coorientador = ?, nome_coorientador = ?, titulacao = ?, area_atuacao = ?, email_coorientador = ? WHERE id_coorientador = ?';
    pool.execute(sql, [matricula, nome, titulacao, areaAtuacao, email, id_coorientador], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da atualização
    });
  });
}


// Função para listar todos os coorientadores
function listarCoorientadores() {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para selecionar todos os coorientadores da tabela
    const sql = 'SELECT * FROM Coorientador';
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Rejeita a Promise em caso de erro
      resolve(results); // Resolve a Promise com os resultados da consulta
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarCoorientador, deletarCoorientador, atualizarCoorientador, listarCoorientadores };