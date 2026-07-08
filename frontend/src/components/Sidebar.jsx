import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, UserCircle, Wallet, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

/**
 * Left navigation sidebar. On mobile it renders as a slide-over panel
 * controlled by `isOpen`/`onClose`; on desktop it's always visible.
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white shadow-sm'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  const content = (
    <div className="flex h-full flex-col bg-ink-900 px-4 py-6">
      <div className="mb-8 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold text-white">Pocketwise</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className={navLinkClasses} onClick={onClose}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-xl bg-white/5 p-3.5 text-xs text-slate-400">
        Track every dollar. Understand every trend.
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 md:block">{content}</aside>

      {/* Mobile slide-over */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={onClose} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-64 shadow-2xl">{content}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
