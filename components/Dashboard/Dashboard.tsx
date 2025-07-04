import { Transaction } from "@/lib/types"
import FinanceBoard from "./FinanceBoard"
import Hero from "./Hero"
import Navbar from "./Navbar"
import SummaryTabs from "./SummaryTabs"

const Transactions: Transaction[] = [
  {
    id: "1",
    amount: 5000,
    date: "2023-10-01",
    description: "Salary",
    type: "income",
    category: "Salary",
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2023-10-01T00:00:00Z"
  },
  {
    id: "2",
    amount: -200,
    date: "2023-10-02",
    description: "Groceries",
    type: "expense",
    category: "Food & Dining",
    createdAt: "2023-10-02T00:00:00Z",
    updatedAt: "2023-10-02T00:00:00Z"
  },
  {
    id: "3",
    amount: -150,
    date: "2023-10-03",
    description: "Electricity Bill",
    type: "expense",
    category: "Bills & Utilities",
    createdAt: "2023-10-03T00:00:00Z",
    updatedAt: "2023-10-03T00:00:00Z"
  }
]

const Dashboard = () => {
  return (
    <div className="">
        <Navbar />
        <Hero />
        <FinanceBoard transactions={Transactions} />
        <SummaryTabs />
    </div>
  )
}

export default Dashboard