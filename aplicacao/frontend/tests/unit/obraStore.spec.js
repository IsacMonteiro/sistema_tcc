import { createPinia, setActivePinia } from 'pinia';
import { useObraStore } from '../../src/store/obraStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configura o mock do axios
const mock = new MockAdapter(axios);

describe('Testes para a store obraStore', () => {
  let obraStore;

  beforeEach(() => {
    // Ativa o Pinia antes de cada teste
    setActivePinia(createPinia());
    obraStore = useObraStore();
  });

  it('deve listar obras corretamente', async () => {
    // Mocka a resposta da API para a rota GET de obras
    mock.onGet('http://localhost:3000/api/obra').reply(200, [
      { id: 1, titulo: 'Obra Teste 1' },
      { id: 2, titulo: 'Obra Teste 2' },
    ]);

    // Chama a ação de listarObras
    await obraStore.listarObras();

    // Verifica se o estado foi atualizado corretamente
    expect(obraStore.obras).toEqual([
      { id: 1, titulo: 'Obra Teste 1' },
      { id: 2, titulo: 'Obra Teste 2' },
    ]);
  });

  it('deve cadastrar uma nova obra corretamente', async () => {
    // Mocka a resposta da API para a rota POST de cadastro de obra
    mock.onPost('http://localhost:3000/api/obra').reply(201, {
      result: { id: 3, titulo: 'Obra Teste 3' },
    });

    // Chama a ação de cadastrarObra
    const response = await obraStore.cadastrarObra(
      'Título Teste',
      'Resumo Teste',
      ['chave1', 'chave2'],
      '2024-12-01',
      'Artigo',
      'Publicado',
      1,
      2,
      3
    );

    // Verifica se a obra foi adicionada corretamente à lista
    expect(obraStore.obras).toContainEqual({ id: 3, titulo: 'Obra Teste 3' });
    expect(response.message).toBe('Obra cadastrada com sucesso!');
  });

  it('deve excluir uma obra corretamente', async () => {
    // Mocka a resposta da API para a rota DELETE de exclusão de obra
    mock.onDelete('http://localhost:3000/api/obra/1').reply(200, { message: 'Obra deletada com sucesso' });

    // Adiciona obras à store antes de excluir
    obraStore.obras = [
      { id: 1, titulo: 'Obra Teste 1' },
      { id: 2, titulo: 'Obra Teste 2' },
    ];

    // Chama a ação de excluirObra
    await obraStore.excluirObra(1);

    // Mocka a resposta da API para listar após exclusão
    mock.onGet('http://localhost:3000/api/obra').reply(200, [
      { id: 2, titulo: 'Obra Teste 2' },
    ]);

    // Atualiza a lista na store
    await obraStore.listarObras();

    // Verifica se a obra foi removida corretamente
    expect(obraStore.obras).not.toContainEqual({ id: 1, titulo: 'Obra Teste 1' });
  });

  it('deve atualizar uma obra corretamente', async () => {
    // Mocka a resposta da API para a rota PUT de atualização de obra
    mock.onPut('http://localhost:3000/api/obra/1').reply(200, {
      result: { id: 1, titulo: 'Obra Atualizada' },
    });

    // Adiciona obras à store antes de atualizar
    obraStore.obras = [
      { id: 1, titulo: 'Obra Teste 1' },
      { id: 2, titulo: 'Obra Teste 2' },
    ];

    // Chama a ação de editarObra
    await obraStore.editarObra(
      1,
      'Obra Atualizada',
      'Resumo Atualizado',
      ['chave1', 'chave3'],
      '2024-12-01',
      'Livro',
      'Publicado',
      1,
      2,
      3
    );

    // Mocka a resposta da API para listar após atualização
    mock.onGet('http://localhost:3000/api/obra').reply(200, [
      { id: 1, titulo: 'Obra Atualizada' },
      { id: 2, titulo: 'Obra Teste 2' },
    ]);

    // Atualiza a lista na store
    await obraStore.listarObras();

    // Verifica se a obra foi atualizada corretamente
    expect(obraStore.obras).toContainEqual({ id: 1, titulo: 'Obra Atualizada' });
  });
});
