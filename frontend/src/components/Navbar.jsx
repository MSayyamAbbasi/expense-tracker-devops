import { useState } from 'react';
import { Menu, LogOut, ChevronDown } from 'lucide-react';
import useAuth from '../hooks/useAuth';

/**
 * Top bar shown above the page content: page title, hamburger toggle
 * for mobile sidebar, and a user menu with logout.
 */
const Navbar = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = (user?.name || '?')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-3.5 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold text-ink-900">{title}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: user?.avatarColor || '#6366F1' }}
          >
            {initials}
          </div>
          <span className="hidden text-sm font-medium text-slate-700 sm:block">{user?.name}</span>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
              <div className="px-2.5 py-2 text-xs text-slate-400">Signed in as</div>
              <div className="mb-1.5 truncate px-2.5 text-sm font-medium text-slate-700">
                {user?.email}
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-expense-600 hover:bg-expense-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
