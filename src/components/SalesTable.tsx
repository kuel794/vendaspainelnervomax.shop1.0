import { useState, useEffect } from 'react';
import { MonthData, DailySalesData } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit2, Save, X } from 'lucide-react';

interface SalesTableProps {
  monthData: MonthData;
  onUpdateDailySales: (day: number, data: DailySalesData) => void;
}

const SalesTable = ({ monthData, onUpdateDailySales }: SalesTableProps) => {
  const [editDay, setEditDay] = useState<number | null>(null);
  const [editData, setEditData] = useState<DailySalesData | null>(null);

  const startEditing = (day: number) => {
    setEditDay(day);
    setEditData({ ...monthData.dailySales[day] });
  };

  const cancelEditing = () => {
    setEditDay(null);
    setEditData(null);
  };

  const saveChanges = () => {
    if (editDay !== null && editData !== null) {
      onUpdateDailySales(editDay, editData);
      setEditDay(null);
      setEditData(null);
    }
  };

  const handleInputChange = (field: keyof DailySalesData, value: string) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: parseFloat(value) || 0,
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getDayName = (day: number) => {
    const date = new Date(monthData.year, monthData.month - 1, day);
    return format(date, 'EEE', { locale: ptBR });
  };

  const days = Object.keys(monthData.dailySales)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Vendas Realizadas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Investimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Vendas Agendadas (R$)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Vendas Pagas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Remarketing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Primeiro Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {days.map((day) => (
              <tr key={day} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {day} ({getDayName(day)})
                </td>
                {editDay === day ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editData?.revenue || 0}
                        onChange={(e) => handleInputChange('revenue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="R$ 0,00"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editData?.investment || 0}
                        onChange={(e) => handleInputChange('investment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="R$ 0,00"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editData?.scheduledRevenue || 0}
                        onChange={(e) => handleInputChange('scheduledRevenue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="R$ 0,00"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        value={editData?.paidSales || 0}
                        onChange={(e) => handleInputChange('paidSales', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        value={editData?.remarketing || 0}
                        onChange={(e) => handleInputChange('remarketing', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="number"
                        min="0"
                        value={editData?.firstContact || 0}
                        onChange={(e) => handleInputChange('firstContact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={saveChanges}
                          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(monthData.dailySales[day].revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(monthData.dailySales[day].investment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                      {formatCurrency(monthData.dailySales[day].scheduledRevenue || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {monthData.dailySales[day].paidSales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {monthData.dailySales[day].remarketing}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {monthData.dailySales[day].firstContact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => startEditing(day)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;