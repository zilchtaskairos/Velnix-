import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle;
        let colorClass = 'border-emerald-500/40 bg-[#0d1f18]/90 text-emerald-300';
        let iconColor = 'text-emerald-400';

        if (toast.type === 'info') {
          Icon = Info;
          colorClass = 'border-cyan-500/40 bg-[#0c1a24]/90 text-cyan-300';
          iconColor = 'text-cyan-400';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClass = 'border-amber-500/40 bg-[#221708]/90 text-amber-300';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'border-rose-500/40 bg-[#260f15]/90 text-rose-300';
          iconColor = 'text-rose-400';
        } else {
          Icon = CheckCircle;
          colorClass = 'border-purple-500/40 bg-[#160f29]/90 text-purple-200';
          iconColor = 'text-purple-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-xl shadow-xl shadow-black/50 animate-slide-up transition-all ${colorClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="min-w-0 flex-1 text-xs">
              <p className="font-bold text-white text-sm">{toast.title}</p>
              {toast.description && (
                <p className="text-slate-300 mt-0.5 leading-snug line-clamp-2">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
