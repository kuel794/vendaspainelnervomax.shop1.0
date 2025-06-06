import { MonthData } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Clock, 
  RefreshCw, 
  Users,
  Target
} from 'lucide-react';

interface MonthlySummaryProps {
  monthData: MonthData;
}

const MonthlySummary = ({ monthData }: MonthlySummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateProfitMargin = () => {
    if (monthData.totalRevenue === 0) return '0%';
    return `${((monthData.netProfit / monthData.totalRevenue) * 100).toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Receita Total"
        value={formatCurrency(monthData.totalRevenue)}
        icon={<DollarSign className="h-6 w-6" />}
        color="primary"
      />
      <SummaryCard
        title="Lucro Líquido"
        value={formatCurrency(monthData.netProfit)}
        icon={<TrendingUp className="h-6 w-6" />}
        color="success"
      />
      <SummaryCard
        title="Vendas Agendadas"
        value={formatCurrency(monthData.totalScheduledRevenue || 0)}
        icon={<Target className="h-6 w-6" />}
        color="info"
        subtitle="Lucros Projetados"
      />
      <SummaryCard
        title="Lucro Projetado"
        value={formatCurrency(monthData.projectedProfit || 0)}
        icon={<Clock className="h-6 w-6" />}
        color="warning"
        subtitle="Das vendas agendadas"
      />
      <SummaryCard
        title="Investimento"
        value={formatCurrency(monthData.investment)}
        icon={<CreditCard className="h-6 w-6" />}
        color="warning"
      />
      <SummaryCard
        title="Margem de Lucro"
        value={calculateProfitMargin()}
        icon={<TrendingUp className="h-6 w-6" />}
        color="info"
      />
      <SummaryCard
        title="Vendas Pagas"
        value={monthData.paidSales.toString()}
        icon={<CreditCard className="h-6 w-6" />}
        color="success"
      />
      <SummaryCard
        title="Remarketing"
        value={monthData.remarketing.toString()}
        icon={<RefreshCw className="h-6 w-6" />}
        color="warning"
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'info';
  subtitle?: string;
}

const SummaryCard = ({ title, value, icon, color, subtitle }: SummaryCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400';
      case 'success':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'warning':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
      case 'info':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
          )}
          <h3 className="text-xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;