import React from 'react'
import { List, Skeleton, Button } from 'antd'
import displayWeatherModal from '../DisplayWeatherModal/index'

export default function LocationList ({ loading, data }) {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      style={{ marginTop: 50, marginLeft: 'auto', marginRight: 'auto', width: '50vw' }}
      renderItem={item => (
        <List.Item
          actions={[<Button onClick={() => { displayWeatherModal(item.geometry.location, item.formatted_address) }} key="get-weather">Get Weather</Button>]}
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
  )
}
