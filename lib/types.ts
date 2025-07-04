export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
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
  id: string;
  category: string;
  amount: number;
  month: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetComparison {
  category: string;
  budgeted: number;
  actual: number;
  remaining: number;
  percentage: number;
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

// Helper function to get category color with fallback
export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#6B7280';
};

// Helper function to validate category
export const isValidCategory = (category: string, type: 'income' | 'expense'): boolean => {
  const validCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return validCategories.includes(category as any);
};

// Helper function to get default category
export const getDefaultCategory = (type: 'income' | 'expense'): string => {
  return type === 'income' ? 'Other' : 'Other';
};