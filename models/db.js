const { Sequelize, DataTypes } = require('sequelize');

// Substitua 'nome_do_banco', 'nome_do_usuario' e 'senha_do_usuario' pelas suas credenciais do MySQL
const sequelize = new Sequelize('usuarios', 'root', 'C@s09259', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronizar o modelo com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    await sequelize.sync({ alter: true }); // Use 'sync({ force: true })' para recriar a tabela
    console.log('Modelo "User" sincronizado com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar e sincronizar o banco de dados:', error);
  }
})();

module.exports = { sequelize, User };
