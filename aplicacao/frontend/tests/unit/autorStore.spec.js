import { createPinia, setActivePinia } from 'pinia';
import { useAutorStore } from '../../src/store/autorStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configura o mock do axios
const mock = new MockAdapter(axios);

describe('Testes para a store autorStore', () => {
  let autorStore;

  beforeEach(() => {
    // Ativa o Pinia antes de cada teste
    setActivePinia(createPinia());

    // Cria a store antes de cada teste
    autorStore = useAutorStore();
  });

  it('deve listar autores corretamente', async () => {
    // Mocka a resposta da API para a rota GET de autores
    mock.onGet('http://localhost:3000/api/autor').reply(200, [
      { id: 1, nome_autor: 'Autor Teste 1' },
      { id: 2, nome_autor: 'Autor Teste 2' },
    ]);

    // Chama a ação de listarAutores
    await autorStore.listarAutores();

    // Verifica se o estado foi atualizado corretamente
    expect(autorStore.autores).toEqual([
      { id: 1, nome_autor: 'Autor Teste 1' },
      { id: 2, nome_autor: 'Autor Teste 2' },
    ]);
  });

  it('deve cadastrar um novo autor corretamente', async () => {
    // Mocka a resposta da API para a rota POST de cadastro de autor
    mock.onPost('http://localhost:3000/api/autor').reply(201, {
      result: { id: 3, nome_autor: 'Autor Teste 3' },
    });

    // Chama a ação de cadastrarAutor
    const response = await autorStore.cadastrarAutor('123', 'Autor Teste 3', 'teste@dominio.com');

    // Verifica se o autor foi adicionado corretamente à lista
    expect(autorStore.autores).toContainEqual({ id: 3, nome_autor: 'Autor Teste 3' });
    expect(response.message).toBe('Autor cadastrado com sucesso!');
  });

  it('deve excluir um autor corretamente', async () => {
    // Mocka a resposta da API para a rota DELETE de exclusão de autor
    mock.onDelete('http://localhost:3000/api/autor/1').reply(200, { message: 'Autor deletado com sucesso' });

    // Adiciona um autor para garantir que existe algo para excluir
    autorStore.autores = [
      { id: 1, nome_autor: 'Autor Teste 1' },
      { id: 2, nome_autor: 'Autor Teste 2' },
    ];

    // Chama a ação de excluirAutor
    await autorStore.excluirAutor(1);

    // Verifica se o autor foi removido da lista
    expect(autorStore.autores).not.toContainEqual({ id: 1, nome_autor: 'Autor Teste 1' });
  });

  it('deve atualizar um autor corretamente', async () => {
    // Mocka a resposta da API para a rota PUT de atualização de autor
    mock.onPut('http://localhost:3000/api/autor/1').reply(200, {
      result: { id: 1, nome_autor: 'Autor Atualizado', matricula_autor: '123', email_autor: 'novoemail@dominio.com' },
    });

    // Adiciona um autor para garantir que existe algo para atualizar
    autorStore.autores = [
      { id: 1, nome_autor: 'Autor Teste 1', matricula_autor: '111', email_autor: 'teste@dominio.com' },
      { id: 2, nome_autor: 'Autor Teste 2', matricula_autor: '222', email_autor: 'teste2@dominio.com' },
    ];

    // Chama a ação de editarAutor
    await autorStore.editarAutor(1, '123', 'Autor Atualizado', 'novoemail@dominio.com');

    // Verifica se o autor foi atualizado corretamente
    expect(autorStore.autores).toContainEqual({
      id: 1,
      nome_autor: 'Autor Atualizado',
      matricula_autor: '123',
      email_autor: 'novoemail@dominio.com',
    });
  });
});
