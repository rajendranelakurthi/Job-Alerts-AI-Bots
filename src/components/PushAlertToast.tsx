import React, { useEffect } from 'react';
import { Bell, Smartphone, X, ExternalLink } from 'lucide-react';

interface PushAlertToastProps {
  title: string;
  body: string;
  jobCount: number;
  onClose: () => void;
  onViewJobs: () => void;
}

export const PushAlertToast: React.FC<PushAlertToastProps> = ({
  title,
  body,
  jobCount,
  onClose,
  onViewJobs,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-bounce-short">
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-sky-500/30">
            <Bell className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center">
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile Push Alert • 8:00 AM
              </span>
              <span className="text-[10px] text-slate-400">Now</span>
            </div>

            <h4 className="text-xs font-bold text-white mt-1 leading-snug">
              {title}
            </h4>

            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
              {body}
            </p>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-emerald-400 font-semibold text-[11px]">
                {jobCount} Match Your Criteria
              </span>
              <button
                onClick={() => {
                  onViewJobs();
                  onClose();
                }}
                className="text-sky-400 font-bold hover:underline flex items-center text-[11px]"
              >
                View Jobs <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
