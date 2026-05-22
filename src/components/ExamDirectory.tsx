import React, { useState } from 'react';
import { SchoolProfile, ExamPaperMeta, TrawlFilter, SubjectType, TermType, MockQuestion } from '../types';
import { INDEXED_PAPERS, FALLBACK_QUESTIONS } from '../data/curatedData';
import { Search, Filter, BookOpen, Clock, Building, ArrowRight, FileText, Compass, Sparkles, HelpCircle, GraduationCap, RefreshCw } from 'lucide-react';

interface ExamDirectoryProps {
  schools: SchoolProfile[];
  terms: TermType[];
  onStartQuiz: (questions: MockQuestion[], paperMeta: ExamPaperMeta) => void;
}

export const ExamDirectory: React.FC<ExamDirectoryProps> = ({
  schools,
  terms,
  onStartQuiz,
}) => {
  const [filter, setFilter] = useState<TrawlFilter>({
    level: 'All',
    subject: 'All',
    term: 'All',
    schoolId: 'All',
    searchQuery: '',
  });

  const [activeAnalysis, setActiveAnalysis] = useState<{
    paperId: string | null;
    content: string | null;
    isLoading: boolean;
  }>({
    paperId: null,
    content: null,
    isLoading: false,
  });

  const [isQuizLoading, setIsQuizLoading] = useState<string | null>(null);

  // Filter implementation
  const filteredPapers = INDEXED_PAPERS.filter((paper) => {
    const sMatch = filter.schoolId === 'All' || paper.schoolId === filter.schoolId;
    const lMatch = filter.level === 'All' || paper.level === filter.level;
    const subMatch = filter.subject === 'All' || paper.subject === filter.subject;
    const tMatch = filter.term === 'All' || paper.term === filter.term;

    const query = filter.searchQuery.trim().toLowerCase();
    const qMatch =
      !query ||
      paper.name.toLowerCase().includes(query) ||
      paper.featuredTopics.some((t) => t.toLowerCase().includes(query));

    return sMatch && lMatch && subMatch && tMatch && qMatch;
  });

  // Method to request AI Analysis for a school/paper
  const handleDeepAnalysis = async (paper: ExamPaperMeta) => {
    setActiveAnalysis({ paperId: paper.id, content: null, isLoading: true });
    const school = schools.find((s) => s.id === paper.schoolId) || schools[0];

    try {
      const response = await fetch('/api/school/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: school.name,
          focusSub: paper.featuredTopics.join(', '),
          difficulty: school.difficultyRating,
          mathStyle: school.mathStyle,
          scienceStyle: school.scienceStyle,
          englishStyle: school.englishStyle,
        }),
      });

      if (!response.ok) throw new Error('Failed to retrieve analysis from server');
      const data = await response.json();
      setActiveAnalysis({
        paperId: paper.id,
        content: data.analysis,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      // Fallback descriptive text if the API isn't ready
      setActiveAnalysis({
        paperId: paper.id,
        content: `### 🎯 PRESTIGIOUS PEDAGOGY ANALYSIS: ${school.name}
This school focuses on high conceptual confidence, testing students beyond standard calculations.

### 🧩 DETAILED SUBJECT TESTING TIPS:
- **Mathematics:** Focus on double model concepts, and external change variable heuristics.
- **Science:** Underline critical keywords such as "to prevent heat loss", "good conductor", and structure your explanation cleanly showing the direct Cause-and-Effect links.
- **English Language:** Avoid redundant prepositions in transformation and syntactically complex Sentence synthesis.

### 💡 PARENT STUDY BLUEPRINT:
1. Conduct short 25-minute focused speed practice drills weekly.
2. Maintain a "Mistakes Logbook" tracking specific heuristic trap questions from past sheets.`,
        isLoading: false,
      });
    }
  };

  // Method to generate/start quiz for a specific paper
  const handleStartPractice = async (paper: ExamPaperMeta) => {
    setIsQuizLoading(paper.id);
    const school = schools.find((s) => s.id === paper.schoolId) || schools[0];

    try {
      const response = await fetch('/api/exam/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: school.name,
          level: paper.level,
          subject: paper.subject,
          term: paper.term,
          topicStyle: paper.featuredTopics.join(', '),
          difficulty: paper.difficulty,
        }),
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      
      if (!data.questions || data.questions.length === 0) throw new Error();
      
      onStartQuiz(data.questions, paper);
    } catch (err) {
      console.warn('Exam API fallback activated:', err);
      // Load curated fallback matching the subject
      const FallbackList = FALLBACK_QUESTIONS[paper.subject] || FALLBACK_QUESTIONS['Mathematics'];
      onStartQuiz(FallbackList, paper);
    } finally {
      setIsQuizLoading(null);
    }
  };

  // Simple custom parser to render standard markdown string to HTML tags safely without package bloat
  const renderMarkdown = (mdText: string) => {
    return mdText.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        return <h5 key={i} className="text-xs font-bold text-emerald-800 mt-4 mb-2 uppercase font-mono">{trimmed.replace('###', '')}</h5>;
      }
      if (trimmed.startsWith('##')) {
        return <h4 key={i} className="text-sm font-bold text-slate-900 mt-5 mb-2.5 border-b border-slate-100 pb-1">{trimmed.replace('##', '')}</h4>;
      }
      if (trimmed.startsWith('#')) {
        return <h3 key={i} className="text-base font-black text-slate-805 mt-6 mb-3 flex items-center gap-1"><Sparkles className="w-4 h-4 text-emerald-600" />{trimmed.replace('#', '')}</h3>;
      }
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return <li key={i} className="text-xs text-slate-650 ml-4 list-disc list-outside leading-relaxed mt-1">{trimmed.substring(1).trim()}</li>;
      }
      if (/^\d+\./.test(trimmed)) {
        return <li key={i} className="text-xs text-slate-650 ml-4 list-decimal list-outside leading-relaxed mt-1">{trimmed.replace(/^\d+\./, '').trim()}</li>;
      }
      if (line === '') {
        return <div key={i} className="h-2" />;
      }
      return <p key={i} className="text-xs text-slate-600 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Search and Filter Singapore Exam Papers</h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded border">
            Matching Results: {filteredPapers.length} Papers
          </span>
        </div>

        {/* Input Text query */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-405" />
          <input
            type="text"
            placeholder="Search by exam name, syllabus topic (e.g. Ratio, Force, Speed, Synthesis)..."
            value={filter.searchQuery}
            onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          {/* Level Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Assessed Level</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {(['All', 'P5', 'P6'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilter({ ...filter, level: lvl })}
                  className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all ${
                    filter.level === lvl
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'All' ? 'All Grades' : `P${lvl.replace('P', '')}`}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Core Subject</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {(['All', 'Mathematics', 'Science', 'English'] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setFilter({ ...filter, subject: sub })}
                  className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-all truncate ${
                    filter.subject === sub
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {sub === 'All' ? 'All Subjects' : sub === 'Mathematics' ? 'Math' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* School Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Elite School Index</label>
            <select
              value={filter.schoolId}
              onChange={(e) => setFilter({ ...filter, schoolId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Prestigious Schools</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Term Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Term Category</label>
            <select
              value={filter.term}
              onChange={(e) => setFilter({ ...filter, term: e.target.value as TermType | 'All' })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Standard Terms</option>
              {terms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Directory Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {filteredPapers.length === 0 ? (
          <div className="md:col-span-2 bg-white text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200">
            <HelpCircle className="w-10 h-10 text-slate-350 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-700">No indexed Singapore papers matched your filter combo.</h4>
            <p className="text-xs text-slate-400 mt-1">Try relaxing your search keywords or toggling different subjects.</p>
          </div>
        ) : (
          filteredPapers.map((paper) => {
            const school = schools.find((s) => s.id === paper.schoolId) || schools[0];
            const isAnalyzing = activeAnalysis.paperId === paper.id;
            const isLoadingQuiz = isQuizLoading === paper.id;

            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:border-emerald-250 hover:shadow-md transition-all duration-200"
              >
                {/* Paper Top section */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border">
                      🇸🇬 Year {paper.year}
                    </span>
                    <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${school.badgeColor}`}>
                      {school.shortName}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-905 leading-snug">
                      {paper.name}
                    </h3>
                    <p className="text-[11px] text-slate-450 mt-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Syllabus Focus: Primary {paper.level.replace('P', '')} {paper.subject}
                    </p>
                  </div>

                  {/* Metadata labels */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {paper.estimatedTimeMin} mins duration
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> {paper.term}
                    </span>
                  </div>

                  {/* Curated Syllabus Topics tested */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Tested MOE Chapters</span>
                    <div className="flex flex-wrap gap-1">
                      {paper.featuredTopics.map((topic, index) => (
                        <span
                          key={index}
                          className="text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-150 px-2.5 py-0.5 rounded transition"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nested detailed AI analysis sheet */}
                  {isAnalyzing && (
                    <div className="mt-4 p-4 border bg-emerald-50/15 border-emerald-100 rounded-xl max-h-[300px] overflow-y-auto text-xs animate-fade-in custom-scrollbar">
                      {activeAnalysis.isLoading ? (
                        <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
                          <RefreshCw className="w-6 h-6 text-emerald-500 animate-spin" />
                          <span className="text-[10px] font-mono text-slate-500">Gemini distilling past exam style patterns...</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {activeAnalysis.content && renderMarkdown(activeAnalysis.content)}
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Paper Actions strip */}
                <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleDeepAnalysis(paper)}
                    className="text-xs text-slate-650 hover:text-emerald-700 font-semibold flex items-center gap-1 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> {isAnalyzing && activeAnalysis.content ? 'Collapse Sheet' : 'Deep AI Style Analysis'}
                  </button>

                  <button
                    disabled={isQuizLoading !== null}
                    onClick={() => handleStartPractice(paper)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-405 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition shadow-sm cursor-pointer"
                  >
                    {isLoadingQuiz ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" /> Synthesizing...
                      </>
                    ) : (
                      <>
                        Practice Mock <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
};
