'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpendingInsight } from '@/lib/types';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, PieChart, Info } from 'lucide-react';

interface SpendingInsightsProps {
  insights: SpendingInsight[];
}

export default function Insights({ insights }: SpendingInsightsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="h-4 w-4" />;
      case 'TrendingDown':
        return <TrendingDown className="h-4 w-4" />;
      case 'AlertTriangle':
        return <AlertTriangle className="h-4 w-4" />;
      case 'PieChart':
        return <PieChart className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getInsightStyle = (type: SpendingInsight['type']) => {
    switch (type) {
      case 'warning':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          textColor: 'text-red-700'
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          textColor: 'text-green-700'
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-700'
        };
    }
  };

  return (
    <Card className="w-full text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 xl:text-xl font-bold">
          <Lightbulb className="h-5 w-5" />
          Spending Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Add more transactions to get personalized spending insights and recommendations.
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const style = getInsightStyle(insight.type);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${style.bgColor} ${style.borderColor}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1 ${style.iconColor}`}>
                      {getIcon(insight.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${style.titleColor}`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm mt-1 ${style.textColor}`}>
                        {insight.description}
                      </p>
                    </div>
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