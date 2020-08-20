import React from 'react'
import { notification, Modal, Divider } from 'antd'
import fetchWeather from '../utils/fetchWeather'

export default async function displayWeatherModal (coords, address) {
  try {
    const { data } = await fetchWeather(coords)
    if (!data) {
      notification.error({
        message: 'Error',
        description: 'Data Not available'
      })
    }
    Modal.success({
      content: (
        <div>
          <p>The Weather in {address} </p>
          <Divider orientation="middle">Weather Details</Divider>
          <p>Main : {data?.weather[0].main}</p>
          <p>Description : {data?.weather[0].description}</p>
          <p>Humidity : {data?.main.humidity}</p>
          <p>Pressure : {data?.main.pressure}</p>
          <p>Temperature : {data?.main.temp}</p>
        </div>
      )
    })
  } catch (error) {
    notification.error({
      message: 'Error',
      description: `${error}`
    })
  }
}
