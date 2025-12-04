import { useState } from "react";
import {
  useGetTransactionsQuery,
  useGetSummaryQuery,
} from "../store/api/transactionsApi";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Reports = () => {
  const { data: transactions = [] } = useGetTransactionsQuery();
  const { data: summary } = useGetSummaryQuery();
  const [selectedPeriod, setSelectedPeriod] = useState("Last Year");
  const [activeTab, setActiveTab] = useState("Overview");

  const { totalIncome = 0, totalExpenses = 0, netAmount = 0 } = summary || {};

  // Calculate monthly data for Income vs Expenses chart
  const monthlyData = [
    { month: "Jan", income: 4000, expenses: 3200 },
    { month: "Feb", income: 5200, expenses: 3100 },
    { month: "Mar", income: 4900, expenses: 3300 },
    { month: "Apr", income: 5500, expenses: 3200 },
    { month: "May", income: 4500, expenses: 3100 },
    { month: "Jun", income: 5400, expenses: 3100 },
  ];

  // Calculate savings trend data
  const savingsTrend = [
    { month: "Jan", savings: 1600 },
    { month: "Feb", savings: 2100 },
    { month: "Mar", savings: 1600 },
    { month: "Apr", savings: 2300 },
    { month: "May", savings: 1900 },
    { month: "Jun", savings: 2300 },
  ];

  // Weekly spending pattern data
  const weeklySpending = [
    { week: "Week 1", spending: 550 },
    { week: "Week 2", spending: 400 },
    { week: "Week 3", spending: 500 },
    { week: "Week 4", spending: 290 },
    { week: "Week 5", spending: 250 },
  ];

  // Monthly comparison data
  const monthlyComparison = [
    { month: "Jan", spending: 2500 },
    { month: "Feb", spending: 3100 },
    { month: "Mar", spending: 3400 },
    { month: "Apr", spending: 2000 },
    { month: "May", spending: 3250 },
    { month: "Jun", spending: 3000 },
  ];

  // Calculate category breakdown
  const categoryData: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      categoryData[transaction.category] =
        (categoryData[transaction.category] || 0) + transaction.amount;
    }
  });

  const topCategories = Object.entries(categoryData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, amount]) => ({
      name,
      amount: Number(amount.toFixed(2)),
    }));

  const COLORS = [
    "#EF4444",
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EC4899",
  ];

  // Calculate metrics
  const avgMonthlySavings = 2140;
  const savingsRate =
    totalIncome > 0 ? ((netAmount / totalIncome) * 100).toFixed(1) : "0.0";
  const topExpenseCategory = topCategories[0]?.name || "Food & Dining";
  const monthlyExpenses = 3280;

  return (
    <div className="min-h-[90vh] bg-gray-50 p-4 md:p-8 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Financial Reports
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Analyze your spending patterns and financial health
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full md:w-auto">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm md:text-base"
            >
              <option>Last Year</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Month</option>
            </select>
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Average Monthly Savings */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-md border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FaArrowUp className="text-green-600 text-sm" />
              <span className="text-green-700 text-xs font-medium">+12%</span>
            </div>
            <h3 className="text-green-700 text-sm font-medium mb-2">
              Average Monthly Savings
            </h3>
            <p className="text-3xl font-bold text-green-800">
              ${avgMonthlySavings.toLocaleString()}
            </p>
          </div>

          {/* Savings Rate */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <FaArrowUp className="text-blue-600 text-sm" />
              <span className="text-blue-700 text-xs font-medium">39.5%</span>
            </div>
            <h3 className="text-blue-700 text-sm font-medium mb-2">
              Savings Rate
            </h3>
            <p className="text-3xl font-bold text-blue-800">{savingsRate}%</p>
          </div>

          {/* Top Expense Category */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-md border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <FaArrowDown className="text-purple-600 text-sm" />
              <span className="text-purple-700 text-xs font-medium">
                $1,250
              </span>
            </div>
            <h3 className="text-purple-700 text-sm font-medium mb-2">
              Top Expense Category
            </h3>
            <p className="text-xl font-bold text-purple-800">
              {topExpenseCategory}
            </p>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-md border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <FaArrowDown className="text-orange-600 text-sm" />
              <span className="text-orange-700 text-xs font-medium">-5%</span>
            </div>
            <h3 className="text-orange-700 text-sm font-medium mb-2">
              Monthly Expenses
            </h3>
            <p className="text-3xl font-bold text-orange-800">
              ${monthlyExpenses.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("Overview")}
            className={`pb-3 px-3 md:px-4 border-b-2 transition-colors text-sm md:text-base whitespace-nowrap ${
              activeTab === "Overview"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("Categories")}
            className={`pb-3 px-3 md:px-4 border-b-2 transition-colors text-sm md:text-base whitespace-nowrap ${
              activeTab === "Categories"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("Trends")}
            className={`pb-3 px-3 md:px-4 border-b-2 transition-colors text-sm md:text-base whitespace-nowrap ${
              activeTab === "Trends"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setActiveTab("Goals")}
            className={`pb-3 px-3 md:px-4 border-b-2 transition-colors text-sm md:text-base whitespace-nowrap ${
              activeTab === "Goals"
                ? "border-cyan-500 text-cyan-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Goals
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Income vs Expenses Chart */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
                  Income vs Expenses
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="income"
                      fill="#10B981"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="expenses"
                      fill="#EF4444"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Savings Trend */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
                  Savings Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={savingsTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#06B6D4"
                      fill="#06B6D4"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Expense Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold ml-1 text-gray-800 mb-6">
                Top Expense Categories
              </h3>
              <div className="space-y-4">
                {topCategories.length > 0 ? (
                  topCategories.map((category, index) => {
                    const percentage =
                      totalExpenses > 0
                        ? ((category.amount / totalExpenses) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <div
                        key={category.name}
                        className="flex items-center justify-between bg-gray-100 rounded-xl px-10 py-5"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-gray-700 font-medium w-32">
                            {category.name}
                          </span>
                          <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <span className="text-gray-600 font-medium w-20 text-right">
                            ${category.amount.toLocaleString()}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              index === 0 ? "text-red-600" : "text-green-600"
                            } w-16 text-right`}
                          >
                            {index === 0 ? "↑ 8%" : "↓ 12%"}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No expense data available
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Categories Tab */}
        {activeTab === "Categories" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Distribution Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Expense Distribution
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={topCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {topCategories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown List */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Category Breakdown
              </h3>
              <div className="space-y-4">
                {topCategories.length > 0 ? (
                  topCategories.map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-gray-700 font-medium">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-gray-900 font-bold text-lg">
                        ${category.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No expense data available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === "Trends" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Spending Pattern */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Weekly Spending Pattern
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={weeklySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.6}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Monthly Comparison
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="spending"
                    fill="#F59E0B"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Goals Tab Placeholder */}
        {activeTab === "Goals" && (
          <div className="bg-white rounded-2xl p-12 shadow-md text-center">
            <p className="text-gray-500 text-lg">
              Goals content coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
