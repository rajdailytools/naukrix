import React from 'react';
import { ShieldCheck, ExternalLink, Mail, ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 text-slate-600 text-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1565C8] to-[#0284C7] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4v16M4 5l16 14M20 4v16" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-slate-900 tracking-tight">Naukrix</span>
                <span className="text-2xl font-black text-[#0284C7]">.in</span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-sm">
              Your Qualification. Your Government Job.
              <br />
              India's intelligent recruitment discovery and exam guidance engine. Check eligibility, track official deadlines, view category-wise breakups, and download syllabus.
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Verified Official Sources
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <button onClick={() => { setActiveTab('home'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('find-jobs'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Find My Jobs (Eligibility)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('latest-jobs'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Latest Government Vacancies
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admit-card'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Admit Cards 2025
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('results'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Recruitment Results
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('syllabus'); scrollToTop(); }} className="hover:text-blue-600 transition-colors">
                  Exam Syllabus & Pattern
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              By Qualification
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">10th Pass Jobs</button></li>
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">12th Pass Jobs</button></li>
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">Graduation (BA, BSc, BCom)</button></li>
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">ITI / Technical Trades</button></li>
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">Engineering & Diploma</button></li>
              <li><button onClick={() => setActiveTab('latest-jobs')} className="hover:text-blue-600">Police & Defence Jobs</button></li>
            </ul>
          </div>

          {/* Form Filling Tools (RajToolBox Integration) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Form Filling Tools
            </h4>
            <p className="text-[11px] text-slate-500">
              Recommended independent tools by RajToolBox:
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="https://rajtoolbox.com/photo-resizer" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                  <span>Photo Resizer (20-50 KB)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://rajtoolbox.com/signature-resizer" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                  <span>Signature Resizer (10-20 KB)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://rajtoolbox.com/jpg-to-pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                  <span>JPG to PDF Converter</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href="https://rajtoolbox.com/pdf-compressor" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                  <span>PDF Compressor under 300 KB</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Independent Platform Disclaimer */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-700 mb-1">Disclaimer & Official Source Notice:</p>
          <p>
            Naukrix (naukrix.in) is an independent private educational and informational job-discovery portal. Naukrix is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the Government of India, Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), Union Public Service Commission (UPSC), State Police Departments, or any State or Central Government ministry. All official recruitment notifications, rules, eligibility conditions, and application forms belong to their respective government authorities. Candidates must verify all information from the official government websites before submitting applications.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-slate-500">
          <div>
            © 2026 Naukrix.in. All rights reserved. Designed for Indian Students & Aspirants.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-slate-400 hover:text-purple-600 font-medium"
            >
              Admin Access
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
