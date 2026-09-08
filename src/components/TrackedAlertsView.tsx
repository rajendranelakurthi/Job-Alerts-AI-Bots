import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sliders, 
  Send, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  DollarSign,
  AlertTriangle,
  History
} from 'lucide-react';
import { TrackedAlertRule, NotificationLog } from '../types';

interface TrackedAlertsViewProps {
  rules: TrackedAlertRule[];
  setRules: React.Dispatch<React.SetStateAction<TrackedAlertRule[]>>;
  logs: NotificationLog[];
  onTriggerMorningRun: () => void;
  onOpenEmailPreview: () => void;
  pushStatus: 'granted' | 'denied' | 'default' | 'unsupported';
  onRequestPushPermission: () => void;
  recipientEmail: string;
}

export const TrackedAlertsView: React.FC<TrackedAlertsViewProps> = ({
  rules,
  setRules,
  logs,
  onTriggerMorningRun,
  onOpenEmailPreview,
  pushStatus,
  onRequestPushPermission,
  recipientEmail,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMinSalary, setNewMinSalary] = useState(160000);
  const [newRemoteOnly, setNewRemoteOnly] = useState(true);
  const [newExcludeEntry, setNewExcludeEntry] = useState(true);
  const [newSkipCitizen, setNewSkipCitizen] = useState(true);
  const [newPushEnabled, setNewPushEnabled] = useState(true);
  const [newEmailEnabled, setNewEmailEnabled] = useState(true);

  const toggleRuleActive = (id: string) => {
    setRules(prev =>
      prev.map(r => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRule: TrackedAlertRule = {
      id: `alert-${Date.now()}`,
      title: newTitle.trim(),
      frequency: 'Daily at 8:00 AM',
      scheduledTime: '08:00',
      targetRoles: [
        'DevOps engineer',
        'sr devops engineer',
        'lead devops engineer',
        'azure devops engineer',
        'site reliability engineer',
        'sr SRE',
        'platform engineer',
      ],
      remoteOnly: newRemoteOnly,
      excludeEntryLevel: newExcludeEntry,
      skipCitizenGcOnly: newSkipCitizen,
      minSalary: newMinSalary,
      pushEnabled: newPushEnabled,
      emailEnabled: newEmailEnabled,
      recipientEmail,
      isActive: true,
      lastRun: 'Scheduled for 8:00 AM',
      matchedCount: 7,
      nextScheduled: 'Tomorrow at 8:00 AM',
    };

    setRules(prev => [newRule, ...prev]);
    setNewTitle('');
    setShowAddModal(false);
  };

  const activeCount = rules.filter(r => r.isActive).length;

  return (
    <div className="space-y-6">
      {/* 8:00 AM Delivery Command Center */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Automated Cadence • 8:00 AM Daily</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Morning Alert Delivery Center
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Daily job monitor queries North America postings for DevOps, Azure DevOps, SRE, and Platform Engineering roles every morning at 8:00 AM, screening out entry-level roles and citizen-only restrictions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dispatch-test-alert-btn"
              onClick={onTriggerMorningRun}
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4 mr-2 text-emerald-100" />
              Dispatch 8:00 AM Alert Now
            </button>

            <button
              id="preview-digest-modal-btn"
              onClick={onOpenEmailPreview}
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Mail className="w-4 h-4 mr-2 text-sky-400" />
              Preview Morning Digest
            </button>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {/* Mobile Push Channel */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center">
                  <Smartphone className="w-4 h-4 mr-1 text-sky-400" />
                  Mobile Push Alerts
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  pushStatus === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {pushStatus === 'granted' ? 'Active & Ready' : 'Permission Required'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Pushes directly to your mobile device at 8:00 AM with instant notification badges and direct apply links.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">Web Push Standard</span>
              <button
                id="request-push-status-btn"
                onClick={onRequestPushPermission}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline"
              >
                {pushStatus === 'granted' ? 'Send Test Push' : 'Enable Mobile Push'}
              </button>
            </div>
          </div>

          {/* Email Digest Channel */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-emerald-400" />
                  Daily Email Summary
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Delivered 8:00 AM
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Structured HTML digest containing salary breakdown, visa eligibility, and tech stacks sent every morning.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-400 truncate max-w-[170px]" title={recipientEmail}>
                {recipientEmail}
              </span>
              <button
                id="test-email-digest-btn"
                onClick={onOpenEmailPreview}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                View Format
              </button>
            </div>
          </div>

          {/* Screening Filters Status */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-purple-400" />
                  Automated Screening
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Active
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-300 mt-2">
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  <span>Remote North America filtered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  <span>Exclude entry-level (Sr/Lead only)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  <span>Skip Citizen/GC-only (Sponsorship ok)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
              Matches {activeCount} active alert triggers
            </div>
          </div>
        </div>
      </div>

      {/* Tracked Alert Rules List Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-sky-600" />
            Tracked Job Alert Rules ({rules.length})
          </h3>
          <p className="text-xs text-slate-500">
            Rules evaluated every morning at 8:00 AM. Inactive rules will not dispatch notifications.
          </p>
        </div>

        <button
          id="add-new-alert-rule-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs active:scale-95"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Alert Rule
        </button>
      </div>

      {/* Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            id={`alert-rule-card-${rule.id}`}
            className={`rounded-xl border p-5 transition-all ${
              rule.isActive
                ? 'bg-white border-slate-200/90 shadow-xs'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {rule.frequency}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Matched: <strong className="text-slate-800">{rule.matchedCount} roles</strong>
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {rule.title}
                </h4>
              </div>

              {/* Active Toggle Switch */}
              <button
                id={`toggle-rule-${rule.id}`}
                onClick={() => toggleRuleActive(rule.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  rule.isActive ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                title={rule.isActive ? 'Rule is active' : 'Rule is paused'}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    rule.isActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Criteria Badges */}
            <div className="flex flex-wrap gap-1.5 my-3 text-xs">
              {rule.remoteOnly && (
                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium border border-purple-200">
                  Remote Only
                </span>
              )}
              {rule.excludeEntryLevel && (
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium border border-indigo-200">
                  Senior+ Only
                </span>
              )}
              {rule.skipCitizenGcOnly && (
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  Skip Citizen/GC Only
                </span>
              )}
              {rule.minSalary > 0 && (
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  ${(rule.minSalary / 1000).toFixed(0)}k+ USD
                </span>
              )}
            </div>

            {/* Target Roles */}
            <div className="text-xs text-slate-500 mb-3 line-clamp-1">
              <strong>Roles:</strong> {rule.targetRoles.slice(0, 4).join(', ')}...
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                {rule.pushEnabled && (
                  <span className="flex items-center text-slate-600" title="Push alert enabled">
                    <Smartphone className="w-3.5 h-3.5 mr-1 text-sky-600" /> Push
                  </span>
                )}
                {rule.emailEnabled && (
                  <span className="flex items-center text-slate-600" title="Email summary enabled">
                    <Mail className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Email
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  id={`delete-rule-${rule.id}`}
                  onClick={() => deleteRule(rule.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete alert rule"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent 8:00 AM Dispatch Audit Log */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-slate-600" />
            <h3 className="text-base font-bold text-slate-900">
              Recent 8:00 AM Notification Deliveries
            </h3>
          </div>
          <span className="text-xs text-slate-500">Live Delivery Log</span>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.map(log => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  log.type === 'push' ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {log.type === 'push' ? <Smartphone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{log.title}</span>
                    <span className="font-normal text-slate-400">• {log.timestamp}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">{log.summary}</div>
                  <div className="text-slate-400 mt-0.5">Recipient: {log.recipient}</div>
                </div>
              </div>

              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Delivered
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Create New 8:00 AM Alert Rule
              </h3>
              <button
                id="close-add-rule-modal"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Rule Name
                </label>
                <input
                  id="new-rule-name-input"
                  type="text"
                  required
                  placeholder="e.g. Azure & Kubernetes Senior Roles ($170k+)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Minimum Base Salary (USD)
                </label>
                <select
                  id="new-rule-salary-select"
                  value={newMinSalary}
                  onChange={(e) => setNewMinSalary(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={0}>Any Base Salary</option>
                  <option value={140000}>$140,000+ USD</option>
                  <option value={160000}>$160,000+ USD</option>
                  <option value={180000}>$180,000+ USD</option>
                  <option value={200000}>$200,000+ USD</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={newRemoteOnly}
                    onChange={(e) => setNewRemoteOnly(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded mr-2"
                  />
                  Remote-only positions in North America
                </label>

                <label className="flex items-center text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={newExcludeEntry}
                    onChange={(e) => setNewExcludeEntry(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded mr-2"
                  />
                  Exclude entry-level roles (Senior, Lead, Staff, SRE only)
                </label>

                <label className="flex items-center text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={newSkipCitizen}
                    onChange={(e) => setNewSkipCitizen(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded mr-2"
                  />
                  Skip Citizen / Greencard only (Visa sponsorship friendly)
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  id="submit-create-rule-btn"
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs"
                >
                  Save Alert Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
