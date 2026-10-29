import React from 'react';
import { Wrench, ArrowRight, Image as ImageIcon, PenTool, FileText, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FormToolsCard: React.FC = () => {
  const { setActiveToolModal } = useApp();

  const tools = [
    {
      id: 'photo-resizer',
      name: 'Photo Resizer',
      icon: ImageIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      iconColor: 'text-blue-500',
      target: '3.5 x 4.5 cm (20-50 KB)',
    },
    {
      id: 'signature-resizer',
      name: 'Signature Resizer',
      icon: PenTool,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      iconColor: 'text-sky-500',
      target: '10-20 KB Black Ink',
    },
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      icon: FileText,
      color: 'bg-red-50 text-red-600 border-red-100',
      iconColor: 'text-red-500',
      target: 'Certificates & Domicile',
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      icon: FileDown,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      iconColor: 'text-emerald-500',
      target: 'Compress under 300 KB',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-extrabold text-slate-900">Popular Tools for Form Filling</h3>
        </div>
        <button
          onClick={() => setActiveToolModal('all')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Tool Cards Grid matching screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3.5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveToolModal(tool.id)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 border ${tool.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 leading-tight">
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper note */}
      <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Compliant with SSC, RRB, UP Police & IBPS size limits</span>
        <span className="font-semibold text-blue-600">Powered by RajToolBox</span>
      </div>
    </div>
  );
};
