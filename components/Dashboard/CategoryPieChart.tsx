'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryExpense } from '@/lib/types';
import { PieChart as PieChartIcon } from 'lucide-react';

interface CategoryChartProps {
  data: CategoryExpense[];
}

export default function CategoryPieChart({ data }: CategoryChartProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = payload[0].payload.total || data.amount;
      const percentage = ((data.amount / total) * 100).toFixed(1);
      
      return (
        <div className="bg-card/95 backdrop-blur-sm p-4 border border-border rounded-lg shadow-xl">
          <p className="font-medium text-foreground">{data.category}</p>
          <p style={{ color: data.color }} className="font-semibold">
            Amount: {formatAmount(data.amount)}
          </p>
          <p className="text-muted-foreground text-sm">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const dataWithTotal = data.map(item => ({ ...item, total: totalAmount }));

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <PieChartIcon className="h-5 w-5 text-white" />
          </div>
          Expenses by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <PieChartIcon className="h-12 w-12 mx-auto mb-4 opacity-50 text-white" />
            <p className="text-lg font-medium mb-2">No expense data available</p>
            <p className="text-sm">Add some transactions to see your spending breakdown</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithTotal}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {dataWithTotal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {data.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Top Categories</h4>
            {data.slice(0, 5).map((category, index) => {
              const percentage = ((category.amount / totalAmount) * 100).toFixed(1);
              return (
                <div key={category.category} className="flex items-center justify-between text-sm p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-foreground">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-white">{formatAmount(category.amount)}</span>
                    <span className="text-muted-foreground ml-2">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}