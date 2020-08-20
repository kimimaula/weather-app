import React, { useState } from 'react'
import { Input, notification, Divider, List, Skeleton, Button, Modal } from 'antd'
import config from './components/utils/config'
import getLocation from './components/utils/getLocation'
import axios from 'axios'
import './App.css'
const { Search } = Input

function App () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  async function getWeather (coords, address) {
    try {
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
      Modal.success({
        content: (
          <div>
            <p>The Weather in {address} </p>
            <Divider orientation="middle">Weather Details</Divider>
            <p>Main : {fetchWeather?.data?.weather[0].main}</p>
            <p>Description : {fetchWeather?.data?.weather[0].description}</p>
            <p>Humidity : {fetchWeather?.data?.main.humidity}</p>
            <p>Pressure : {fetchWeather?.data?.main.pressure}</p>
            <p>Temperature : {fetchWeather?.data?.main.temp}</p>
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

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Search
          placeholder="Input Address"
          enterButton="Search"
          size="large"
          style={{ marginTop: 100, marginBottom: 50, width: '50vw' }}
          onSearch={value => getLocation(value, setLoading, setData)}
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
              actions={[<Button onClick={() => { getWeather(item.geometry.location, item.formatted_address) }} key="get-weather">Get Weather</Button>]}
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
