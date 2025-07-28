"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Transaction } from '@/lib/types';
import { mockTransactions } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { isThisMonth, parseISO } from 'date-fns';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  budget: number | null;
  setBudget: (amount: number) => void;
  savingsGoal: number | null;
  setSavingsGoal: (amount: number) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budget, setBudget] = useState<number | null>(100000);
  const [savingsGoal, setSavingsGoal] = useState<number | null>(20000);
  const { toast } = useToast();

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  }
  
  useEffect(() => {
    if (!budget) return;
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && isThisMonth(parseISO(t.date)))
      .reduce((acc, t) => acc + t.amount, 0);

    if (monthlyExpenses > budget) {
      toast({
        variant: "destructive",
        title: "Budget Exceeded",
        description: `You have exceeded your monthly budget of KES${budget.toLocaleString()}.`,
      });
    }
  }, [transactions, budget, toast]);

  useEffect(() => {
    if (!savingsGoal) return;

    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && isThisMonth(parseISO(t.date)))
      .reduce((acc, t) => acc + t.amount, 0);
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && isThisMonth(parseISO(t.date)))
      .reduce((acc, t) => acc + t.amount, 0);
    
    const monthlySavings = monthlyIncome - monthlyExpenses;

    if (monthlySavings >= savingsGoal) {
      toast({
        title: "Goal Achieved!",
        description: `Congratulations! You've reached your monthly savings goal of KES${savingsGoal.toLocaleString()}.`,
      });
    }

  }, [transactions, savingsGoal, toast]);


  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, budget, setBudget, savingsGoal, setSavingsGoal }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
