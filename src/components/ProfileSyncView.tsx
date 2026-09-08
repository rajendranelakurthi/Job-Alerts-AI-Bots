import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileCode, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  User, 
  Briefcase, 
  ShieldCheck, 
  DollarSign, 
  MapPin, 
  Cpu,
  RefreshCw
} from 'lucide-react';
import { UserCandidateProfile, SavedJobItem } from '../types';
import { exportProfileToJson, exportJobsToCsv, generateMarkdownResumeSync } from '../utils/exportUtils';

interface ProfileSyncViewProps {
  profile: UserCandidateProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserCandidateProfile>>;
  savedJobs: SavedJobItem[];
}

export const ProfileSyncView: React.FC<ProfileSyncViewProps> = ({
  profile,
  setProfile,
  savedJobs,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'markdown' | 'json'>('markdown');
  const [isEditing, setIsEditing] = useState(false);

  // Form local state
  const [formProfile, setFormProfile] = useState(profile);

  const markdownContent = generateMarkdownResumeSync(profile, savedJobs);
  const jsonContent = JSON.stringify(
    {
      candidateProfile: profile,
      trackedApplications: savedJobs.map(item => ({
        id: item.job.id,
        title: item.job.title,
        company: item.job.company,
        status: item.status,
        salary: item.job.salaryFormatted,
        sponsorship: item.job.sponsorshipLabel,
        appliedDate: item.appliedDate,
        notes: item.notes,
        url: item.job.applyUrl,
      })),
      exportMetadata: {
        timestamp: new Date().toISOString(),
        version: profile.exportVersion,
      },
    },
    null,
    2
  );

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formProfile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Resume Management & History Portability</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Profile Export & Application Sync
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Maintain a consistent, portable record of your target roles, technical competencies, and tracked applications across platforms for easy ATS synchronization and resume management.
            </p>
          </div>

          {/* Direct Download Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="download-json-sync-btn"
              onClick={() => exportProfileToJson(profile, savedJobs)}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs active:scale-95"
              title="Download structured JSON format"
            >
              <FileCode className="w-4 h-4 mr-1.5 text-sky-400" />
              Export JSON
            </button>

            <button
              id="download-csv-sync-btn"
              onClick={() => exportJobsToCsv(savedJobs)}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-all shadow-xs active:scale-95"
              title="Download CSV spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-200" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Profile Card & Parameters */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center">
              <User className="w-4 h-4 mr-2 text-sky-600" />
              Candidate Profile Data
            </h3>
            <button
              id="toggle-edit-profile-btn"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-sky-600 hover:text-sky-800"
            >
              {isEditing ? 'Cancel Editing' : 'Edit Target Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formProfile.fullName}
                    onChange={(e) => setFormProfile(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formProfile.email}
                    onChange={(e) => setFormProfile(p => ({ ...p, email: e.target.value }))}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Title</label>
                  <input
                    type="text"
                    value={formProfile.targetTitle}
                    onChange={(e) => setFormProfile(p => ({ ...p, targetTitle: e.target.value }))}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={formProfile.yearsOfExperience}
                    onChange={(e) => setFormProfile(p => ({ ...p, yearsOfExperience: Number(e.target.value) }))}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Bio Summary</label>
                <textarea
                  value={formProfile.bioSummary}
                  onChange={(e) => setFormProfile(p => ({ ...p, bioSummary: e.target.value }))}
                  rows={3}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Candidate</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">{profile.fullName}</div>
                <div className="text-xs text-slate-600">{profile.email}</div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <strong>Title:</strong> {profile.targetTitle} ({profile.yearsOfExperience}+ YOE)
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Search Preferences</div>
                <div className="text-xs text-slate-700 mt-1 space-y-1">
                  <div><strong>Location:</strong> {profile.locationPreference}</div>
                  <div><strong>Target Compensation:</strong> ${profile.minSalaryTarget.toLocaleString()}+ USD</div>
                  <div>
                    <strong>Visa Sponsorship:</strong>{' '}
                    <span className="text-emerald-700 font-semibold">
                      Requires Sponsorship (Excludes Citizen/GC Only)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Synced History</div>
                <div className="text-xs text-slate-700 mt-1 space-y-1">
                  <div><strong>Total Tracked Applications:</strong> {savedJobs.length} roles</div>
                  <div><strong>Applied / Interviewing:</strong> {savedJobs.filter(j => j.status === 'applied' || j.status === 'interviewing').length} roles</div>
                  <div><strong>Saved Queue:</strong> {savedJobs.filter(j => j.status === 'saved').length} roles</div>
                </div>
              </div>
            </div>
          )}

          {/* Core Skills Chips */}
          <div className="mt-4">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
              Synced Technical Competencies ({profile.coreSkills.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.coreSkills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Sync Preview & Clipboard Copy */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700">Export Preview:</span>
            <button
              onClick={() => setPreviewTab('markdown')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                previewTab === 'markdown'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Markdown Resume Sync
            </button>
            <button
              onClick={() => setPreviewTab('json')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                previewTab === 'json'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              JSON Schema Format
            </button>
          </div>

          <button
            id="copy-preview-btn"
            onClick={() => handleCopy(previewTab === 'markdown' ? markdownContent : jsonContent, previewTab)}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs transition-colors"
          >
            {copiedType === previewTab ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                Copy {previewTab === 'markdown' ? 'Markdown' : 'JSON'}
              </>
            )}
          </button>
        </div>

        <div className="p-5 max-h-96 overflow-y-auto font-mono text-xs bg-slate-950 text-slate-200 rounded-b-xl leading-relaxed whitespace-pre-wrap">
          {previewTab === 'markdown' ? markdownContent : jsonContent}
        </div>
      </div>
    </div>
  );
};
