"use client"
import MonthlyBarChart from "./MonthlyBarChart"
import CategoryPieChart from "./CategoryPieChart"
import { useEffect, useState } from "react";
import { useAppContext } from "@/lib/context/AppContext";
import { CategoryExpense, getCategoryExpenses, getMonthlyExpenses, MonthlyExpense, Transaction } from "@/lib/types";

const Overview = () => {
    const [MonthlyData, setMonthlyData] = useState<MonthlyExpense[]>([]);
    const [CategoryData, setCategoryData] = useState<CategoryExpense[]>([]);
    const {transactions} = useAppContext()

    useEffect(() => {
        const MonthlyExpense = getMonthlyExpenses(transactions as Transaction[]);
        setMonthlyData(MonthlyExpense);
        const categoryExpenses = getCategoryExpenses(transactions as Transaction[]);
        setCategoryData(categoryExpenses)

    }, [transactions])
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