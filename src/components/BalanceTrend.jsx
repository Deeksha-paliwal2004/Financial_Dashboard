import React from 'react'
import { LineChart, Line, XAxis, YAxis } from "recharts"

const BalanceTrend = ({data}) => {
  return (
    <div className='line'>
        <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Line type="monotone" dataKey="balance" />
    </LineChart>
      
    </div>
  )
}

export default BalanceTrend
