import { createPinia, setActivePinia } from 'pinia';
import { useOrientadorStore } from '../../src/store/orientadorStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configura o mock do axios
const mock = new MockAdapter(axios);

describe('Testes para a store orientadorStore', () => {
  let orientadorStore;

  beforeEach(() => {
    // Ativa o Pinia antes de cada teste
    setActivePinia(createPinia());

    // Cria a store antes de cada teste
    orientadorStore = useOrientadorStore();
  });

  it('deve listar orientadores corretamente', async () => {
    // Mocka a resposta da API para a rota GET de orientadores
    mock.onGet('http://localhost:3000/api/orientador').reply(200, [
      { id: 1, nome_orientador: 'Orientador Teste 1' },
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ]);

    // Chama a ação de listarOrientadores
    await orientadorStore.listarOrientadores();

    // Verifica se o estado foi atualizado corretamente
    expect(orientadorStore.orientadores).toEqual([
      { id: 1, nome_orientador: 'Orientador Teste 1' },
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ]);
  });

  it('deve cadastrar um novo orientador corretamente', async () => {
    // Mocka a resposta da API para a rota POST de cadastro de orientador
    mock.onPost('http://localhost:3000/api/orientador').reply(201, {
      result: { id: 3, nome_orientador: 'Orientador Teste 3' },
    });

    // Chama a ação de cadastrarOrientador
    const response = await orientadorStore.cadastrarOrientador('123', 'Orientador Teste 3', 'Doutor', 'Física', 'teste@dominio.com');

    // Verifica se o orientador foi adicionado corretamente à lista
    expect(orientadorStore.orientadores).toContainEqual({ id: 3, nome_orientador: 'Orientador Teste 3' });
    expect(response.message).toBe('Orientador cadastrado com sucesso!');
  });

  it('deve excluir um orientador corretamente', async () => {
    // Mocka a resposta da API para a rota DELETE de exclusão de orientador
    mock.onDelete('http://localhost:3000/api/orientador/1').reply(200, { message: 'Orientador deletado com sucesso' });

    // Adiciona orientadores para garantir que existe algo para excluir
    orientadorStore.orientadores = [
      { id: 1, nome_orientador: 'Orientador Teste 1' },
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ];

    // Chama a ação de excluirOrientador
    await orientadorStore.excluirOrientador(1);

    // Simula a atualização da lista de orientadores após a exclusão
    mock.onGet('http://localhost:3000/api/orientador').reply(200, [
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ]);

    // Chama listarOrientadores para atualizar a lista na store
    await orientadorStore.listarOrientadores();

    // Verifica se o orientador foi removido da lista
    expect(orientadorStore.orientadores).not.toContainEqual({ id: 1, nome_orientador: 'Orientador Teste 1' });
    expect(orientadorStore.orientadores).toContainEqual({ id: 2, nome_orientador: 'Orientador Teste 2' });
  });

  it('deve atualizar um orientador corretamente', async () => {
    // Mocka a resposta da API para a rota PUT de atualização de orientador
    mock.onPut('http://localhost:3000/api/orientador/1').reply(200, {
      result: { id: 1, nome_orientador: 'Orientador Atualizado' },
    });

    // Adiciona orientadores para garantir que existe algo para atualizar
    orientadorStore.orientadores = [
      { id: 1, nome_orientador: 'Orientador Teste 1' },
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ];

    // Chama a ação de editarOrientador
    await orientadorStore.editarOrientador(1, '123', 'Orientador Atualizado', 'Doutor', 'Matemática', 'novoemail@dominio.com');

    // Simula a atualização da lista de orientadores após a edição
    mock.onGet('http://localhost:3000/api/orientador').reply(200, [
      { id: 1, nome_orientador: 'Orientador Atualizado' },
      { id: 2, nome_orientador: 'Orientador Teste 2' },
    ]);

    // Chama listarOrientadores para atualizar a lista na store
    await orientadorStore.listarOrientadores();

    // Verifica se o orientador foi atualizado corretamente
    expect(orientadorStore.orientadores).toContainEqual({ id: 1, nome_orientador: 'Orientador Atualizado' });
  });
});
