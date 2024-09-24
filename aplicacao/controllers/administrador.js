// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para listar todos os administradores
function listarAdministradores() {
  return new Promise((resolve, reject) => {
    // SQL para selecionar todos os administradores
    const sql = 'SELECT * FROM Administrador';
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Rejeita a Promise em caso de erro
      resolve(results); // Resolve a Promise com os resultados da consulta
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { listarAdministradores };