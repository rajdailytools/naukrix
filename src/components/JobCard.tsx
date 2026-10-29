import React from 'react';
import { GraduationCap, Briefcase, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import { Recruitment } from '../types/job';
import { OfficialEmblem } from './OfficialEmblem';
import { useApp } from '../context/AppContext';

interface JobCardProps {
  job: Recruitment;
  onViewDetails: (job: Recruitment) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const { toggleSaveJob, isJobSaved } = useApp();
  const saved = isJobSaved(job.id);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 hover:border-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.08)] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
      
      {/* Left side: Emblem & Details */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
        <OfficialEmblem type={job.logoType} size={54} className="group-hover:scale-105 transition-transform" />

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 
              onClick={() => onViewDetails(job)}
              className="text-base sm:text-[17px] font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight"
            >
              {job.title}
            </h3>

            {/* Mobile Form Open Badge */}
            <span className="md:hidden inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {job.status}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-slate-500 font-medium">
            {job.organization}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-600 pt-0.5">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
              <span>{job.category}</span>
            </span>

            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <span>{job.totalPosts.toLocaleString('en-IN')} Posts</span>
            </span>

            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{job.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Center & Right Info */}
      <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 sm:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
        
        {/* Desktop Status Badge */}
        <div className="hidden md:block">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F8F0] text-[#16A34A] border border-green-200/60 whitespace-nowrap">
            {job.status}
          </span>
        </div>

        {/* Last Date info */}
        <div className="text-left md:text-center min-w-[85px]">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">
            Last Date
          </span>
          <span className="text-xs sm:text-[13px] font-bold text-slate-900 block mt-0.5">
            {job.deadlineDateString}
          </span>
        </div>

        {/* Days Left highlight */}
        <div className="text-center min-w-[65px]">
          <span className="text-xl sm:text-2xl font-black text-rose-500 leading-none block">
            {job.daysLeft}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-rose-500 uppercase tracking-tight block">
            Days Left
          </span>
        </div>

        {/* Action Buttons: View Details & Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(job)}
            className="bg-[#1A73E8] hover:bg-[#1557B0] text-white py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleSaveJob(job.id)}
            title={saved ? 'Remove from Saved Jobs' : 'Save Job'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              saved 
                ? 'bg-blue-50 border-blue-300 text-blue-600' 
                : 'border-slate-200 hover:border-blue-300 text-slate-400 hover:text-blue-600 bg-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

      </div>

    </div>
  );
};
