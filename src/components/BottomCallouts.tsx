import React from 'react';
import { ArrowRight, Bell, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomCallouts: React.FC = () => {
  const { user, setIsAuthModalOpen, setActiveTab } = useApp();

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Left: Create Your Free Account */}
        <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-white rounded-2xl p-5 border border-blue-100/80 shadow-[0_4px_20px_rgba(0,102,204,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Student Avatar Icon */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-500 to-sky-400 p-0.5 shadow-md shadow-blue-500/20 shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-blue-600 font-bold text-xl">
                👩‍🎓
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-[17px] font-black text-slate-900 leading-tight">
                {user ? `Welcome Back, ${user.name}!` : 'Create Your Free Account'}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5 max-w-md">
                {user 
                  ? 'Access your saved recruitments, checklist progress, and application status.'
                  : 'Save Jobs, Track Applications, Get Personalized Alerts and Never Miss an Opportunity!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (user) {
                setActiveTab('my-jobs');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            <span>{user ? 'My Dashboard' : 'Sign Up Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Get Job Alerts on Your Qualification */}
        <div className="bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-white rounded-2xl p-5 border border-amber-100/80 shadow-[0_4px_20px_rgba(245,158,11,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Notification Bell Icon */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-md shadow-amber-500/20 shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-amber-500 font-bold">
                <Bell className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-[17px] font-black text-slate-900 leading-tight">
                Get Job Alerts on Your Qualification
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5 max-w-md">
                Be the first to know about new vacancies that match your profile.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('find-jobs')}
            className="bg-white hover:bg-blue-50 border-2 border-[#1A73E8] text-[#1A73E8] text-xs sm:text-sm font-bold py-2 px-5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 shadow-sm"
          >
            <span>Set Alert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
