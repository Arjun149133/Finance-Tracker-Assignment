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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAppContext } from "@/lib/context/AppContext";
import axios from "axios";
import {  BudgetComparison } from "@/lib/types";
import { toast } from "sonner";

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Personal Care',
  'Home & Garden',
  'Gifts & Donations',
  'Other',
   'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Rental Income',
  'Gifts'
];

export const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const formSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }),
    amount: z.coerce.number().min(1, { message: "Amount must be greater than 0." }),
    month: z.string().min(1, { message: "Month is required" }), 
});

type FormData = z.infer<typeof formSchema>;

interface BudgetFormProps {
    onSuccess: () => void;
    defaultValues?: Partial<BudgetComparison>;
    isEdit?: boolean;
}

const BudgetForm = ({ onSuccess, defaultValues, isEdit }: BudgetFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {  fetchBudget } = useAppContext()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        category: defaultValues?.category || '',
        amount: defaultValues?.budgeted || 0,
        month: defaultValues?.month || '', 
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    let res;

    if(isEdit){
        res = await axios.put(`/api/budget`, {
            ...values,
            id: defaultValues?._id,
        });
    } else {
        res = await axios.post('/api/budget', values);
    }

    if (res.data.success) {
      toast.success(isEdit ? "Budget updated successfully!" : "Budget added successfully!");
      onSuccess();
      form.reset();
      fetchBudget();
    } else {
      toast.error(isEdit ? "Failed to update budget." : "Failed to add budget.");
      console.error("Failed to add budget:", res.data.message);
    }

    try {
    } catch (error) {
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Budget"}
        </Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
