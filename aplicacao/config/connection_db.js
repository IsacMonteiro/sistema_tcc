const mysql = require('mysql2');

// Criação do pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',     // Host do banco de dados
  user: 'root',          // Usuário do banco
  password: 'root',      // Senha do banco
  database: 'sistema_tcc', // Nome do banco de dados
  waitForConnections: true, // Aguarda conexões disponíveis no pool
  connectionLimit: 10,      // Limite de conexões no pool
  queueLimit: 0             // Sem limite de filas de conexão
});

// Testar a conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
  connection.release(); // Libera a conexão de volta para o pool
});

// Exportar o pool para ser usado em outros arquivos
module.exports = pool.promise(); // Exportar com suporte a Promises
