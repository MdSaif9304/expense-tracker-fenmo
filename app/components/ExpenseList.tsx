"use client";

import React from "react";

type Expense = {
  id: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
};

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (expenses.length === 0) {
    return <p className="mt-6">No expenses found.</p>;
  }

  return (
    <div className="mt-4">
      {/* TOTAL */}
      <h2 className="text-lg sm:text-xl font-semibold mb-3">
        Total: ₹{total}
      </h2>

      {/* TABLE CONTAINER */}
      <div className="mt-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-4">
        
        {/* MOBILE SAFE SCROLL WRAPPER */}
        <div className="overflow-x-auto">
          
          <table className="min-w-[700px] w-full border border-gray-200 dark:border-gray-700 text-sm sm:text-base">
            
            {/* HEADER */}
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                  Amount
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                  Category
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                  Description
                </th>
                <th className="p-3 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                  Date
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    ₹{exp.amount}
                  </td>

                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    {exp.category}
                  </td>

                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    {exp.description || "-"}
                  </td>

                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}