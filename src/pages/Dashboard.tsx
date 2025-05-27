
import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useBills, useBudgets, useAlerts } from "../hooks/useMockData";
import OverviewCards from "../components/dashboard/OverviewCards";
import RecentBillsTable from "../components/dashboard/RecentBillsTable";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import SpendTrendChart from "../components/dashboard/SpendTrendChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import BudgetProgressSection from "../components/dashboard/BudgetProgressSection";
import QuickActionsSection from "../components/dashboard/QuickActionsSection";

const Dashboard: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const { data: bills, isLoading: billsLoading } = useBills();
  const { data: budgets, isLoading: budgetsLoading } = useBudgets();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <OverviewCards />

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Bills */}
            <div className="lg:col-span-2">
              <RecentBillsTable bills={bills} isLoading={billsLoading} />
            </div>

            {/* Alerts Panel */}
            <div>
              <AlertsPanel alerts={alerts} isLoading={alertsLoading} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Spend Trend Chart */}
            <SpendTrendChart
              activeTimeframe={activeTimeframe}
              onTimeframeChange={setActiveTimeframe}
            />

            {/* Category Breakdown */}
            <CategoryBreakdownChart />
          </div>

          {/* Budget Progress */}
          <BudgetProgressSection budgets={budgets} isLoading={budgetsLoading} />

          {/* Quick Actions */}
          <QuickActionsSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
