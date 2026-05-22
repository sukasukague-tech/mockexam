import React, { useState } from 'react';
import { SCHOOLS, TERMS, INDEXED_PAPERS } from './data/curatedData';
import { AppHeader } from './components/AppHeader';
import { SchoolCharts } from './components/SchoolCharts';
import { ExamDirectory } from './components/ExamDirectory';
import { PracticeQuiz } from './components/PracticeQuiz';
import { PracticeBuilder } from './components/PracticeBuilder';
import { MockQuestion, ExamPaperMeta, SchoolProfile } from './types';
import { Compass, Sparkles, AlertCircle, HelpCircle, GraduationCap, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'builder'>('directory');
  const [activeQuiz, setActiveQuiz] = useState<{
    questions: MockQuestion[];
    paperMeta: ExamPaperMeta;
  } | null>(null);

  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('nanyang');

  const handleSelectSchool = (school: SchoolProfile) => {
    setSelectedSchoolId(school.id);
  };

  const handleStartQuiz = (questions: MockQuestion[], paperMeta: ExamPaperMeta) => {
    setActiveQuiz({ questions, paperMeta });
  };

  const handleCloseQuiz = () => {
    setActiveQuiz(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/20 antialiased pb-16">
      
      {/* Prime Header Block */}
      <AppHeader totalPapers={INDEXED_PAPERS.length} totalSchools={SCHOOLS.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {activeQuiz ? (
          /* ACTIVE INTERACTIVE PRACTICE VIEW */
          <div className="animate-fade-in">
            <PracticeQuiz
              questions={activeQuiz.questions}
              paperMeta={activeQuiz.paperMeta}
              schoolName={SCHOOLS.find((s) => s.id === activeQuiz.paperMeta.schoolId)?.name || ' prestgious school'}
              onClose={handleCloseQuiz}
            />
          </div>
        ) : (
          /* CORE EXPLORER DIRECTORY OR BUILDER TABS */
          <div className="space-y-8 animate-fade-in">
            
            {/* Visual Analytics Segment */}
            <SchoolCharts
              schools={SCHOOLS}
              onSelectSchool={handleSelectSchool}
              selectedSchoolId={selectedSchoolId}
            />

            {/* View selectors & trigger */}
            <div className="border-b border-slate-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('directory')}
                  className={`pb-4 text-sm font-bold flex items-center gap-2 relative transition cursor-pointer ${
                    activeTab === 'directory'
                      ? 'text-emerald-700'
                      : 'text-slate-450 hover:text-slate-800'
                  }`}
                >
                  <Compass className="w-4 h-4" /> Curriculum Exams Directory
                  {activeTab === 'directory' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`pb-4 text-sm font-bold flex items-center gap-2 relative transition cursor-pointer ${
                    activeTab === 'builder'
                      ? 'text-emerald-700'
                      : 'text-slate-450 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" /> AI Worksheet Factory (Custom Quiz)
                  {activeTab === 'builder' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* Directory or Builder components */}
            {activeTab === 'directory' ? (
              <ExamDirectory
                schools={SCHOOLS}
                terms={TERMS}
                onStartQuiz={handleStartQuiz}
              />
            ) : (
              <div className="max-w-4xl mx-auto">
                <PracticeBuilder
                  schools={SCHOOLS}
                  terms={TERMS}
                  onGenerateQuiz={handleStartQuiz}
                />
              </div>
            )}

          </div>
        )}

      </main>
      
    </div>
  );
}
