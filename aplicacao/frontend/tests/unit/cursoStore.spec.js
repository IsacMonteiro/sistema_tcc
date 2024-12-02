import { createPinia, setActivePinia } from 'pinia';
import { useCursoStore } from '../../src/store/cursoStore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configura o mock do axios
const mock = new MockAdapter(axios);

describe('Testes para a store cursoStore', () => {
  let cursoStore;

  beforeEach(() => {
    // Ativa o Pinia antes de cada teste
    setActivePinia(createPinia());
    cursoStore = useCursoStore();
  });

  it('deve listar cursos corretamente', async () => {
    // Mocka a resposta da API para a rota GET de cursos
    mock.onGet('http://localhost:3000/api/curso').reply(200, [
      { id: 1, nome_curso: 'Curso Teste 1' },
      { id: 2, nome_curso: 'Curso Teste 2' },
    ]);

    // Chama a ação de listarCursos
    await cursoStore.listarCursos();

    // Verifica se o estado foi atualizado corretamente
    expect(cursoStore.cursos).toEqual([
      { id: 1, nome_curso: 'Curso Teste 1' },
      { id: 2, nome_curso: 'Curso Teste 2' },
    ]);
  });

  it('deve cadastrar um novo curso corretamente', async () => {
    // Mocka a resposta da API para a rota POST de cadastro de curso
    mock.onPost('http://localhost:3000/api/curso').reply(201, {
      result: { id: 3, nome_curso: 'Curso Teste 3' },
    });

    // Chama a ação de cadastrarCurso
    const response = await cursoStore.cadastrarCurso('Curso Teste 3');

    // Verifica se o curso foi adicionado corretamente à lista
    expect(cursoStore.cursos).toContainEqual({ id: 3, nome_curso: 'Curso Teste 3' });
    expect(response.message).toBe('Curso cadastrado com sucesso!');
  });

  it('deve excluir um curso corretamente', async () => {
    // Mocka a resposta da API para a rota DELETE de exclusão de curso
    mock.onDelete('http://localhost:3000/api/curso/1').reply(200, { message: 'Curso deletado com sucesso' });

    // Adiciona cursos à store antes de excluir
    cursoStore.cursos = [
      { id: 1, nome_curso: 'Curso Teste 1' },
      { id: 2, nome_curso: 'Curso Teste 2' },
    ];

    // Chama a ação de excluirCurso
    await cursoStore.excluirCurso(1);

    // Mocka a resposta da API para listar após exclusão
    mock.onGet('http://localhost:3000/api/curso').reply(200, [
      { id: 2, nome_curso: 'Curso Teste 2' },
    ]);

    // Atualiza a lista na store
    await cursoStore.listarCursos();

    // Verifica se o curso foi removido corretamente
    expect(cursoStore.cursos).not.toContainEqual({ id: 1, nome_curso: 'Curso Teste 1' });
  });

  it('deve atualizar um curso corretamente', async () => {
    // Mocka a resposta da API para a rota PUT de atualização de curso
    mock.onPut('http://localhost:3000/api/curso/1').reply(200, {
      result: { id: 1, nome_curso: 'Curso Atualizado' },
    });

    // Adiciona cursos à store antes de atualizar
    cursoStore.cursos = [
      { id: 1, nome_curso: 'Curso Teste 1' },
      { id: 2, nome_curso: 'Curso Teste 2' },
    ];

    // Chama a ação de editarCurso
    await cursoStore.editarCurso(1, 'Curso Atualizado');

    // Mocka a resposta da API para listar após atualização
    mock.onGet('http://localhost:3000/api/curso').reply(200, [
      { id: 1, nome_curso: 'Curso Atualizado' },
      { id: 2, nome_curso: 'Curso Teste 2' },
    ]);

    // Atualiza a lista na store
    await cursoStore.listarCursos();

    // Verifica se o curso foi atualizado corretamente
    expect(cursoStore.cursos).toContainEqual({ id: 1, nome_curso: 'Curso Atualizado' });
  });
});
