const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('weather_app', 'root', '', {
  host: 'localhost',       // Replace with your MySQL server address
  dialect: 'mysql',        // Specify the database dialect
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database!');
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err.message);
  });

// Export the Sequelize instance to use in other files
module.exports = sequelize;