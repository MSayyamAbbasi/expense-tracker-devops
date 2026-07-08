import { CheckCircle2, XCircle } from 'lucide-react';
import useToast from '../hooks/useToast';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
};

const STYLES = {
  success: 'border-income-500/20 bg-white text-ink-900',
  error: 'border-expense-500/20 bg-white text-ink-900',
};

const ICON_COLOR = {
  success: 'text-income-500',
  error: 'text-expense-500',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || CheckCircle2;
        return (
          <div
            key={toast.id}
            role="status"
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${STYLES[toast.type]}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${ICON_COLOR[toast.type]}`} />
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Dismiss
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
