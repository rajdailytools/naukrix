import React, { useState } from 'react';
import { X, User, Mail, GraduationCap, MapPin, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types/job';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'profile'>('login');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    qualification: user?.qualification || 'Graduation',
    degree: user?.degree || 'B.Sc (Computer Science)',
    age: user?.age || 23,
    category: user?.category || 'OBC',
    state: user?.state || 'Uttar Pradesh',
    gender: user?.gender || 'Male',
    typingSpeedWpm: user?.typingSpeedWpm || 35,
    hasDrivingLicense: user?.hasDrivingLicense ?? true,
    hasComputerCertificate: user?.hasComputerCertificate ?? true,
  });

  const [message, setMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      name: formData.name || 'Rahul Sharma',
      email: formData.email || 'aspirant@naukrix.in',
      qualification: formData.qualification,
      degree: formData.degree,
      age: Number(formData.age) || 22,
      category: formData.category as any,
      state: formData.state,
      gender: formData.gender as any,
      typingSpeedWpm: Number(formData.typingSpeedWpm) || 35,
      hasDrivingLicense: formData.hasDrivingLicense,
      hasComputerCertificate: formData.hasComputerCertificate,
      preferredDepartments: ['Staff Selection Commission', 'Indian Railways'],
    };

    setUser(newUser);
    setMessage('Account profile saved successfully!');
    setTimeout(() => {
      setMessage(null);
      setIsAuthModalOpen(false);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
              Naukrix Aspirant Portal
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {user ? 'My Candidate Account' : mode === 'login' ? 'Sign In to Naukrix' : 'Create Candidate Account'}
            </h3>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-white text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {message && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{message}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Candidate Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="candidate@example.com"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Qualification & Age */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Highest Qualification</label>
              <select
                value={formData.qualification}
                onChange={(e) => setFormData(p => ({ ...p, qualification: e.target.value }))}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {['10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduation', 'Post Graduation'].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Candidate Age</label>
              <input
                type="number"
                min={16}
                max={50}
                value={formData.age}
                onChange={(e) => setFormData(p => ({ ...p, age: parseInt(e.target.value) || 20 }))}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
              />
            </div>
          </div>

          {/* Category & State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Reservation Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(p => ({ ...p, category: e.target.value as any }))}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {['General', 'EWS', 'OBC', 'SC', 'ST'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Home State (Domicile)</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData(p => ({ ...p, state: e.target.value }))}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
              >
                {['Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Delhi NCR', 'Maharashtra', 'Haryana', 'West Bengal'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex items-center justify-between gap-3">
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold cursor-pointer"
              >
                Sign Out
              </button>
            )}

            <button
              type="submit"
              className="flex-1 bg-[#1A73E8] hover:bg-[#1557B0] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 cursor-pointer text-center"
            >
              {user ? 'Save Profile Changes' : 'Continue & Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
