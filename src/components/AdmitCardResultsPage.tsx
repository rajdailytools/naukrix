import React, { useState } from 'react';
import { Award, FileText, ExternalLink, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OfficialEmblem } from './OfficialEmblem';

interface Props {
  initialType?: 'admit-card' | 'results';
}

export const AdmitCardResultsPage: React.FC<Props> = ({ initialType = 'admit-card' }) => {
  const { recruitments, setSelectedRecruitment } = useApp();
  const [viewType, setViewType] = useState<'admit-card' | 'results'>(initialType);

  const admitCardItems = [
    {
      id: 'ssc-cgl-admit',
      title: 'SSC CGL 2025 Tier-I Application Status & Admit Card',
      org: 'Staff Selection Commission (SSC)',
      status: 'Admit Card Expected 07 Sept 2025',
      date: '07 Sept 2025',
      examDate: '15-26 Sept 2025',
      logo: 'ssc' as const,
      link: 'https://ssc.gov.in',
      isLive: false,
    },
    {
      id: 'railway-alp-city',
      title: 'RRB ALP 2025 Exam City Intimation Slip & Call Letter',
      org: 'Railway Recruitment Boards',
      status: 'City Slip 10 Days Before CBT 1',
      date: 'Late October 2025',
      examDate: 'November 2025',
      logo: 'railway' as const,
      link: 'https://rrbapply.gov.in',
      isLive: false,
    },
    {
      id: 'up-police-admit',
      title: 'UP Police Constable 60,244 Written Exam Admit Card',
      org: 'UPPRPB Lucknow',
      status: 'Available on Official Portal (Active Link)',
      date: 'Official Download Active',
      examDate: 'October 2025',
      logo: 'police' as const,
      link: 'https://uppbpb.gov.in',
      isLive: true,
    },
    {
      id: 'ibps-clerk-call',
      title: 'IBPS Clerk XV Prelims Online Exam Call Letter',
      org: 'Institute of Banking Personnel Selection',
      status: 'To be Released 7 Days Prior to Exam',
      date: 'Expected Late September 2025',
      examDate: 'October 2025',
      logo: 'ibps' as const,
      link: 'https://ibps.in',
      isLive: false,
    },
  ];

  const resultsItems = [
    {
      id: 'ssc-chsl-result',
      title: 'SSC CHSL 10+2 Tier-I Cutoff Marks & Scorecard Declared',
      org: 'Staff Selection Commission',
      date: '12 August 2025',
      status: 'Result Declared',
      logo: 'ssc' as const,
      link: 'https://ssc.gov.in',
      cutoff: 'UR: 153.25 | OBC: 152.10 | SC: 136.40',
    },
    {
      id: 'rrb-tech-result',
      title: 'RRB Technician Grade III CBT Final Merit List & Document Verification',
      org: 'Indian Railways (RRB)',
      date: '08 August 2025',
      status: 'DV List Released',
      logo: 'railway' as const,
      link: 'https://rrbapply.gov.in',
      cutoff: 'Zone wise PDF Available',
    },
    {
      id: 'ibps-po-final',
      title: 'IBPS PO XIV Provisional Bank Allotment & Scorecard',
      org: 'Institute of Banking Personnel Selection',
      date: '02 August 2025',
      status: 'Final Selection List',
      logo: 'ibps' as const,
      link: 'https://ibps.in',
      cutoff: 'Bank wise cutoffs published',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner with Toggle */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {viewType === 'admit-card' ? 'Admit Cards & Hall Tickets' : 'Government Exam Results & Scorecards'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track official examination city slips, hall ticket releases, and cutoff scorecards.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setViewType('admit-card')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewType === 'admit-card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admit Cards 2025
          </button>

          <button
            onClick={() => setViewType('results')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewType === 'results' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Latest Results
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {viewType === 'admit-card' ? (
          admitCardItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <OfficialEmblem type={item.logo} size={54} />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.isLive ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 animate-pulse">
                        ● Live Download
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {item.status}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 font-medium">Exam Date: {item.examDate}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.org}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                    item.isLive
                      ? 'bg-[#1A73E8] hover:bg-[#1557B0] text-white shadow-md shadow-blue-500/20'
                      : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{item.isLive ? 'Download Admit Card' : 'Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        ) : (
          resultsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <OfficialEmblem type={item.logo} size={54} />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Declared: {item.date}</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.org} · {item.cutoff}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <span>Check Official Result</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
