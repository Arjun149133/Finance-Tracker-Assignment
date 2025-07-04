'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyExpense } from '@/lib/types';
import { BarChart3 } from 'lucide-react';

interface ExpensesChartProps {
  data: MonthlyExpense[];
}

export default function MonthlyBarChart({ data }: ExpensesChartProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm p-4 border border-border rounded-lg shadow-xl">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-primary font-semibold">
            Expenses: {formatAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          Monthly Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No expense data available</p>
            <p className="text-sm">Add some transactions to see your spending patterns</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart className="-z-10" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(250 0% 64.7%)" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'hsl(194.7, 53.3%, 79.0%)' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="hsl(0, 0%, 100%)"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(194.7, 53.3%, 79.0%)' }}
                  tickFormatter={formatAmount}
                  stroke="hsl(0, 0%, 100%)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(194.7, 53.3%, 79.0%)"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}