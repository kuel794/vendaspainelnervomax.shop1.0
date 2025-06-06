import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Bell, User, LogOut, Calendar, Search } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <input
            type="search"
            placeholder="Pesquisar..."
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.email}
            </span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;