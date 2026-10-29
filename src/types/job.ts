export type RecruitmentStatus = 
  | 'Form Open'
  | 'Closing Soon'
  | 'Closing Today'
  | 'Application Closed'
  | 'Admit Card Released'
  | 'Exam Date Announced'
  | 'Result Declared'
  | 'Upcoming';

export type UserApplicationStatus =
  | 'Interested'
  | 'Need to Apply'
  | 'Applied'
  | 'Admit Card Awaited'
  | 'Exam Completed'
  | 'Result Awaited'
  | 'Completed';

export interface CategoryBreakup {
  category: string;
  posts: number;
}

export interface StateBreakup {
  state: string;
  posts: number;
}

export interface ExamStage {
  stageName: string;
  mode: string;
  duration: string;
  totalQuestions: number;
  totalMarks: number;
  negativeMarking: string;
  subjects: {
    name: string;
    questions: number;
    marks: number;
  }[];
}

export interface PhysicalRequirement {
  gender: 'Male' | 'Female' | 'All';
  heightCm: number;
  chestCm?: string;
  runningDistance?: string;
  runningTime?: string;
  longJump?: string;
  highJump?: string;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  required: boolean;
  format: string;
  maxSizeKb?: number;
  description: string;
}

export interface Recruitment {
  id: string;
  slug: string;
  title: string;
  organization: string;
  department: string;
  logoType: 'ssc' | 'railway' | 'police' | 'ibps' | 'defence' | 'teaching' | 'upsc' | 'state';
  category: string; // e.g., 'Graduation', '10th / ITI', '12th Pass'
  qualificationLevel: '10th' | '12th' | 'ITI' | 'Diploma' | 'Graduation' | 'Post Graduation';
  requiredDegrees: string[];
  totalPosts: number;
  location: string;
  state: string;
  isCentral: boolean;
  status: RecruitmentStatus;
  
  // Dates
  startDate: string; // YYYY-MM-DD
  lastDate: string; // YYYY-MM-DD
  deadlineDateString: string; // e.g. "24 Aug 2025"
  daysLeft: number;
  examDate?: string;
  admitCardDate?: string;
  resultDate?: string;
  
  // Eligibility
  minAge: number;
  maxAge: number;
  ageReferenceDate: string;
  ageRelaxation: string;
  genderEligibility: 'All' | 'Male' | 'Female';
  
  // Financial & Application
  applicationFee: {
    generalOBC: number;
    scStPwD: number;
    female: number;
  };
  officialWebsite: string;
  officialApplyUrl: string;
  officialNotificationPdf: string;
  
  // Overview
  shortDescription: string;
  fullOverview: string;
  salaryPayScale: string;
  
  // Breakups
  categoryBreakup?: CategoryBreakup[];
  stateBreakup?: StateBreakup[];
  
  // Exam Info
  examStages?: ExamStage[];
  negativeMarkingText: string;
  syllabusTopics?: {
    subject: string;
    topics: string[];
  }[];
  
  // Physical Test (for police/defence)
  physicalStandards?: PhysicalRequirement[];
  
  // Documents & Steps
  documentsRequired: DocumentItem[];
  applicationSteps: {
    stepNumber: number;
    title: string;
    instruction: string;
    importantTip?: string;
  }[];
  
  faqs: {
    question: string;
    answer: string;
  }[];
  
  lastVerifiedDate: string;
  isVerified: boolean;
  isDemoSample?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  qualification: string;
  degree: string;
  age: number;
  category: 'General' | 'EWS' | 'OBC' | 'SC' | 'ST';
  state: string;
  gender: 'Male' | 'Female' | 'Other';
  typingSpeedWpm?: number;
  hasDrivingLicense?: boolean;
  hasComputerCertificate?: boolean;
  preferredDepartments?: string[];
}

export interface UserSavedJob {
  recruitmentId: string;
  savedAt: string;
  status: UserApplicationStatus;
  userNotes?: string;
  checkedDocumentIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'deadline' | 'new_job' | 'admit_card' | 'result';
  linkId?: string;
  isRead: boolean;
}
