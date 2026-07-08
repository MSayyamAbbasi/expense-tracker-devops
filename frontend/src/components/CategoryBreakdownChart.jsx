import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CATEGORY_META, formatCurrency } from '../utils/constants';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-ink-900">{entry.name}</p>
      <p className="text-xs text-slate-500">{formatCurrency(entry.value)}</p>
    </div>
  );
};

/**
 * Donut chart showing expense distribution across categories.
 * Falls back to an empty-state message when there's no expense data.
 */
const CategoryBreakdownChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center text-center text-slate-400">
        <p className="text-sm font-medium">No expenses yet</p>
        <p className="mt-1 text-xs">Add a transaction to see your category breakdown.</p>
      </div>
    );
  }

  const chartData = data.map((d) => ({ name: d.category, value: d.total }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_META[entry.name]?.color || '#94A3B8'}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, lineHeight: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdownChart;
