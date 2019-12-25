require('dotenv').config()
const fetch = require('node-fetch')
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.TELEGRAM_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set('zip', '3000,au')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'metric')

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString())
  const body = await resp.json()
  return body
}

const generateWeatherMessage = weatherData =>
  ` ${weatherData.name} weather: ${weatherData.weather[0].description}. Current temperature is ${weatherData.main.temp}C, with a low temp of ${weatherData.main.temp_min}C and high of ${weatherData.main.temp_max}C.`

const main = async () => {
  const weatherData = await getWeatherData()
  const weatherString = generateWeatherMessage(weatherData)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
}

main()
