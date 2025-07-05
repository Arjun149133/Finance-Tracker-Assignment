'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Transaction,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '@/lib/types';
import {
  Edit,
  Trash2,
  Search,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import TransactionForm from './TransactionForm';
import axios from 'axios';
import { useAppContext } from '@/lib/context/AppContext';
import { toast } from 'sonner';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const {fetchTransactions} = useAppContext()

  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      const matchesType = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'date') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * multiplier;
      } else {
        return (a.amount - b.amount) * multiplier;
      }
    });

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/transactions`, {
      data: { id },
    });

    if (res.data.success) {
      setSelectedTransaction(null);
      toast.success('Transaction deleted successfully!');
      fetchTransactions();
    } else {
      toast.error('Failed to delete transaction.');
      console.error('Failed to delete transaction');
    }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));

    return type === 'income' ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <Card className="w-full text-white">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Transaction History</CardTitle>
        <div className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === 'date' ? 'amount' : 'date')}
            >
              Sort by {sortBy === 'date' ? 'Amount' : 'Date'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || filterCategory !== 'all' || filterType !== 'all'
              ? 'No transactions found matching your filters.'
              : 'No transactions yet. Add your first transaction above!'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.createdAt}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">{transaction.month}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {formatAmount(transaction.amount, transaction.type)}
                    </p>
                    <Badge
                      variant={
                        transaction.type === 'income' ? 'default' : 'secondary'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Dialog
                      open={selectedTransaction?._id === transaction._id}
                      onOpenChange={(open) => {
                        if (open) {
                          setSelectedTransaction(transaction);
                        } else {
                          setSelectedTransaction(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Edit Transaction
                          </DialogTitle>
                        </DialogHeader>
                        <TransactionForm
                          onSuccess={() => setSelectedTransaction(null)}
                          isEdit={true}
                          defaultValues={transaction}
                        />
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
