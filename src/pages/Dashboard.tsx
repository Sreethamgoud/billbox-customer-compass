
import { useState } from "react";
import { Menu, X, Home, BarChart3, FileText, Bell, Zap, Settings, RefreshCw, Plus, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Budgets & Alerts', href: '/budgets', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Profile & Settings', href: '/settings', icon: Settings },
  ];

  const overviewStats = [
    {
      title: "Total Balance",
      value: "$24,580.32",
      change: "+12.3%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Monthly Spending",
      value: "$3,247.89",
      change: "-8.1%",
      isPositive: true,
      icon: TrendingDown
    },
    {
      title: "Bills Due",
      value: "5",
      change: "This week",
      isPositive: false,
      icon: Bell
    },
    {
      title: "Savings Goal",
      value: "67%",
      change: "+5% this month",
      isPositive: true,
      icon: TrendingUp
    }
  ];

  const recentBills = [
    { name: "Netflix", amount: "$15.99", date: "Dec 15", status: "paid" },
    { name: "Electric Bill", amount: "$127.43", date: "Dec 18", status: "due" },
    { name: "Internet", amount: "$79.99", date: "Dec 20", status: "due" },
    { name: "Spotify", amount: "$9.99", date: "Dec 22", status: "upcoming" },
  ];

  const alerts = [
    { message: "Your grocery budget is 90% used this month", type: "warning", time: "2h ago" },
    { message: "Electric bill payment confirmed", type: "success", time: "1d ago" },
    { message: "Unusual spending detected in Entertainment", type: "alert", time: "3d ago" },
  ];

  const budgets = [
    { category: "Groceries", spent: 450, budget: 500, color: "bg-green-500" },
    { category: "Entertainment", spent: 280, budget: 200, color: "bg-red-500" },
    { category: "Transportation", spent: 120, budget: 300, color: "bg-blue-500" },
    { category: "Utilities", spent: 180, budget: 250, color: "bg-yellow-500" },
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
                const isActive = item.href === '/dashboard';
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
                const isActive = item.href === '/dashboard';
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                    <Icon size={20} className={stat.isPositive ? "text-green-500" : "text-red-500"} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className={`text-sm ${stat.isPositive ? 'text-green-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Bills */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Bills</h2>
                  <Link to="/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentBills.map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          bill.status === 'paid' ? 'bg-green-500' : 
                          bill.status === 'due' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{bill.name}</p>
                          <p className="text-sm text-gray-600">{bill.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{bill.amount}</p>
                        <p className={`text-xs capitalize ${
                          bill.status === 'paid' ? 'text-green-600' : 
                          bill.status === 'due' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {bill.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts Panel */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Mark all read
                  </button>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'success' ? 'bg-green-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Spend Trend Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Spend Trend</h2>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Category Breakdown</h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Donut Chart Placeholder</span>
              </div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget Progress</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.budget) * 100;
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{budget.category}</h3>
                      <span className="text-sm text-gray-600">
                        ${budget.spent} / ${budget.budget}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${budget.color} transition-all duration-300`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{percentage.toFixed(0)}% used</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus size={24} className="text-blue-600 mb-2" />
                <span className="text-sm font-medium">Add Bill</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 size={24} className="text-green-600 mb-2" />
                <span className="text-sm font-medium">View Reports</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell size={24} className="text-yellow-600 mb-2" />
                <span className="text-sm font-medium">Set Budget</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Zap size={24} className="text-purple-600 mb-2" />
                <span className="text-sm font-medium">Connect Bank</span>
              </button>
            </div>
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

export default Dashboard;
