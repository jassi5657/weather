const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

const User = sequelize.define('User', {


 
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },

},



});

sequelize.sync()
  .then(() => {
    console.log('User  table created successfully!');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

module.exports = User;
