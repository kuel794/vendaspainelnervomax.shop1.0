import { useState } from 'react';
import { getMonthsArray, getYearsArray } from '../utils/dateUtils';
import { ChevronDown } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const MonthSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: MonthSelectorProps) => {
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  
  const months = getMonthsArray(selectedYear);
  const years = getYearsArray();
  
  const currentMonthName = months.find(m => Number(m.value.split('-')[1]) === selectedMonth)?.label || '';
  
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
          className="flex items-center justify-between w-48 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span>{currentMonthName}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
        
        {isMonthDropdownOpen && (
          <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 text-base border border-gray-300 dark:border-gray-700 max-h-60 overflow-auto">
            {months.map((month) => (
              <button
                key={month.value}
                onClick={() => {
                  onMonthChange(Number(month.value.split('-')[1]));
                  setIsMonthDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  Number(month.value.split('-')[1]) === selectedMonth ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {month.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          className="flex items-center justify-between w-32 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span>{selectedYear}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
        
        {isYearDropdownOpen && (
          <div className="absolute z-10 mt-1 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 text-base border border-gray-300 dark:border-gray-700 max-h-60 overflow-auto">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  onYearChange(year);
                  setIsYearDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  year === selectedYear ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthSelector;