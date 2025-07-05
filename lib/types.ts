export interface Transaction {
  id: string;
  _id: string;
  amount: number;
  title: string;
  description: string;
  type: 'income' | 'expense';
  month: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  color: string;
}

export interface Budget {
  _id: string;
  id: string;
  category: string;
  amount: number;
  month: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetComparison {
  _id: string;
  category: string;
  budgeted: number;
  actual: number;
  remaining: number;
  percentage: number;
  month?: string;
  color: string;
}

export interface SpendingInsight {
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  icon: string;
}

export const EXPENSE_CATEGORIES = [
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
  'Other'
] as const;

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investments',
  'Rental Income',
  'Gifts',
  'Other'
] as const;

export const CATEGORY_COLORS = {
  'Food & Dining': '#EF4444',
  'Transportation': '#F97316',
  'Shopping': '#EAB308',
  'Entertainment': '#22C55E',
  'Bills & Utilities': '#06B6D4',
  'Healthcare': '#3B82F6',
  'Education': '#8B5CF6',
  'Travel': '#EC4899',
  'Personal Care': '#F59E0B',
  'Home & Garden': '#10B981',
  'Gifts & Donations': '#84CC16',
  'Other': '#6B7280',
  'Salary': '#059669',
  'Freelance': '#0891B2',
  'Business': '#7C3AED',
  'Investments': '#DC2626',
  'Rental Income': '#EA580C',
  'Gifts': '#16A34A',
} as const;

export const isValidCategory = (category: string, type: 'income' | 'expense'): boolean => {
  const validCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return validCategories.includes(category as any);
};

export const getDefaultCategory = (type: 'income' | 'expense'): string => {
  return type === 'income' ? 'Other' : 'Other';
};

export function getMonthlyExpenses(transactions: Transaction[]): MonthlyExpense[] {
  const monthlyMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      monthlyMap[tx.month] = (monthlyMap[tx.month] || 0) + tx.amount;
    }
  });

  return Object.entries(monthlyMap).map(([month, amount]) => ({
    month,
    amount,
  }));
}


export function getCategoryExpenses(transactions: Transaction[]): CategoryExpense[] {
  const categoryMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
    }
  });

  return Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    color: getCategoryColor(category),
  }));
}

export function getCategoryColor(category: string): string {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981',
    '#3B82F6', '#8B5CF6', '#EC4899',
    '#6366F1', '#14B8A6', '#F43F5E',
  ];
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export const getBudgetComparisons = (budget: Budget[], transactions: Transaction[]) => {
  const res =  budget.map((b: Budget) => {
      const totalSpent = transactions
        .filter((t) => t.category === b.category && t.type === 'expense' && t.month === b.month)
        .reduce((acc, curr) => acc + curr.amount, 0)

      const percentage = parseFloat(((totalSpent / b.amount) * 100).toFixed(2))

      return {
        _id: b._id,
        category: b.category,
        budgeted: b.amount,
        actual: totalSpent,
        remaining: b.amount - totalSpent,
        percentage: percentage,
        month: b.month,
        color: percentage > 100 ? 'red' : percentage > 80 ? 'orange' : 'green'
      }
    })

    return res;
}

export const getCategoryExpensesForMonth = (transactions: Transaction[]): CategoryExpense[] => {
  const categoryData: { [key: string]: number } = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      const category = transaction.category || 'Other';
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += Math.abs(transaction.amount);
    });
  
  return Object.entries(categoryData)
    .map(([category, amount]) => ({
      category,
      amount,
      color: getCategoryColor(category)
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const getSpendingInsights = (transactions: Transaction[], budget: Budget[]): SpendingInsight[] => {
  const insights: SpendingInsight[] = [];
  const currentMonth = new Date().toISOString().slice(0, 7);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);
  
  const currentMonthExpenses = transactions.filter(t => 
    t.type === 'expense' && t.month.startsWith(currentMonth)
  );
  const lastMonthExpenses = transactions.filter(t => 
    t.type === 'expense' && t.month.startsWith(lastMonth)
  );
  
  const currentTotal = currentMonthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const lastTotal = lastMonthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  if (lastTotal > 0) {
    const change = ((currentTotal - lastTotal) / lastTotal) * 100;
    if (change > 20) {
      insights.push({
        type: 'warning',
        title: 'Spending Increased',
        description: `Your spending is up ${change.toFixed(1)}% from last month`,
        icon: 'TrendingUp'
      });
    } else if (change < -10) {
      insights.push({
        type: 'success',
        title: 'Great Savings!',
        description: `You've reduced spending by ${Math.abs(change).toFixed(1)}% this month`,
        icon: 'TrendingDown'
      });
    }
  }
  
  const budgetComparisons = getBudgetComparisons(budget, transactions);
  const overBudgetCategories = budgetComparisons.filter(b => b.percentage > 100);
  
  if (overBudgetCategories.length > 0) {
    const worstCategory = overBudgetCategories[0];
    insights.push({
      type: 'warning',
      title: 'Budget Exceeded',
      description: `${worstCategory.category} is ${(worstCategory.percentage - 100).toFixed(1)}% over budget`,
      icon: 'AlertTriangle'
    });
  }
  
  const categoryExpenses = getCategoryExpensesForMonth(currentMonthExpenses);
  if (categoryExpenses.length > 0) {
    const topCategory = categoryExpenses[0];
    const totalExpenses = categoryExpenses.reduce((sum, c) => sum + c.amount, 0);
    const percentage = (topCategory.amount / totalExpenses) * 100;
    
    if (percentage > 40) {
      insights.push({
        type: 'info',
        title: 'Top Spending Category',
        description: `${topCategory.category} accounts for ${percentage.toFixed(1)}% of your expenses`,
        icon: 'PieChart'
      });
    }
  }
  
  return insights;
};