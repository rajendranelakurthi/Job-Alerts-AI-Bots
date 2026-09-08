import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  ExternalLink, 
  Trash2, 
  FileDown, 
  FileSpreadsheet, 
  MessageSquare, 
  Calendar, 
  Building2, 
  MapPin, 
  DollarSign, 
  ShieldCheck,
  Check,
  Search
} from 'lucide-react';
import { SavedJobItem, ApplicationStatus } from '../types';
import { exportJobsToCsv } from '../utils/exportUtils';

interface SavedJobsViewProps {
  savedJobs: SavedJobItem[];
  onRemoveSaved: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: ApplicationStatus) => void;
  onUpdateNotes: (jobId: string, notes: string) => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  savedJobs,
  onRemoveSaved,
  onUpdateStatus,
  onUpdateNotes,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingNoteJobId, setEditingNoteJobId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = savedJobs.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = !searchQuery || 
      item.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStartEditingNotes = (jobId: string, currentNotes: string) => {
    setEditingNoteJobId(jobId);
    setNoteDraft(currentNotes);
  };

  const handleSaveNotes = (jobId: string) => {
    onUpdateNotes(jobId, noteDraft);
    setEditingNoteJobId(null);
  };

  const statusCounts = {
    all: savedJobs.length,
    saved: savedJobs.filter(j => j.status === 'saved').length,
    applied: savedJobs.filter(j => j.status === 'applied').length,
    interviewing: savedJobs.filter(j => j.status === 'interviewing').length,
    offer: savedJobs.filter(j => j.status === 'offer').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Export CSV */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <BookmarkCheck className="w-5 h-5 mr-2 text-sky-600" />
            Favorite Listings & Applications Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track your saved opportunities, recruiter conversations, interview stages, and notes for portability.
          </p>
        </div>

        <button
          id="export-pipeline-csv-btn"
          onClick={() => exportJobsToCsv(savedJobs)}
          disabled={savedJobs.length === 0}
          className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs active:scale-95 disabled:opacity-50"
          title="Download full applications tracker as a CSV spreadsheet"
        >
          <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-400" />
          Export Application Tracker (CSV)
        </button>
      </div>

      {/* Pipeline Stage Tabs & Search Filter */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Stage Tabs */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Jobs', count: statusCounts.all },
            { id: 'saved', label: 'Saved Queue', count: statusCounts.saved },
            { id: 'applied', label: 'Applied', count: statusCounts.applied },
            { id: 'interviewing', label: 'Interviewing', count: statusCounts.interviewing },
            { id: 'offer', label: 'Offers', count: statusCounts.offer },
          ].map(tab => (
            <button
              key={tab.id}
              id={`pipeline-tab-${tab.id}`}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label} <span className="opacity-75 ml-1">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="saved-jobs-search-input"
            type="text"
            placeholder="Search saved jobs or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Saved Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No jobs in this view</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Browse the Live Job Radar and click the bookmark star to track roles and add personal notes.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map(item => (
            <div
              key={item.job.id}
              id={`saved-item-${item.job.id}`}
              className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 p-5 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800 text-sm flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {item.job.company}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                      {item.job.location}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.job.salaryFormatted}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {item.job.title}
                  </h3>

                  {/* Visa status & Tech stack */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      {item.job.sponsorshipLabel}
                    </span>
                    <span className="text-xs text-slate-400">
                      Tech: {item.job.techStack.slice(0, 5).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Status Selector & Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  <select
                    id={`pipeline-status-select-${item.job.id}`}
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.job.id, e.target.value as ApplicationStatus)}
                    className="text-xs font-bold py-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  >
                    <option value="saved">Queue: Saved</option>
                    <option value="applied">Stage: Applied</option>
                    <option value="interviewing">Stage: Interviewing</option>
                    <option value="offer">Stage: Offer Received</option>
                    <option value="archived">Stage: Archived</option>
                  </select>

                  <a
                    id={`saved-apply-btn-${item.job.id}`}
                    href={item.job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-slate-100 transition-colors"
                    title="Open application link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    id={`remove-saved-btn-${item.job.id}`}
                    onClick={() => onRemoveSaved(item.job.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove from saved pipeline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Personal Notes Section */}
              <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/60 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
                    Application Notes & Recruiter Contacts
                  </span>
                  {editingNoteJobId !== item.job.id && (
                    <button
                      id={`edit-note-btn-${item.job.id}`}
                      onClick={() => handleStartEditingNotes(item.job.id, item.notes)}
                      className="text-xs font-semibold text-sky-600 hover:text-sky-800"
                    >
                      {item.notes ? 'Edit Notes' : '+ Add Note'}
                    </button>
                  )}
                </div>

                {editingNoteJobId === item.job.id ? (
                  <div className="space-y-2 mt-2">
                    <textarea
                      id={`note-textarea-${item.job.id}`}
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Add notes (e.g., recruiter contact, referral, technical assessment dates, key questions)..."
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingNoteJobId(null)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        id={`save-note-btn-${item.job.id}`}
                        onClick={() => handleSaveNotes(item.job.id)}
                        className="px-3 py-1 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 italic">
                    {item.notes || 'No notes added yet. Click "+ Add Note" to log recruiter details or resume adjustments.'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
