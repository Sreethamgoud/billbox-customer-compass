
import { useState } from "react";
import { Menu, X, Home, BarChart3, FileText, Bell, Zap, Settings, Plus, Edit, Trash2, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Budgets = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Budgets & Alerts', href: '/budgets', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Profile & Settings', href: '/settings', icon: Settings },
  ];

  const budgets = [
    {
      category: "Groceries",
      budget: 500,
      spent: 450,
      color: "bg-green-500",
      status: "on-track",
      daysLeft: 8
    },
    {
      category: "Entertainment",
      budget: 200,
      spent: 280,
      color: "bg-red-500",
      status: "over-budget",
      daysLeft: 8
    },
    {
      category: "Transportation",
      budget: 300,
      spent: 120,
      color: "bg-blue-500",
      status: "under-budget",
      daysLeft: 8
    },
    {
      category: "Dining Out",
      budget: 250,
      spent: 180,
      color: "bg-yellow-500",
      status: "on-track",
      daysLeft: 8
    },
    {
      category: "Utilities",
      budget: 200,
      spent: 175,
      color: "bg-purple-500",
      status: "on-track",
      daysLeft: 8
    },
    {
      category: "Shopping",
      budget: 400,
      spent: 320,
      color: "bg-pink-500",
      status: "on-track",
      daysLeft: 8
    }
  ];

  const alerts = [
    {
      type: "warning",
      message: "Entertainment budget exceeded by $80",
      time: "2 hours ago",
      action: "Adjust Budget"
    },
    {
      type: "success",
      message: "Groceries budget goal achieved with $50 to spare",
      time: "1 day ago",
      action: "View Details"
    },
    {
      type: "info",
      message: "Transportation spending is 60% below budget",
      time: "2 days ago",
      action: "Reallocate Funds"
    },
    {
      type: "warning",
      message: "Dining out spending approaching 90% of budget",
      time: "3 days ago",
      action: "Set Alert"
    }
  ];

  const getBudgetStatus = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return { status: "over-budget", color: "text-red-600", bg: "bg-red-50" };
    if (percentage > 80) return { status: "warning", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { status: "on-track", color: "text-green-600", bg: "bg-green-50" };
  };

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
                const isActive = item.href === '/budgets';
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
                const isActive = item.href === '/budgets';
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Budgets & Alerts</h1>
              <p className="text-gray-600">Manage your spending limits and stay on track with your financial goals</p>
            </div>
            <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center font-medium">
              <Plus size={20} className="mr-2" />
              Create New Budget
            </button>
          </div>

          {/* Active Budgets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.budget) * 100;
              const statusInfo = getBudgetStatus(budget.spent, budget.budget);
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                      <p className="text-sm text-gray-600">{budget.daysLeft} days left</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Spent</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${budget.spent} / ${budget.budget}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${budget.color} transition-all duration-300`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                        {percentage.toFixed(0)}% used
                      </span>
                      <span className="text-xs text-gray-600">
                        ${budget.budget - budget.spent} remaining
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center text-xs ${statusInfo.color}`}>
                    {statusInfo.status === "over-budget" && <AlertTriangle size={14} className="mr-1" />}
                    {statusInfo.status === "on-track" && <CheckCircle size={14} className="mr-1" />}
                    {statusInfo.status === "warning" && <Clock size={14} className="mr-1" />}
                    <span className="capitalize">{statusInfo.status.replace("-", " ")}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Alerts Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Mark all as read
                  </button>
                </div>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'success' ? 'bg-green-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' : 
                        alert.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{alert.time}</span>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            {alert.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Plus size={16} className="mr-2" />
                    Add New Budget
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Bell size={16} className="mr-2" />
                    Set Alert Threshold
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <BarChart3 size={16} className="mr-2" />
                    View Budget History
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Settings size={16} className="mr-2" />
                    Budget Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Budget History Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Budget Performance History</h2>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
                <option>Last 2 years</option>
              </select>
            </div>
            <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Budget History Chart Placeholder</span>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center sticky bottom-4">
            <h3 className="text-xl font-semibold mb-2">Unlock Advanced Budget Features</h3>
            <p className="mb-4 opacity-90">Get custom budget categories, smart alerts, and detailed analytics with BillBox Pro</p>
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

export default Budgets;
