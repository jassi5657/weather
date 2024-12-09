const apiKey = 'c68e1e5aa95613f97f24f8aa4fe0b522';

const getWeather = async (city) => {
    return await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}

export default getWeather;