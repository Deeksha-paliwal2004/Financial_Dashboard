import { useState } from "react";

import { counterContext } from "./context/context";
import "./App.css";
import transactions from "./data/transactions.json";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Insights from "./pages/Insights";
import TransactionModal from "./components/TransactionModal";

function App() {
  const [transactionsData, settransactionsData] = useState(transactions);
  const [filter, setfilter] = useState({
    type: "all", // income / expense / all
    category: "all",
    dateRange: "all",
  });
  const [selectedrole, setselectedrole] = useState("admin");

  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSaveTransaction = (txn) => {
    if (selectedTransaction) {
      // EDIT
      settransactionsData((prev) =>
        prev.map((t) => (t.id === txn.id ? txn : t)),
      );
    } else {
      // ADD
      settransactionsData((prev) => [
  ...prev,
  { ...txn, id: Date.now() }
]);
    }

    setShowModal(false);
    setSelectedTransaction(null);
  };

  // DELETE
  const handleDelete = (id) => {
    settransactionsData((prev) => prev.filter((t) => t.id !== id));
  };

  // OPEN MODALS
  const openAddModal = () => {
    setSelectedTransaction(null);
    setShowModal(true);
  };

  const openEditModal = (txn) => {
    setSelectedTransaction(txn);
    setShowModal(true);
  };

  return (
    <>
      <counterContext.Provider
        value={{
          transactionsData,
          filter,
          selectedrole,
          settransactionsData,
          setfilter,
          setselectedrole,
          handleSaveTransaction,
          handleDelete,
          openAddModal,
          openEditModal,
          showModal,
          setShowModal,
          selectedTransaction,
        }}
      >
        <Dashboard />
        <Transaction />
        <TransactionModal/>
        <Insights />
        
      </counterContext.Provider>
    </>
  );
}

export default App;
