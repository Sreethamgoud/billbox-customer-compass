
import { useState } from "react";
import { Menu, X, Home, BarChart3, FileText, Bell, Zap, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMockData } from "../hooks/useMockData";
import OverviewCards from "../components/dashboard/OverviewCards";
import SpendTrendChart from "../components/dashboard/SpendTrendChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import RecentBillsTable from "../components/dashboard/RecentBillsTable";
import BudgetProgressSection from "../components/dashboard/BudgetProgressSection";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import QuickActionsSection from "../components/dashboard/QuickActionsSection";
import AIAssistant from "../components/AIAssistant";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const { data: mockData, error, isLoading } = useMockData();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Budgets & Alerts', href: '/budgets', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Profile & Settings', href: '/settings', icon: SettingsIcon },
  ];

  // Mock data fallbacks
  const bills = mockData?.bills || [];
  const budgets = mockData?.budgets || [];
  const alerts = mockData?.alerts || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading dashboard data</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your financial overview for this month.</p>
          </div>

          {/* Overview Cards */}
          <OverviewCards isLoading={isLoading} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SpendTrendChart 
              activeTimeframe={activeTimeframe} 
              onTimeframeChange={setActiveTimeframe} 
            />
            <CategoryBreakdownChart />
          </div>

          {/* Recent Bills and Budget Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RecentBillsTable bills={bills} isLoading={isLoading} />
            <BudgetProgressSection budgets={budgets} isLoading={isLoading} />
          </div>

          {/* Alerts and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AlertsPanel alerts={alerts} isLoading={isLoading} />
            <QuickActionsSection />
          </div>

          {/* AI Assistant Section */}
          <div id="ai-assistant" className="mb-8">
            <AIAssistant />
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-500 mt-16">
            <p>&copy; 2024 BillBox. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
