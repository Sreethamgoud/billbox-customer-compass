
import { useState } from "react";
import { Menu, X, Home, BarChart3, FileText, Bell, Zap, Settings as SettingsIcon, User, Lock, CreditCard, Smartphone, LogOut, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: true,
    budgetAlerts: true,
    billReminders: true
  });

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Budgets & Alerts', href: '/budgets', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Zap },
    { name: 'Profile & Settings', href: '/settings', icon: SettingsIcon },
  ];

  const connectedAccounts = [
    { name: "Chase Checking", type: "Bank Account", status: "Connected", lastSync: "2 minutes ago" },
    { name: "Wells Fargo Savings", type: "Bank Account", status: "Connected", lastSync: "5 minutes ago" },
    { name: "Capital One Credit", type: "Credit Card", status: "Connected", lastSync: "1 hour ago" },
    { name: "PayPal", type: "Payment Service", status: "Error", lastSync: "Failed" }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
                const isActive = item.href === '/settings';
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
                const isActive = item.href === '/settings';
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account preferences, security settings, and connected services</p>
          </div>

          {/* Profile Summary Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Summary</h2>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                <p className="text-gray-600">john.doe@email.com</p>
                <p className="text-sm text-gray-500">Member since January 2024</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Account Details Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500">Account Details Form Placeholder</span>
            </div>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings Accordion */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={() => toggleSection('security')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="text-gray-600" size={20} />
                  <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transform transition-transform ${
                    expandedSection === 'security' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedSection === 'security' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Password & Authentication</h3>
                  <div className="space-y-3">
                    <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <span className="text-sm">Change Password</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                    <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <span className="text-sm">Enable Two-Factor Authentication</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Login Activity</h3>
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Recent Login Activity Placeholder</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                  <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('sms')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.sms ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Budget Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified when approaching budget limits</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('budgetAlerts')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.budgetAlerts ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.budgetAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Bill Reminders</h3>
                  <p className="text-sm text-gray-600">Reminders for upcoming bill payments</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('billReminders')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.billReminders ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.billReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription & Billing</h2>
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">BillBox Free</h3>
                  <p className="text-sm text-gray-600">Current plan</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Access to basic features including bill tracking, simple budgets, and email notifications.
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  Upgrade to Pro
                </button>
                <a href="#" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  View Billing History
                </a>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Accounts</h2>
            <div className="space-y-4">
              {connectedAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{account.name}</h3>
                      <p className="text-sm text-gray-600">{account.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        account.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {account.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{account.lastSync}</p>
                    </div>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      {account.status === 'Connected' ? 'Disconnect' : 'Reconnect'}
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <span className="text-gray-600 text-sm font-medium">+ Connect New Account</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-800">Export Account Data</h3>
                  <p className="text-sm text-red-600">Download a copy of all your financial data</p>
                </div>
                <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium">
                  Export Data
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-800">Delete Account</h3>
                  <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Support & Logout */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              Contact Support
            </a>
            <button className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
              <LogOut size={16} className="mr-2" />
              Sign Out
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

export default Settings;
