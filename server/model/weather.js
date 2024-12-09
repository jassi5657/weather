const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

const WeatherSearch = sequelize.define('WeatherSearch', {
  city: DataTypes.STRING,
  weather: DataTypes.JSON,
  userId: DataTypes.INTEGER,
});

sequelize.sync()
  .then(() => {
    console.log('weather table created successfully!');
  })
  .catch((error) => {
    console.error('Error creating weather table:', error);
  });

module.exports = WeatherSearch;
