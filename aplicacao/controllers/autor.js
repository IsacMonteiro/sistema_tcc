// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para criar um autor
function criarAutor(matricula, nome, email) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Autor (matricula_autor, nome_autor, email_autor) VALUES (?, ?, ?)';
    // Executa o SQL, substituindo os '?' pelos valores fornecidos
    pool.execute(sql, [matricula, nome, email], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para deletar um autor
function deletarAutor(id_autor) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar o autor com base no id fornecido
    const sql = 'DELETE FROM Autor WHERE id_autor = ?'; 
    pool.execute(sql, [id_autor], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da exclusão
    });
  });
}


// Função para atualizar um autor
function atualizarAutor(id_autor, matricula, nome, email) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para atualizar os dados do autor
    const sql = 'UPDATE Autor SET matricula_autor = ?, nome_autor = ?, email_autor = ? WHERE id_autor = ?';
    pool.execute(sql, [matricula, nome, email, id_autor], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da atualização
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarAutor, deletarAutor, atualizarAutor };
