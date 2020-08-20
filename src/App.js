import React, { useState } from 'react'
import { Input, notification, Divider, List, Skeleton, Button } from 'antd'
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

function App (props) {
  const initialState = { lat: '', lng: '' }
  const [data, setData] = useState([])
  const [weatherModal, setWeatherModal] = useState(initialState)
  const [loading, setLoading] = useState(false)

  async function getLocation (address) {
    setLoading(true)
    const parsedAddress = encodeURIComponent(address)
    if (!parsedAddress) {
      notification.warning({
        message: 'Error',
        description:
          'Empty Search'
      })
      setData([])
      return setLoading(false)
    }
    const fetchLocationData = await axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=${config.mapkey}`
    })
    console.log('fetchLocationData', fetchLocationData)
    if (fetchLocationData.data.status.includes('ZERO')) {
      notification.warning({
        message: 'Error',
        description:
          'No Results Found'
      })
      return setLoading(false)
    } else if (fetchLocationData.data.status.includes('OK')) {
      setData(fetchLocationData.data.results)
      return setLoading(false)
    } else {
      notification.warning({
        message: 'Error',
        description:
          'An Error Occured, please refresh or try again later'
      })
      return setLoading(false)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Search
          placeholder="Input Address"
          enterButton="Search"
          size="large"
          style={{ marginTop: 100, marginBottom: 50, width: '50vw' }}
          onSearch={value => getLocation(value)}
        />
      </div>
      <Divider orientation="middle">Location</Divider>
      <div>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          style={{ marginTop: 50, marginLeft: 'auto', marginRight: 'auto', width: '50vw' }}
          renderItem={item => (
            <List.Item
              actions={[<Button key="get-weather">Get Weather</Button>]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  title={<div>{item.address_components[0]?.long_name}</div>}
                  description={item.formatted_address}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}

export default App
