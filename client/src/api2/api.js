const apiKey = import.meta.env.VITE_API_KEY;
const getWeather = async (city) => {
    return await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}

export default getWeather;