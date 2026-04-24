"use client"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white text-black dark:bg-black dark:text-white shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-semibold">
          Fenmo Expense Tracker
        </h1>

      </div>
    </header>
  )
}