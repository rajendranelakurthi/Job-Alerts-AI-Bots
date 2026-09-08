import React from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ShieldCheck, 
  SlidersHorizontal, 
  RotateCcw,
  Check,
  Building2,
  Globe2
} from 'lucide-react';
import { JobFilterState } from '../types';

interface FilterBarProps {
  filters: JobFilterState;
  setFilters: React.Dispatch<React.SetStateAction<JobFilterState>>;
  totalMatches: number;
  totalAvailable: number;
}

const ALL_DESIGNATIONS = [
  'DevOps Engineer',
  'Sr DevOps Engineer',
  'Lead DevOps Engineer',
  'Azure DevOps Engineer',
  'Site Reliability Engineer',
  'Sr SRE',
  'Platform Engineer',
];

const SALARY_THRESHOLDS = [
  { label: 'Any Base Salary', value: 0 },
  { label: '$130k+ USD', value: 130000 },
  { label: '$150k+ USD', value: 150000 },
  { label: '$170k+ USD', value: 170000 },
  { label: '$190k+ USD', value: 190000 },
  { label: '$210k+ USD', value: 210000 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalMatches,
  totalAvailable,
}) => {
  const toggleDesignation = (role: string) => {
    setFilters(prev => {
      const exists = prev.selectedDesignations.includes(role);
      const updated = exists
        ? prev.selectedDesignations.filter(r => r !== role)
        : [...prev.selectedDesignations, role];
      return { ...prev, selectedDesignations: updated };
    });
  };

  const resetFilters = () => {
    setFilters({
      remoteOnly: true,
      remoteType: 'all',
      excludeEntryLevel: true,
      skipCitizenGcOnly: true,
      selectedDesignations: [],
      minSalary: 0,
      searchQuery: '',
      selectedTech: [],
      region: 'all',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 mb-6 transition-all">
      {/* Top Search & Primary Filters Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Keyword Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="job-keyword-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search by keywords, tech stack (Azure, Kubernetes, Terraform, Datadog), or company..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Salary Minimum Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative min-w-[170px]">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
            <select
              id="salary-threshold-select"
              value={filters.minSalary}
              onChange={(e) => setFilters(prev => ({ ...prev, minSalary: Number(e.target.value) }))}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
            >
              {SALARY_THRESHOLDS.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Region in North America */}
          <div className="relative min-w-[140px]">
            <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-600" />
            <select
              id="region-filter-select"
              value={filters.region}
              onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value as any }))}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
            >
              <option value="all">All North America</option>
              <option value="us">United States</option>
              <option value="canada">Canada</option>
            </select>
          </div>

          {/* Reset button */}
          <button
            id="reset-filters-btn"
            onClick={resetFilters}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset filters to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toggles Bar: Remote-Only, Exclude Entry-Level, Skip Citizen/GC-only */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Remote Only Toggle */}
          <button
            id="remote-only-toggle-btn"
            onClick={() => setFilters(prev => ({ ...prev, remoteOnly: !prev.remoteOnly }))}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              filters.remoteOnly
                ? 'bg-sky-50 text-sky-700 border-sky-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${filters.remoteOnly ? 'bg-sky-500' : 'bg-slate-300'}`} />
            Remote-Only Roles
            {filters.remoteOnly && <Check className="w-3.5 h-3.5 ml-1.5 text-sky-600" />}
          </button>

          {/* Exclude Entry Level Toggle */}
          <button
            id="exclude-entry-level-toggle-btn"
            onClick={() => setFilters(prev => ({ ...prev, excludeEntryLevel: !prev.excludeEntryLevel }))}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              filters.excludeEntryLevel
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            Exclude Entry-Level (Senior+ Focus)
            {filters.excludeEntryLevel && <Check className="w-3.5 h-3.5 ml-1.5 text-indigo-600" />}
          </button>

          {/* Skip Citizen / GC Only / No Sponsorship Toggle (Explicit requirement) */}
          <button
            id="skip-citizen-gc-only-toggle-btn"
            onClick={() => setFilters(prev => ({ ...prev, skipCitizenGcOnly: !prev.skipCitizenGcOnly }))}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              filters.skipCitizenGcOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Skip positions restricted to US Citizens, Green Cards only, or roles declaring No Sponsorship"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            Skip Citizen / GC Only (Sponsorship Friendly)
            {filters.skipCitizenGcOnly && <Check className="w-3.5 h-3.5 ml-1.5 text-emerald-600" />}
          </button>
        </div>

        {/* Matches Indicator */}
        <div className="text-xs font-medium text-slate-500">
          Showing <span className="font-bold text-slate-900">{totalMatches}</span> of {totalAvailable} tracked roles
        </div>
      </div>

      {/* Target Designations Pills */}
      <div className="pt-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center">
            <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Job Designations ({filters.selectedDesignations.length === 0 ? 'All 7 Selected' : `${filters.selectedDesignations.length} Selected`})
          </label>
          {filters.selectedDesignations.length > 0 && (
            <button
              id="clear-roles-btn"
              onClick={() => setFilters(prev => ({ ...prev, selectedDesignations: [] }))}
              className="text-[11px] text-sky-600 hover:text-sky-800 font-medium"
            >
              Select All
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_DESIGNATIONS.map(role => {
            const isSelected = filters.selectedDesignations.includes(role);
            return (
              <button
                key={role}
                id={`role-filter-${role.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleDesignation(role)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
