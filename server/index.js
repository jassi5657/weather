// // server.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
// const app = express();
// const PORT = 5000;
// const SECRET_KEY = "11111111111111111111111111111111";

// // Database setup
// const sequelize = new Sequelize('weather_app', 'root', '', { // Set password to an empty string
//     host: 'localhost',
//     dialect: 'mysql',
//   });

// const User = sequelize.define('User ', {
//   username: { type: DataTypes.STRING, unique: true },
// });

// const WeatherSearch = sequelize.define('WeatherSearch', {
//   city: DataTypes.STRING,
//   weather: DataTypes.JSON,
//   userId: DataTypes.INTEGER,
// });

// User .hasMany(WeatherSearch);
// WeatherSearch.belongsTo(User);

// // Middleware
// app.use(express.json());

// // Routes
// app.post('/auth/signup', async (req, res) => {
//   const { username } = req.body;
//   try {
//     const user = await User.create({ username });
//     res.status(201).json({ message: 'User  created', user });
//   } catch (err) {
//     res.status(400).json({ error: 'User  already exists' });
//   }
// });

// app.post('/auth/login', async (req, res) => {
//   const { username } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
//   res.json({ token });
// });

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// app.get('/weather', authenticate, async (req, res) => {
//   const { city } = req.query;
//   const apiKey = 'your_weatherstack_api_key';

//   try {
//     const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
//     const weather = response.data;

//     await WeatherSearch.create({ city, weather, userId: req.user.id });
//     res.json(weather);
//   } catch (err) {
//     res.status(500).json({ error: 'Weather API failed' });
//   }
// });

// app.get('/report', authenticate, async (req, res) => {
//   const searches = await WeatherSearch.findAll({ include: User });
//   res.json(searches);
// });

// // Start server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// });



const express = require('express');
const cors = require('cors');
const PORT = 4000;

const app = express();
const bodyParser = require('body-parser');
const SECRET_KEY = "11111111111111111111111111111111";


const User = require('./model/user');
const WeatherSearch = require('./model/weather');
const router = require('./routes/user.routes');
const router1 = require('./routes/weatherReport')




app.use(cors());
app.use(bodyParser.json());

app.use(router)
app.use(router1)









 
  
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  // app.get('/weather', authenticate, async (req, res) => {
  //   const { city } = req.query;
  //   const apiKey = 'c68e1e5aa95613f97f24f8aa4fe0b522';
  
  //   try {
  //     const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
  //     const weather = response.data;
  
  //     await WeatherSearch.create({ city, weather, userId: req.user.id });
  //     res.json(weather);
  //   } catch (err) {
  //     res.status(500).json({ error: 'Weather API failed' });
  //   }
  // });
  
  // app.get('/report', authenticate, async (req, res) => {
  //   const searches = await WeatherSearch.findAll({ include: User });
  //   res.json(searches);
  // });




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


