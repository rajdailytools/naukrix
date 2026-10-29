import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobCard } from './JobCard';

export const LatestJobsPage: React.FC = () => {
  const { recruitments, setSelectedRecruitment, filters, setFilters, resetFilters } = useApp();

  const [sortBy, setSortBy] = useState<'deadline' | 'posts' | 'recent'>('deadline');

  const qualifications = ['All Qualifications', '10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduation', 'Post Graduation'];
  const states = ['All States', 'All India', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Delhi NCR'];
  const departments = ['All Departments', 'Staff Selection Commission', 'Indian Railways', 'Uttar Pradesh Police', 'Institute of Banking Personnel Selection', 'Ministry of Home Affairs - CAPFs', 'Indian Air Force'];

  const filteredJobs = useMemo(() => {
    return recruitments.filter((job) => {
      // Keyword
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(kw);
        const matchOrg = job.organization.toLowerCase().includes(kw);
        const matchCat = job.category.toLowerCase().includes(kw);
        if (!matchTitle && !matchOrg && !matchCat) return false;
      }
      // Qualification
      if (filters.qualification && filters.qualification !== 'All Qualifications') {
        if (!job.category.toLowerCase().includes(filters.qualification.toLowerCase()) && 
            !job.qualificationLevel.toLowerCase().includes(filters.qualification.toLowerCase())) {
          return false;
        }
      }
      // State
      if (filters.state && filters.state !== 'All States') {
        if (job.state !== filters.state && job.location !== filters.state && job.state !== 'All India') {
          return false;
        }
      }
      // Department
      if (filters.department && filters.department !== 'All Departments') {
        if (!job.organization.toLowerCase().includes(filters.department.toLowerCase()) &&
            !job.department.toLowerCase().includes(filters.department.toLowerCase())) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') return a.daysLeft - b.daysLeft;
      if (sortBy === 'posts') return b.totalPosts - a.totalPosts;
      return 0;
    });
  }, [recruitments, filters, sortBy]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              Latest Government Jobs 2025–2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing {filteredJobs.length} active recruitment notifications with live application links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="deadline">Deadline Approaching</option>
              <option value="posts">Highest Total Vacancies</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Search & Select Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Search Keyword */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by exam, department, post..."
              value={filters.keyword}
              onChange={(e) => setFilters(p => ({ ...p, keyword: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Qualification Filter */}
          <select
            value={filters.qualification}
            onChange={(e) => setFilters(p => ({ ...p, qualification: e.target.value }))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            {qualifications.map(q => <option key={q} value={q === 'All Qualifications' ? '' : q}>{q}</option>)}
          </select>

          {/* State Filter */}
          <select
            value={filters.state}
            onChange={(e) => setFilters(p => ({ ...p, state: e.target.value }))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            {states.map(s => <option key={s} value={s === 'All States' ? '' : s}>{s}</option>)}
          </select>

          {/* Reset button */}
          <div className="flex items-center gap-2">
            <select
              value={filters.department}
              onChange={(e) => setFilters(p => ({ ...p, department: e.target.value }))}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none cursor-pointer truncate"
            >
              {departments.map(d => <option key={d} value={d === 'All Departments' ? '' : d}>{d}</option>)}
            </select>

            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recruitment Cards List */}
      <div className="space-y-3.5">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No recruitment matches your filters</h3>
            <p className="text-xs text-slate-500">Try loosening your search keywords or resetting qualification and state filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={setSelectedRecruitment}
            />
          ))
        )}
      </div>

    </div>
  );
};
