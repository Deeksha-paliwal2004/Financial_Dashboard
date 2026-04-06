import React from 'react'
import './SummaryCard.css'
import { useContext } from 'react';
import { counterContext } from '../context/context';
import { summary } from '../utils/calculations';

const SummaryCard = () => {
     const value = useContext(counterContext)

     const data = summary(value.transactionsData || [])

  return (
    <div className='box '>
      <div className="card balance"><h4> Total Balance </h4>{data.total_balance}</div>
      <div className="card income"><h4>Income</h4>{data.income}</div>
      <div className="card expense"><h4>Expense</h4>{data.expenses}</div>
    </div>
  )
}

export default SummaryCard
