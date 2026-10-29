import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryChips } from './components/CategoryChips';
import { JobCard } from './components/JobCard';
import { ImportantDatesCard } from './components/ImportantDatesCard';
import { FormToolsCard } from './components/FormToolsCard';
import { BottomCallouts } from './components/BottomCallouts';
import { Footer } from './components/Footer';

// Modals & Sub-pages
import { JobDetailModal } from './components/JobDetailModal';
import { AuthModal } from './components/AuthModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { SearchModal } from './components/SearchModal';
import { RajToolboxModal } from './components/RajToolboxModal';

// Dedicated Full Pages
import { FindMyJobsPage } from './components/FindMyJobsPage';
import { LatestJobsPage } from './components/LatestJobsPage';
import { MyJobsDashboard } from './components/MyJobsDashboard';
import { AdmitCardResultsPage } from './components/AdmitCardResultsPage';
import { SyllabusExamPatternPage } from './components/SyllabusExamPatternPage';
import { AdminPanel } from './components/AdminPanel';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    recruitments, 
    selectedRecruitment, 
    setSelectedRecruitment 
  } = useApp();

  // Primary 4 latest jobs to match screenshot on home screen
  const homeDisplayJobs = recruitments.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F4F9FE] flex flex-col text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-700">
      
      {/* Top Navigation */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Exact Hero Section from Screenshot */}
            <HeroSection />

            {/* Horizontal Category Cards Row */}
            <CategoryChips />

            {/* Main 2-Column Split matching Screenshot */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Latest Government Jobs (~68% width = 8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🔥</span>
                        <h2 className="text-xl sm:text-[22px] font-black text-slate-900 tracking-tight leading-tight">
                          Latest Government Jobs
                        </h2>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-medium">
                        Stay updated with the newest job notifications
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('latest-jobs')}
                      className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Cards Exactly Matching Screenshot */}
                  <div className="space-y-3.5">
                    {homeDisplayJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onViewDetails={setSelectedRecruitment}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column: Important Dates & Popular Form Tools (~32% width = 4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Important Dates Card */}
                  <ImportantDatesCard />

                  {/* Popular Tools for Form Filling Card */}
                  <FormToolsCard />
                </div>

              </div>
            </section>

            {/* Bottom Callout Banners */}
            <BottomCallouts />
          </>
        )}

        {/* Find My Jobs Page (Eligibility Engine) */}
        {activeTab === 'find-jobs' && <FindMyJobsPage />}

        {/* Latest Jobs Filterable Catalog */}
        {activeTab === 'latest-jobs' && <LatestJobsPage />}

        {/* Admit Cards Page */}
        {activeTab === 'admit-card' && <AdmitCardResultsPage initialType="admit-card" />}

        {/* Results Page */}
        {activeTab === 'results' && <AdmitCardResultsPage initialType="results" />}

        {/* Syllabus & Exam Pattern */}
        {(activeTab === 'syllabus' || activeTab === 'exam-pattern') && (
          <SyllabusExamPatternPage />
        )}

        {/* My Jobs Tracker Dashboard */}
        {activeTab === 'my-jobs' && <MyJobsDashboard />}

        {/* RajToolBox Tools directory */}
        {activeTab === 'tools' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <FormToolsCard />
          </div>
        )}

        {/* Admin Panel */}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer with Independent Platform Disclaimer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      {selectedRecruitment && (
        <JobDetailModal
          job={selectedRecruitment}
          onClose={() => setSelectedRecruitment(null)}
        />
      )}

      <AuthModal />
      <NotificationDrawer />
      <SearchModal />
      <RajToolboxModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
