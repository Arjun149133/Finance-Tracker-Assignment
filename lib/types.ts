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

// optional: use fixed colors or hash to color mapping
export function getCategoryColor(category: string): string {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981',
    '#3B82F6', '#8B5CF6', '#EC4899',
    '#6366F1', '#14B8A6', '#F43F5E',
  ];
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
