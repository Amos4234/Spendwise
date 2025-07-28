"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { isThisMonth, parse } from 'date-fns';

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<number | null>(null);
  const [savingsGoal, setSavingsGoal] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedTransactions = localStorage.getItem('spendwise-transactions');
      const storedBudget = localStorage.getItem('spendwise-budget');
      const storedSavingsGoal = localStorage.getItem('spendwise-savings-goal');

      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
      if (storedBudget) {
        setBudget(JSON.parse(storedBudget));
      }
      if (storedSavingsGoal) {
        setSavingsGoal(JSON.parse(storedSavingsGoal));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('spendwise-transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('spendwise-budget', JSON.stringify(budget));
    }
  }, [budget, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('spendwise-savings-goal', JSON.stringify(savingsGoal));
    }
  }, [savingsGoal, isLoaded]);


  const addTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  }
  
  useEffect(() => {
    if (!budget || !isLoaded) return;
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && isThisMonth(parse(t.date, 'yyyy-MM-dd', new Date())))
      .reduce((acc, t) => acc + t.amount, 0);

    if (monthlyExpenses > budget) {
      toast({
        variant: "destructive",
        title: "Budget Exceeded",
        description: `You have exceeded your monthly budget of KES${budget.toLocaleString()}.`,
      });
    }
  }, [transactions, budget, toast, isLoaded]);

  useEffect(() => {
    if (!savingsGoal || !isLoaded) return;

    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && isThisMonth(parse(t.date, 'yyyy-MM-dd', new Date())))
      .reduce((acc, t) => acc + t.amount, 0);
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && isThisMonth(parse(t.date, 'yyyy-MM-dd', new Date())))
      .reduce((acc, t) => acc + t.amount, 0);
    
    const monthlySavings = monthlyIncome - monthlyExpenses;

    if (monthlySavings >= savingsGoal) {
      toast({
        title: "Goal Achieved!",
        description: `Congratulations! You've reached your monthly savings goal of KES${savingsGoal.toLocaleString()}.`,
      });
    }

  }, [transactions, savingsGoal, toast, isLoaded]);


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
