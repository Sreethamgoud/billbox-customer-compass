
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthContext();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Bills', href: '/bills' },
    { name: 'Reports', href: '/reports' },
    { name: 'Budgets', href: '/budgets' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600" onClick={closeMenus}>
                BillBox
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenus}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-blue-50 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Bell size={20} />
              </button>
              
              {/* User menu */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setIsMenuOpen(false);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-500 flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <User size={20} />
                  <span className="hidden md:inline text-sm text-gray-700">
                    {user?.email}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setShowUserMenu(false);
                }}
                className="md:hidden p-2 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={closeMenus}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleSignOut();
                  closeMenus();
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 BillBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
