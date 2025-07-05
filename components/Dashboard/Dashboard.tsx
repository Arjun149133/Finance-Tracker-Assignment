"use client"
import { useEffect, useState } from "react"
import FinanceBoard from "./FinanceBoard"
import Hero from "./Hero"
import Navbar from "./Navbar"
import SummaryTabs from "./SummaryTabs"
import { useAppContext } from "@/lib/context/AppContext"
import { Budget, BudgetComparison } from "@/lib/types"
import Footer from "./Footer"

const Dashboard = () => {
  const { transactions, loading, budget, budgetLoading } = useAppContext()
  const [budgetComparisonData, setBudgetComparisonData] = useState<BudgetComparison[]>([])

  useEffect(() => {
    const budgetComparisonData: BudgetComparison[] = budget.map((b: Budget) => {
      const totalSpent = transactions
        .filter((t) => t.category === b.category && t.type === 'expense' && t.month === b.month)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const percentage = parseFloat(((totalSpent / b.amount) * 100).toFixed(2))

      return {
        _id: b._id,
        category: b.category,
        budgeted: b.amount,
        actual: totalSpent,
        remaining: b.amount - totalSpent,
        percentage: percentage,
        month: b.month,
        color: percentage > 100 ? 'red' : percentage > 80 ? 'orange' : 'green'
      }
    })

    setBudgetComparisonData(budgetComparisonData)
   }, [budget, transactions])

  return (
    <div className="">
        <Navbar />
        <Hero />
        <FinanceBoard transactions={transactions} loader={loading} />
        <SummaryTabs transactions={transactions} budgetComparisonData={budgetComparisonData}/>
        <Footer />
    </div>
  )
}

export default Dashboard