import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { IMPORTANT_DATES_LIST } from '../data/mockRecruitments';
import { useApp } from '../context/AppContext';

export const ImportantDatesCard: React.FC = () => {
  const { recruitments, setSelectedRecruitment, setActiveTab } = useApp();

  const handleDateClick = (recruitmentId: string) => {
    const found = recruitments.find(r => r.id === recruitmentId);
    if (found) {
      setSelectedRecruitment(found);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-extrabold text-slate-900">Important Dates</h3>
        </div>
        <button
          onClick={() => setActiveTab('latest-jobs')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100 pt-1">
        {IMPORTANT_DATES_LIST.map((item) => (
          <div
            key={item.id}
            onClick={() => handleDateClick(item.recruitmentId)}
            className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/80 -mx-2 px-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Date Box */}
              <div className="w-11 h-12 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center shrink-0 group-hover:border-blue-300 group-hover:bg-blue-50/50 transition-colors">
                <span className="text-sm font-extrabold text-slate-900 leading-tight">
                  {item.day}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase leading-none">
                  {item.month}
                </span>
              </div>

              {/* Title */}
              <div className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                {item.title}
              </div>
            </div>

            {/* Days Left badge */}
            <span className="shrink-0 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              {item.daysLeft} Days Left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
