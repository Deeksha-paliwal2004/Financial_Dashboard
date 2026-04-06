import React, { useContext, useState } from "react";
import { counterContext } from "../context/context";

const Transaction = () => {
  const [searchterm, setsearchterm] = useState("");
  const value = useContext(counterContext);
  const data = value.transactionsData || [];

  const { openAddModal, openEditModal, handleDelete, selectedrole  } = value;

  const filteredData = data.filter((item) => {
    const matchType =
      value.filter.type === "all" || item.type === value.filter.type;

    const matchSearch = item.category
      .toLowerCase()
      .includes(searchterm.toLowerCase());

    const matchCategory =
      value.filter.category === "all" ||
      item.category === value.filter.category;

    const today = new Date();
    const itemDate = new Date(item.date);

    let matchDate = true;

    if (value.filter.dateRange !== "all") {
      const days = Number(value.filter.dateRange);
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - days);

      matchDate = itemDate >= pastDate && itemDate <= today;
    }

    return matchType && matchSearch && matchCategory && matchDate;
  });

  return (
    <div className="top">
      <h2>Transaction Section</h2>
      
      <div className="searchbar">
        Filter by Date
      <select
        onChange={(e) =>
          value.setfilter((prev) => ({
            ...prev,
            dateRange: e.target.value,
          }))
        }
      >
        <option value="all">All</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
        <div className="search">
          <input
            type="text"
            id="find"
            value={searchterm}
            placeholder="Search"
            onChange={(e) => {
              setsearchterm(e.target.value);
            }}
          />
        </div>
        <div className="filter">
          Filter By Type
          <select
            id="filterby"
            onChange={(e) => {
              value.setfilter((prev) => ({ ...prev, type: e.target.value }));
            }}
          >
            <option value="all">All</option>
            <option value="expense">expense</option>
            <option value="income">income</option>
          </select>
          Filter by Category
          <select
            id="category"
            onChange={(e) => {
              value.setfilter((prev) => ({
                ...prev,
                category: e.target.value,
              }));
            }}
          >
            <option value="all">All</option>
            <option value="Food">Food</option>
            <option value="Bonus">Bonus</option>
            <option value="Salary">Salary</option>
            <option value="Transport">Transport</option>
            <option value="Freelance">Freelance</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
          </select>
        </div>
        {selectedrole !== "viewer" && (
          <button onClick={openAddModal}>Add Transaction</button>
        )}
      </div>
      <div className="section1">
        <div>Date</div>
        <div>Amount</div>
        <div>Type</div>
        <div>Category</div>
        <div>Actions</div>
      </div>
      {filteredData.map((item, index) => (
        <div className="section2" key={item.id}>
          <div>{item.date}</div>
          <div>{item.amount}</div>
          <div>{item.type}</div>
          <div>{item.category}</div>
          {selectedrole !== "viewer" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => openEditModal(item)}>✏️ Edit</button>
              <button onClick={() => handleDelete(item.id)}>🗑 Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Transaction;
