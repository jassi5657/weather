const axios = require('axios');
const WeatherSearch = require('../models/WeatherSearch'); // Adjust the path as necessary

const apiKey = 'c68e1e5aa95613f97f24f8aa4fe0b522';

const getWeather = async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
    const weather = response.data;

    await WeatherSearch.create({ city, weather, userId: req.user.id });
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Weather API failed' });
  }
};

module.exports = {
  getWeather,
};