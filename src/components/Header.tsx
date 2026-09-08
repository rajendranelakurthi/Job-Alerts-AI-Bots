import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Send, 
  Sparkles, 
  Clock, 
  BookmarkCheck, 
  Radio, 
  FileSpreadsheet, 
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'radar' | 'saved' | 'alerts' | 'profile';
  setActiveTab: (tab: 'radar' | 'saved' | 'alerts' | 'profile') => void;
  savedCount: number;
  alertRulesCount: number;
  onTriggerMorningRun: () => void;
  onFetchGoogleSearch: () => void;
  isSearching: boolean;
  pushStatus: 'granted' | 'denied' | 'default' | 'unsupported';
  onRequestPushPermission: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  alertRulesCount,
  onTriggerMorningRun,
  onFetchGoogleSearch,
  isSearching,
  pushStatus,
  onRequestPushPermission,
}) => {
  const [timeUntil8AM, setTimeUntil8AM] = useState<string>('');

  useEffect(() => {
    const calculateTimeUntil8AM = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(8, 0, 0, 0);

      // If it's already past 8 AM today, target 8 AM tomorrow
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntil8AM(`${hours}h ${minutes}m`);
    };

    calculateTimeUntil8AM();
    const interval = setInterval(calculateTimeUntil8AM, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Top Notification Status Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">8:00 AM Morning Job Engine Active</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-sky-400" />
              Next automated dispatch in <strong className="text-sky-300 ml-1">{timeUntil8AM}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="push-permission-header-btn"
              onClick={onRequestPushPermission}
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                pushStatus === 'granted'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                  : pushStatus === 'denied'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  : 'bg-sky-950/80 text-sky-300 border border-sky-800 hover:bg-sky-900'
              }`}
            >
              {pushStatus === 'granted' ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                  Mobile Push Active
                </>
              ) : pushStatus === 'denied' ? (
                <>
                  <AlertCircle className="w-3 h-3 mr-1 text-amber-400" />
                  Push Blocked in Browser
                </>
              ) : (
                <>
                  <Bell className="w-3 h-3 mr-1 text-sky-400" />
                  Enable Mobile Push Alerts
                </>
              )}
            </button>

            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Digest: <strong className="text-slate-300">rajendrachowdary09@gmail.com</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold text-lg">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">DevOps & SRE Daily Radar</h1>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
                  North America
                </span>
              </div>
              <p className="text-xs text-slate-400">
                DevOps &bull; Azure DevOps &bull; SRE &bull; Platform Engineering &bull; Daily 8:00 AM Alerts
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              id="google-search-grounding-btn"
              onClick={onFetchGoogleSearch}
              disabled={isSearching}
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-60"
              title="Query live postings using Gemini 3.8 Flash with Google Search Grounding"
            >
              <Sparkles className={`w-3.5 h-3.5 mr-1.5 text-sky-200 ${isSearching ? 'animate-spin' : ''}`} />
              {isSearching ? 'Grounding with Google Search...' : 'Live Search Grounding'}
            </button>

            <button
              id="trigger-8am-test-btn"
              onClick={onTriggerMorningRun}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95"
              title="Simulate / Send 8:00 AM Push Alert and Morning Email Digest"
            >
              <Send className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Trigger 8:00 AM Alert
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mt-4 pt-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none" aria-label="Tabs">
          <button
            id="tab-radar-btn"
            onClick={() => setActiveTab('radar')}
            className={`flex items-center px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'radar'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4 mr-2" />
            Live Job Radar
          </button>

          <button
            id="tab-saved-btn"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'saved'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 mr-2" />
            Saved & Applications
            {savedCount > 0 && (
              <span className="ml-2 px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded-full text-xs font-semibold border border-sky-500/30">
                {savedCount}
              </span>
            )}
          </button>

          <button
            id="tab-alerts-btn"
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'alerts'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Tracked 8AM Alerts
            <span className="ml-2 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              {alertRulesCount} Active
            </span>
          </button>

          <button
            id="tab-profile-btn"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'bg-slate-800 text-sky-400 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Profile & Resume Sync
          </button>
        </nav>
      </div>
    </header>
  );
};
