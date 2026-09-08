import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  CheckCircle,
  Share2,
  Check
} from 'lucide-react';
import { JobListing, ApplicationStatus } from '../types';

interface JobCardProps {
  job: JobListing;
  isSaved: boolean;
  savedStatus?: ApplicationStatus;
  onToggleSave: (job: JobListing) => void;
  onUpdateStatus?: (jobId: string, status: ApplicationStatus) => void;
  onAddNote?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  savedStatus = 'saved',
  onToggleSave,
  onUpdateStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(job.applyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div 
      id={`job-card-${job.id}`}
      className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between"
    >
      <div className="p-5">
        {/* Card Header: Company, Time, Save Button */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-semibold text-slate-800 text-sm flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {job.company}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 flex items-center">
                <Clock className="w-3 h-3 mr-1 text-slate-400" />
                {job.postedAt}
              </span>
              {job.isNewToday && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  NEW TODAY
                </span>
              )}
              {job.source.includes('Google Search') && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-sky-500" />
                  Search Grounded
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
              {job.title}
            </h2>
          </div>

          {/* Bookmark / Favorite button */}
          <button
            id={`bookmark-btn-${job.id}`}
            onClick={() => onToggleSave(job)}
            className={`p-2 rounded-lg transition-colors border ${
              isSaved
                ? 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? 'Saved in your favorites pipeline' : 'Save job listing'}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500 text-amber-600" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        {/* Location, Remote Badge & Compensation Badges */}
        <div className="flex flex-wrap items-center gap-2 my-2.5 text-xs">
          {/* Location & Remote */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
            {job.location}
          </span>

          {job.remoteType === 'remote' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-200">
              Remote NA
            </span>
          )}

          {/* Salary */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            <DollarSign className="w-3.5 h-3.5 mr-0.5 text-emerald-600" />
            {job.salaryFormatted}
          </span>

          {/* Seniority */}
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
            {job.experienceLevel} Level
          </span>

          {/* Match Score */}
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-sky-50 text-sky-700 font-semibold text-[11px] ml-auto">
            {job.matchScore}% Senior Match
          </span>
        </div>

        {/* Visa Sponsorship Status Callout (Strict user prompt requirement) */}
        <div className="my-2">
          {job.isSponsorshipFriendly ? (
            <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-50/70 border border-emerald-200/80 px-2.5 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
              <span>{job.sponsorshipLabel}</span>
            </div>
          ) : (
            <div className="flex items-center text-xs font-medium text-rose-700 bg-rose-50/70 border border-rose-200 px-2.5 py-1.5 rounded-lg">
              <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-600 shrink-0" />
              <span>{job.sponsorshipLabel}</span>
            </div>
          )}
        </div>

        {/* Description Snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
          {job.descriptionSnippet}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.techStack.map(tech => (
            <span
              key={tech}
              className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Key Responsibilities */}
        {isExpanded && job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
              Core Responsibilities:
            </div>
            {job.keyResponsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-sky-500 mr-2 font-bold">•</span>
                <span>{resp}</span>
              </div>
            ))}

            {job.groundingUri && (
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Search Grounding Source:</span>
                <a
                  href={job.groundingUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline flex items-center font-medium"
                >
                  {job.groundingTitle || 'Google Search Reference'}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Status Selector (if saved), Details toggle, and Apply Direct button */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {isSaved && onUpdateStatus && (
            <select
              id={`application-stage-select-${job.id}`}
              value={savedStatus}
              onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
              className="text-xs font-semibold py-1 px-2 rounded-md bg-white border border-slate-300 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="saved">Status: Saved</option>
              <option value="applied">Status: Applied</option>
              <option value="interviewing">Status: Interviewing</option>
              <option value="offer">Status: Offer</option>
              <option value="archived">Status: Archived</option>
            </select>
          )}

          <button
            id={`toggle-details-btn-${job.id}`}
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-slate-900 py-1 px-2 rounded hover:bg-slate-200/60 transition-colors"
          >
            {isExpanded ? (
              <>
                Less details <ChevronUp className="w-3.5 h-3.5 ml-1" />
              </>
            ) : (
              <>
                More details <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </button>

          <button
            id={`share-job-btn-${job.id}`}
            onClick={handleShare}
            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200/60 transition-colors"
            title="Copy link to clipboard"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <a
          id={`apply-direct-btn-${job.id}`}
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-sky-600 transition-colors shadow-xs active:scale-95"
        >
          Apply Direct
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </a>
      </div>
    </div>
  );
};
