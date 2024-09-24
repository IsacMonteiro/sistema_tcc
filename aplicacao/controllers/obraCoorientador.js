// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para associar uma obra a um coorientador
function associarObraCoorientador(fk_id_obra, fk_id_coorientador) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ObraCoorientador (fk_id_obra, fk_id_coorientador) VALUES (?, ?)';
    pool.execute(sql, [fk_id_obra, fk_id_coorientador], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}


// Função para desassociar uma obra de um coorientador
function desassociarObraCoorientador(fk_id_obra, fk_id_coorientador) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ObraCoorientador WHERE fk_id_obra = ? AND fk_id_coorientador = ?';
    pool.execute(sql, [fk_id_obra, fk_id_coorientador], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}


// Função para listar todas as associações de obras e coorientadores
function listarObraCoorientadores() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ObraCoorientador';
    pool.execute(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}


// Exporta as funções
module.exports = { associarObraCoorientador, desassociarObraCoorientador, listarObraCoorientadores };