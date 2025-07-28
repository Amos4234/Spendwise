import type { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 2500, category: 'Salary', date: '2024-07-01' },
  { id: '2', type: 'expense', amount: 75, category: 'Groceries', date: '2024-07-03' },
  { id: '3', type: 'expense', amount: 1200, category: 'Rent', date: '2024-07-05' },
  { id: '4', type: 'expense', amount: 45, category: 'Transport', date: '2024-07-06' },
  { id: '5', type: 'expense', amount: 150, category: 'Utilities', date: '2024-07-10' },
  { id: '6', type: 'income', amount: 500, category: 'Freelance', date: '2024-07-12' },
  { id: '7', type: 'expense', amount: 30, category: 'Entertainment', date: '2024-07-15' },
  { id: '8', type: 'expense', amount: 100, category: 'Dining Out', date: '2024-07-18' },
  { id: '9', type: 'income', amount: 2500, category: 'Salary', date: '2024-08-01' },
  { id: '10', type: 'expense', amount: 80, category: 'Groceries', date: '2024-08-03' },
  { id: '11', type: 'expense', amount: 1200, category: 'Rent', date: '2024-08-05' },
  { id: '12', type: 'expense', amount: 50, category: 'Transport', date: '2024-08-07' },
  { id: '13', type: 'income', amount: 150, category: 'Gift', date: '2024-06-20' },
  { id: '14', type: 'expense', amount: 200, category: 'Shopping', date: '2024-06-22' },
  { id: '15', type: 'expense', amount: 55, category: 'Healthcare', date: '2024-06-25' },
];

export const incomeCategories = [
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "gift", label: "Gift" },
    { value: "other", label: "Other" },
];

export const expenseCategories = [
    { value: "groceries", label: "Groceries" },
    { value: "rent", label: "Rent" },
    { value: "utilities", label: "Utilities" },
    { value: "transport", label: "Transport" },
    { value: "dining", label: "Dining Out" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "healthcare", label: "Healthcare" },
    { value: "other", label: "Other" },
];
