
import { useState } from "react";
import { Mail, Smartphone, Building2, ChevronDown, CheckCircle, AlertCircle, ExternalLink, HelpCircle, FileText } from "lucide-react";

const Integrations = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const integrations = [
    {
      id: 1,
      name: "Email Notifications",
      description: "Get bill reminders and alerts via email",
      icon: Mail,
      status: "connected",
      lastSync: "2 minutes ago",
      details: "Receive notifications for upcoming bills, budget alerts, and monthly summaries directly in your inbox.",
      features: ["Bill reminders", "Budget alerts", "Monthly summaries", "Custom schedules"],
      setupSteps: ["Enter email address", "Verify email", "Choose notification preferences", "Test notifications"]
    },
    {
      id: 2,
      name: "SMS Alerts",
      description: "Instant text notifications for urgent financial alerts",
      icon: Smartphone,
      status: "disconnected",
      lastSync: "Never",
      details: "Get instant SMS notifications for urgent financial events like large transactions or budget overruns.",
      features: ["Instant alerts", "Large transaction notifications", "Budget breach alerts", "Emergency notifications"],
      setupSteps: ["Enter phone number", "Verify with SMS code", "Set alert preferences", "Test SMS delivery"]
    },
    {
      id: 3,
      name: "Bank Feeds",
      description: "Automatically sync transactions from your bank accounts",
      icon: Building2,
      status: "connected",
      lastSync: "15 minutes ago",
      details: "Securely connect your bank accounts to automatically import transactions and keep your financial data up to date.",
      features: ["Real-time transaction sync", "Multiple account support", "Automatic categorization", "Secure encryption"],
      setupSteps: ["Select your bank", "Enter credentials", "Verify accounts", "Enable auto-sync"]
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case "connected":
        return { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle, text: "Connected" };
      case "disconnected":
        return { color: "text-gray-600", bg: "bg-gray-100", icon: AlertCircle, text: "Not Connected" };
      case "error":
        return { color: "text-red-600", bg: "bg-red-100", icon: AlertCircle, text: "Connection Error" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", icon: AlertCircle, text: "Unknown" };
    }
  };

  const togglePanel = (id) => {
    setExpandedPanel(expandedPanel === id ? null : id);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Integrations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect BillBox with your favorite services to automate your financial management and stay informed about your spending.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="space-y-6 mb-8">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const statusInfo = getStatusInfo(integration.status);
            const StatusIcon = statusInfo.icon;
            const isExpanded = expandedPanel === integration.id;

            return (
              <div key={integration.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon size={16} className={statusInfo.color} />
                        <span className={`text-sm px-2 py-1 rounded-full ${statusInfo.bg} ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                      {integration.status === "connected" ? (
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                          Disconnect
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                          Connect
                        </button>
                      )}
                      <button
                        onClick={() => togglePanel(integration.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {integration.status === "connected" && (
                    <div className="mt-4 text-sm text-gray-600">
                      Last sync: {integration.lastSync}
                    </div>
                  )}
                </div>

                {/* Expandable Detail Panel */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">About this integration</h4>
                        <p className="text-sm text-gray-600 mb-4">{integration.details}</p>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {integration.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle size={14} className="text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Setup steps</h4>
                        <ol className="text-sm text-gray-600 space-y-2">
                          {integration.setupSteps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 font-semibold">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {integration.status === "connected" && (
                      <div className="mt-6 p-4 bg-white rounded-lg border">
                        <h5 className="font-medium text-gray-900 mb-2">Integration Health</h5>
                        <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Health Sparkline Placeholder</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support & Documentation */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="text-blue-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get assistance with setting up your integrations or troubleshooting connection issues.
            </p>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                Integration Setup Guide
              </a>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                Troubleshooting FAQ
              </a>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                Contact Support
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">API Documentation</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Build custom integrations with our comprehensive API documentation and developer resources.
            </p>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                API Reference
              </a>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                Developer Guide
              </a>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <ExternalLink size={14} className="mr-2" />
                Code Examples
              </a>
            </div>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center sticky bottom-4">
          <h3 className="text-xl font-semibold mb-2">Unlock Premium Integrations</h3>
          <p className="mb-4 opacity-90">Connect with advanced banking APIs, investment accounts, and custom webhooks with BillBox Pro</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
