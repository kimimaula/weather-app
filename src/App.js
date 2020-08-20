import { Divider } from 'antd'
import React, { useState } from 'react'
import LocationList from './components/LocationList'
import SearchLocationBar from './components/SearchLocationBar'
import config from './components/utils/config'
import './App.css'

function App () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Divider orientation="left">WeatherCheck V {config.version}</Divider>
      <SearchLocationBar
        setData={setData}
        setLoading={setLoading} />
      <Divider orientation="middle">Location</Divider>
      <LocationList
        data={data}
        loading={loading}
      />
    </>
  )
}

export default App
