import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}
interface SummaryResponse {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
}

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
    getSummary: builder.query<SummaryResponse, void>({
      query: () => "/transactions/summary",
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation<Transaction, Omit<Transaction, "_id">>({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetSummaryQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
