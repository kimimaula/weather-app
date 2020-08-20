import React from 'react'
import { Input } from 'antd'
import { SearchContainer } from './styled'
import getLocation from '../utils/getLocation'
const { Search } = Input

export default function SearchLocationBar ({ setLoading, setData }) {
  return (
    <SearchContainer>
      <Search
        placeholder="Input Address"
        enterButton="Search"
        size="large"
        style={{ marginTop: 100, marginBottom: 50, width: '50vw' }}
        onSearch={value => getLocation(value, setLoading, setData)}
      />
    </SearchContainer>
  )
}
