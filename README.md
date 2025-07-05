# 💸 Personal Finance Visualizer

A responsive and user-friendly web application built with **Next.js**, **React**, **shadcn/ui**, and **Recharts** for tracking personal finances, analyzing spending habits, and managing budgets.

## 📊 Overview

The Personal Finance Visualizer helps users:

- Track income and expenses
- Visualize financial activity through interactive charts
- Set and monitor monthly budgets
- Gain insights into spending behavior

---

## 🚀 Features by Stage

### ✅ Stage 1: Basic Transaction Tracking

- Add, edit, and delete financial transactions (amount, date, description)
- Transaction list with basic styling and error handling
- Monthly expenses bar chart using **Recharts**
- Basic form validation and responsive UI

### ✅ Stage 2: Categories

- All Stage 1 features
- Predefined categories for transactions (e.g., Food, Rent, Transport)
- Category-wise **Pie Chart** visualization
- Dashboard with:
  - Total expenses
  - Category breakdown
  - Most recent transactions

### ✅ Stage 3: Budgeting

- All Stage 2 features
- Ability to set **monthly category budgets**
- **Budget vs Actual** comparison chart
- Basic spending insights (e.g., overspending alerts, top categories)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Frontend**: [React](https://reactjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Styling**: Tailwind CSS

---

## 📷 Screenshots

> _(Optional: Add a few screenshots showing the dashboard, charts, and transaction list for better visual context)_

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Set Up Environment Variables

```bash
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run The App

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```
