"use client"

import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {

  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setDark(isDark)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setDark(!dark)
  }

  return (
    <header className="sticky top-0 z-50 bg-white text-black dark:bg-black dark:text-white shadow-sm">

      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-semibold">
          Fenmo Expense Tracker
        </h1>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {dark ? <Sun size={20}/> : <Moon size={20}/>}
        </button>

      </div>

    </header>
  )
}