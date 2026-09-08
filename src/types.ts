export type RemoteType = 'remote' | 'hybrid' | 'onsite';

export type ExperienceLevel = 'mid' | 'senior' | 'lead' | 'staff' | 'entry';

export type SponsorshipStatus = 
  | 'eligible'           // Sponsorship provided or open to visa holders
  | 'open'               // Open to all work authorizations
  | 'us_citizen_only'    // Restrictive: US Citizen Only
  | 'gc_only'            // Restrictive: Green Card or Citizen Only
  | 'no_sponsorship';    // Restrictive: Explicitly states No Sponsorship

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  remoteType: RemoteType;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryFormatted: string;
  postedAt: string;
  postedTimestamp: number;
  descriptionSnippet: string;
  keyResponsibilities: string[];
  techStack: string[];
  sponsorshipStatus: SponsorshipStatus;
  sponsorshipLabel: string;
  isSponsorshipFriendly: boolean; // True if NOT citizen-only, NOT gc-only, and NOT no-sponsorship
  applyUrl: string;
  source: string;
  isNewToday: boolean;
  matchScore: number;
  groundingUri?: string;
  groundingTitle?: string;
}

export interface JobFilterState {
  remoteOnly: boolean;
  remoteType: 'all' | 'remote' | 'hybrid';
  excludeEntryLevel: boolean;
  skipCitizenGcOnly: boolean;
  selectedDesignations: string[];
  minSalary: number;
  searchQuery: string;
  selectedTech: string[];
  region: 'all' | 'us' | 'canada';
}

export type ApplicationStatus = 'saved' | 'applied' | 'interviewing' | 'offer' | 'archived';

export interface SavedJobItem {
  job: JobListing;
  savedAt: string;
  status: ApplicationStatus;
  notes: string;
  appliedDate?: string;
}

export interface TrackedAlertRule {
  id: string;
  title: string;
  frequency: string; // e.g., "Daily at 8:00 AM"
  scheduledTime: string; // "08:00"
  targetRoles: string[];
  remoteOnly: boolean;
  excludeEntryLevel: boolean;
  skipCitizenGcOnly: boolean;
  minSalary: number;
  pushEnabled: boolean;
  emailEnabled: boolean;
  recipientEmail: string;
  isActive: boolean;
  lastRun?: string;
  matchedCount: number;
  nextScheduled: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  type: 'push' | 'email';
  title: string;
  summary: string;
  jobCount: number;
  recipient: string;
  status: 'delivered' | 'scheduled' | 'simulated';
}

export interface UserCandidateProfile {
  fullName: string;
  email: string;
  targetTitle: string;
  yearsOfExperience: number;
  locationPreference: string;
  requiresSponsorship: boolean;
  targetDesignations: string[];
  coreSkills: string[];
  minSalaryTarget: number;
  bioSummary: string;
  exportVersion: string;
  lastSyncedAt: string;
}
