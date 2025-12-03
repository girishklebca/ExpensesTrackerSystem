import { useState } from "react";
import {
  useGetTransactionsQuery,
  useGetSummaryQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} from "../store/api/transactionsApi";
import {
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaPlus,
  FaSearch,
  FaTrash,
  FaCalendar,
  FaRegCreditCard,
} from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useGetTransactionsQuery();
  const { data: summary } = useGetSummaryQuery();
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const { totalIncome = 0, totalExpenses = 0, netAmount = 0 } = summary || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "",
  });

  const handleAddTransaction = async () => {
    // Validation
    if (!newTransaction.title) {
      setSnackbar({
        open: true,
        message: "Please enter a transaction title",
        severity: "error",
      });
      return;
    }
    if (!newTransaction.amount || parseFloat(newTransaction.amount) <= 0) {
      setSnackbar({
        open: true,
        message: "Please enter a valid amount",
        severity: "error",
      });
      return;
    }
    if (!newTransaction.category) {
      setSnackbar({
        open: true,
        message: "Please select a category",
        severity: "error",
      });
      return;
    }

    try {
      await addTransaction({
        title: newTransaction.title,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        category: newTransaction.category,
        date: new Date().toLocaleDateString("en-US"),
      }).unwrap();

      setSnackbar({
        open: true,
        message: "Transaction added successfully!",
        severity: "success",
      });

      setNewTransaction({
        title: "",
        amount: "",
        type: "expense",
        category: "",
      });
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to add transaction:", error);
      setSnackbar({
        open: true,
        message: "Failed to add transaction. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id).unwrap();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === "All Types" ||
      transaction.type === typeFilter.toLowerCase();
    const matchesCategory =
      categoryFilter === "All Categories" ||
      transaction.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[90vh] bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-[90vh] bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-200">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600">
            {error && "status" in error
              ? `Error: ${error.status}`
              : "Failed to load transactions"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 p-8 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
            <p className="text-gray-500 mt-1">
              Manage your income and expenses
            </p>
          </div>
          <div className="flex gap-10">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
            >
              <MdDashboard />
              Go To Dashboard
            </button>
            <button
              onClick={() => setOpenDialog(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
            >
              <FaPlus />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Income */}
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-md border border-green-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-700 text-sm font-medium">
                  Total Income
                </p>
                <h2 className="text-3xl font-bold text-green-800 mt-2">
                  ${totalIncome.toFixed(2)}
                </h2>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <FaArrowUp className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-linear-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-md border border-red-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-red-700 text-sm font-medium">
                  Total Expenses
                </p>
                <h2 className="text-3xl font-bold text-red-800 mt-2">
                  ${totalExpenses.toFixed(2)}
                </h2>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <FaArrowDown className="text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Net Amount */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-blue-700 text-sm font-medium">Net Amount</p>
                <h2 className="text-3xl font-bold text-blue-800 mt-2">
                  ${netAmount.toFixed(2)}
                </h2>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <FaDollarSign className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option>All Types</option>
              <option>Income</option>
              <option>Expense</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option>All Categories</option>
              <option>Income</option>
              <option>Food & Dining</option>
              <option>Transportation</option>
              <option>Entertainment</option>
            </select>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Transaction History
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div
                      className={`p-3 rounded-xl ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <FaArrowUp className="text-green-600 text-lg" />
                      ) : (
                        <FaArrowDown className="text-red-600 text-lg" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {transaction.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <FaCalendar className="text-xs" />
                          {transaction.date}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            transaction.type === "income"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {transaction.category}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right mr-4">
                      <p
                        className={`text-xl font-bold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteTransaction(transaction._id!)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-100 rounded-lg text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No transactions found</p>
                <p className="text-sm mt-2">
                  Try adjusting your filters or add a new transaction
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        sx={{
          mt: "-50px",
        }}
      >
        <DialogTitle className="text-xl text-center font-semibold">
          Add New Transaction
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 h-100 mt-4 flex flex-col justify-around">
            {/* Type Toggle */}
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={() =>
                  setNewTransaction({ ...newTransaction, type: "expense" })
                }
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                  newTransaction.type === "expense"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <FaArrowDown />
                Expense
              </button>
              <button
                type="button"
                onClick={() =>
                  setNewTransaction({ ...newTransaction, type: "income" })
                }
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                  newTransaction.type === "income"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <FaArrowUp />
                Income
              </button>
            </div>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newTransaction.category}
                label="Category"
                onChange={(e: SelectChangeEvent) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                MenuProps={{
                  disablePortal: true,
                  PaperProps: {
                    style: {
                      maxHeight: 500,
                    },
                  },
                }}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Food & Dining">Food & Dining</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Bills & Utilities">Bills & Utilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Transaction Title"
              placeholder="Enter description..."
              value={newTransaction.title}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, amount: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "50px",
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            color="inherit"
            disabled={isAdding}
            sx={{
              bgcolor: "#ff0000",
              color: "white",
              px: "24px",
              py: "12px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddTransaction}
            variant="contained"
            className="bg-cyan-500"
            disabled={isAdding}
            sx={{
              px: "24px",
              py: "12px",
              bgcolor: "#0891B2",
            }}
          >
            {isAdding ? "Adding..." : "Add Transaction"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Transactions;
