import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "../store/api/categoriesApi";
import {
  useGetTransactionsQuery,
  useGetSummaryQuery,
} from "../store/api/transactionsApi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FaDollarSign,
  FaArrowDown,
  FaArrowUp,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const Categories = () => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const { data: transactions = [] } = useGetTransactionsQuery();
  const { data: summary } = useGetSummaryQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("📁");
  const [categoryName, setCategoryName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { totalIncome = 0, totalExpenses = 0 } = summary || {};

  // Icon options
  const iconOptions = [
    "🍔",
    "🚗",
    "🎬",
    "🛒",
    "💊",
    "💡",
    "📱",
    "✈️",
    "🏠",
    "🎮",
    "📚",
    "💼",
    "🎵",
    "🏋️",
    "☕",
  ];

  // Calculate category expenses
  const getCategoryExpense = (categoryName: string) => {
    return transactions
      .filter((t) => t.category === categoryName && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Calculate category income
  const getCategoryIncome = (categoryName: string) => {
    return transactions
      .filter((t) => t.category === categoryName && t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Get transaction count
  const getTransactionCount = (categoryName: string) => {
    return transactions.filter((t) => t.category === categoryName).length;
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter a category name",
        severity: "error",
      });
      return;
    }

    try {
      await addCategory({
        name: categoryName,
        type: "both",
        color: "#3B82F6",
        icon: selectedIcon,
      }).unwrap();

      setSnackbar({
        open: true,
        message: "Category added successfully!",
        severity: "success",
      });

      setCategoryName("");
      setSelectedIcon("📁");
      setOpenDialog(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add category",
        severity: "error",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      setSnackbar({
        open: true,
        message: "Category deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete category",
        severity: "error",
      });
    }
  };

  // Separate categories
  const expenseCategories = categories.filter(
    (cat) => cat.type === "expense" || cat.type === "both"
  );
  const incomeCategories = categories.filter(
    (cat) => cat.type === "income" || cat.type === "both"
  );

  const totalSpent = totalExpenses;
  const budgetUsed =
    totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : "0";

  if (isLoading) {
    return (
      <div className="min-h-[90vh] bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 p-8 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
            <p className="text-gray-500 mt-1">
              Organize your transactions and set budgets
            </p>
          </div>
          <button
            onClick={() => setOpenDialog(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Budget */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaDollarSign className="text-blue-600" />
                  <span className="text-blue-600 text-sm">${totalIncome}</span>
                </div>
                <h3 className="text-blue-700 text-sm font-medium mb-2">
                  Total Budget
                </h3>
                <p className="text-blue-600 text-xs">Monthly allocation</p>
              </div>
              <p className="text-3xl font-bold text-blue-800">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-md border border-red-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaArrowDown className="text-red-600" />
                  <span className="text-red-600 text-sm">${totalSpent}</span>
                </div>
                <h3 className="text-red-700 text-sm font-medium mb-2">
                  Total Spent
                </h3>
                <p className="text-red-600 text-xs">This month</p>
              </div>
              <p className="text-3xl font-bold text-red-800">
                ${totalSpent.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Budget Used */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-md border border-green-200">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaArrowUp className="text-green-600" />
                  <span className="text-green-600 text-sm">{budgetUsed}%</span>
                </div>
                <h3 className="text-green-700 text-sm font-medium mb-2">
                  Budget Used
                </h3>
                <p className="text-green-600 text-xs">Overall utilization</p>
              </div>
              <p className="text-3xl font-bold text-green-800">{budgetUsed}%</p>
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="flex items-center gap-2 mb-6">
            <FaArrowDown className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">
              Expense Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenseCategories.length > 0 ? (
              expenseCategories.map((category) => {
                const spent = getCategoryExpense(category.name);
                const transactionCount = getTransactionCount(category.name);

                return (
                  <div
                    key={category._id}
                    className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group relative"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {transactionCount} transactions
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category._id!)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Spent Amount */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Spent</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${spent.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (spent / (totalExpenses || 1)) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((spent / (totalExpenses || 1)) * 100).toFixed(1)}% of
                      total expenses
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No expense categories yet
              </div>
            )}
          </div>
        </div>

        {/* Income Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <FaArrowUp className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">
              Income Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeCategories.length > 0 ? (
              incomeCategories.map((category) => {
                const earned = getCategoryIncome(category.name);
                const transactionCount = getTransactionCount(category.name);

                return (
                  <div
                    key={category._id}
                    className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group relative"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {transactionCount} transactions
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category._id!)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Earned Amount */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Earned
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        +${earned.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No income categories yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
      >
        <DialogTitle className="text-xl font-semibold">
          Add New Category
        </DialogTitle>
        <DialogContent>
          <div className="space-y-6 mt-4">
            {/* Category Name */}
            <TextField
              fullWidth
              label="Category Name"
              placeholder="e.g., Groceries, Rent, Salary"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Icon
              </label>
              <div className="grid grid-cols-5 gap-3">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedIcon === icon
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button
            onClick={() => setOpenDialog(false)}
            disabled={isAdding}
            sx={{ color: "gray" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddCategory}
            variant="contained"
            disabled={isAdding}
            sx={{ bgcolor: "#0891B2", "&:hover": { bgcolor: "#0e7490" } }}
          >
            {isAdding ? "Adding..." : "Add Category"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Categories;
