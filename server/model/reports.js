const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance


const Report = sequelize.define('Report', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
 
  windSpeed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, 
});

module.exports = Report;