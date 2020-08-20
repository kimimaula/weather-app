import { Divider } from 'antd'
import React, { useState } from 'react'
import LocationList from './components/LocationList'
import SearchLocationBar from './components/SearchLocationBar'
import './App.css'

function App () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <>
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
