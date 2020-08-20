import axios from 'axios'
import config from './config'
import { notification } from 'antd'

export default async function (coords) {
  const fetchWeather = await axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${config.weathermapkey}`
  })
  if (!fetchWeather.data) {
    return notification.error({
      message: 'Error',
      description: 'Data not found'
    })
  }
  const data = fetchWeather
  return data
}
