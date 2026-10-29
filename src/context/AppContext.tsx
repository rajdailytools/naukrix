import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recruitment, UserProfile, UserSavedJob, NotificationItem, UserApplicationStatus } from '../types/job';
import { INITIAL_RECRUITMENTS } from '../data/mockRecruitments';

interface SearchFilters {
  qualification: string;
  age: string;
  category: string;
  state: string;
  keyword: string;
  department: string;
  status: string;
  degree?: string;
  gender?: string;
}

interface AppContextType {
  recruitments: Recruitment[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  savedJobs: UserSavedJob[];
  toggleSaveJob: (recruitmentId: string) => void;
  isJobSaved: (recruitmentId: string) => boolean;
  updateApplicationStatus: (recruitmentId: string, status: UserApplicationStatus) => void;
  toggleDocumentCheck: (recruitmentId: string, docId: string) => void;
  
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
  
  selectedRecruitment: Recruitment | null;
  setSelectedRecruitment: (rec: Recruitment | null) => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  activeToolModal: string | null;
  setActiveToolModal: (toolId: string | null) => void;
  
  // Admin actions
  addRecruitment: (rec: Recruitment) => void;
  updateRecruitment: (id: string, updated: Partial<Recruitment>) => void;
  deleteRecruitment: (id: string) => void;
}

const DEFAULT_FILTERS: SearchFilters = {
  qualification: '',
  age: '',
  category: '',
  state: '',
  keyword: '',
  department: '',
  status: '',
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Railway ALP 2025 Closing in 7 Days!',
    message: 'Application window for 18,799 ALP posts will close on 19 August 2025. Submit your form and verify payment status.',
    timestamp: '2 hours ago',
    type: 'deadline',
    linkId: 'railway-alp-2025',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'SSC CGL 2025 Tier-1 Exam Dates Announced',
    message: 'Computer-based examination scheduled from 15th Sept to 26th Sept 2025 across all regional centres.',
    timestamp: '5 hours ago',
    type: 'admit_card',
    linkId: 'ssc-cgl-2025',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: 'UP Police Constable OMR Exam Notice',
    message: 'UPPRPB has released official notification regarding exam guidelines and DigiLocker certificate uploads.',
    timestamp: '1 day ago',
    type: 'new_job',
    linkId: 'up-police-constable-2025',
    isRead: true,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>(() => {
    const saved = localStorage.getItem('naukrix_recruitments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RECRUITMENTS;
      }
    }
    return INITIAL_RECRUITMENTS;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRecruitment, setSelectedRecruitment] = useState<Recruitment | null>(null);
  
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('naukrix_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged in demo candidate for instant testing of personalized matching & dashboard
    return {
      name: 'Rahul Sharma',
      email: 'rahul.aspirant@gmail.com',
      qualification: 'Graduation',
      degree: 'B.Sc (Computer Science)',
      age: 23,
      category: 'OBC',
      state: 'Uttar Pradesh',
      gender: 'Male',
      typingSpeedWpm: 35,
      hasDrivingLicense: true,
      hasComputerCertificate: true,
      preferredDepartments: ['Staff Selection Commission', 'Indian Railways', 'Police'],
    };
  });

  const [savedJobs, setSavedJobs] = useState<UserSavedJob[]>(() => {
    const saved = localStorage.getItem('naukrix_saved_jobs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        recruitmentId: 'ssc-cgl-2025',
        savedAt: new Date().toISOString(),
        status: 'Need to Apply',
        userNotes: 'Photograph and live webcam check required before deadline.',
        checkedDocumentIds: ['ssc-doc-1', 'ssc-doc-2'],
      },
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);

  // Sync recruitments
  useEffect(() => {
    localStorage.setItem('naukrix_recruitments', JSON.stringify(recruitments));
  }, [recruitments]);

  // Sync user
  useEffect(() => {
    if (user) {
      localStorage.setItem('naukrix_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('naukrix_user');
    }
  }, [user]);

  // Sync saved jobs
  useEffect(() => {
    localStorage.setItem('naukrix_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSaveJob = (recruitmentId: string) => {
    setSavedJobs(prev => {
      const exists = prev.some(item => item.recruitmentId === recruitmentId);
      if (exists) {
        return prev.filter(item => item.recruitmentId !== recruitmentId);
      } else {
        return [
          ...prev,
          {
            recruitmentId,
            savedAt: new Date().toISOString(),
            status: 'Interested',
            checkedDocumentIds: [],
          },
        ];
      }
    });
  };

  const isJobSaved = (recruitmentId: string) => {
    return savedJobs.some(item => item.recruitmentId === recruitmentId);
  };

  const updateApplicationStatus = (recruitmentId: string, status: UserApplicationStatus) => {
    setSavedJobs(prev => {
      const exists = prev.some(item => item.recruitmentId === recruitmentId);
      if (exists) {
        return prev.map(item => item.recruitmentId === recruitmentId ? { ...item, status } : item);
      } else {
        return [
          ...prev,
          {
            recruitmentId,
            savedAt: new Date().toISOString(),
            status,
            checkedDocumentIds: [],
          },
        ];
      }
    });
  };

  const toggleDocumentCheck = (recruitmentId: string, docId: string) => {
    setSavedJobs(prev => {
      const item = prev.find(p => p.recruitmentId === recruitmentId);
      if (!item) {
        return [
          ...prev,
          {
            recruitmentId,
            savedAt: new Date().toISOString(),
            status: 'Interested',
            checkedDocumentIds: [docId],
          },
        ];
      }
      const hasDoc = item.checkedDocumentIds.includes(docId);
      const newChecked = hasDoc
        ? item.checkedDocumentIds.filter(id => id !== docId)
        : [...item.checkedDocumentIds, docId];
      return prev.map(p => p.recruitmentId === recruitmentId ? { ...p, checkedDocumentIds: newChecked } : p);
    });
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addRecruitment = (rec: Recruitment) => {
    setRecruitments(prev => [rec, ...prev]);
  };

  const updateRecruitment = (id: string, updated: Partial<Recruitment>) => {
    setRecruitments(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    if (selectedRecruitment && selectedRecruitment.id === id) {
      setSelectedRecruitment(prev => prev ? { ...prev, ...updated } : null);
    }
  };

  const deleteRecruitment = (id: string) => {
    setRecruitments(prev => prev.filter(r => r.id !== id));
    setSavedJobs(prev => prev.filter(j => j.recruitmentId !== id));
    if (selectedRecruitment && selectedRecruitment.id === id) {
      setSelectedRecruitment(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        recruitments,
        activeTab,
        setActiveTab,
        user,
        setUser,
        savedJobs,
        toggleSaveJob,
        isJobSaved,
        updateApplicationStatus,
        toggleDocumentCheck,
        filters,
        setFilters,
        resetFilters,
        selectedRecruitment,
        setSelectedRecruitment,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        activeToolModal,
        setActiveToolModal,
        addRecruitment,
        updateRecruitment,
        deleteRecruitment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
