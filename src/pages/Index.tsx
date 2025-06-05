
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Upload, Bot, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BillBox</span>
          </div>
          <Link to="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Bill Management with{' '}
            <span className="text-blue-600">AI Categorization</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your bills, let AI extract and categorize them automatically. 
            Track expenses, manage budgets, and never miss a payment again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Upload className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Upload & Extract</h3>
              <p className="text-gray-600">
                Upload bill images or PDFs. Our OCR technology extracts text, amounts, and dates automatically.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Bot className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">AI Categorization</h3>
              <p className="text-gray-600">
                AI automatically categorizes your bills into utilities, groceries, entertainment, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Shield className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure. Only you can access your financial information.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white p-8 rounded-lg shadow-sm border mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose BillBox?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Automated Processing</h4>
                  <p className="text-gray-600">Upload bills and let AI handle the rest</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Budgeting</h4>
                  <p className="text-gray-600">Track spending and stay within budget limits</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Reminders</h4>
                  <p className="text-gray-600">Never miss a due date with smart alerts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Detailed Reports</h4>
                  <p className="text-gray-600">Insights into your spending patterns</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Take Control of Your Bills?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already managing their finances smarter.
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 BillBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
