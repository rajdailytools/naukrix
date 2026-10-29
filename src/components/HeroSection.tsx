import React, { useState } from 'react';
import { Search, MapPin, Building, ArrowRight, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroStudentGraphic } from './HeroStudentGraphic';

export const HeroSection: React.FC = () => {
  const { filters, setFilters, setActiveTab } = useApp();
  const [activeSearchTab, setActiveSearchTab] = useState<'find' | 'search' | 'state' | 'org'>('find');

  const qualificationsList = [
    '10th Pass',
    '12th Pass',
    'ITI',
    'Diploma',
    'Graduation',
    'Post Graduation',
    'B.Tech / B.E',
    'B.Ed / D.El.Ed',
  ];

  const categoriesList = ['General (UR)', 'EWS', 'OBC (Non-Creamy)', 'SC', 'ST'];

  const statesList = [
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

  const popularTags = [
    { label: '10th Pass Jobs', qualification: '10th Pass' },
    { label: '12th Pass Jobs', qualification: '12th Pass' },
    { label: 'Graduation Jobs', qualification: 'Graduation' },
    { label: 'Railway Jobs', department: 'Indian Railways' },
    { label: 'SSC Jobs', department: 'Staff Selection Commission' },
    { label: 'State Govt Jobs', isCentral: false },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('find-jobs');
  };

  const handlePopularTagClick = (tag: typeof popularTags[0]) => {
    if (tag.qualification) {
      setFilters(prev => ({ ...prev, qualification: tag.qualification! }));
    }
    if (tag.department) {
      setFilters(prev => ({ ...prev, department: tag.department! }));
    }
    setActiveTab('latest-jobs');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E9F4FE] via-[#F1F8FE] to-[#F4F9FE] pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-sky-100/60">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Search Form */}
          <div className="lg:col-span-7 xl:col-span-7 z-10">
            {/* Main Headline */}
            <h1 className="text-[34px] sm:text-[44px] xl:text-[50px] font-black text-[#0F172A] leading-[1.15] tracking-tight">
              Apni Qualification ke hisaab se{' '}
              <span className="text-[#1A73E8] inline-block">Sarkari Naukri</span> dhoondhna{' '}
              <br className="hidden sm:inline" />
              ab hua <span className="text-[#0284C7] inline-block font-extrabold">super easy!</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed max-w-2xl">
              Find latest government jobs, check eligibility, important dates, form process, exam pattern and more — all in one place.
            </p>

            {/* Quick Search Card Tabs */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('find')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSearchTab === 'find'
                      ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find My Jobs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSearchTab('search');
                    setActiveTab('latest-jobs');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSearchTab === 'search'
                      ? 'bg-[#1A73E8] text-white'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Jobs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSearchTab('state');
                    setFilters(prev => ({ ...prev, state: 'Uttar Pradesh' }));
                    setActiveTab('latest-jobs');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSearchTab === 'state'
                      ? 'bg-[#1A73E8] text-white'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>State Wise Jobs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSearchTab('org');
                    setActiveTab('latest-jobs');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSearchTab === 'org'
                      ? 'bg-[#1A73E8] text-white'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Organization Wise</span>
                </button>
              </div>

              {/* Main White Search Form Box */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-[0_8px_30px_rgba(0,102,204,0.08)] border border-blue-100/70"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3.5 sm:gap-4 items-end">
                  
                  {/* Qualification Select */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-800 flex items-center justify-between">
                      <span>Qualification</span>
                    </label>
                    <div className="relative">
                      <select
                        value={filters.qualification}
                        onChange={(e) => setFilters(prev => ({ ...prev, qualification: e.target.value }))}
                        className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-8"
                      >
                        <option value="">Select Qualification</option>
                        {qualificationsList.map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Age Select */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-800">
                      <span>Age</span>
                    </label>
                    <div className="relative">
                      <select
                        value={filters.age}
                        onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}
                        className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-8"
                      >
                        <option value="">Select Age</option>
                        {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35, 40].map(a => (
                          <option key={a} value={a.toString()}>{a} Years</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Select */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-800">
                      <span>Category</span>
                    </label>
                    <div className="relative">
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-8"
                      >
                        <option value="">Select Category</option>
                        {categoriesList.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* State Select */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-slate-800">
                      <span>State</span>
                    </label>
                    <div className="relative">
                      <select
                        value={filters.state}
                        onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer pr-8"
                      >
                        <option value="">Select State</option>
                        {statesList.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Primary Find My Jobs Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95 h-[42px]"
                    >
                      <span>Find My Jobs</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Popular Searches shortcuts row */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Popular Searches:</span>
              {popularTags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePopularTagClick(tag)}
                  className="bg-[#E4F1FD] hover:bg-[#D5E9FC] text-[#0284C7] font-medium px-3 py-1 rounded-full transition-colors cursor-pointer text-[12px]"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            <HeroStudentGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
