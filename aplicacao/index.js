const { criarAutor, deletarAutor, atualizarAutor } = require('./controllers/autor');

// Criar um autor
criarAutor('20221001', 'João Silva', 'joao.silva@example.com')
  .then(result => console.log('Autor criado:', result))
  .catch(err => console.error('Erro ao criar autor:', err));

// Deletar um autor
deletarAutor(1)
  .then(result => console.log('Autor deletado:', result))
  .catch(err => console.error('Erro ao deletar autor:', err));

// Atualizar um autor
atualizarAutor(1, '20221002', 'João Atualizado', 'joao.atualizado@example.com')
  .then(result => console.log('Autor atualizado:', result))
  .catch(err => console.error('Erro ao atualizar autor:', err));
