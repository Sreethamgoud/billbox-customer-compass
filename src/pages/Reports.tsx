
import { useState } from "react";
import { Menu, X, Home, BarChart3, FileText, Bell, Zap, Settings, RefreshCw, Download, Calendar, Filter, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Reports = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Budgets & Alerts', href: '/budgets', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Profile & Settings', href: '/settings', icon: Settings },
  ];

  const summaryMetrics = [
    {
      title: "Total Income",
      value: "$8,420.00",
      change: "+12.3%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Total Expenses",
      value: "$6,247.89",
      change: "-8.1%",
      isPositive: true,
      icon: TrendingDown
    },
    {
      title: "Net Savings",
      value: "$2,172.11",
      change: "+24.7%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Monthly Average",
      value: "$5,834.23",
      change: "+5.2%",
      isPositive: true,
      icon: TrendingUp
    }
  ];

  const topMerchants = [
    { name: "Amazon", amount: "$1,247.89", transactions: 23, category: "Shopping" },
    { name: "Starbucks", amount: "$287.45", transactions: 18, category: "Food & Drink" },
    { name: "Shell Gas Station", amount: "$245.67", transactions: 12, category: "Transportation" },
    { name: "Whole Foods", amount: "$189.23", transactions: 8, category: "Groceries" },
    { name: "Netflix", amount: "$15.99", transactions: 1, category: "Entertainment" },
  ];

  const insights = [
    {
      type: "warning",
      title: "High Entertainment Spending",
      message: "Your entertainment spending is 40% higher than last month. Consider reviewing your subscriptions.",
      action: "Review Subscriptions"
    },
    {
      type: "success",
      title: "Grocery Budget Success",
      message: "You're on track to save $120 this month on groceries compared to your budget.",
      action: "View Details"
    },
    {
      type: "info",
      title: "Seasonal Trend Alert",
      message: "Your utility bills typically increase by 15% during winter months. Plan accordingly.",
      action: "Set Budget Alert"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">BillBox</h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/reports';
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/reports';
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
                <p className="text-gray-600">Detailed insights into your spending patterns and trends</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Calendar size={16} className="mr-2" />
                  Last 30 days
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </button>
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                    <Icon size={20} className={metric.isPositive ? "text-green-500" : "text-red-500"} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <p className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last period
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Spend Over Time Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Spending Over Time</h2>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Line Chart Placeholder</span>
              </div>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Expenses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Savings</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Category Breakdown</h2>
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Donut Chart Placeholder</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Food & Dining</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Transportation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Shopping</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Entertainment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Merchants Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Merchants</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Transactions
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Merchant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Transactions</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {topMerchants.map((merchant, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{merchant.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {merchant.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{merchant.transactions}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">{merchant.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom Chart Widget */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Custom Analysis</h2>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option>Spending by Day of Week</option>
                <option>Monthly Comparison</option>
                <option>Category Trends</option>
                <option>Budget vs Actual</option>
              </select>
            </div>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Custom Chart Placeholder</span>
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {insights.map((insight, index) => (
              <div key={index} className={`rounded-xl shadow-lg p-6 ${
                insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                insight.type === 'success' ? 'bg-green-50 border border-green-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle size={20} className={
                    insight.type === 'warning' ? 'text-yellow-600' :
                    insight.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  } />
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${
                      insight.type === 'warning' ? 'text-yellow-800' :
                      insight.type === 'success' ? 'text-green-800' :
                      'text-blue-800'
                    }`}>
                      {insight.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      insight.type === 'warning' ? 'text-yellow-700' :
                      insight.type === 'success' ? 'text-green-700' :
                      'text-blue-700'
                    }`}>
                      {insight.message}
                    </p>
                    <button className={`text-sm font-medium underline ${
                      insight.type === 'warning' ? 'text-yellow-800' :
                      insight.type === 'success' ? 'text-green-800' :
                      'text-blue-800'
                    }`}>
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center sticky bottom-4">
            <h3 className="text-xl font-semibold mb-2">Unlock Advanced Analytics</h3>
            <p className="mb-4 opacity-90">Get deeper insights, custom reports, and advanced forecasting with BillBox Pro</p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 BillBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
