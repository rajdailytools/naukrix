import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  RotateCcw,
  GraduationCap,
  Calendar,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Recruitment } from '../types/job';
import { OfficialEmblem } from './OfficialEmblem';

export const FindMyJobsPage: React.FC = () => {
  const { recruitments, user, setUser, setSelectedRecruitment, toggleSaveJob, isJobSaved } = useApp();

  // Local matching form state initialized from user profile or default
  const [candidateProfile, setCandidateProfile] = useState({
    qualification: user?.qualification || 'Graduation',
    degree: user?.degree || 'B.Sc (Computer Science)',
    age: user?.age || 23,
    category: user?.category || 'OBC',
    state: user?.state || 'Uttar Pradesh',
    gender: user?.gender || 'Male',
    typingSpeedWpm: user?.typingSpeedWpm || 35,
    hasDrivingLicense: user?.hasDrivingLicense ?? true,
    hasComputerCertificate: user?.hasComputerCertificate ?? true,
    centralOnly: false,
  });

  const [filterResultState, setFilterResultState] = useState<'all' | 'eligible' | 'check' | 'not_eligible'>('all');

  const qualifications = [
    '10th Pass',
    '12th Pass',
    'ITI',
    'Diploma',
    'Graduation',
    'Post Graduation',
  ];

  const degrees = [
    'Any Bachelor Degree',
    'BA',
    'B.Com',
    'B.Sc',
    'B.Tech / B.E',
    'BCA',
    'BBA',
    'B.Ed',
    'MA / M.Sc / M.Com',
    'MCA / M.Tech',
  ];

  const categories = ['General', 'EWS', 'OBC', 'SC', 'ST'];
  const states = [
    'All India',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Bihar',
    'Rajasthan',
    'Delhi NCR',
    'Maharashtra',
    'Haryana',
    'West Bengal',
  ];

  // Qualification hierarchy rank for matching
  const qualRank: Record<string, number> = {
    '10th Pass': 1,
    '10th': 1,
    '12th Pass': 2,
    '12th': 2,
    'ITI': 2,
    'Diploma': 3,
    'Graduation': 4,
    'Post Graduation': 5,
  };

  // Eligibility Evaluation Engine
  const evaluatedJobs = useMemo(() => {
    return recruitments.map((job) => {
      const issues: string[] = [];
      const checkItems: string[] = [];
      const matchPositives: string[] = [];

      // 1. Qualification Evaluation
      const userRank = qualRank[candidateProfile.qualification] || 3;
      const jobRank = qualRank[job.qualificationLevel] || 3;

      if (userRank >= jobRank) {
        matchPositives.push(`Educational requirement (${job.qualificationLevel}) met by your ${candidateProfile.qualification}.`);
      } else {
        issues.push(`Requires minimum ${job.qualificationLevel}. Your profile lists ${candidateProfile.qualification}.`);
      }

      // 2. Age Evaluation with Category Relaxation
      let relaxationYears = 0;
      if (candidateProfile.category === 'OBC') relaxationYears = 3;
      if (candidateProfile.category === 'SC' || candidateProfile.category === 'ST') relaxationYears = 5;

      const effectiveMaxAge = job.maxAge + relaxationYears;

      if (candidateProfile.age < job.minAge) {
        issues.push(`Candidate age (${candidateProfile.age} yrs) is below minimum age of ${job.minAge} yrs as on ${job.ageReferenceDate}.`);
      } else if (candidateProfile.age > effectiveMaxAge) {
        issues.push(`Candidate age (${candidateProfile.age} yrs) exceeds maximum age of ${effectiveMaxAge} yrs (including ${relaxationYears} yrs ${candidateProfile.category} relaxation).`);
      } else {
        matchPositives.push(`Age ${candidateProfile.age} yrs is within permissible limit (${job.minAge}–${effectiveMaxAge} yrs).`);
      }

      // 3. Gender Condition
      if (job.genderEligibility !== 'All' && job.genderEligibility !== candidateProfile.gender) {
        issues.push(`Recruitment restricted to ${job.genderEligibility} candidates only.`);
      }

      // 4. Central vs State / Domicile
      if (candidateProfile.centralOnly && !job.isCentral) {
        issues.push(`State-level vacancy excluded by Central Government filter.`);
      }

      if (!job.isCentral && job.state !== candidateProfile.state) {
        checkItems.push(`Vacancy is in ${job.state}. Candidates from other states are considered under Unreserved / General quota.`);
      }

      // 5. Technical / Typing skills verification
      if (job.id === 'ssc-cgl-2025') {
        checkItems.push('Computer Knowledge Test (qualifying) and 27-30 WPM data entry speed required for final appointment.');
      }
      if (job.id === 'railway-alp-2025') {
        if (!['ITI', 'Diploma', 'Graduation'].includes(candidateProfile.qualification)) {
          issues.push('ALP requires Matriculation + ITI in specified trades or Engineering Diploma/Degree.');
        } else {
          checkItems.push('A-1 Medical Vision (6/6 distant vision without glasses, fogging test) is strictly mandatory.');
        }
      }

      // Determine 3 Eligibility States
      let status: 'ELIGIBLE' | 'CHECK REQUIRED' | 'NOT ELIGIBLE' = 'ELIGIBLE';
      let summaryExplanation = '';

      if (issues.length > 0) {
        status = 'NOT ELIGIBLE';
        summaryExplanation = issues.join(' ');
      } else if (checkItems.length > 0) {
        status = 'CHECK REQUIRED';
        summaryExplanation = `${matchPositives.join(' ')} Manual verification needed: ${checkItems.join(' ')}`;
      } else {
        status = 'ELIGIBLE';
        summaryExplanation = `${matchPositives.join(' ')} Your entered profile satisfies all verified mandatory eligibility conditions.`;
      }

      return {
        job,
        status,
        summaryExplanation,
        matchPositives,
        issues,
        checkItems,
      };
    });
  }, [recruitments, candidateProfile]);

  const filteredMatches = evaluatedJobs.filter((item) => {
    if (filterResultState === 'all') return true;
    if (filterResultState === 'eligible') return item.status === 'ELIGIBLE';
    if (filterResultState === 'check') return item.status === 'CHECK REQUIRED';
    if (filterResultState === 'not_eligible') return item.status === 'NOT ELIGIBLE';
    return true;
  });

  const eligibleCount = evaluatedJobs.filter(j => j.status === 'ELIGIBLE').length;
  const checkCount = evaluatedJobs.filter(j => j.status === 'CHECK REQUIRED').length;
  const notEligibleCount = evaluatedJobs.filter(j => j.status === 'NOT ELIGIBLE').length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-sky-100 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Assisted Qualification Rule Engine
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Find Government Jobs Tailored To Your Profile
          </h1>
          <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-normal">
            Enter your exact qualification, category, age, and state. Our matching algorithm computes age relaxations, reservation eligibility, and technical prerequisites.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Profile Form, Right Evaluated Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Profile Settings (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">Your Candidate Profile</h2>
            </div>
            <button
              onClick={() => {
                setCandidateProfile({
                  qualification: 'Graduation',
                  degree: 'B.Sc (Computer Science)',
                  age: 23,
                  category: 'OBC',
                  state: 'Uttar Pradesh',
                  gender: 'Male',
                  typingSpeedWpm: 35,
                  hasDrivingLicense: true,
                  hasComputerCertificate: true,
                  centralOnly: false,
                });
              }}
              className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Qualification */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Highest Qualification</label>
              <select
                value={candidateProfile.qualification}
                onChange={(e) => setCandidateProfile(p => ({ ...p, qualification: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            {/* Degree / Stream */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Degree / Stream</label>
              <select
                value={candidateProfile.degree}
                onChange={(e) => setCandidateProfile(p => ({ ...p, degree: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {degrees.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Age & Category in 2 cols */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Candidate Age</label>
                <input
                  type="number"
                  min={16}
                  max={55}
                  value={candidateProfile.age}
                  onChange={(e) => setCandidateProfile(p => ({ ...p, age: parseInt(e.target.value) || 18 }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">Category</label>
                <select
                  value={candidateProfile.category}
                  onChange={(e) => setCandidateProfile(p => ({ ...p, category: e.target.value as any }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* State Domicile */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Home State (Domicile)</label>
              <select
                value={candidateProfile.state}
                onChange={(e) => setCandidateProfile(p => ({ ...p, state: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Gender</label>
              <div className="flex gap-2">
                {['Male', 'Female'].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setCandidateProfile(p => ({ ...p, gender: g as any }))}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      candidateProfile.gender === g
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills & Checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={candidateProfile.hasComputerCertificate}
                  onChange={(e) => setCandidateProfile(p => ({ ...p, hasComputerCertificate: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>CCC / Basic Computer Knowledge Certificate</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={candidateProfile.hasDrivingLicense}
                  onChange={(e) => setCandidateProfile(p => ({ ...p, hasDrivingLicense: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Valid Light Motor Vehicle (LMV) Driving License</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={candidateProfile.centralOnly}
                  onChange={(e) => setCandidateProfile(p => ({ ...p, centralOnly: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Only Show Central Government Jobs</span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                if (user) {
                  setUser({ ...user, ...candidateProfile });
                }
              }}
              className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Save & Update Profile</span>
            </button>
          </div>
        </div>

        {/* Right Area: Evaluated Recruitment Results (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Summary Metric Strip */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setFilterResultState('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  filterResultState === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Analyzed ({evaluatedJobs.length})
              </button>

              <button
                onClick={() => setFilterResultState('eligible')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filterResultState === 'eligible' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligible ({eligibleCount})</span>
              </button>

              <button
                onClick={() => setFilterResultState('check')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filterResultState === 'check' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Check Required ({checkCount})</span>
              </button>

              <button
                onClick={() => setFilterResultState('not_eligible')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filterResultState === 'not_eligible' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Not Eligible ({notEligibleCount})</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              *Final eligibility is determined by the recruiting authority.
            </p>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                <p className="text-slate-500 font-medium">No recruitments match the current eligibility filter.</p>
              </div>
            ) : (
              filteredMatches.map(({ job, status, summaryExplanation, matchPositives, issues, checkItems }) => {
                const saved = isJobSaved(job.id);
                return (
                  <div
                    key={job.id}
                    className={`bg-white rounded-2xl p-5 border transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
                      status === 'ELIGIBLE' 
                        ? 'border-emerald-200 hover:border-emerald-400' 
                        : status === 'CHECK REQUIRED'
                        ? 'border-amber-200 hover:border-amber-400'
                        : 'border-slate-200 opacity-90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        <OfficialEmblem type={job.logoType} size={54} />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            {/* 3 Status States */}
                            {status === 'ELIGIBLE' && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                ELIGIBLE
                              </span>
                            )}
                            {status === 'CHECK REQUIRED' && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                CHECK REQUIRED
                              </span>
                            )}
                            {status === 'NOT ELIGIBLE' && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" />
                                NOT ELIGIBLE
                              </span>
                            )}

                            <span className="text-xs text-slate-500 font-medium">
                              {job.isCentral ? 'Central Govt' : job.state}
                            </span>
                          </div>

                          <h3 
                            onClick={() => setSelectedRecruitment(job)}
                            className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors cursor-pointer mt-1"
                          >
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {job.organization} · {job.totalPosts.toLocaleString('en-IN')} Vacancies
                          </p>
                        </div>
                      </div>

                      {/* Right buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        <button
                          onClick={() => setSelectedRecruitment(job)}
                          className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* Eligibility Explanation Card */}
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs leading-relaxed space-y-1.5">
                      <p className="font-semibold text-slate-800">
                        {summaryExplanation}
                      </p>
                      
                      {issues.length > 0 && (
                        <div className="text-rose-600 font-medium pt-1">
                          ❌ Disqualifying Factor: {issues.join(' | ')}
                        </div>
                      )}

                      {checkItems.length > 0 && (
                        <div className="text-amber-800 font-medium pt-1">
                          ⚠️ Specific Condition to check: {checkItems.join(' | ')}
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>Deadline: <strong className="text-slate-800">{job.deadlineDateString}</strong> ({job.daysLeft} days left)</span>
                      <span>Min Age: {job.minAge} | Max: {job.maxAge} | Fee: ₹{job.applicationFee.generalOBC}</span>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
