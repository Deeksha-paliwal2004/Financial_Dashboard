export const getTopSpending = (transactions) => {
  const expenseData = transactions.filter(t => t.type === "expense");

  const categoryTotals = {};

  expenseData.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  let topCategory = null;
  let maxAmount = 0;

  for (let category in categoryTotals) {
    if (categoryTotals[category] > maxAmount) {
      maxAmount = categoryTotals[category];
      topCategory = category;
    }
  }

  return { category: topCategory, amount: maxAmount };
};




export const getMonthlyChange = (transactions) => {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let currentTotal = 0;
  let lastTotal = 0;

  transactions.forEach(t => {
    const d = new Date(t.date);
    const month = d.getMonth();
    const year = d.getFullYear();

    if (month === currentMonth && year === currentYear) {
      currentTotal += t.amount;
    }

    if (
      month === currentMonth - 1 &&
      year === currentYear
    ) {
      lastTotal += t.amount;
    }
  });

  const change = currentTotal - lastTotal;
   
  let percent;

if (lastTotal === 0 && currentTotal === 0) {
  percent = 0;
} else if (lastTotal === 0) {
  percent = 100;
} else {
  percent = ((change / lastTotal) * 100).toFixed(2);
}

  return { currentTotal, lastTotal, change, percent };
};



export const getAvgTransaction = (transactions) => {
  if (transactions.length === 0) return 0;

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (total / transactions.length).toFixed(2);
};


export const getTotalTransactions = (transactions) => {
  return transactions.length;
};

export const getInsights = (transactions) => {
  return {
    topSpending: getTopSpending(transactions),
    monthlyChange: getMonthlyChange(transactions),
    avgTransaction: getAvgTransaction(transactions),
    totalTransactions: getTotalTransactions(transactions)
  };
};