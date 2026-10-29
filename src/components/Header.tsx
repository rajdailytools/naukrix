import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, X, User as UserIcon, Shield, Bookmark, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    user, 
    setIsAuthModalOpen, 
    setIsSearchModalOpen, 
    setIsNotificationOpen, 
    unreadCount,
    savedJobs 
  } = useApp();

  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'find-jobs', label: 'Find My Jobs' },
    { id: 'latest-jobs', label: 'Latest Jobs' },
    { id: 'admit-card', label: 'Admit Card' },
    { id: 'results', label: 'Results' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'exam-pattern', label: 'Exam Pattern' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 shrink-0 select-none group"
        >
          {/* Hexagon/Rounded N Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1565C8] to-[#0284C7] flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v16" />
              <path d="M4 5l16 14" />
              <path d="M20 4v16" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-[25px] font-extrabold tracking-tight text-[#0F172A] leading-none">Naukrix</span>
              <span className="text-[25px] font-extrabold text-[#0284C7] leading-none">.in</span>
            </div>
            <span className="text-[9.5px] font-medium tracking-tight text-slate-500 mt-1 whitespace-nowrap hidden sm:block">
              Your Qualification. Your Government Job.
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#EBF5FE] text-[#0284C7] font-semibold'
                    : 'text-slate-700 hover:text-[#0284C7] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
              className={`px-3 py-1.5 rounded-full text-[14px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                ['tools', 'my-jobs', 'admin'].includes(activeTab)
                  ? 'bg-[#EBF5FE] text-[#0284C7] font-semibold'
                  : 'text-slate-700 hover:text-[#0284C7] hover:bg-slate-50'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreDropdownOpen ? 'rotate-180 text-[#0284C7]' : ''}`} />
            </button>

            {isMoreDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => handleNavClick('my-jobs')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-blue-600 flex items-center gap-2.5"
                >
                  <Bookmark className="w-4 h-4 text-blue-500" />
                  <span>My Saved Jobs ({savedJobs.length})</span>
                </button>

                <button
                  onClick={() => handleNavClick('tools')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-blue-600 flex items-center gap-2.5"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                  <span>RajToolBox Photo Resizer</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-blue-600 flex items-center gap-2.5 border-t border-slate-100 mt-1 pt-2"
                >
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Admin Panel</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons & Login */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            title="Search Government Jobs"
            className="w-10 h-10 rounded-full border border-slate-200/80 hover:border-blue-400 bg-white hover:bg-sky-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            title="Job Notifications & Updates"
            className="relative w-10 h-10 rounded-full border border-slate-200/80 hover:border-blue-400 bg-white hover:bg-sky-50 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute 1 top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
            )}
          </button>

          {/* User / Login Button */}
          {user ? (
            <button
              onClick={() => handleNavClick('my-jobs')}
              className="flex items-center gap-2 bg-[#F0F8FF] hover:bg-[#E2F0FE] text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="max-w-[100px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-4 sm:px-5 py-2 rounded-full font-semibold text-[13.5px] flex items-center gap-2 shadow-sm shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
            >
              <UserIcon className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-sky-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('my-jobs')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>My Saved Jobs & Tracker</span>
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-bold">{savedJobs.length}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-purple-700 hover:bg-purple-50"
            >
              Admin Recruitment Control
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
