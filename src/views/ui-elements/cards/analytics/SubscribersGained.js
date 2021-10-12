import { useEffect, useState } from 'react'
import axios from 'axios'
import { Users } from 'react-feather'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'
const MockAdapter = require("axios-mock-adapter")

const mock = new MockAdapter(axios)

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/card/card-statistics/subscribers").reply(200, {
  series: [
    {
      name: 'Subscribers',
      data: [28, 40, 36, 52, 38, 60, 55]
    }
  ],
  analyticsData: {
    subscribers: 92600
  }
})

const SubscribersGained = ({ kFormatter }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/card/card-statistics/subscribers').then(res => setData(res.data))
  }, [])

  return data !== null ? (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color='primary'
      stats={kFormatter(data.analyticsData.subscribers)}
      statTitle='Subscribers Gained'
      series={data.series}
      type='area'
    />
  ) : null
}

export default SubscribersGained
