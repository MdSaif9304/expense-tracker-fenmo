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

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses?sort=date_desc");
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        {/* Add Expense Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>

          <ExpenseForm onExpenseAdded={fetchExpenses} />
        </section>

        {/* Expense List Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Expense List</h2>

          <ExpenseList expenses={expenses} />
        </section>
      </main>
      <Footer />
    </>
  );
}
