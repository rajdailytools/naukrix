import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Download, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Briefcase, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  CheckSquare, 
  Square, 
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { Recruitment, UserApplicationStatus } from '../types/job';
import { OfficialEmblem } from './OfficialEmblem';
import { useApp } from '../context/AppContext';

interface JobDetailModalProps {
  job: Recruitment;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  const { 
    toggleSaveJob, 
    isJobSaved, 
    savedJobs, 
    updateApplicationStatus, 
    toggleDocumentCheck,
    setActiveToolModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vacancies' | 'eligibility' | 'pattern' | 'documents' | 'steps'>('overview');
  const [copySuccess, setCopySuccess] = useState(false);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: job.daysLeft,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const saved = isJobSaved(job.id);
  const currentSavedItem = savedJobs.find(s => s.recruitmentId === job.id);
  const userStatus: UserApplicationStatus = currentSavedItem?.status || 'Interested';
  const checkedDocs = currentSavedItem?.checkedDocumentIds || [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const statusOptions: UserApplicationStatus[] = [
    'Interested',
    'Need to Apply',
    'Applied',
    'Admit Card Awaited',
    'Exam Completed',
    'Result Awaited',
    'Completed',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-white border-b border-slate-100 relative">
          <div className="flex items-start justify-between gap-4">
            
            {/* Left Title and Emblem */}
            <div className="flex items-start sm:items-center gap-4">
              <OfficialEmblem type={job.logoType} size={64} className="shadow-md" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {job.status}
                  </span>
                  {job.isVerified && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Notification
                    </span>
                  )}
                  {job.isCentral ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      Central Govt
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      State Govt ({job.state})
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {job.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {job.organization} · {job.department}
                </p>
              </div>
            </div>

            {/* Close & Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="Copy Page Link"
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {copySuccess && (
            <div className="absolute top-3 right-20 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg animate-in fade-in">
              Link copied to clipboard!
            </div>
          )}

          {/* Quick Metrics & Live Countdown Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm">
            
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block leading-none font-medium">Total Vacancies</span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {job.totalPosts.toLocaleString('en-IN')} Posts
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block leading-none font-medium">Eligibility</span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block truncate max-w-[130px]">
                  {job.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block leading-none font-medium">Application Deadline</span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {job.deadlineDateString}
                </span>
              </div>
            </div>

            {/* Live Ticking Countdown */}
            <div className="flex items-center gap-2.5 bg-rose-50/70 border border-rose-100 rounded-xl px-2.5 py-1">
              <Clock className="w-4 h-4 text-rose-600 shrink-0 animate-pulse" />
              <div>
                <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider block leading-none">
                  Live Countdown
                </span>
                <span className="text-xs font-black text-rose-700 mt-0.5 block font-mono">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 hide-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Dates' },
              { id: 'vacancies', label: 'Category & State Breakup' },
              { id: 'eligibility', label: 'Eligibility & Age Limit' },
              { id: 'pattern', label: 'Exam Pattern & Syllabus' },
              { id: 'documents', label: `Document Checklist (${checkedDocs.length}/${job.documentsRequired.length})` },
              { id: 'steps', label: 'How to Apply' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1A73E8] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          
          {/* TAB 1: OVERVIEW & DATES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Short Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <h4 className="font-extrabold text-slate-900 mb-1">Recruitment Overview</h4>
                <p className="text-slate-600 leading-relaxed">{job.fullOverview}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-200/60">
                  <span>💰 Pay Scale: {job.salaryPayScale}</span>
                  <span>📍 Job Posting: {job.location}</span>
                  <span>📅 Last Verified: {job.lastVerifiedDate}</span>
                </div>
              </div>

              {/* Important Dates Timeline */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Key Recruitment Dates (Asia/Kolkata Timezone)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold block">Notification Released</span>
                    <span className="text-sm font-bold text-slate-800">{job.startDate}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="text-[11px] text-rose-600 uppercase font-semibold block">Application Deadline</span>
                    <span className="text-sm font-black text-rose-800">{job.deadlineDateString} (23:59 IST)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[11px] text-blue-600 uppercase font-semibold block">Admit Card Release</span>
                    <span className="text-sm font-bold text-blue-800">{job.admitCardDate || 'To be announced'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-600 uppercase font-semibold block">Examination Date</span>
                    <span className="text-sm font-bold text-emerald-800">{job.examDate || 'Exam Date Not Announced'}</span>
                  </div>
                </div>
              </div>

              {/* Application Fee */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">Application Fee Structure</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="text-slate-500 block">General / OBC / EWS</span>
                    <span className="text-base font-extrabold text-slate-900">₹{job.applicationFee.generalOBC}</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="text-slate-500 block">SC / ST / PwBD</span>
                    <span className="text-base font-extrabold text-emerald-600">
                      {job.applicationFee.scStPwD === 0 ? 'Exempted (Nil)' : `₹${job.applicationFee.scStPwD}`}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="text-slate-500 block">All Female Candidates</span>
                    <span className="text-base font-extrabold text-emerald-600">
                      {job.applicationFee.female === 0 ? 'Exempted (Nil)' : `₹${job.applicationFee.female}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              {job.faqs && job.faqs.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-2.5">
                    {job.faqs.map((faq, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{faq.question}</p>
                        <p className="text-xs sm:text-[13px] text-slate-600 mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VACANCY BREAKUP */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              {/* Category-Wise Vacancy */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">Category-Wise Vacancy Distribution</h4>
                <p className="text-xs text-slate-500 mb-3">
                  Reservation is granted as per Government of India / State rules. Total official posts: {job.totalPosts.toLocaleString('en-IN')}.
                </p>

                {job.categoryBreakup && job.categoryBreakup.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-3">Reservation Category</th>
                          <th className="p-3 text-right">Vacant Seats</th>
                          <th className="p-3 text-right">Share (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {job.categoryBreakup.map((row, idx) => {
                          const pct = ((row.posts / job.totalPosts) * 100).toFixed(1);
                          return (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-3 font-semibold text-slate-800">{row.category}</td>
                              <td className="p-3 text-right font-mono font-bold text-slate-900">
                                {row.posts.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 text-right font-mono text-slate-500">{pct}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                    Category breakup awaiting official post-wise gazette confirmation.
                  </div>
                )}
              </div>

              {/* State-Wise Vacancy */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">State / Regional Zone Distribution</h4>
                {job.stateBreakup && job.stateBreakup.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-3">State / RRB Zone / Region</th>
                          <th className="p-3 text-right">Vacancies</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {job.stateBreakup.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-800">{row.state}</td>
                            <td className="p-3 text-right font-mono font-bold text-slate-900">
                              {row.posts.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                    State-wise vacancy breakup not specified in the available notification.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY & AGE LIMIT */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-2">
                <h4 className="font-extrabold text-blue-900 text-sm">Educational Qualification Requirement</h4>
                <p className="text-xs sm:text-sm text-slate-700">
                  Minimum Qualification: <strong className="text-blue-700">{job.qualificationLevel} Pass</strong>.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.requiredDegrees.map((deg, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white text-slate-800 rounded-lg text-xs font-semibold border border-blue-200">
                      ✓ {deg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Age Limits */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm">Age Criteria & Cutoff Date</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Minimum Age</span>
                    <span className="text-lg font-black text-slate-900">{job.minAge} Years</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Maximum Age (UR)</span>
                    <span className="text-lg font-black text-slate-900">{job.maxAge} Years</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Age Reference Date</span>
                    <span className="text-sm font-bold text-slate-900">{job.ageReferenceDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">Official Age Relaxation: </span>
                  {job.ageRelaxation}
                </div>
              </div>

              {/* Physical Requirements if police/defence */}
              {job.physicalStandards && job.physicalStandards.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">Physical Standards Test (PST / PET)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.physicalStandards.map((pst, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                          {pst.gender} Candidates
                        </span>
                        <div className="pt-2">
                          <strong>Height Requirement:</strong> {pst.heightCm} cm
                        </div>
                        {pst.chestCm && <div><strong>Chest:</strong> {pst.chestCm}</div>}
                        {pst.runningDistance && <div><strong>Running Race:</strong> {pst.runningDistance} in {pst.runningTime}</div>}
                        {pst.notes && <div className="text-slate-500 italic mt-1">{pst.notes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EXAM PATTERN & SYLLABUS */}
          {activeTab === 'pattern' && (
            <div className="space-y-6">
              {/* Negative Marking Policy Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <strong className="font-bold">Negative Marking Rule: </strong>
                  {job.negativeMarkingText}
                </div>
              </div>

              {/* Exam Stages */}
              {job.examStages && job.examStages.map((stage, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200">
                    <span className="font-extrabold text-slate-900 text-sm">{stage.stageName}</span>
                    <span className="text-xs text-slate-600 font-medium">
                      Mode: {stage.mode} · Duration: {stage.duration} · Total Marks: {stage.totalMarks}
                    </span>
                  </div>

                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="p-3">Subject / Paper Section</th>
                        <th className="p-3 text-right">No. of Questions</th>
                        <th className="p-3 text-right">Maximum Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {stage.subjects.map((sub, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50">
                          <td className="p-3 font-medium text-slate-800">{sub.name}</td>
                          <td className="p-3 text-right font-mono text-slate-700">{sub.questions}</td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900">{sub.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              {/* Syllabus Topics */}
              {job.syllabusTopics && (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-3">Topic-Wise Syllabus</h4>
                  <div className="space-y-3">
                    {job.syllabusTopics.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h5 className="font-bold text-blue-700 text-xs sm:text-sm mb-2">{item.subject}</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {item.topics.map((t, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white text-slate-700 text-xs border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DOCUMENT CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">Interactive Document Checklist</h4>
                  <p className="text-xs text-slate-500">
                    Tick off documents as you prepare them before visiting the official application portal. Progress is saved to your account.
                  </p>
                </div>
                <button
                  onClick={() => setActiveToolModal('photo-resizer')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  Need Photo / Sign Resizer?
                </button>
              </div>

              <div className="space-y-2.5">
                {job.documentsRequired.map((doc) => {
                  const isChecked = checkedDocs.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocumentCheck(job.id, doc.id)}
                      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-emerald-50/50 border-emerald-300' 
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-blue-600">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-400" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                              {doc.name}
                            </span>
                            {doc.required && (
                              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                Mandatory
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {doc.format} {doc.maxSizeKb ? `(<${doc.maxSizeKb} KB)` : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: HOW TO APPLY */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 text-base">Step-by-Step Official Application Process</h4>
              <div className="space-y-3">
                {job.applicationSteps.map((step) => (
                  <div key={step.stepNumber} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{step.title}</h5>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{step.instruction}</p>
                      {step.importantTip && (
                        <p className="text-xs text-amber-700 font-semibold bg-amber-50/80 px-2 py-1 rounded inline-block">
                          💡 Tip: {step.importantTip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* User Application Tracker dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">My Tracker:</span>
            <select
              value={userStatus}
              onChange={(e) => updateApplicationStatus(job.id, e.target.value as UserApplicationStatus)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                saved ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-slate-200 text-slate-400 hover:text-blue-600'
              }`}
              title={saved ? 'Remove from Saved' : 'Save Job'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Official External Links */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={job.officialNotificationPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Notification PDF</span>
            </a>

            <a
              href={job.officialApplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Apply Online on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
