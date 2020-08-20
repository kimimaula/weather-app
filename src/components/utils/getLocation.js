import { notification } from 'antd'
import axios from 'axios'
import config from './config'

export default async function getLocation (address, setLoading, setData) {
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
