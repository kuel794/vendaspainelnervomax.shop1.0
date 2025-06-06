import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from '../types';

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ dateRange, onDateRangeChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(
    format(dateRange.startDate, 'yyyy-MM-dd')
  );
  const [localEndDate, setLocalEndDate] = useState(
    format(dateRange.endDate, 'yyyy-MM-dd')
  );

  useEffect(() => {
    setLocalStartDate(format(dateRange.startDate, 'yyyy-MM-dd'));
    setLocalEndDate(format(dateRange.endDate, 'yyyy-MM-dd'));
  }, [dateRange]);

  const handleApply = () => {
    onDateRangeChange({
      startDate: new Date(localStartDate),
      endDate: new Date(localEndDate),
    });
    setIsOpen(false);
  };

  const displayText = `${format(dateRange.startDate, 'dd/MM/yyyy')} - ${format(
    dateRange.endDate,
    'dd/MM/yyyy'
  )}`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span>{displayText}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
          <div className="space-y-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data inicial
              </label>
              <input
                id="start-date"
                type="date"
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data final
              </label>
              <input
                id="end-date"
                type="date"
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
                min={localStartDate}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;