import React, {useContext} from 'react'
import SummaryCard from '../components/SummaryCard'
import SpendingBreakdown from '../components/SpendingBreakdown'
import BalanceTrend from '../components/BalanceTrend'
import { counterContext } from '../context/context';
import { getBalanceTrend, getCategoryBreakdown } from '../utils/calculations';



const Dashboard = () => {
     const value = useContext(counterContext)
     const transactions = value.transactionsData || []

   const trendData = getBalanceTrend(transactions);
   const breakdownData = getCategoryBreakdown(transactions);


  return (
    <div>
      <h1>Financial Dashboard</h1>
        <p>(Data in Rupees)</p>
      <select name="" id="role" value={value.selectedrole} onChange= {(e)=>{value.setselectedrole(e.target.value)}} >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <SummaryCard/>
      <h2>Balance Trend</h2>
      <BalanceTrend data={trendData}/>
      <h2>Spending Breakdown</h2>
      <SpendingBreakdown data={breakdownData}/>
    </div>
  )
}

export default Dashboard
