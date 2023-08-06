const express = require('express');
const path = require('path');
const app = express();
const { sequelize, User } = require('./models/db');
const bcrypt = require('bcrypt');
const port = 3000;

// Configurando a pasta "public" como diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/reset_senha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reset_senha.html'));
});

// Rota para tratar o reset de senha (POST request)
app.post('/reset_senha', async (req, res) => {
  // Aqui você implementa a lógica para resetar a senha e enviar as instruções por email
  // Após o reset de senha, você pode redirecionar o usuário para a página de login ou enviar uma mensagem de sucesso
  // Exemplo:
  // res.status(200).json({ message: 'Instruções de reset de senha enviadas para o email.' });
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/hub.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hub.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Criar um novo usuário no banco de dados com a senha criptografada
    const hashedPassword = await bcrypt.hash(senha, 10);
    await User.create({ email, senha: hashedPassword });

    // Redirecionar para /hub.html ou enviar resposta de sucesso
    res.redirect('/hub.html');
  } catch (err) {
    console.error('Erro ao cadastrar o usuário:', err);
    // Enviar uma resposta JSON com a mensagem de erro em caso de falha no cadastro
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});

async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Buscar o usuário no banco de dados pelo email
    const user = await User.findOne({ where: { email } });

    // Verificar se o usuário foi encontrado e se a senha está correta
    if (user && (await checkPassword(senha, user.senha))) {
      // Redirecionar para a página de hub após o login ser bem-sucedido
      return res.status(200).send({ message: 'Login bem-sucedido.', redirect: '/hub.html' });
    } else {
      // Caso as credenciais estejam incorretas, enviar mensagem de erro
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).send('Ocorreu um erro ao fazer login.');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}, acesso no URL http://localhost:3000`);
});
