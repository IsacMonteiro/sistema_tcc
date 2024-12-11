const express = require('express');
const bodyParser = require('body-parser');
// Importando as rotas
const obraRoutes = require('./routes/obraRoute');
const cursoRoutes = require('./routes/cursoRoute');
const logAcoesRoutes = require('./routes/logAcoesRoute');
const administradorRoutes = require('./routes/administradorRoute');
const obraCoorientadorRoutes = require('./routes/obraCoorientadorRoute');
const autorRoutes = require('./routes/autorRoute');
const orientadorRoutes = require('./routes/orientadorRoute');
const coorientadorRoutes = require('./routes/coorientadorRoute');
const cors = require('cors'); // Middleware para permitir CORS


const app = express();
app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.json()); // Habilita o parsing de JSON

// Roteamento
app.use('/api/obra', obraRoutes); // Rota para obras
app.use('/api/autor', autorRoutes); // Rota para autores
app.use('/api/orientador', orientadorRoutes); // Rota para orientadores
app.use('/api/coorientador', coorientadorRoutes); // Rota para coorientadores
app.use('/api/curso', cursoRoutes); // Rota para cursos
app.use('/api/log-acoes', logAcoesRoutes); // Rota para log de ações
app.use('/api/administrador', administradorRoutes); // Rota para administradores
app.use('/api/obraCoorientador', obraCoorientadorRoutes); // Rota para associações de obras e coorientadores

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro
  res.status(500).send('Algo deu errado!'); // Resposta padrão em caso de erro
});

// Inicia o servidor
const port = process.env.PORT || 3000; // Usa a porta definida em variáveis de ambiente ou 3000 como padrão
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); // Mensagem de log ao iniciar o servidor
});