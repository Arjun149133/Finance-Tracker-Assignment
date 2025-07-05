"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Budget, Transaction } from "../types";

type AppContextType = {
    transactions: Transaction[];
    loading: boolean;
    budget: Budget[];
    budgetLoading: boolean;
    setTransactions: (transactions: Transaction[]) => void;
    fetchTransactions: () => Promise<void>;
    postTransaction: (values: FormData) => Promise<any>;
    fetchBudget: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [budget, setBudget] = useState<Budget[]>([]);
    const [budgetLoading, setBudgetLoading] = useState<boolean>(true);

   const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions')

      if (res.data.success) {
        setTransactions(res.data.data)
      } else {
        console.error("Failed to fetch transactions")
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)      
    }
  }
  
  const postTransaction = async (values: FormData) => {
    const res = await axios.post('/api/transactions', values);

    return res.data;
  }

  const fetchBudget = async () => {
    setBudgetLoading(true);
    try {
      const res = await axios.get('/api/budget');

      if (res.data.success) {
        setBudget(res.data.data);
      } else {
        console.error("Failed to fetch budget");
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setBudgetLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTransactions();
      await fetchBudget();
      setLoading(false);
    }

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchTransactions()
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <AppContext.Provider value={
        {
            transactions,
            loading,
            budget,
            budgetLoading,
            setTransactions,
            fetchTransactions,
            postTransaction,
            fetchBudget
        }
    }>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
