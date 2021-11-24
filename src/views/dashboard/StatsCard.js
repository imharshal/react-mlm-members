import { useEffect, useState } from 'react'
import axios from 'axios'
import { Package } from 'react-feather'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const StatsCard = ({ kFormatter, icon, Data, title, color }) => {

  return Data !== null ? (
    <StatsWithAreaChart
      icon={icon}
      color={color}
      stats={kFormatter(Data.total).toString()}
      statTitle={title}
      series={[{ data: Data.data }]}
      type='area'
    />
  ) : null
}
export default StatsCard
