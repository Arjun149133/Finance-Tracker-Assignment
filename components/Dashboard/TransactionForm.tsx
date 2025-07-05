import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/lib/context/AppContext";
import { Transaction } from "@/lib/types";
import { months } from "./BudgetForm";
import {toast} from "sonner"

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Investments",
  "Rental Income",
  "Gifts",
  "Other",
];

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Personal Care",
  "Home & Garden",
  "Gifts & Donations",
  "Other",
];

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  amount: z.coerce.number().min(1, { message: "Amount must be greater than 0." }),
  type: z.enum(["income", "expense"], { required_error: "Type is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  month: z.string().min(1, { message: "Month is required" }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSuccess: () => void;
  defaultValues?: Partial<Transaction>;
  isEdit?: boolean;
}

const TransactionForm = ({ onSuccess, defaultValues, isEdit }: TransactionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {fetchTransactions} = useAppContext()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      amount: defaultValues?.amount || 0,
      type: defaultValues?.type || "expense",
      category: defaultValues?.category || "",
      month: defaultValues?.month || "",
      description: defaultValues?.description || "",
    },
  });

  const selectedType = form.watch("type");
  const categories = selectedType === "income" ? incomeCategories : expenseCategories;

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
        let res;
        console.log("Submitting values:", values);
        if (isEdit) {
            res = await axios.put(`/api/transactions`, {
                ...values,
                id: defaultValues?._id
            });
        } else {
            res = await axios.post('/api/transactions', values);
        }
        
        if (res.data.success) {
          toast.success(isEdit ? "Transaction updated successfully!" : "Transaction added successfully!");
          onSuccess();
          fetchTransactions(); 
          form.reset();
        }
    } catch (error) {
      toast.error(isEdit ? "Failed to update transaction." : "Failed to add transaction.");
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Salary, Netflix, etc."
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="text-white">Month</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {months.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                        {cat}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add more details..."
                  className="min-h-[100px] bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Transaction"}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
