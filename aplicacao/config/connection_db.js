const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',     // Host do banco de dados
  user: 'root',   // Usuário do banco
  password: 'root', // Senha do banco
  database: 'sistema_tcc' // Nome do banco de dados
});

// Conectar ao banco
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Exportar a conexão para ser usada em outros arquivos
module.exports = connection;
