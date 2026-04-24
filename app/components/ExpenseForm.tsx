"use client";

import { useState } from "react";
import api from "../lib/axios";

export default function ExpenseForm({ onExpenseAdded }: any) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await api.post("/expenses", {
        amount: Number(amount),
        category,
        description,
        date,
      });

      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      onExpenseAdded();
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  );
}
