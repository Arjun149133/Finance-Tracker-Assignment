import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Insights from "./Insights"
import Overview from "./Overview"
import { BudgetComparison, Transaction } from "@/lib/types"
import TransactionsList from "./TransactionsList"
import BudgetList from "./BudgetList"

const SummaryTabs = ({
    transactions,
    budgetComparisonData
}: {
    transactions: Transaction[]
    budgetComparisonData: BudgetComparison[]
}) => {
  return (
    <div className="p-4">
        <Tabs defaultValue="overview" className="">
            <TabsList className=" bg-custom-bg border border-slate-300 w-full h-12">
                <TabsTrigger value="overview" className=" ">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="budgets">Budgets</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Overview />
            </TabsContent>
            <TabsContent value="transactions">
                <TransactionsList transactions={transactions}/>
            </TabsContent>
            <TabsContent value="budgets">
                <BudgetList data={budgetComparisonData}/>
            </TabsContent>
            <TabsContent value="insights">
                <Insights />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default SummaryTabs