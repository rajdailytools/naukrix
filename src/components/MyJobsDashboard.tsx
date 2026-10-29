import React, { useState } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ArrowRight, 
  Edit3, 
  FileCheck, 
  User, 
  Bell, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserApplicationStatus, Recruitment } from '../types/job';
import { OfficialEmblem } from './OfficialEmblem';

export const MyJobsDashboard: React.FC = () => {
  const { 
    user, 
    savedJobs, 
    recruitments, 
    toggleSaveJob, 
    updateApplicationStatus, 
    setSelectedRecruitment,
    setActiveTab,
    setIsAuthModalOpen
  } = useApp();

  const [activeFilterStatus, setActiveFilterStatus] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const statusCategories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Saved Jobs', count: savedJobs.length },
    { id: 'Need to Apply', label: 'Need to Apply', count: savedJobs.filter(s => s.status === 'Need to Apply').length },
    { id: 'Applied', label: 'Applied Jobs', count: savedJobs.filter(s => s.status === 'Applied').length },
    { id: 'Admit Card Awaited', label: 'Admit Card Awaited', count: savedJobs.filter(s => s.status === 'Admit Card Awaited').length },
    { id: 'Exam Completed', label: 'Exam Completed', count: savedJobs.filter(s => s.status === 'Exam Completed').length },
    { id: 'Result Awaited', label: 'Results Awaited', count: savedJobs.filter(s => s.status === 'Result Awaited').length },
  ];

  const filteredSaved = savedJobs.filter(item => {
    if (activeFilterStatus === 'all') return true;
    return item.status === activeFilterStatus;
  });

  const allStatuses: UserApplicationStatus[] = [
    'Interested',
    'Need to Apply',
    'Applied',
    'Admit Card Awaited',
    'Exam Completed',
    'Result Awaited',
    'Completed',
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Candidate Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-blue-500/25">
            {user ? user.name.charAt(0) : 'G'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {user ? user.name : 'Guest Candidate'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Aspirant Profile
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {user ? `${user.qualification} (${user.degree}) · ${user.category} · ${user.state}` : 'Sign in to sync your applications'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('find-jobs')}
            className="px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check My Job Matches</span>
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Tracker Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4">
        <span>
          📌 <strong>Candidate Tracker Notice:</strong> These statuses represent your personal study and application tracker. They do not constitute official government application verification.
        </span>
      </div>

      {/* Status Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {statusCategories.map(st => (
          <button
            key={st.id}
            onClick={() => setActiveFilterStatus(st.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeFilterStatus === st.id
                ? 'bg-[#1A73E8] text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{st.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeFilterStatus === st.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {st.count}
            </span>
          </button>
        ))}
      </div>

      {/* Saved Jobs List */}
      <div className="space-y-4">
        {filteredSaved.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 space-y-3">
            <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No recruitments in this tracking status</h3>
            <p className="text-xs text-slate-500">
              Browse Latest Government Jobs and bookmark vacancies to track their deadlines and admit card dates.
            </p>
            <button
              onClick={() => setActiveTab('latest-jobs')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Browse Latest Vacancies
            </button>
          </div>
        ) : (
          filteredSaved.map(savedItem => {
            const job = recruitments.find(r => r.id === savedItem.recruitmentId);
            if (!job) return null;

            const isEditing = editingNotesId === job.id;

            return (
              <div 
                key={job.id}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  
                  {/* Left: Emblem and Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <OfficialEmblem type={job.logoType} size={54} />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {job.status}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {job.isCentral ? 'Central Govt' : job.state}
                        </span>
                      </div>

                      <h3 
                        onClick={() => setSelectedRecruitment(job)}
                        className="text-base sm:text-lg font-black text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {job.organization} · {job.totalPosts.toLocaleString('en-IN')} Vacancies
                      </p>
                    </div>
                  </div>

                  {/* Right Status Control & Actions */}
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Status:</span>
                      <select
                        value={savedItem.status}
                        onChange={(e) => updateApplicationStatus(job.id, e.target.value as UserApplicationStatus)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                      >
                        {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline:</span>
                      <span className="text-xs font-extrabold text-rose-600 block pt-1">
                        {job.deadlineDateString} ({job.daysLeft}d left)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <button
                        onClick={() => setSelectedRecruitment(job)}
                        className="bg-[#1A73E8] hover:bg-[#1557B0] text-white py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        title="Remove from Saved"
                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

                {/* Checklist & Notes Section */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  
                  {/* Document Checklist summary */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      Documents Prepared: <strong>{savedItem.checkedDocumentIds.length}</strong> of {job.documentsRequired.length}
                    </span>
                    <button
                      onClick={() => setSelectedRecruitment(job)}
                      className="text-blue-600 hover:underline font-semibold ml-1 cursor-pointer"
                    >
                      (Manage Checklist)
                    </button>
                  </div>

                  {/* User Personal Notes */}
                  <div className="w-full sm:w-auto flex items-center gap-2">
                    {isEditing ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add quick note..."
                          className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            savedItem.userNotes = noteText;
                            setEditingNotesId(null);
                          }}
                          className="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => {
                          setEditingNotesId(job.id);
                          setNoteText(savedItem.userNotes || '');
                        }}
                        className="text-slate-500 hover:text-slate-700 italic cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3 text-slate-400" />
                        <span>{savedItem.userNotes ? `Note: "${savedItem.userNotes}"` : 'Click to add personal note...'}</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
