"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import api from "./lib/axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

type Expense = {
  id: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const fetchExpenses = async (selectedCategory?: string) => {
    try {
      setLoading(true);

      let url = "/expenses?sort=date_desc";

      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      const res = await api.get(url);
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(category);
  }, [category]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses?id=${id}`);
      fetchExpenses(category);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };
  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto p-6">
        {/* Add Expense */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>

          <ExpenseForm
            onExpenseAdded={() => fetchExpenses(category)}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </section>

        {/* Expense List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Expense List</h2>

            {/* Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-md dark:bg-gray-800"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Drinks">Drinks</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          {loading ? (
            <p className="mt-6 text-gray-500">Loading expenses...</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
