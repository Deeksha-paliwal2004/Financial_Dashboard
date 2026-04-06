import { useContext } from "react";
import { counterContext } from "../context/context";
import { getInsights } from "../utils/Insightscalculation";

const Insights = () => {
  const { transactionsData } = useContext(counterContext);

  const insights = getInsights(transactionsData);

  return (
    <div>
      <h2>Insights Section</h2>
      <h3>Top Spending: {insights.topSpending.category} ( {insights.topSpending.amount})</h3>

      <h3>
        Monthly Change:  {insights.monthlyChange.change } 
         
      </h3>

      <h3>Avg Transaction:  {insights.avgTransaction}</h3>

      <h3>Total Transactions: {insights.totalTransactions}</h3>
    </div>
  );
};

export default Insights;

