import { Outlet } from 'react-router-dom';
import { Wallet, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: TrendingUp, text: 'See income vs. expense trends at a glance' },
  { icon: PieChart, text: 'Understand exactly where your money goes' },
  { icon: ShieldCheck, text: 'Your data is private and secured with JWT auth' },
];

/**
 * Two-column layout used for the Login and Register pages: a branded
 * panel on the left (hidden on small screens) and the auth form on the right.
 */
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-ink-900 p-10 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-income-500/20 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">Pocketwise</span>
        </div>

        <div className="relative">
          <h2 className="font-display text-3xl font-bold leading-tight">
            Every rupee, dollar, and dirham — accounted for.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-slate-300">
            A clear, simple way to track income and expenses and understand your monthly habits.
          </p>

          <div className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <h.icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-slate-200">{h.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">© {new Date().getFullYear()} Pocketwise</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold text-ink-900">Pocketwise</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
