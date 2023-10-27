// bisa membuat table tanpa bikin diadminer
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'eduwork-cruds-sequelize',
  host: 'localhost',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
});

// chek conection before run

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
