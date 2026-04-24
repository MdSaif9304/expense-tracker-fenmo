"use client"

type Expense = {
  id: string
  amount: number
  category: string
  description?: string
  date: string
}

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  if (expenses.length === 0) {
    return <p className="mt-6">No expenses found.</p>
  }

  return (
    <div className="mt-6">

      <h2 className="text-xl font-semibold mb-3">
        Total: ₹{total}
      </h2>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td className="border p-2">₹{exp.amount}</td>
              <td className="border p-2">{exp.category}</td>
              <td className="border p-2">{exp.description || "-"}</td>
              <td className="border p-2">
                {new Date(exp.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}