import React, { useState } from 'react';
import { BookOpen, AlertCircle, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OfficialEmblem } from './OfficialEmblem';

export const SyllabusExamPatternPage: React.FC = () => {
  const { recruitments } = useApp();
  const [selectedExamId, setSelectedExamId] = useState<string>('ssc-cgl-2025');

  const selectedJob = recruitments.find(r => r.id === selectedExamId) || recruitments[0];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          Exam Pattern & Official Syllabus Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
          Detailed breakdown of examination stages, section-wise marks, negative marking rules, and topic-wise syllabus verified from official recruitment notifications.
        </p>
      </div>

      {/* Select Exam Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 hide-scrollbar">
        {recruitments.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelectedExamId(job.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2.5 border ${
              selectedExamId === job.id
                ? 'bg-[#1A73E8] text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <OfficialEmblem type={job.logoType} size={24} />
            <span>{job.title}</span>
          </button>
        ))}
      </div>

      {/* Exam Details Card */}
      {selectedJob && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <OfficialEmblem type={selectedJob.logoType} size={60} />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedJob.title} — Exam Pattern & Scheme
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {selectedJob.organization} · Mode: Online CBT / OMR
                </p>
              </div>
            </div>

            {/* Negative Marking Badge */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-sm">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Negative Marking Rule:
              </div>
              <p>{selectedJob.negativeMarkingText}</p>
            </div>
          </div>

          {/* Exam Stages Tables */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900">Examination Stages & Marks Distribution</h3>
            {selectedJob.examStages && selectedJob.examStages.map((stage, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200">
                  <span className="font-extrabold text-slate-900 text-sm">{stage.stageName}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                    <span>Duration: {stage.duration}</span>
                    <span>·</span>
                    <span>Total Questions: {stage.totalQuestions}</span>
                    <span>·</span>
                    <span>Total Marks: {stage.totalMarks}</span>
                  </div>
                </div>

                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-white text-slate-600 border-b border-slate-100">
                    <tr>
                      <th className="p-3.5 font-bold">Paper Section / Subject</th>
                      <th className="p-3.5 text-right font-bold">Questions</th>
                      <th className="p-3.5 text-right font-bold">Maximum Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {stage.subjects.map((sub, sIdx) => (
                      <tr key={sIdx} className="hover:bg-slate-50">
                        <td className="p-3.5 font-semibold text-slate-800">{sub.name}</td>
                        <td className="p-3.5 text-right font-mono text-slate-600">{sub.questions}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-slate-900">{sub.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Detailed Syllabus Topics */}
          {selectedJob.syllabusTopics && selectedJob.syllabusTopics.length > 0 && (
            <div className="space-y-5 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Topic-Wise Verified Syllabus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedJob.syllabusTopics.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <h4 className="font-extrabold text-blue-700 text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {item.subject}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {item.topics.map((top, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
