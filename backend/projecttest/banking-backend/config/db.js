const { Sequelize } = require('sequelize');

// Cấu hình kết nối đến MySQL
const sequelize = new Sequelize('dbbank', 'root', '@Aloo2004', {

    host: '127.0.0.1',
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit process with failure
    }
};

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create tables:', error);
  });

module.exports = { sequelize, connectDB };