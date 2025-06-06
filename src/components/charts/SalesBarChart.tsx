import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SalesBarChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  title?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const SalesBarChart = ({ data, title = 'Desempenho de Vendas' }: SalesBarChartProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid-color)" />
            <XAxis 
              dataKey="name"
              tick={{ fill: 'var(--text-color)' }}
            />
            <YAxis 
              tickFormatter={(value) => `R$${value}`}
              tick={{ fill: 'var(--text-color)' }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-color)',
              }}
            />
            <Legend />
            {data.map((entry, index) => (
              <Bar
                key={index}
                dataKey="value"
                name={entry.name}
                fill={entry.color}
                stackId="stack"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesBarChart;