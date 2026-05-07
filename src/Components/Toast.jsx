const toastStyles = {
  success: 'bg-amber-100 border border-amber-300 text-amber-900',
  error: 'bg-red-100 border border-red-300 text-red-700',
  info: 'bg-slate-100 border border-slate-300 text-slate-900',
};

const Toast = ({ visible, message, type = 'info' }) => {
  if (!visible || !message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      <div className={`rounded-3xl px-5 py-4 shadow-2xl backdrop-blur-sm ${toastStyles[type]}`}>
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
