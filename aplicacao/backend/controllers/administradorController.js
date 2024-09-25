// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');

// Função para listar todos os administradores
async function listarAdministradores() {
  // SQL para selecionar todos os administradores
  const sql = 'SELECT * FROM Administrador';
  
  try {
    // Executa o SQL e espera os resultados
    const [results] = await pool.execute(sql);
    return results; // Retorna os resultados da consulta
  } catch (err) {
    throw new Error('Erro ao listar administradores: ' + err.message);
  }
}

// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { listarAdministradores };