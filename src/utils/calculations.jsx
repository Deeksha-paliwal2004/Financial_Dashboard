  
//Summary Card Calculation
 export const summary = (item)=>{
    let total_balance=0;
    let income=0;
    let expenses=0;

    item.forEach(e => {
        if(e.type === "expense"){
            expenses = expenses + e.amount
        }
        else{
            income= income + e.amount
        }
    });
    total_balance = income-expenses

    return{
        total_balance,
        income,
        expenses
    }
 }




//Balance Trend
 export const getBalanceTrend = (transactions) => {
  let balance = 0;

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sorted.map((item) => {
    balance += item.type === "income" ? item.amount : -item.amount;

    return {
      date: item.date,
      balance,
    };
  });
};
  
// Spending Breakdown
  export const getCategoryBreakdown = (transactions) => {
  const result = {};

  transactions.forEach((item) => {
    if (item.type === "expense") {
      result[item.category] =
        (result[item.category] || 0) + item.amount;
    }
  });

  return Object.keys(result).map((key) => ({
    category: key,
    amount: result[key],
  }));
};