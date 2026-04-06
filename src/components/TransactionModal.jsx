import React, { useContext, useEffect, useState } from "react";
import { counterContext } from "../context/context";
import './TransactionModal.css'

const TransactionModal = () => {
  const {
    showModal,
    setShowModal,
    handleSaveTransaction,
    selectedTransaction,
  } = useContext(counterContext);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    type: "expense",
    category: "",
  });

  //  Pre-fill in EDIT mode
  useEffect(() => {
    if (selectedTransaction) {
      setForm(selectedTransaction);
    } else {
      setForm({
        date: "",
        amount: "",
        type: "expense",
        category: "",
      });
    }
  }, [selectedTransaction]);

  const handleSubmit = () => {
    handleSaveTransaction(form);
  };

  if (!showModal) return null;

  return (
    <div className="modal" >
      <h3>{selectedTransaction ? "Edit" : "Add"} Transaction</h3>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button onClick={handleSubmit}>Save</button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </div>
  );
};

export default TransactionModal;