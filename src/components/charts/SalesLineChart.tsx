import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailySalesData } from '../../types';

interface SalesLineChartProps {
  data: {
    day: number;
    sales: DailySalesData;
  }[];
  title?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const SalesLineChart = ({ data, title = 'Vendas Diárias' }: SalesLineChartProps) => {
  const chartData = data.map((item) => ({
    day: item.day,
    vendas: item.sales.revenue,
    lucro: item.sales.revenue - item.sales.investment,
    investimento: item.sales.investment,
    vendasAgendadas: item.sales.scheduledRevenue || 0,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid-color)" />
            <XAxis 
              dataKey="day"
              tick={{ fill: 'var(--text-color)' }}
            />
            <YAxis 
              tickFormatter={(value) => `R$${value}`}
              tick={{ fill: 'var(--text-color)' }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-color)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="vendas"
              stroke="#8b5cf6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Vendas Realizadas"
            />
            <Line
              type="monotone"
              dataKey="vendasAgendadas"
              stroke="#0ea5e9"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Vendas Agendadas"
            />
            <Line
              type="monotone"
              dataKey="lucro"
              stroke="#10b981"
              strokeWidth={2}
              name="Lucro"
            />
            <Line
              type="monotone"
              dataKey="investimento"
              stroke="#f97316"
              strokeWidth={2}
              name="Investimento"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesLineChart;