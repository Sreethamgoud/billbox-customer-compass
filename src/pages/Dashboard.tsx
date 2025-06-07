
import { useState, useEffect } from "react";
import { useSupabaseData } from "../hooks/useSupabaseData";
import OverviewCards from "../components/dashboard/OverviewCards";
import SpendTrendChart from "../components/dashboard/SpendTrendChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import RecentBillsTable from "../components/dashboard/RecentBillsTable";
import BudgetProgressSection from "../components/dashboard/BudgetProgressSection";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import QuickActionsSection from "../components/dashboard/QuickActionsSection";
import AIAssistant from "../components/AIAssistant";

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: dashboardData, error, isLoading, refetch } = useSupabaseData();

  // Extract data from the response with proper typing
  const bills = dashboardData?.bills || [];
  const budgets = dashboardData?.budgets || [];
  const alerts = dashboardData?.alerts || [];

  // Refresh data when component mounts or when returning to this page
  useEffect(() => {
    refetch();
  }, [refetch, refreshKey]);

  // Add event listener for page visibility changes to refresh data
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refetch();
        setRefreshKey(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refetch]);

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
            onClick={() => {
              refetch();
              setRefreshKey(prev => prev + 1);
            }} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview for this month.</p>
        </div>

        {/* Overview Cards */}
        <OverviewCards isLoading={isLoading} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <SpendTrendChart 
            activeTimeframe={activeTimeframe} 
            onTimeframeChange={setActiveTimeframe} 
          />
          <CategoryBreakdownChart />
        </div>

        {/* Recent Bills and Budget Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <RecentBillsTable bills={bills} isLoading={isLoading} />
          <BudgetProgressSection budgets={budgets} isLoading={isLoading} />
        </div>

        {/* Alerts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <AlertsPanel alerts={alerts} isLoading={isLoading} />
          <QuickActionsSection />
        </div>

        {/* AI Assistant Section */}
        <div id="ai-assistant" className="mb-6 sm:mb-8">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
