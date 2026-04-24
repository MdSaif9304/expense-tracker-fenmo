# Expense Tracker App

## 🚀 Features
- Add new expenses (amount, category, description, date)
- View all expenses in a table
- Filter expenses by category
- Sort expenses by date (newest first)
- View total amount of filtered expenses
- Dark mode UI
- Loading states and form validation
- Duplicate prevention using idempotencyKey (backend + frontend safety)

---

## 🧠 Design Decisions

- Used **Next.js (App Router)** for full-stack structure
- Used **Prisma ORM** for database abstraction
- Used **MongoDB** for flexible schema and quick setup
- Built REST APIs for clean separation of frontend and backend
- Used **Tailwind CSS** for fast and consistent UI development

### Why Prisma + MongoDB
- Fast development setup
- Easy schema evolution
- Good fit for small scalable applications

---

## 🔁 Retry & Data Safety Strategy

To handle real-world scenarios like:
- network failures
- page refresh
- multiple form submissions

I implemented **idempotencyKey-based duplicate prevention**:
- Each request includes a unique key
- Backend checks for existing requests before creating new records
- Prevents duplicate expense entries safely

---

## ⚖️ Trade-offs

- No authentication system (kept scope minimal)
- No pagination implemented
- No advanced analytics or charts
- No offline support
- Focused on correctness and data integrity instead of feature breadth

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: (add your deployed API URL here)

---

## 🧪 Assumptions

- Single-user application
- Expenses are not shared between users
- Internet connection is generally available (with retry handling for failures)

---

## ✏️ Edit & Delete Features
Users can edit existing expenses by clicking the edit icon in the table.
Editing pre-fills the form with existing data for easy updates.
Users can delete expenses with a confirmation prompt to prevent accidental deletion.
Both actions update the UI instantly by refetching updated data from the backend.
UX Enhancements:
Edit mode clearly changes button label to “Update Expense”
Delete action includes confirmation dialog (window.confirm)
Icons used instead of text for better UX
