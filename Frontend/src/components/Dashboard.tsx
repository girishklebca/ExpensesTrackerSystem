import {
  useGetTransactionsQuery,
  useGetSummaryQuery,
} from "../store/api/transactionsApi";
import { useNavigate } from "react-router-dom";
import {
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaChartPie,
  FaPlus,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const { data: transactions = [] } = useGetTransactionsQuery();
  const { data: summary } = useGetSummaryQuery();
  const navigate = useNavigate();

  const { totalIncome = 0, totalExpenses = 0, netAmount = 0 } = summary || {};

  // Calculate savings rate
  const savingsRate =
    totalIncome > 0 ? ((netAmount / totalIncome) * 100).toFixed(1) : 0;

  // Calculate monthly trend data
  const monthlyData = [
    { month: "Jan", income: 5000, expense: 3200 },
    { month: "Feb", income: 5500, expense: 3400 },
    { month: "Mar", income: 5200, expense: 3600 },
    { month: "Apr", income: 6000, expense: 3500 },
    { month: "May", income: 5800, expense: 3500 },
    { month: "Jun", income: 6200, expense: 3600 },
  ];

  // Calculate expense categories
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const categoryData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = ["#FF6B6B", "#FFA500", "#4ECDC4", "#45B7D1", "#9B59B6"];

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-[90vh] bg-gray-50 p-8 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here's your financial overview for this month
            </p>
          </div>
          <button
            onClick={() => navigate("/transactions")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
          >
            <FaPlus />
            Add Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaDollarSign className="text-blue-600 text-lg" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <FaArrowUp className="text-xs" />
                +2%
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              ${netAmount.toFixed(0)}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Total Balance</p>
          </div>

          {/* Monthly Income */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <FaArrowUp className="text-green-600 text-lg" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <FaArrowUp className="text-xs" />
                +2%
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              ${totalIncome.toFixed(0)}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Monthly Income</p>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <FaArrowDown className="text-red-600 text-lg" />
              </div>
              <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                <FaArrowDown className="text-xs" />
                -5%
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              ${totalExpenses.toFixed(0)}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Monthly Expenses</p>
          </div>

          {/* Savings Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <FaChartPie className="text-purple-600 text-lg" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                <FaArrowUp className="text-xs" />
                +2.1%
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">{savingsRate}%</h2>
            <p className="text-gray-500 text-sm mt-1">Savings Rate</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Monthly Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Categories Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Expense Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    ${entry.value.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h2>
            <button
              onClick={() => navigate("/transactions")}
              className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
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
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {transaction.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No transactions yet</p>
                <p className="text-sm mt-2">
                  Start by adding your first transaction
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
