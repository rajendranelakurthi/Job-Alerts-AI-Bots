import { SavedJobItem, UserCandidateProfile } from '../types';

export const exportProfileToJson = (profile: UserCandidateProfile, savedJobs: SavedJobItem[]) => {
  const exportPayload = {
    exportMetadata: {
      generatedAt: new Date().toISOString(),
      platform: 'DevOps & SRE Daily Radar',
      schemaVersion: '2.4.0',
      totalTrackedApplications: savedJobs.length,
    },
    candidateProfile: profile,
    trackedPipeline: savedJobs.map(item => ({
      id: item.job.id,
      title: item.job.title,
      company: item.job.company,
      location: item.job.location,
      remoteType: item.job.remoteType,
      salaryFormatted: item.job.salaryFormatted,
      sponsorshipStatus: item.job.sponsorshipStatus,
      status: item.status,
      savedAt: item.savedAt,
      appliedDate: item.appliedDate || null,
      notes: item.notes,
      applyUrl: item.job.applyUrl,
      techStack: item.job.techStack,
    })),
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DevOps_Candidate_Profile_Sync_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportJobsToCsv = (savedJobs: SavedJobItem[]) => {
  const headers = [
    'Job ID',
    'Title',
    'Company',
    'Location',
    'Remote Status',
    'Salary Range',
    'Sponsorship Status',
    'Application Status',
    'Saved Date',
    'Applied Date',
    'Tech Stack',
    'Notes',
    'Job URL'
  ];

  const rows = savedJobs.map(item => [
    `"${item.job.id}"`,
    `"${item.job.title.replace(/"/g, '""')}"`,
    `"${item.job.company.replace(/"/g, '""')}"`,
    `"${item.job.location.replace(/"/g, '""')}"`,
    `"${item.job.remoteType}"`,
    `"${item.job.salaryFormatted.replace(/"/g, '""')}"`,
    `"${item.job.sponsorshipLabel.replace(/"/g, '""')}"`,
    `"${item.status.toUpperCase()}"`,
    `"${new Date(item.savedAt).toLocaleDateString()}"`,
    `"${item.appliedDate || 'N/A'}"`,
    `"${item.job.techStack.join(', ')}"`,
    `"${(item.notes || '').replace(/"/g, '""')}"`,
    `"${item.job.applyUrl}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DevOps_Applications_Tracker_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateMarkdownResumeSync = (profile: UserCandidateProfile, savedJobs: SavedJobItem[]): string => {
  const appliedJobs = savedJobs.filter(j => j.status === 'applied' || j.status === 'interviewing');
  const activeJobs = savedJobs.filter(j => j.status === 'saved');

  return `# ${profile.fullName} - Candidate Profile & Job Search Sync
**Target Title:** ${profile.targetTitle}  
**Email:** ${profile.email}  
**Experience:** ${profile.yearsOfExperience}+ Years  
**Location Preference:** ${profile.locationPreference}  
**Target Minimum Compensation:** $${profile.minSalaryTarget.toLocaleString()} USD  
**Visa / Sponsorship Preference:** ${profile.requiresSponsorship ? 'Requires Visa Sponsorship Support (H-1B / TN / STEM OPT)' : 'Open'}

---

## Executive Professional Summary
${profile.bioSummary}

## Core Technical Competencies
${profile.coreSkills.map(s => `- **${s}**`).join('\n')}

## Target Role Designations
${profile.targetDesignations.map(d => `- ${d}`).join('\n')}

---

## Tracked Active Applications (${appliedJobs.length})
${appliedJobs.length > 0 ? appliedJobs.map(item => `
### ${item.job.title} @ ${item.job.company}
- **Stage:** ${item.status.toUpperCase()} (Applied: ${item.appliedDate || 'Recent'})
- **Location:** ${item.job.location} | **Compensation:** ${item.job.salaryFormatted}
- **Sponsorship:** ${item.job.sponsorshipLabel}
- **Tech Stack:** ${item.job.techStack.join(', ')}
- **Candidate Notes:** ${item.notes || 'None logged'}
- **Application Link:** [View Job](${item.job.applyUrl})
`).join('\n') : '*No active applications logged yet.*'}

---

## Saved Listings Pipeline (${activeJobs.length})
${activeJobs.length > 0 ? activeJobs.map(item => `
- **${item.job.title}** at **${item.job.company}** (${item.job.location}) — ${item.job.salaryFormatted}
  *Notes:* ${item.notes || 'Saved for 8 AM morning review'}
`).join('\n') : '*No saved jobs in queue.*'}

---
*Export generated on ${new Date().toLocaleString()} via DevOps & SRE Daily Radar.*
`;
};
