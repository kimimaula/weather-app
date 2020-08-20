import React, { useState } from 'react'
import { Input, notification } from 'antd'
import config from './components/utils/config'
import axios from 'axios'
import './App.css'
const { Search } = Input

async function getWeather (coords) {
  const fetchWeather = axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?lat=3.140636&lon=101.728889&appid=${config.weathermapkey}`
  })
  console.log('fetchWeather', fetchWeather)
}

async function getLocation (address) {
  const parsedAddress = encodeURIComponent(address)
  const fetchLocationData = await axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=${config.mapkey}`
  })
  if (fetchLocationData.data.status.includes('ZERO')) {
    return notification.warning({
      message: 'Error',
      description:
        'No Results Found'
    })
  } else if (fetchLocationData.data.status.includes('OK')) {
    //add the results to a list
  } else {
    return notification.warning({
      message: 'Error',
      description:
        'An Error Occured, please refresh or try again later'
    })
  }
}

function App (props) {
  const initialState = { lat: '', lng: '' }
  const [data, setData] = useState([])
  const [value, setValue] = useState(undefined)
  const [mapPosition, setMapPosition] = useState(initialState)
  const handleChange = value => {
    const searchValue = value || []
    setValue({ searchValue })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Search
        placeholder="Input Address"
        enterButton="Search"
        size="large"
        style={{ marginTop: 100, width: '50vw' }}
        onSearch={value => getLocation(value)}
      />
    </div>
  )
}

export default App
