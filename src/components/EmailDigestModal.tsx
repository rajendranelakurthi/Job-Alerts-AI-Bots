import React, { useState } from 'react';
import { Mail, Send, X, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { JobListing } from '../types';

interface EmailDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobListing[];
  recipientEmail: string;
  onConfirmSend: () => void;
}

export const EmailDigestModal: React.FC<EmailDigestModalProps> = ({
  isOpen,
  onClose,
  jobs,
  recipientEmail,
  onConfirmSend,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const topJobs = jobs.slice(0, 5);
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onConfirmSend();
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 1600);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-base font-bold">8:00 AM Morning Executive Digest Preview</h3>
              <p className="text-xs text-slate-400">Delivered daily to {recipientEmail}</p>
            </div>
          </div>
          <button
            id="close-email-digest-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Content Container (Simulated Inbox Render) */}
        <div className="p-6 overflow-y-auto space-y-4 bg-slate-50 flex-1">
          {/* Email Envelope Meta */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <div><strong className="text-slate-700">From:</strong> 8AM DevOps Radar &lt;alerts@devopsradar.ai&gt;</div>
            <div><strong className="text-slate-700">To:</strong> {recipientEmail}</div>
            <div><strong className="text-slate-700">Subject:</strong> [8:00 AM Alert] {topJobs.length} Senior DevOps, SRE &amp; Azure Roles (Remote NA)</div>
            <div><strong className="text-slate-700">Date:</strong> {todayFormatted}, 8:00:00 AM EST</div>
          </div>

          {/* Email Body Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="bg-slate-950 text-white p-4 rounded-lg mb-4">
              <div className="text-[10px] uppercase tracking-wider text-sky-400 font-bold">Daily 8:00 AM Morning Radar</div>
              <h2 className="text-lg font-bold mt-1">Your Daily DevOps &amp; SRE Alert</h2>
              <p className="text-xs text-slate-300">Screened for Senior/Lead candidates &bull; Remote North America &bull; Visa Sponsorship Friendly</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-xs text-emerald-800 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
              <span>
                <strong>0 Citizen-Only Roles:</strong> Filtered out all US-Citizen-only, GC-only, or No-Sponsorship postings to protect your time.
              </span>
            </div>

            <div className="space-y-4">
              {topJobs.map((job, idx) => (
                <div key={job.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-slate-900">{idx + 1}. {job.title}</span>
                    <span className="text-xs font-bold text-emerald-700">{job.salaryFormatted}</span>
                  </div>
                  <div className="text-xs font-semibold text-sky-700 mt-0.5">
                    {job.company} &bull; <span className="font-normal text-slate-500">{job.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {job.descriptionSnippet}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-200 text-xs">
                    <span className="text-emerald-700 font-medium">✓ {job.sponsorshipLabel}</span>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold hover:underline flex items-center"
                    >
                      Apply Now &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-slate-400 mt-6 pt-4 border-t border-slate-100">
              DevOps &amp; SRE Morning Radar &bull; Automated Google Search Grounding &bull; 8:00 AM Dispatch
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Close
          </button>

          <button
            id="dispatch-digest-now-btn"
            onClick={handleSend}
            disabled={isSending || sentSuccess}
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs disabled:opacity-50"
          >
            {sentSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-white" />
                Dispatched to {recipientEmail}!
              </>
            ) : isSending ? (
              'Dispatching...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-1.5" />
                Send 8:00 AM Digest Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
