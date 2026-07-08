const TONE_STYLES = {
  income: {
    icon: 'bg-income-500/10 text-income-600',
    accent: 'text-income-600',
  },
  expense: {
    icon: 'bg-expense-500/10 text-expense-600',
    accent: 'text-expense-600',
  },
  balance: {
    icon: 'bg-brand-500/10 text-brand-600',
    accent: 'text-brand-600',
  },
  neutral: {
    icon: 'bg-slate-500/10 text-slate-600',
    accent: 'text-slate-700',
  },
};

/**
 * Displays a single dashboard metric (e.g. Total Income) with an icon,
 * a large formatted value, and an optional trend/subtitle line.
 */
const StatsCard = ({ label, value, icon: Icon, tone = 'neutral', subtitle }) => {
  const styles = TONE_STYLES[tone] || TONE_STYLES.neutral;

  return (
    <div className="card flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className={`mt-2 text-2xl font-bold font-display ${styles.accent}`}>{value}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
