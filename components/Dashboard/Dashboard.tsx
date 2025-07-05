"use client"
import { useEffect, useState } from "react"
import FinanceBoard from "./FinanceBoard"
import Hero from "./Hero"
import Navbar from "./Navbar"
import SummaryTabs from "./SummaryTabs"
import { useAppContext } from "@/lib/context/AppContext"
import { Budget, BudgetComparison, getBudgetComparisons, getSpendingInsights, SpendingInsight } from "@/lib/types"
import Footer from "./Footer"

const Dashboard = () => {
  const { transactions, loading, budget } = useAppContext()
  const [budgetComparisonData, setBudgetComparisonData] = useState<BudgetComparison[]>([])
  const [insights, setInsights] = useState<SpendingInsight[]>([])

  useEffect(() => {
    const budgetComparisonData: BudgetComparison[] = getBudgetComparisons(budget, transactions)
    setBudgetComparisonData(budgetComparisonData)

    const currentInsights = getSpendingInsights(transactions, budget)
    setInsights(currentInsights)
   }, [budget, transactions])

  return (
    <div className="">
        <Navbar />
        <Hero />
        <FinanceBoard transactions={transactions} loader={loading} />
        <SummaryTabs transactions={transactions} budgetComparisonData={budgetComparisonData} insights={insights} />
        <Footer />
    </div>
  )
}

export default Dashboard