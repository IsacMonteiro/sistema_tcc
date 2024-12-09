<template>
  <v-container>
    <!-- Título do Trabalho -->
    <v-row class="section-title" justify="center">
      <v-col cols="12" md="7">
        <h3 class="tcc-title text-center">{{ tcc.title }}</h3>
      </v-col>
    </v-row>

    <!-- Cartão Maior -->
    <v-row justify="center" class="mt-3">
      <v-col cols="12" md="7">
        <v-card class="tcc-card-main">
          <v-card-text>
            <!-- Resumo -->
            <v-row>
              <v-col cols="12" md="7">
                <p class="tcc-summary">
                  <strong>RESUMO:</strong> {{ tcc.summary }}
                </p>
              </v-col>
            </v-row>

            <!-- Botão Download -->
            <v-row>
              <v-col cols="12" class="text-center">
                <v-btn class="download-btn">Baixar Obra Completa</v-btn>
              </v-col>
            </v-row>

            <!-- Cards Individuais -->
            <v-row>
              <v-col cols="12" class="mt-3">
                <v-card class="tcc-card">
                  <v-card-text>
                    <p class="tcc-section">
                      <strong>Tipo de Obra:</strong> <br /> {{ tcc.type }}
                    </p>
                    <p class="tcc-section">
                      <strong>Classificação Temática:</strong> <br /> {{ tcc.classification }}
                    </p>
                    <p class="tcc-section">
                      <strong>Data de Defesa:</strong> <br /> {{ tcc.date }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-card class="tcc-card">
                  <v-card-text>
                    <p class="tcc-section">
                      <strong>Autor(es):</strong> <br /> {{ tcc.author }}
                    </p>
                    <p class="tcc-section">
                      <strong>Orientador:</strong> <br /> {{ tcc.advisor }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" class="mt-3">
                <v-card class="tcc-card">
                  <v-card-text>
                    <p class="tcc-section">
                      <strong>Palavras-Chave:</strong> <br /> {{ tcc.keywords.join(", ") }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Botão Voltar -->
            <v-row justify="center" class="mt-4">
              <v-col cols="12" class="text-center mt-2">
                <v-btn class="back-btn" @click="goBack">Voltar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useObraStore } from '../../store/obraStore';
import { useAutorStore } from '../../store/autorStore';
import { useOrientadorStore } from '../../store/orientadorStore';
import { useCursoStore } from '../../store/cursoStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    // Importando as stores corretamente
    const obraStore = useObraStore();
    const autorStore = useAutorStore();
    const orientadorStore = useOrientadorStore();
    const cursoStore = useCursoStore();
    const route = useRoute();
    const router = useRouter();

    // Variável reativa para o TCC
    const tcc = ref({
      title: '',
      summary: '',
      type: '',
      classification: '',
      date: '',
      author: '',
      advisor: '',
      keywords: [],
    });

    // Função para carregar a obra e os autores
    const loadData = async () => {
  try {
    await obraStore.listarObras(); // Carrega as obras
    await autorStore.listarAutores(); // Carrega os autores
    await orientadorStore.listarOrientadores(); // Carrega os orientadores
    await cursoStore.listarCursos(); // Carrega os cursos

    const obraId = parseInt(route.params.id_obra);
    console.log('ID da Obra:', obraId);

    const obra = obraStore.obras.find((item) => item.id_obra === obraId);
    console.log('Obra encontrada:', obra); // Exibe a obra

    if (obra) {
      // Formatação da data de defesa
      const formattedDate = obra.data_apresentacao
        ? new Date(obra.data_apresentacao).toLocaleDateString('pt-BR')
        : '';

      // Buscar autor pela chave fk_id_autor
      const autor = autorStore.autores.find((a) => a.id_autor === obra.fk_id_autor);
      const autorNome = autor ? autor.nome_autor : 'Autor não encontrado';

      // Buscar orientador pela chave fk_id_orientador
      const orientador = orientadorStore.orientadores.find((a) => a.id_orientador === obra.fk_id_orientador);
      const orientadorNome = orientador ? orientador.nome_orientador : 'Orientador não encontrado';

      // Buscar curso pela chave fk_id_curso
      const curso = cursoStore.cursos.find((a) => a.id_curso === obra.fk_id_curso);
      const cursoNome = curso ? curso.nome_curso : 'Orientador não encontrado';

      // Verificar se a lista de autores foi carregada corretamente
      console.log('Autores carregados:', autorStore.autores); // Exibe os autores carregados

      tcc.value = {
        title: obra.titulo,
        summary: obra.resumo,
        type: obra.tipo,
        classification: cursoNome,
        year: obra.ano,
        date: formattedDate,
        author: autorNome,
        advisor: orientadorNome,
        keywords: obra.palavras_chave ? obra.palavras_chave.split(';') : [],
      };
    } else {
      console.error('Obra não encontrada');
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
};


    // Chama a função loadData quando o componente for montado
    onMounted(loadData);

    // Função para voltar à tela de busca
    const goBack = () => {
      router.push('/SearchPage');
    };

    return {
      tcc,
      goBack,
    };
  },
};
</script>
  
<style scoped>
  /* Título */
  .section-title h3 {
    margin-top: 50px;
    background: linear-gradient(90deg, #00420c, #28a745);
    color: white;
    padding: 15px;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;
  }
  
  /* Resumo */
  .tcc-summary {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.6;
    text-align: justify;
  }
  
  /* Cartão Maior */
  .tcc-card-main {
    background-color: #f4f4f4;
    border-radius: 10px;
    padding: 20px;
  }
  
  /* Cartões Individuais */
  .tcc-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
  }
  
  /* Texto nos cartões */
  .tcc-section {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .tcc-section strong {
    color: #004b81;
    font-weight: bold;
  }
  
  /* Botões */
  .download-btn {
    background-color: #00420c;
    border-radius: 7px;
    color: white;
    font-weight: bold;
  }
  
  .download-btn:hover {
    background-color: #001a05;
  }
  
  .back-btn {
    background-color: #00420c;
    border-radius: 7px;
    color: white;
    font-weight: bold;
  }
  
  .back-btn:hover {
    background-color: #001a05;
  }
</style>