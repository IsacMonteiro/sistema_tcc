// Importa a configuração de conexão com o banco de dados
const pool = require('../config/connection_db');


// Função para criar um curso
function criarCurso(nome_curso) {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para inserir um novo curso
    const sql = 'INSERT INTO Curso (nome_curso) VALUES (?)';
    // Executa o SQL, substituindo o '?' pelo valor fornecido
    pool.execute(sql, [nome_curso], (err, result) => {
      if (err) return reject(err); // Se ocorrer um erro, a Promise é rejeitada
      resolve(result); // Se a operação for bem-sucedida, a Promise é resolvida com o resultado da execução
    });
  });
}


// Função para deletar um curso
function deletarCurso(id_curso) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para deletar o curso com base no id fornecido
    const sql = 'DELETE FROM Curso WHERE id_curso = ?';
    pool.execute(sql, [id_curso], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da exclusão
    });
  });
}


// Função para atualizar um curso
function atualizarCurso(id_curso, nome_curso) {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para atualizar o nome do curso
    const sql = 'UPDATE Curso SET nome_curso = ? WHERE id_curso = ?';
    pool.execute(sql, [nome_curso, id_curso], (err, result) => {
      if (err) return reject(err); // Rejeita a Promise se ocorrer um erro
      resolve(result); // Resolve a Promise com o resultado da atualização
    });
  });
}


// Função para listar todos os cursos
function listarCursos() {
  // Retorna uma Promise para lidar com a operação assíncrona
  return new Promise((resolve, reject) => {
    // SQL para selecionar todos os cursos
    const sql = 'SELECT * FROM Curso';
    pool.execute(sql, (err, results) => {
      if (err) return reject(err); // Rejeita a Promise em caso de erro
      resolve(results); // Resolve a Promise com os resultados da consulta
    });
  });
}


// Exporta as funções para que possam ser utilizadas em outros módulos
module.exports = { criarCurso, deletarCurso, atualizarCurso, listarCursos };