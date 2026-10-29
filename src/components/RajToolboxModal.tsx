import React from 'react';
import { X, ExternalLink, Image, PenTool, FileText, FileDown, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RajToolboxModal: React.FC = () => {
  const { activeToolModal, setActiveToolModal } = useApp();

  if (!activeToolModal) return null;

  const toolDetails = [
    {
      id: 'photo-resizer',
      name: 'Photo Resizer for Govt Forms',
      icon: Image,
      color: 'bg-blue-50 text-blue-600',
      specs: '3.5 cm x 4.5 cm | 20 KB to 50 KB | JPG / JPEG format | White background',
      exams: 'Required for SSC CGL/CHSL/GD, RRB ALP/NTPC, UPSC, and State Police portals.',
      tip: 'Do not wear spectacles or caps in live portal captures or passport uploads.',
      url: 'https://rajtoolbox.com/photo-resizer',
    },
    {
      id: 'signature-resizer',
      name: 'Signature Resizer (10 KB - 20 KB)',
      icon: PenTool,
      color: 'bg-sky-50 text-sky-600',
      specs: '140 x 60 pixels | 10 KB to 20 KB | Black or dark blue ballpoint pen on plain white paper',
      exams: 'Required by SSC, IBPS Banking, and Railway recruitment portals.',
      tip: 'Signatures in CAPITAL / BLOCK letters are rejected by SSC & IBPS rules.',
      url: 'https://rajtoolbox.com/signature-resizer',
    },
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF Converter for Certificates',
      icon: FileText,
      color: 'bg-red-50 text-red-600',
      specs: 'Merge multiple marksheets, domicile, or caste certificates into a single clean PDF under 500 KB.',
      exams: 'Required for UP Police, BPSC, MPESB, and State Commission portals.',
      tip: 'Ensure all edges and official stamps of your marksheets are clearly readable before converting.',
      url: 'https://rajtoolbox.com/jpg-to-pdf',
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor (<300 KB)',
      icon: FileDown,
      color: 'bg-emerald-50 text-emerald-600',
      specs: 'Compress scanned academic or category certificates to under 200 KB or 300 KB without losing text clarity.',
      exams: 'Universal requirement across all Indian Central & State Government job applications.',
      tip: 'Maintains high DPI text clarity while reducing file size to meet government portal upload caps.',
      url: 'https://rajtoolbox.com/pdf-compressor',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                RajToolBox Integration
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Government Exam Form Filling Tools
            </h3>
            <p className="text-xs text-slate-500">
              Resize your photograph, signature, and certificates to exact government portal dimensions.
            </p>
          </div>

          <button
            onClick={() => setActiveToolModal(null)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-white text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {toolDetails.map((tool) => {
            const Icon = tool.icon;
            const isHighlighted = activeToolModal === tool.id || activeToolModal === 'all';
            if (!isHighlighted) return null;

            return (
              <div 
                key={tool.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-2.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tool.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{tool.name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{tool.specs}</p>
                    </div>
                  </div>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                  >
                    <span>Open Tool</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                  <p><strong>Target Portals:</strong> {tool.exams}</p>
                  <p className="text-amber-800">💡 <strong>Crucial Guideline:</strong> {tool.tip}</p>
                </div>
              </div>
            );
          })}

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Brand Independence Note:</strong> Naukrix is an independent recruitment discovery platform. RajToolBox is a separate document utility platform. All photo and signature resizing happens securely in your browser without storing your documents on any private server.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by RajToolBox</span>
          <button
            onClick={() => setActiveToolModal(null)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
