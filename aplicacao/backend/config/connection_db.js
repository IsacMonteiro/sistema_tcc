const mysql = require('mysql2');

// Criação do pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sistema_tcc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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