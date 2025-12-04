import { useState } from "react";
import {
  useGetTransactionsQuery,
  useGetSummaryQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} from "../store/api/transactionsApi";
import { useGetCategoriesQuery } from "../store/api/categoriesApi";
import {
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaPlus,
  FaSearch,
  FaTrash,
  FaCalendar,
  FaTimes,
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
  const { data: categories = [] } = useGetCategoriesQuery();
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
    <div className="min-h-[90vh] bg-gray-50 p-4 md:p-8 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Transactions
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Manage your income and expenses
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
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
        <div className="bg-white rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.icon} {category.name}
                </option>
              ))}
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
                  className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-3 sm:gap-0"
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

      {/* =========================================================================== */}
      {/* =========================================================================== */}
      {/* =========================================================================== */}

      {/* Add Transaction Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        sx={{
          mt: "0px",
        }}
      >
        <DialogTitle className="text-xl text-center font-semibold relative">
          Add New Transaction
          <button
            onClick={() => setOpenDialog(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white cursor-pointer hover:bg-black transition-colors bg-gray-500 rounded-4xl p-2"
          >
            <FaTimes size={20} />
          </button>
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
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer ${
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
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer ${
                  newTransaction.type === "income"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <FaArrowUp />
                Income
              </button>
            </div>
            <div className="flex justify-between items-center">
              <FormControl
                sx={{
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#000000",
                    },
                    "&:hover fieldset": {
                      borderColor: "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000000",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                  },
                  "& .MuiSelect-select": {
                    color: "#000000",
                  },
                }}
              >
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
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <MenuItem key={category._id} value={category.name}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </span>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      No categories available. Add one in Categories page.
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <Button
                onClick={() => navigate("/categories")}
                color="inherit"
                disabled={isAdding}
                sx={{
                  bgcolor: "#0891B2",
                  color: "white",
                  px: "24px",
                  py: "12px",
                }}
              >
                <FaPlus />
                &nbsp; Add Category
              </Button>
            </div>
            <TextField
              fullWidth
              label="Transaction Title"
              placeholder="Enter description..."
              value={newTransaction.title}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, title: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000",
                  },
                  "& input": {
                    color: "#000",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000",
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000",
                  },
                  "& input": {
                    color: "#000000",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: "50px",
            pb: "50px",
          }}
        >
          <Button
            onClick={handleAddTransaction}
            variant="contained"
            className="bg-cyan-500"
            disabled={isAdding}
            sx={{
              px: "48px",
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
