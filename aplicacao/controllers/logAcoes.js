// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para registrar uma ação no log
function registrarLog(fk_id_administrador, fk_id_obra, acao, descricao) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para inserir um novo registro de ação no log
    const sql = 'INSERT INTO LogAcoes (fk_id_administrador, fk_id_obra, acao, data_registro, descricao) VALUES (?, ?, ?, NOW(), ?)';
    // Executa o SQL, substituindo os '?' pelos valores fornecidos
    pool.execute(sql, [fk_id_administrador, fk_id_obra, acao, descricao], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para listar todos os registros de log
function listarLogs() {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para selecionar todos os registros de log
    const sql = 'SELECT * FROM LogAcoes';
    // Executa a consulta SQL
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(results); // Se a operação for bem-sucedida, a Promise é resolvida com os resultados da consulta
    });
  });
}


// Função para excluir registros de log antigos
function excluirLogsAntigos(dataLimite) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar os registros de log com data de registro anterior à data limite
    const sql = 'DELETE FROM LogAcoes WHERE data_registro < ?';
    // Executa o SQL, substituindo o '?' pela data limite fornecida
    pool.execute(sql, [dataLimite], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da exclusão
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { registrarLog, listarLogs, excluirLogsAntigos };
