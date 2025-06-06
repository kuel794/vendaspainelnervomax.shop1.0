import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeLabel = 'vs. mês anterior',
  color = 'primary' 
}: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'warning':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
      case 'danger':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'info':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400';
    }
  };

  const getChangeColor = () => {
    if (!change) return '';
    return change >= 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
          
          {typeof change !== 'undefined' && (
            <div className={`flex items-center mt-2 text-sm ${getChangeColor()}`}>
              {change >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">{changeLabel}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;