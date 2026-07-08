export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Salary',
  'Entertainment',
  'Health',
  'Education',
  'Other',
];

// Distinct color + emoji per category, used consistently across
// the transaction table, charts, and category badges.
export const CATEGORY_META = {
  Food: { color: '#F59E0B', icon: '🍔' },
  Transport: { color: '#3B82F6', icon: '🚗' },
  Shopping: { color: '#EC4899', icon: '🛍️' },
  Bills: { color: '#8B5CF6', icon: '🧾' },
  Salary: { color: '#10B981', icon: '💼' },
  Entertainment: { color: '#F43F5E', icon: '🎬' },
  Health: { color: '#14B8A6', icon: '🩺' },
  Education: { color: '#6366F1', icon: '🎓' },
  Other: { color: '#64748B', icon: '📦' },
};

export const formatCurrency = (amount, currency = 'USD') => {
  const value = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
