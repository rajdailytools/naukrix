import React from 'react';
import { 
  Briefcase, 
  FileCheck2, 
  ClipboardList, 
  BookOpen, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Train, 
  School, 
  Plane, 
  Landmark, 
  Building2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CategoryChips: React.FC = () => {
  const { filters, setFilters, setActiveTab } = useApp();

  const categories = [
    { id: 'all', label: 'All Jobs', icon: Briefcase, color: 'text-blue-600 bg-blue-100/90' },
    { id: '10th', label: '10th Pass', icon: FileCheck2, color: 'text-emerald-600 bg-emerald-100/90' },
    { id: '12th', label: '12th Pass', icon: ClipboardList, color: 'text-amber-600 bg-amber-100/90' },
    { id: 'iti', label: 'ITI Jobs', icon: BookOpen, color: 'text-indigo-600 bg-indigo-100/90' },
    { id: 'diploma', label: 'Diploma', icon: Award, color: 'text-pink-600 bg-pink-100/90' },
    { id: 'graduation', label: 'Graduation', icon: GraduationCap, color: 'text-cyan-600 bg-cyan-100/90' },
    { id: 'post-graduation', label: 'Post Graduation', icon: GraduationCap, color: 'text-purple-600 bg-purple-100/90' },
    { id: 'police', label: 'Police Jobs', icon: ShieldCheck, color: 'text-sky-700 bg-sky-100/90' },
    { id: 'railway', label: 'Railway Jobs', icon: Train, color: 'text-rose-600 bg-rose-100/90' },
    { id: 'teaching', label: 'Teaching Jobs', icon: School, color: 'text-blue-700 bg-blue-100/90' },
    { id: 'defence', label: 'Defence Jobs', icon: Plane, color: 'text-teal-600 bg-teal-100/90' },
    { id: 'state', label: 'State Govt Jobs', icon: Landmark, color: 'text-emerald-700 bg-emerald-100/90' },
    { id: 'central', label: 'Central Govt Jobs', icon: Building2, color: 'text-slate-800 bg-slate-200/90' },
  ];

  const handleCategoryClick = (id: string, label: string) => {
    if (id === 'all') {
      setFilters(prev => ({ ...prev, qualification: '', department: '' }));
    } else if (['10th', '12th', 'iti', 'diploma', 'graduation', 'post-graduation'].includes(id)) {
      setFilters(prev => ({ ...prev, qualification: label }));
    } else if (id === 'police') {
      setFilters(prev => ({ ...prev, department: 'Police' }));
    } else if (id === 'railway') {
      setFilters(prev => ({ ...prev, department: 'Indian Railways' }));
    } else if (id === 'defence') {
      setFilters(prev => ({ ...prev, department: 'Defence' }));
    }
    setActiveTab('latest-jobs');
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
      {/* Category Horizontal Scrolling Container */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 hide-scrollbar justify-start xl:justify-between">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = 
            (cat.id === 'all' && !filters.qualification && !filters.department) ||
            filters.qualification === cat.label ||
            (cat.id === 'police' && filters.department === 'Police') ||
            (cat.id === 'railway' && filters.department === 'Indian Railways') ||
            (cat.id === 'defence' && filters.department === 'Defence');

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, cat.label)}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer shrink-0 min-w-[76px] sm:min-w-[84px] group ${
                isSelected 
                  ? 'bg-white shadow-[0_6px_20px_rgba(2,132,199,0.12)] border-2 border-blue-400 -translate-y-1' 
                  : 'bg-white/90 hover:bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${cat.color}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="mt-2 text-[11px] sm:text-[12px] font-bold text-slate-700 text-center whitespace-nowrap group-hover:text-blue-600">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
