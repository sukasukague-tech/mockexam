export interface SchoolProfile {
  id: string;
  name: string;
  shortName: string;
  badgeColor: string;
  description: string;
  mathStyle: string;
  scienceStyle: string;
  englishStyle: string;
  difficultyRating: number; // 1-5 scale
  focusSub?: string;
}

export type SubjectType = 'Mathematics' | 'Science' | 'English';

export type TermType = 'Term 1 (CA1/WA1)' | 'Term 2 (SA1/WA2)' | 'Term 3 (CA2/WA3)' | 'Term 4 (SA2/Prelims)';

export interface ExamPaperMeta {
  id: string;
  schoolId: string;
  level: 'P5' | 'P6';
  subject: SubjectType;
  year: number;
  term: TermType;
  name: string;
  totalMarks: number;
  featuredTopics: string[];
  estimatedTimeMin: number;
  difficulty: 'Standard' | 'Challenging' | 'High-Order';
}

export interface MockQuestion {
  id: string;
  type: 'mcq' | 'open-ended' | 'synthesis' | 'cloze';
  question: string;
  options?: string[]; // for mcq
  correctAnswer: string;
  explanation: string;
  topic: string;
  marks: number;
  userAnswer?: string; // stored customer response
  feedback?: {
    isCorrect: boolean;
    partialMarksEarned?: number;
    notes?: string;
  };
}

export interface ExamPaperResponse {
  paperMeta: ExamPaperMeta;
  questions: MockQuestion[];
}

export interface TrawlFilter {
  level: 'P5' | 'P6' | 'All';
  subject: SubjectType | 'All';
  term: TermType | 'All';
  schoolId: string | 'All';
  searchQuery: string;
}
