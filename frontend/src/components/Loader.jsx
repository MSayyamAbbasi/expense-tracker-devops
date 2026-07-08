/**
 * Full-area or inline loading spinner.
 */
const Loader = ({ fullScreen = false, label = 'Loading…' }) => {
  const content = (
    <div className="flex flex-col items-center gap-3 text-slate-400">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className="flex min-h-[60vh] w-full items-center justify-center">{content}</div>;
  }

  return <div className="flex w-full items-center justify-center py-10">{content}</div>;
};

export default Loader;
