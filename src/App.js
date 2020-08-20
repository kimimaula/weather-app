import React, { useState } from 'react'
import { Select } from 'antd'
import config from './components/utils/config'
import axios from 'axios'
const { Option } = Select

async function getWeather (coords) {
  const fetchWeather = axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?lat=3.140636&lon=101.728889&appid=${config.weathermapkey}`
  })
  console.log('fetchWeather', fetchWeather)
}

function App () {
  const [data, setData] = useState([])
  const [value, setValue] = useState(undefined)
  const handleSearch = value => {
    if (value) {
      fetch(value, data => setData({ data }))
    } else {
      setData({ data: [] })
    }
  }
  const handleChange = value => {
    setValue({ value })
  }
  const options = data.map(d => <Option key={d.value}>{d.text}</Option>)
  return (
    <>
      <Select
        showSearch
        value={value}
        placeholder='Search An area'
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    </>
  )
}

export default App
