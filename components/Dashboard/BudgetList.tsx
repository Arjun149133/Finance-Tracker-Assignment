'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BudgetComparison } from '@/lib/types';
import {
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader as UIDialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BudgetForm from './BudgetForm';
import axios from 'axios';
import { useAppContext } from '@/lib/context/AppContext';
import { toast } from 'sonner';

interface BudgetListProps {
  data: BudgetComparison[];
}

export default function BudgetList({ data }: BudgetListProps) {
  const [selectedBudget, setSelectedBudget] = useState<BudgetComparison | null>(null);
  const {fetchBudget} = useAppContext();

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage > 100) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else if (percentage > 80) {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (percentage: number) => {
    if (percentage > 100) return 'text-red-600';
    if (percentage > 80) return 'text-yellow-600';
    return 'text-green-600';
  };
  const handleDeleteBudget = async (id: string) => {
    try {
      const res = await axios.delete(`/api/budget`, {
      data: { id },
    });

    if (res.data.success) {
      setSelectedBudget(null);
      toast.success('Budget deleted successfully!');
      fetchBudget();
    } else {
      toast.error('Failed to delete budget.');
      console.error('Failed to delete transaction');
    }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      
    }
  };

  return (
    <Card className="w-full text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <BarChart3 className="h-5 w-5" />
          Budget vs Actual
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No budgets set for this month. Set your first budget to track your spending.
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((item) => (
              <div key={item._id} className="space-y-2 border p-4 rounded-lg hover:bg-gray-900 transition-colors">
                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.percentage)}
                    <h4 className="font-medium">{item.category}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className={`font-semibold ${getStatusColor(item.percentage)}`}>
                      {item.percentage.toFixed(1)}%
                    </p>

                    {/* Edit & Delete Buttons */}
                    <Dialog
                      open={selectedBudget?.category === item.category}
                      onOpenChange={(open) => {
                        if (open) setSelectedBudget(item);
                        else setSelectedBudget(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBudget(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
                        <UIDialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Edit Budget
                          </DialogTitle>
                        </UIDialogHeader>
                        <BudgetForm
                          isEdit={true}
                          defaultValues={item}
                          onSuccess={() => setSelectedBudget(null)}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBudget(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-1">
                  <Progress value={Math.min(item.percentage, 100)} className="h-2 text-sky-400" />
                  {item.percentage > 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-red-500 h-1 rounded-full"
                        style={{
                          width: `${Math.min(
                            ((item.percentage - 100) / item.percentage) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Budget Info */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Spent: {formatAmount(item.actual)}</span>
                  <span>Budget: {formatAmount(item.budgeted)}</span>
                </div>

                <div className="text-sm">
                  {item.remaining >= 0 ? (
                    <span className="text-green-600">
                      {formatAmount(item.remaining)} remaining
                    </span>
                  ) : (
                    <span className="text-red-600">
                      {formatAmount(Math.abs(item.remaining))} over budget
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
