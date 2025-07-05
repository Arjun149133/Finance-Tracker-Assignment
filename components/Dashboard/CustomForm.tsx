import TransactionForm from "./TransactionForm"
import BudgetForm from "./BudgetForm"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const CustomForm = () => {
   const [isDialogOpen1, setIsDialogOpen1] = useState(false);
    const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  return (
    <div className=" flex items-center justify-center lg:gap-4 gap-1">
      <Dialog open={isDialogOpen2} onOpenChange={setIsDialogOpen2}>
          <DialogTrigger asChild>
            <Button className=" from-slate-800 to-slate-900 border border-white hover:brightness-125 text-sm duration-100 ease-in-out bg-gradient-to-b text-white font-semibold rounded-md shadow-md">
                Set Budget
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Create Budget
              </DialogTitle>
            </DialogHeader>
            <BudgetForm onSuccess={() => setIsDialogOpen2(false)} />
          </DialogContent>
       </Dialog>
       <Dialog open={isDialogOpen1} onOpenChange={setIsDialogOpen1}>
          <DialogTrigger asChild>
            <Button className=" from-[#606adb] to-[#4b5ce6] hover:brightness-125 text-sm duration-100 ease-in-out bg-gradient-to-r text-white font-semibold rounded-md shadow-md">
                <span className=" text-xl">+</span>
                Add Transaction
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Create Transaction
              </DialogTitle>
            </DialogHeader>
            <TransactionForm onSuccess={() => setIsDialogOpen1(false)} />
          </DialogContent>
       </Dialog>
    </div>
  )
}

export default CustomForm