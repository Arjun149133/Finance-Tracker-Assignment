import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Budgets from "./Budgets"
import Insights from "./Insights"
import Overview from "./Overview"
import TransactionsList from "./TransactionsList"

const SummaryTabs = () => {
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
                <TransactionsList />
            </TabsContent>
            <TabsContent value="budgets">
                <Budgets />
            </TabsContent>
            <TabsContent value="insights">
                <Insights />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default SummaryTabs