import { useState, useEffect, useContext } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ShoppingBag, 
  Users, 
  RefreshCw, 
  Calendar,
  Target
} from 'lucide-react';
import StatCard from '../components/StatCard';
import MonthSelector from '../components/MonthSelector';
import DateRangePicker from '../components/DateRangePicker';
import SalesLineChart from '../components/charts/SalesLineChart';
import SalesBarChart from '../components/charts/SalesBarChart';
import SalesPieChart from '../components/charts/SalesPieChart';
import SalesTable from '../components/SalesTable';
import MonthlySummary from '../components/MonthlySummary';
import GoogleSheetsStatus from '../components/GoogleSheetsStatus';
import { AuthContext } from '@/contexts/AuthContext';
import { getMonthData, saveMonthData, calculateMonthSummary } from '../utils/storageUtils';
import { MonthData, DailySalesData, DateRange } from '../types';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
  });

  useEffect(() => {
    if (user?.email) {
      const data = getMonthData(user.email, selectedMonth);
      setMonthData(data);
    }
  }, [user, selectedMonth]);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  const handleUpdateDailySales = async (day: number, data: DailySalesData) => {
    if (!user?.email || !monthData) return;

    const updatedMonthData = {
      ...monthData,
      dailySales: {
        ...monthData.dailySales,
        [day]: data,
      },
    };

    const calculatedData = calculateMonthSummary(updatedMonthData);
    setMonthData(calculatedData);
    saveMonthData(user.email, selectedMonth, calculatedData);
  };

  if (!monthData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const dailySalesChartData = Object.entries(monthData.dailySales).map(([day, data]) => ({
    day: Number(day),
    sales: data,
  }));

  const salesDistributionData = [
    { name: 'Vendas Pagas', value: monthData.paidSales, color: '#10b981' },
    { name: 'Vendas Agendadas', value: monthData.scheduledSales, color: '#0ea5e9' },
    { name: 'Remarketing', value: monthData.remarketing, color: '#f97316' },
    { name: 'Primeiro Contato', value: monthData.firstContact, color: '#8b5cf6' },
  ].filter(item => item.value > 0);

  const revenueBreakdownData = [
    { name: 'Receita Realizada', value: monthData.totalRevenue, color: '#8b5cf6' },
    { name: 'Vendas Agendadas', value: monthData.totalScheduledRevenue || 0, color: '#0ea5e9' },
    { name: 'Lucro Líquido', value: monthData.netProfit, color: '#10b981' },
    { name: 'Investimento', value: monthData.investment, color: '#f97316' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard NERVOMAX</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe suas vendas e desempenho em tempo real
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
      </div>

      <GoogleSheetsStatus />

      <MonthlySummary monthData={monthData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesLineChart
          data={dailySalesChartData}
          title="Vendas Diárias e Projeções"
        />
        <SalesBarChart
          data={revenueBreakdownData}
          title="Distribuição de Receita"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesPieChart
          data={salesDistributionData}
          title="Tipos de Vendas"
        />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Configurações do Mês
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Porcentagem de Impostos (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={monthData.taxPercentage}
                onChange={async (e) => {
                  if (!user?.email) return;
                  const taxPercentage = parseFloat(e.target.value) || 0;
                  const updatedData = {
                    ...monthData,
                    taxPercentage,
                  };
                  const calculatedData = calculateMonthSummary(updatedData);
                  setMonthData(calculatedData);
                  saveMonthData(user.email, selectedMonth, calculatedData);
                }}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dias Ativos no Mês
              </label>
              <input
                type="number"
                min="0"
                max="31"
                value={monthData.daysActive}
                onChange={(e) => {
                  if (!user?.email) return;
                  const daysActive = parseInt(e.target.value) || 0;
                  const updatedData = {
                    ...monthData,
                    daysActive,
                  };
                  setMonthData(updatedData);
                  saveMonthData(user.email, selectedMonth, updatedData);
                }}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Dados Diários
        </h2>
        <SalesTable
          monthData={monthData}
          onUpdateDailySales={handleUpdateDailySales}
        />
      </div>
    </div>
  );
};

export default Dashboard;
