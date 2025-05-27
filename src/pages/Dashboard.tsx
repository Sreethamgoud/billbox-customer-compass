
import { useState } from "react";
import { RefreshCw, Plus, BarChart3, Bell, Zap, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import Table from "../components/Table";
import BudgetCard from "../components/BudgetCard";
import ButtonGroup from "../components/ButtonGroup";
import { useBills, useBudgets, useAlerts } from "../hooks/useMockData";

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const { data: bills, isLoading: billsLoading } = useBills();
  const { data: budgets, isLoading: budgetsLoading } = useBudgets();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  const overviewStats = [
    {
      title: "Total Balance",
      value: "$24,580.32",
      change: "+12.3%",
      trend: "positive",
      icon: TrendingUp
    },
    {
      title: "Monthly Spending",
      value: "$3,247.89",
      change: "-8.1%",
      trend: "positive",
      icon: TrendingDown
    },
    {
      title: "Bills Due",
      value: "5",
      change: "This week",
      trend: "neutral",
      icon: Bell
    },
    {
      title: "Savings Goal",
      value: "67%",
      change: "+5% this month",
      trend: "positive",
      icon: TrendingUp
    }
  ];

  const billColumns = [
    { key: 'name', label: 'Bill Name' },
    { key: 'amount', label: 'Amount', render: (value) => `$${value}` },
    { key: 'dueDate', label: 'Due Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'paid' ? 'bg-green-100 text-green-800' :
          status === 'due' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  const timeframeButtons = [
    { label: "Last 30 days" },
    { label: "Last 3 months" },
    { label: "Last 6 months" }
  ];

  const quickActionButtons = [
    { label: "Add Bill", icon: Plus },
    { label: "View Reports", icon: BarChart3 },
    { label: "Set Budget", icon: Bell },
    { label: "Connect Bank", icon: Zap }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            {overviewStats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Bills */}
            <div className="lg:col-span-2">
              <ChartCard 
                title="Recent Bills"
                actions={
                  <Link to="/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </Link>
                }
              >
                {billsLoading ? (
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Loading bills...</span>
                  </div>
                ) : (
                  <Table columns={billColumns} data={bills} sortable />
                )}
              </ChartCard>
            </div>

            {/* Alerts Panel */}
            <div>
              <ChartCard 
                title="Alerts"
                actions={
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Mark all read
                  </button>
                }
              >
                {alertsLoading ? (
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Loading alerts...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.slice(0, 5).map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <span className="text-lg">{getAlertIcon(alert.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ChartCard>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Spend Trend Chart */}
            <ChartCard
              title="Spend Trend"
              actions={
                <ButtonGroup
                  buttons={timeframeButtons}
                  activeIndex={activeTimeframe}
                  onButtonClick={setActiveTimeframe}
                  variant="pills"
                />
              }
            />

            {/* Category Breakdown */}
            <ChartCard title="Category Breakdown" />
          </div>

          {/* Budget Progress */}
          <ChartCard title="Budget Progress" className="mb-8">
            {budgetsLoading ? (
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Loading budgets...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {budgets.map((budget) => (
                  <BudgetCard key={budget.id} budget={budget} />
                ))}
              </div>
            )}
          </ChartCard>

          {/* Quick Actions */}
          <ChartCard title="Quick Actions">
            <ButtonGroup
              buttons={quickActionButtons}
              activeIndex={null}
              onButtonClick={() => {}}
              variant="pills"
            />
          </ChartCard>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
