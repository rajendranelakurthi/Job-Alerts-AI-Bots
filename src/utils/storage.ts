import { JobListing, SavedJobItem, TrackedAlertRule, UserCandidateProfile, NotificationLog } from '../types';
import { INITIAL_JOB_LISTINGS, INITIAL_TRACKED_ALERTS, INITIAL_USER_PROFILE } from '../data/seedJobs';

const STORAGE_KEYS = {
  JOBS: 'devops_jobs_radar_jobs_v1',
  SAVED_ITEMS: 'devops_jobs_radar_saved_v1',
  ALERT_RULES: 'devops_jobs_radar_alerts_v1',
  USER_PROFILE: 'devops_jobs_radar_profile_v1',
  NOTIFICATION_LOGS: 'devops_jobs_radar_logs_v1',
  PUSH_PERMISSION: 'devops_jobs_radar_push_pref_v1',
};

export const getStoredJobs = (): JobListing[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading stored jobs:', e);
  }
  return INITIAL_JOB_LISTINGS;
};

export const saveStoredJobs = (jobs: JobListing[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  } catch (e) {
    console.error('Error saving jobs:', e);
  }
};

export const getStoredSavedJobs = (): SavedJobItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading saved jobs:', e);
  }
  // Initialize with top 2 initial favorites
  return [
    {
      job: INITIAL_JOB_LISTINGS[0],
      savedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      status: 'saved',
      notes: 'High match for AWS + Kubernetes infra. Need to highlight multi-region terraform experience.',
    },
    {
      job: INITIAL_JOB_LISTINGS[1],
      savedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      status: 'applied',
      notes: 'Applied via company portal on Greenhouse. Highlighted 6+ years Azure DevOps & AKS governance.',
      appliedDate: new Date().toISOString().split('T')[0],
    }
  ];
};

export const saveStoredSavedJobs = (items: SavedJobItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving saved jobs:', e);
  }
};

export const getStoredAlertRules = (): TrackedAlertRule[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ALERT_RULES);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading alert rules:', e);
  }
  return INITIAL_TRACKED_ALERTS as TrackedAlertRule[];
};

export const saveStoredAlertRules = (rules: TrackedAlertRule[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ALERT_RULES, JSON.stringify(rules));
  } catch (e) {
    console.error('Error saving alert rules:', e);
  }
};

export const getStoredUserProfile = (): UserCandidateProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.email) return parsed;
    }
  } catch (e) {
    console.error('Error loading user profile:', e);
  }
  return INITIAL_USER_PROFILE as UserCandidateProfile;
};

export const saveStoredUserProfile = (profile: UserCandidateProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile:', e);
  }
};

export const getStoredNotificationLogs = (): NotificationLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_LOGS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading notification logs:', e);
  }
  return [
    {
      id: 'log-1',
      timestamp: 'Today, 8:00 AM EST',
      type: 'push',
      title: 'Daily 8:00 AM Mobile Alert Dispatched',
      summary: 'Delivered 8 new Senior DevOps & Azure postings matching remote NA criteria',
      jobCount: 8,
      recipient: 'Mobile Device (Web Push)',
      status: 'delivered',
    },
    {
      id: 'log-2',
      timestamp: 'Today, 8:00 AM EST',
      type: 'email',
      title: 'Morning Executive Job Digest Delivered',
      summary: 'Executive summary with salary ranges, sponsorship status, and direct apply links sent',
      jobCount: 8,
      recipient: 'rajendrachowdary09@gmail.com',
      status: 'delivered',
    },
    {
      id: 'log-3',
      timestamp: 'Yesterday, 8:00 AM EST',
      type: 'push',
      title: 'Daily 8:00 AM Mobile Alert Dispatched',
      summary: 'Delivered 6 new SRE & Platform Engineer openings (Remote NA)',
      jobCount: 6,
      recipient: 'Mobile Device (Web Push)',
      status: 'delivered',
    }
  ];
};

export const saveStoredNotificationLogs = (logs: NotificationLog[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving notification logs:', e);
  }
};
