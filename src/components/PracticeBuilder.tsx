import React, { useState, useEffect } from 'react';
import { SchoolProfile, SubjectType, MockQuestion, ExamPaperMeta, TermType } from '../types';
import { SYLLABUS_CHAPS } from '../data/curatedData';
import { Sparkles, ArrowRight, BookOpen, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface PracticeBuilderProps {
  schools: SchoolProfile[];
  terms: TermType[];
  onGenerateQuiz: (questions: MockQuestion[], paperMeta: ExamPaperMeta) => void;
}

export const PracticeBuilder: React.FC<PracticeBuilderProps> = ({
  schools,
  terms,
  onGenerateQuiz,
}) => {
  const [level, setLevel] = useState<'P5' | 'P6'>('P6');
  const [subject, setSubject] = useState<SubjectType>('Mathematics');
  const [term, setTerm] = useState<TermType>('Term 4 (SA2/Prelims)');
  const [schoolId, setSchoolId] = useState<string>('nanyang');
  const [topic, setTopic] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Update selected topic whenever level or subject changes
  const availableTopics = SYLLABUS_CHAPS[level][subject] || [];
  
  useEffect(() => {
    if (availableTopics.length > 0) {
      setTopic(availableTopics[0]);
    } else {
      setTopic('');
    }
  }, [level, subject]);

  const loadingMessages = [
    'Trawling past paper archives for heuristic structures...',
    'Synthesizing questions modeled after Singapore top-tier standard...',
    'Analyzing marking schemas for keyword weighting...',
    'Structuring custom model explanations for step-by-step revision...',
    'Generating high-contrast diagrams conceptually with Gemini...',
  ];

  // Rotate messages during long AI operations
  useEffect(() => {
    if (!isLoading) return;
    setLoadingMsg(loadingMessages[0]);
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[index]);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const targetSchool = schools.find((s) => s.id === schoolId) || schools[0];

    try {
      const response = await fetch('/api/exam/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName: targetSchool.name,
          level,
          subject,
          term,
          topicStyle: topic,
          difficulty: targetSchool.difficultyRating >= 4.5 ? 'Challenging' : 'Standard',
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error generating papers.');
      }

      const data = await response.json();
      
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No test questions were successfully compiled by Gemini.');
      }

      // Construct a simulated Paper Metadata
      const customPaperMeta: ExamPaperMeta = {
        id: `paper-custom-${Date.now()}`,
        schoolId: targetSchool.id,
        level,
        subject,
        year: 2026,
        term,
        name: `Custom ${targetSchool.shortName} ${level} ${subject} Practice (Topic: ${topic})`,
        totalMarks: data.questions.reduce((a: number, b: any) => a + (b.marks || 1), 0),
        featuredTopics: [topic],
        estimatedTimeMin: 40,
        difficulty: targetSchool.difficultyRating >= 4.5 ? 'High-Order' : 'Standard',
      };

      onGenerateQuiz(data.questions, customPaperMeta);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err?.message || 'The trawling server could not reach the Gemini generator. Please ensure your Secrets panel is configured properly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl border border-emerald-900 p-6 relative overflow-hidden shadow-lg">
      {/* Background radial effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {isLoading ? (
        /* Encouraging loading sequence page */
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-5 min-h-[350px]">
          <div className="relative">
            <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-emerald-400/20 rounded-full" />
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-emerald-100">Synchronizing AI Heuristics Paper</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-mono animate-pulse">
              {loadingMsg}
            </p>
          </div>

          <div className="max-w-xs text-[10px] text-slate-500 bg-slate-950/45 p-3 rounded-lg border border-slate-800 leading-relaxed self-center">
            Note: First connections may take up to 10 seconds to compile structured formatting templates.
          </div>
        </div>
      ) : (
        /* Form view */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between gap-2 border-b border-emerald-900 pb-4">
            <div>
              <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-emerald-400 fill-emerald-500" /> Dynamic AI Worksheet Factory
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Synthesize custom assessment sheets tailored to specific schools, MOE topics, and terms using generative AI.
              </p>
            </div>
            <Layers className="w-5 h-5 text-emerald-500 hidden sm:block shrink-0" />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Level selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">Assessment Grade</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-1.5 rounded-lg border border-emerald-900/40">
                {(['P5', 'P6'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`py-1.5 text-xs font-bold rounded transition ${
                      level === lvl
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Primary {lvl.replace('P', '')} (P{lvl.replace('P', '')})
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">Core MOE Subject</label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950/40 p-1.5 rounded-lg border border-emerald-900/40">
                {(['Mathematics', 'Science', 'English'] as SubjectType[]).map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSubject(subj)}
                    className={`py-1.5 text-[10px] font-bold rounded transition truncate ${
                      subject === subj
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {subj === 'Mathematics' ? 'Math' : subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms Categorization */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">Assessment Term Category</label>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value as TermType)}
                className="w-full bg-slate-950/50 border border-emerald-900/50 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 outline-none"
              >
                {terms.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-slate-200">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* School Methedologies */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">Target School Style to Mimic</label>
              <select
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="w-full bg-slate-950/50 border border-emerald-900/50 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 outline-none"
              >
                {schools.map((sch) => (
                  <option key={sch.id} value={sch.id} className="bg-slate-900 text-slate-200">
                    {sch.name} (Toughness: {sch.difficultyRating}/5)
                  </option>
                ))}
              </select>
            </div>

            {/* MOE Chapters topic */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">MOE Syllabus Topic Focus</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950/50 border border-emerald-900/50 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-500 text-slate-200 outline-none"
              >
                {availableTopics.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-slate-200Item">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Helper Explainer */}
            <div className="bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-950/80 text-[10px] text-emerald-300 leading-normal flex items-start gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-medium">Model Calibration:</strong>
                Simulates real past exams and creates highly rigorous grading keys.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 leading-tight">
              Using <strong>gemini-3.5-flash</strong> styling models for authentic P5/P6 evaluation.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer transition transform active:scale-95"
            >
              Synthesize Practice Paper <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
