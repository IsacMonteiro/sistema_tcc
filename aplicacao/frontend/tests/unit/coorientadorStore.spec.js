import { createPinia, setActivePinia } from 'pinia';
import { useCoorientadorStore } from '../../src/store/coorientadorStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configura o mock do axios
const mock = new MockAdapter(axios);

describe('Testes para a store coorientadorStore', () => {
  let coorientadorStore;

  beforeEach(() => {
    // Ativa o Pinia antes de cada teste
    setActivePinia(createPinia());

    // Cria a store antes de cada teste
    coorientadorStore = useCoorientadorStore();
  });

  it('deve listar coorientadores corretamente', async () => {
    // Mocka a resposta da API para a rota GET de coorientadores
    mock.onGet('http://localhost:3000/api/coorientador').reply(200, [
      { id: 1, nome_coorientador: 'Coorientador Teste 1' },
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ]);

    // Chama a ação de listarCoorientadores
    await coorientadorStore.listarCoorientadores();

    // Verifica se o estado foi atualizado corretamente
    expect(coorientadorStore.coorientadores).toEqual([
      { id: 1, nome_coorientador: 'Coorientador Teste 1' },
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ]);
  });

  it('deve cadastrar um novo coorientador corretamente', async () => {
    // Mocka a resposta da API para a rota POST de cadastro de coorientador
    mock.onPost('http://localhost:3000/api/coorientador').reply(201, {
      result: { id: 3, nome_coorientador: 'Coorientador Teste 3' },
    });

    // Chama a ação de cadastrarCoorientador
    const response = await coorientadorStore.cadastrarCoorientador('123', 'Coorientador Teste 3', 'Doutor', 'Matemática', 'teste@dominio.com');

    // Verifica se o coorientador foi adicionado corretamente à lista
    expect(coorientadorStore.coorientadores).toContainEqual({ id: 3, nome_coorientador: 'Coorientador Teste 3' });
    expect(response.message).toBe('Coorientador cadastrado com sucesso!');
  });

  it('deve excluir um coorientador corretamente', async () => {
    // Mocka a resposta da API para a rota DELETE de exclusão de coorientador
    mock.onDelete('http://localhost:3000/api/coorientador/1').reply(200, { message: 'Coorientador deletado com sucesso' });

    // Adiciona coorientadores para garantir que existe algo para excluir
    coorientadorStore.coorientadores = [
      { id: 1, nome_coorientador: 'Coorientador Teste 1' },
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ];

    // Chama a ação de excluirCoorientador
    await coorientadorStore.excluirCoorientador(1);

    // Simula a atualização da lista de coorientadores após a exclusão
    mock.onGet('http://localhost:3000/api/coorientador').reply(200, [
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ]);

    // Chama listarCoorientadores para atualizar a lista na store
    await coorientadorStore.listarCoorientadores();

    // Verifica se o coorientador foi removido da lista
    expect(coorientadorStore.coorientadores).not.toContainEqual({ id: 1, nome_coorientador: 'Coorientador Teste 1' });
    expect(coorientadorStore.coorientadores).toContainEqual({ id: 2, nome_coorientador: 'Coorientador Teste 2' });
  });

  it('deve atualizar um coorientador corretamente', async () => {
    // Mocka a resposta da API para a rota PUT de atualização de coorientador
    mock.onPut('http://localhost:3000/api/coorientador/1').reply(200, {
      result: { id: 1, nome_coorientador: 'Coorientador Atualizado' },
    });

    // Adiciona coorientadores para garantir que existe algo para atualizar
    coorientadorStore.coorientadores = [
      { id: 1, nome_coorientador: 'Coorientador Teste 1' },
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ];

    // Chama a ação de editarCoorientador
    await coorientadorStore.editarCoorientador(1, '123', 'Coorientador Atualizado', 'Doutor', 'Física', 'novoemail@dominio.com');

    // Simula a atualização da lista de coorientadores após a edição
    mock.onGet('http://localhost:3000/api/coorientador').reply(200, [
      { id: 1, nome_coorientador: 'Coorientador Atualizado' },
      { id: 2, nome_coorientador: 'Coorientador Teste 2' },
    ]);

    // Chama listarCoorientadores para atualizar a lista na store
    await coorientadorStore.listarCoorientadores();

    // Verifica se o coorientador foi atualizado corretamente
    expect(coorientadorStore.coorientadores).toContainEqual({ id: 1, nome_coorientador: 'Coorientador Atualizado' });
  });
});
