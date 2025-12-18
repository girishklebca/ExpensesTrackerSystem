
// Not using this
// Not using this
// Not using this
// Not using this
// Not using this
// Not using this

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
}

const initialState: TransactionsState = {
  transactions: [
    {
      _id: "1",
      title: "Salary Deposit",
      amount: 2710.0,
      type: "income",
      category: "Income",
      date: "8/29/2024",
    },
    {
      _id: "2",
      title: "Grocery Store",
      amount: 89.5,
      type: "expense",
      category: "Food & Dining",
      date: "8/28/2024",
    },
    {
      _id: "3",
      title: "Gas Station",
      amount: 45.0,
      type: "expense",
      category: "Transportation",
      date: "8/26/2024",
    },
    {
      _id: "4",
      title: "Netflix Subscription",
      amount: 15.99,
      type: "expense",
      category: "Entertainment",
      date: "8/27/2024",
    },
    {
      _id: "5",
      title: "Freelance Project",
      amount: 850.0,
      type: "income",
      category: "Income",
      date: "8/26/2024",
    },
    {
      _id: "6",
      title: "Coffee Shop",
      amount: 12.5,
      type: "expense",
      category: "Food & Dining",
      date: "8/26/2024",
    },
  ],
  totalIncome: 3560.0,
  totalExpenses: 162.99,
  netAmount: 3397.01,
};

const calculateTotals = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netAmount };
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      const totals = calculateTotals(state.transactions);
      state.totalIncome = totals.totalIncome;
      state.totalExpenses = totals.totalExpenses;
      state.netAmount = totals.netAmount;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t._id !== action.payload
      );
      const totals = calculateTotals(state.transactions);
      state.totalIncome = totals.totalIncome;
      state.totalExpenses = totals.totalExpenses;
      state.netAmount = totals.netAmount;
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
