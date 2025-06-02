
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">BillBox</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Take Control of Your <span className="text-blue-600">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            BillBox helps you track expenses, manage budgets, and gain insights into your spending habits with powerful analytics and AI-driven recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Start Free Trial <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/dashboard"
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Demo
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Smart Analytics</h3>
              <p className="text-gray-600">
                Get detailed insights into your spending patterns with interactive charts and reports.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is encrypted and protected with bank-level security measures.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI-Powered</h3>
              <p className="text-gray-600">
                Get personalized recommendations and automated insights to optimize your finances.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
