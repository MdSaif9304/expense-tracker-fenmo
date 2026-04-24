"use client";

import { useEffect, useState } from "react";
import api from "../lib/axios";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({
  onExpenseAdded,
  editingExpense,
  setEditingExpense,
}: any) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (editingExpense) {
        // UPDATE MODE
        await api.put("/expenses", {
          id: editingExpense.id,
          amount: Number(amount),
          category,
          description,
          date,
        });

        setEditingExpense(null);
      } else {
        // CREATE MODE
        await api.post("/expenses", {
          amount: Number(amount),
          category,
          description,
          date,
          idempotencyKey: uuidv4(),
        });
      }

      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      onExpenseAdded();
    } catch (error) {
      console.error("Error adding expense", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (editingExpense) {
      setAmount(String(editingExpense.amount));
      setCategory(editingExpense.category);
      setDescription(editingExpense.description || "");

      setDate(editingExpense.date?.split("T")[0]);
    }
  }, [editingExpense]);

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg dark:shadow-xl rounded-lg p-3 sm:p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 
bg-white dark:bg-gray-800 p-2 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 
bg-white dark:bg-gray-800 p-2 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 
bg-white dark:bg-gray-800 p-2 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 
bg-white dark:bg-gray-800 p-2 rounded-md 
focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-3 rounded disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : editingExpense
              ? "Update Expense"
              : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
