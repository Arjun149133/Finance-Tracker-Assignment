import { CategoryExpense, MonthlyExpense } from "@/lib/types"
import MonthlyBarChart from "./MonthlyBarChart"
import CategoryPieChart from "./CategoryPieChart"

const MonthlyData: MonthlyExpense[] = [
    {
        month: "January",
        amount: 1200,
    },
    {
        month: "February",
        amount: 1500,
    },
    {
        month: "March",
        amount: 800,
    },
    {
        month: "April",
        amount: 2000,
    },
]

const CategoryData: CategoryExpense[] = [
    {
        category: "Food & Dining",
        amount: 500,
        color: "#FF6384",
    },
    {
        category: "Bills & Utilities",
        amount: 300,
        color: "#36A2EB",
    },
    {
        category: "Entertainment",
        amount: 200,
        color: "#FFCE56",
    },
    {
        category: "Transportation",
        amount: 150,
        color: "#4BC0C0",
    }
]

const Overview = () => {
  return (
    <div className=" flex gap-2">
        <div className=" w-1/2">
            <MonthlyBarChart data={MonthlyData} />
        </div>
        <div className=" w-1/2">
            <CategoryPieChart data={CategoryData} />
        </div>
    </div>
  )
}

export default Overview