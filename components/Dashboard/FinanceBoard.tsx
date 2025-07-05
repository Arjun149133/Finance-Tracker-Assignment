'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/lib/types';
import { TrendingUp, TrendingDown, DollarSign, Calculator, Target, PieChart } from 'lucide-react';
import SpinnerLoader from '../SpinnerLoader';

interface SummaryStatsProps {
  transactions: Transaction[];
  loader?: boolean;
}

const FinanceBoard = ({ transactions, loader }: SummaryStatsProps) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const currentMonthTransactions = transactions.filter(t => 
    t.createdAt.startsWith(currentMonth)
  );
  
  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const netIncome = totalIncome - totalExpenses;
  const totalTransactions = currentMonthTransactions.length;

  const categoryExpenses: { [key: string]: number } = {};
  currentMonthTransactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const category = t.category || 'Other';
      categoryExpenses[category] = (categoryExpenses[category] || 0) + Math.abs(t.amount);
    });
  
  const topCategory = Object.entries(categoryExpenses)
    .sort(([,a], [,b]) => b - a)[0];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const stats = [
    {
      title: 'Monthly Income',
      value: formatAmount(totalIncome),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      title: 'Monthly Expenses',
      value: formatAmount(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    {
      title: 'Net Income',
      value: formatAmount(netIncome),
      icon: DollarSign,
      color: netIncome >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: netIncome >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      borderColor: netIncome >= 0 ? 'border-green-500/20' : 'border-red-500/20',
    },
    {
      title: 'Transactions',
      value: totalTransactions.toString(),
      icon: Calculator,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'None',
      subtitle: topCategory ? formatAmount(topCategory[1]) : '',
      icon: PieChart,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Avg per Transaction',
      value: totalTransactions > 0 ? formatAmount(totalExpenses / currentMonthTransactions.filter(t => t.type === 'expense').length || 0) : '$0',
      icon: Target,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
  ];

  if(loader) {
    return (
      <div className=' flex items-center justify-center h-full'>
        <SpinnerLoader />
      </div>
    )
  }

  return (
    <div className=' flex flex-col px-4 pb-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title} className={`border ${stat.borderColor} bg-card backdrop-blur-sm hover:bg-card/80 transition-all duration-200 hover:scale-105`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    {stat.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                    Current month
                    </p>
                </CardContent>
                </Card>
            ))}
            </div>
    </div>
  );
}

export default FinanceBoard;