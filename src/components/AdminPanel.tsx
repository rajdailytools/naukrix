import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Edit2, 
  CheckCircle, 
  Trash2, 
  Save, 
  AlertTriangle, 
  Eye, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Recruitment } from '../types/job';
import { OfficialEmblem } from './OfficialEmblem';

export const AdminPanel: React.FC = () => {
  const { recruitments, addRecruitment, updateRecruitment, deleteRecruitment, setSelectedRecruitment } = useApp();

  const [activeTab, setActiveTab] = useState<'manage' | 'create'>('manage');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // New Job Form State
  const [newJob, setNewJob] = useState<Partial<Recruitment>>({
    title: '',
    organization: '',
    department: '',
    category: 'Graduation',
    qualificationLevel: 'Graduation',
    totalPosts: 5000,
    location: 'All India',
    state: 'All India',
    isCentral: true,
    status: 'Form Open',
    startDate: new Date().toISOString().split('T')[0],
    lastDate: '2025-10-30',
    deadlineDateString: '30 Oct 2025',
    daysLeft: 30,
    minAge: 18,
    maxAge: 30,
    ageReferenceDate: '01-08-2025',
    ageRelaxation: 'OBC: 3 Years | SC/ST: 5 Years',
    genderEligibility: 'All',
    logoType: 'ssc',
    shortDescription: '',
    fullOverview: '',
    salaryPayScale: 'Pay Level 4 (₹25,500 - ₹81,100)',
    officialWebsite: 'https://ssc.gov.in',
    officialApplyUrl: 'https://ssc.gov.in',
    officialNotificationPdf: 'https://ssc.gov.in',
    negativeMarkingText: '0.50 marks penalty per wrong attempt.',
    isVerified: true,
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.organization) return;

    const id = newJob.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
    const created: Recruitment = {
      id,
      slug: id,
      title: newJob.title || 'Untitled Recruitment',
      organization: newJob.organization || 'Government Department',
      department: newJob.department || 'Central Services',
      logoType: (newJob.logoType as any) || 'ssc',
      category: newJob.category || 'Graduation',
      qualificationLevel: (newJob.qualificationLevel as any) || 'Graduation',
      requiredDegrees: ['Any Recognized Degree'],
      totalPosts: Number(newJob.totalPosts) || 1000,
      location: newJob.location || 'All India',
      state: newJob.state || 'All India',
      isCentral: Boolean(newJob.isCentral),
      status: (newJob.status as any) || 'Form Open',
      startDate: newJob.startDate || '2025-08-01',
      lastDate: newJob.lastDate || '2025-09-30',
      deadlineDateString: newJob.deadlineDateString || '30 Sep 2025',
      daysLeft: Number(newJob.daysLeft) || 30,
      minAge: Number(newJob.minAge) || 18,
      maxAge: Number(newJob.maxAge) || 30,
      ageReferenceDate: newJob.ageReferenceDate || '01-08-2025',
      ageRelaxation: newJob.ageRelaxation || 'Standard government relaxation',
      genderEligibility: 'All',
      applicationFee: { generalOBC: 100, scStPwD: 0, female: 0 },
      officialWebsite: newJob.officialWebsite || 'https://ssc.gov.in',
      officialApplyUrl: newJob.officialApplyUrl || 'https://ssc.gov.in',
      officialNotificationPdf: newJob.officialNotificationPdf || 'https://ssc.gov.in',
      shortDescription: newJob.shortDescription || 'Government examination recruitment notice.',
      fullOverview: newJob.fullOverview || 'Official gazetted recruitment notification.',
      salaryPayScale: newJob.salaryPayScale || 'Pay Level 4',
      negativeMarkingText: newJob.negativeMarkingText || 'Negative marking applies.',
      documentsRequired: [
        { id: 'doc-1', name: 'Scanned Photograph', required: true, format: 'JPG', maxSizeKb: 50, description: 'White background' },
        { id: 'doc-2', name: 'Signature', required: true, format: 'JPG', maxSizeKb: 20, description: 'Black ballpoint pen' },
      ],
      applicationSteps: [
        { stepNumber: 1, title: 'Visit Portal', instruction: 'Open official website and complete registration.' },
      ],
      faqs: [
        { question: 'What is the cutoff date?', answer: 'Check official notification for exact cutoff dates.' },
      ],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      isVerified: true,
    };

    addRecruitment(created);
    setActiveTab('manage');
  };

  const handleToggleVerification = (job: Recruitment) => {
    updateRecruitment(job.id, { isVerified: !job.isVerified });
  };

  const handleUpdateStatus = (job: Recruitment, newStatus: any) => {
    updateRecruitment(job.id, { status: newStatus });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Naukrix Content Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Official Recruitment Control Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Review gazette notices, update deadlines, approve verification status, and publish recruitment data for Indian aspirants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manage' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Manage ({recruitments.length})
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'create' ? 'bg-purple-600 text-white' : 'bg-purple-600/80 hover:bg-purple-600 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Post Vacancy</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MANAGE RECRUITMENTS */}
      {activeTab === 'manage' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Active Recruitment Database</h3>
            <span className="text-xs text-slate-500 font-mono">
              Total {recruitments.length} Records in Memory
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="p-4">Recruitment / Organization</th>
                  <th className="p-4">Posts</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recruitments.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <OfficialEmblem type={job.logoType} size={38} />
                        <div>
                          <div className="font-black text-slate-900">{job.title}</div>
                          <div className="text-[11px] text-slate-500">{job.organization}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-800">
                      {job.totalPosts.toLocaleString('en-IN')}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-800">{job.deadlineDateString}</div>
                      <div className="text-[11px] text-rose-600 font-bold">{job.daysLeft} days remaining</div>
                    </td>

                    <td className="p-4">
                      <select
                        value={job.status}
                        onChange={(e) => handleUpdateStatus(job, e.target.value)}
                        className="text-xs font-semibold px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg cursor-pointer"
                      >
                        <option value="Form Open">Form Open</option>
                        <option value="Closing Soon">Closing Soon</option>
                        <option value="Closing Today">Closing Today</option>
                        <option value="Application Closed">Application Closed</option>
                        <option value="Admit Card Released">Admit Card Released</option>
                        <option value="Exam Date Announced">Exam Date Announced</option>
                        <option value="Result Declared">Result Declared</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleVerification(job)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                          job.isVerified 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {job.isVerified ? '✓ Verified' : '⚠ Unverified'}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRecruitment(job)}
                          title="Preview Detail Page"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRecruitment(job.id)}
                          title="Delete Recruitment"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE RECRUITMENT FORM */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreateJob} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
            Add New Official Recruitment Notice
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Recruitment Title</label>
              <input
                type="text"
                required
                placeholder="e.g. DSSSB TGT & PGT Teacher Recruitment 2025"
                value={newJob.title}
                onChange={(e) => setNewJob(p => ({ ...p, title: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Recruiting Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Delhi Subordinate Services Selection Board"
                value={newJob.organization}
                onChange={(e) => setNewJob(p => ({ ...p, organization: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Department</label>
              <input
                type="text"
                placeholder="e.g. Directorate of Education Delhi"
                value={newJob.department}
                onChange={(e) => setNewJob(p => ({ ...p, department: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Qualification Level</label>
              <select
                value={newJob.qualificationLevel}
                onChange={(e) => setNewJob(p => ({ ...p, qualificationLevel: e.target.value as any, category: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
              >
                {['10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduation', 'Post Graduation'].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Total Posts / Vacancies</label>
              <input
                type="number"
                value={newJob.totalPosts}
                onChange={(e) => setNewJob(p => ({ ...p, totalPosts: parseInt(e.target.value) || 0 }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Emblem Logo Style</label>
              <select
                value={newJob.logoType}
                onChange={(e) => setNewJob(p => ({ ...p, logoType: e.target.value as any }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
              >
                <option value="ssc">SSC / Commission Style</option>
                <option value="railway">Indian Railways</option>
                <option value="police">Police & Law Enforcement</option>
                <option value="ibps">Banking & IBPS</option>
                <option value="defence">Defence & Forces</option>
                <option value="state">State Government</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Application Deadline</label>
              <input
                type="text"
                placeholder="e.g. 25 Oct 2025"
                value={newJob.deadlineDateString}
                onChange={(e) => setNewJob(p => ({ ...p, deadlineDateString: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Days Remaining</label>
              <input
                type="number"
                value={newJob.daysLeft}
                onChange={(e) => setNewJob(p => ({ ...p, daysLeft: parseInt(e.target.value) || 10 }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">State / Location</label>
              <input
                type="text"
                placeholder="e.g. Delhi NCR or All India"
                value={newJob.state}
                onChange={(e) => setNewJob(p => ({ ...p, state: e.target.value, location: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1 sm:col-span-3">
              <label className="font-bold text-slate-800">Official Portal Application URL</label>
              <input
                type="url"
                value={newJob.officialApplyUrl}
                onChange={(e) => setNewJob(p => ({ ...p, officialApplyUrl: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Verify & Publish Vacancy</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manage')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
