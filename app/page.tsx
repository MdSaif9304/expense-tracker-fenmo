"use client"

import { useEffect, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"

export default function Home() {
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses?sort=date_desc")
    const data = await res.json()
    setExpenses(data)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <main className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Expense Tracker
      </h1>

      <ExpenseForm onExpenseAdded={fetchExpenses} />

      <ExpenseList expenses={expenses} />

    </main>
  )
}