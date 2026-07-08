import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="font-display text-4xl font-bold text-ink-900">404</h1>
      <p className="mt-2 text-sm text-slate-500">
        This page doesn&apos;t exist, or you don&apos;t have access to it.
      </p>
      <Link to="/dashboard" className="btn-primary mt-6">
        Back to dashboard
      </Link>
    </div>
  );
};

export default NotFound;
