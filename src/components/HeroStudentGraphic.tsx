import React, { useState } from 'react';
import { Briefcase, Building2, FileText, Bell } from 'lucide-react';

export const HeroStudentGraphic: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Background Architectural Domes & Skyline Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex items-end justify-center">
        <svg viewBox="0 0 500 300" className="w-full h-auto text-sky-300 stroke-current fill-sky-100/40">
          {/* Central Dome (Rashtrapati Bhavan / Parliament style) */}
          <path d="M210 260 L210 180 C210 140 290 140 290 180 L290 260 Z" strokeWidth="2" />
          <path d="M250 120 L250 140" strokeWidth="3" />
          <circle cx="250" cy="116" r="4" fill="currentColor" />
          {/* Pillars */}
          <rect x="220" y="190" width="8" height="70" rx="2" fill="white" strokeWidth="1" />
          <rect x="236" y="190" width="8" height="70" rx="2" fill="white" strokeWidth="1" />
          <rect x="256" y="190" width="8" height="70" rx="2" fill="white" strokeWidth="1" />
          <rect x="272" y="190" width="8" height="70" rx="2" fill="white" strokeWidth="1" />
          {/* Flanking domes */}
          <path d="M140 260 L140 200 C140 170 190 170 190 200 L190 260 Z" strokeWidth="1.5" />
          <path d="M310 260 L310 200 C310 170 360 170 360 200 L360 260 Z" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating Paper Airplane */}
      <div className="absolute top-12 left-6 z-10 animate-bounce duration-1000 hidden sm:block">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <path d="M4 21 L38 4 L23 38 L19 25 L4 21 Z" fill="#0284C7" />
          <path d="M19 25 L38 4 L23 38 L19 25 Z" fill="#0369A1" />
          <path d="M19 25 L23 38 L25 28 L19 25 Z" fill="#38BDF8" />
        </svg>
      </div>

      {/* Handwritten Hindi/Hinglish Text with Arrow */}
      <div className="absolute -top-1 left-2 sm:left-12 z-20 hidden md:block">
        <div className="font-handwriting text-2xl text-slate-800 leading-tight transform -rotate-6">
          <p className="font-bold text-slate-800">Naukri ki</p>
          <p className="text-slate-700">sahi direction,</p>
          <p className="text-blue-700 font-bold">ab Naukrix ke saath!</p>
        </div>
        {/* Curved arrow pointing to student */}
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-slate-800 stroke-current -mt-1 ml-10">
          <path d="M5 5 C 20 25, 40 30, 52 20" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M48 27 L54 19 L44 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Student Portrait Area with seamless fallback */}
      <div className="relative z-10 w-[240px] sm:w-[290px] lg:w-[320px] h-[340px] sm:h-[390px] flex items-end justify-center">
        {/* We use an image container that crops the student cleanly */}
        <div className="relative w-full h-full flex items-end justify-center overflow-visible">
          {imgLoaded ? (
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Background circular halo */}
              <div className="absolute bottom-6 w-64 h-64 bg-gradient-to-tr from-sky-200/50 to-blue-100/30 rounded-full blur-xl -z-10" />
              
              {/* Image from public reference mockup cropped to student */}
              <div className="relative w-[280px] sm:w-[310px] h-[360px] sm:h-[400px] overflow-hidden rounded-b-3xl">
                <img 
                  src="/assets/aistudio/file_00000000dc248211b3209a71cbd395f8_835f97b7.png" 
                  alt="Naukrix Government Exam Student Aspirant"
                  className="w-[1100px] max-w-none absolute -top-[45px] sm:-top-[50px] -left-[640px] sm:-left-[710px] object-cover pointer-events-none drop-shadow-lg"
                  onError={() => setImgLoaded(false)}
                />
              </div>
            </div>
          ) : (
            /* Vector Artistic Fallback in case image fails */
            <div className="w-64 h-80 rounded-2xl bg-gradient-to-t from-sky-600 via-sky-500 to-sky-400 p-6 text-white flex flex-col justify-end shadow-xl border-4 border-white">
              <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold">🎓</span>
              </div>
              <p className="text-center font-bold text-lg">Naukrix Aspirant</p>
              <p className="text-center text-xs text-sky-100">Your Dream Sarkari Naukri</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Vertical Stat Cards on the far right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 hidden xl:flex">
        {/* 10,000+ Government Jobs */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-center gap-3.5 hover:translate-x-[-4px] transition-transform">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-none">10,000+</div>
            <div className="text-[12px] text-slate-500 font-medium mt-0.5">Government Jobs</div>
          </div>
        </div>

        {/* 50+ Departments */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-center gap-3.5 hover:translate-x-[-4px] transition-transform">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-none">50+</div>
            <div className="text-[12px] text-slate-500 font-medium mt-0.5">Departments</div>
          </div>
        </div>

        {/* All States Coverage */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-center gap-3.5 hover:translate-x-[-4px] transition-transform">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-none">All States</div>
            <div className="text-[12px] text-slate-500 font-medium mt-0.5">Coverage</div>
          </div>
        </div>

        {/* Real Time Updates */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-center gap-3.5 hover:translate-x-[-4px] transition-transform">
          <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-none">Real Time</div>
            <div className="text-[12px] text-slate-500 font-medium mt-0.5">Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
};
