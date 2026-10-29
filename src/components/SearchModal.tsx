import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OfficialEmblem } from './OfficialEmblem';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, recruitments, setSelectedRecruitment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchModalOpen) return null;

  const results = recruitments.filter((r) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.title.toLowerCase().includes(term) ||
      r.organization.toLowerCase().includes(term) ||
      r.category.toLowerCase().includes(term) ||
      r.qualificationLevel.toLowerCase().includes(term) ||
      r.state.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type qualification (e.g. 10th, 12th, B.Tech), exam (SSC, Railway, Police), or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-2">
          <div className="text-[11px] font-bold text-slate-400 px-3 uppercase tracking-wider">
            {searchTerm ? `Found ${results.length} Matching Vacancies` : 'Popular Current Vacancies'}
          </div>

          {results.map((job) => (
            <div
              key={job.id}
              onClick={() => {
                setSelectedRecruitment(job);
                setIsSearchModalOpen(false);
              }}
              className="p-3.5 rounded-2xl hover:bg-sky-50/70 border border-transparent hover:border-blue-100 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5">
                <OfficialEmblem type={job.logoType} size={42} />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{job.organization}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700">{job.totalPosts.toLocaleString('en-IN')} Posts</span>
                    <span>·</span>
                    <span>{job.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {job.daysLeft}d left
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Search across Central & State Government Recruitment Portals</span>
          <span className="font-mono text-[11px] text-slate-400">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
