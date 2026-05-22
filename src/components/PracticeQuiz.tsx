import React, { useState, useEffect } from 'react';
import { MockQuestion, ExamPaperMeta } from '../types';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowLeft, ArrowRight, Play, Award, RotateCcw, Flame, Sparkles } from 'lucide-react';

interface PracticeQuizProps {
  questions: MockQuestion[];
  paperMeta: ExamPaperMeta;
  schoolName: string;
  onClose: () => void;
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({
  questions,
  paperMeta,
  schoolName,
  onClose,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<{ earned: number; total: number }>({ earned: 0, total: 0 });

  // Timer effect
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  const handleAnswerChange = (qId: string, val: string) => {
    if (isCompleted || checked[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSingleCheck = (idx: number) => {
    const q = questions[idx];
    const userAns = (answers[q.id] || '').trim().toLowerCase();
    const correctAns = q.correctAnswer.trim().toLowerCase();
    
    setChecked((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleSubmitAll = () => {
    let earned = 0;
    let total = 0;

    questions.forEach((q) => {
      total += q.marks;
      const userAns = (answers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();

      if (q.type === 'mcq') {
        if (userAns === correctAns) {
          earned += q.marks;
        }
      } else if (q.type === 'open-ended' || q.type === 'cloze') {
        // Simple fuzzy keyword match for open-ended questions
        const keywords = correctAns.split(/\s+/).filter(w => w.length > 3);
        const matches = keywords.filter(w => userAns.includes(w));
        const matchRatio = keywords.length > 0 ? (matches.length / keywords.length) : 0;
        
        if (matchRatio === 1) {
          earned += q.marks;
        } else if (matchRatio > 0.4) {
          earned += Math.max(1, Math.round(q.marks * 0.5)); // partial credit
        }
      } else if (q.type === 'synthesis') {
        // Synthesis: exact match or very close keyword alignment
        if (userAns.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === correctAns.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")) {
          earned += q.marks;
        } else if (userAns.includes(correctAns.substring(0, Math.floor(correctAns.length / 2)))) {
          earned += 1; // partial credit
        }
      }
    });

    setScore({ earned, total });
    setIsCompleted(true);
    // Mark all as checked
    const allChecked: Record<string, boolean> = {};
    questions.forEach(q => { allChecked[q.id] = true; });
    setChecked(allChecked);
  };

  const handleReset = () => {
    setActiveIdx(0);
    setAnswers({});
    setChecked({});
    setTimeElapsed(0);
    setIsCompleted(false);
    setScore({ earned: 0, total: 0 });
  };

  const currentQuestion = questions[activeIdx];
  const totalQuestions = questions.length;
  const isChecked = currentQuestion ? checked[currentQuestion.id] : false;
  const userAnswer = currentQuestion ? (answers[currentQuestion.id] || '') : '';

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-150 p-6 shadow-md transition-all duration-300">
      
      {/* Quiz Top Action Rail */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Trawler Directory
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-800">
              {paperMeta.subject} • {paperMeta.level} level
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Exam source: {schoolName} ({paperMeta.term})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Duration Timer</span>
            <span className="text-sm font-bold font-mono text-slate-700">
              {formatTime(timeElapsed)}
            </span>
          </div>
          {isCompleted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs border border-slate-200 bg-white hover:bg-slate-50 rounded text-slate-700 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {isCompleted ? (
        /* Achievement Summary View */
        <div className="py-8 px-4 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full border border-emerald-100">
            <Award className="w-12 h-12 text-emerald-600 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Practice Paper Finalized!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              You worked on questions synthesized precisely from style guidelines of {schoolName}. Here are your marks:
            </p>
          </div>

          {/* Marks display indicator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 max-w-sm mx-auto shadow-sm">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Total Score Earned</div>
            <div className="text-4xl font-black text-slate-805 font-mono mt-1">
              <span className="text-emerald-700">{score.earned}</span> / <span className="text-slate-500">{score.total}</span>
            </div>
            
            <div className="w-full bg-slate-150 h-3 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                style={{ width: `${(score.earned / (score.total || 1)) * 100}%` }}
              />
            </div>
            
            <div className="text-xs font-semibold text-emerald-850 mt-3 flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" /> Mastery Rate: {Math.round((score.earned / (score.total || 1)) * 100)}%
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-left text-xs text-amber-900 leading-relaxed">
            <strong className="block font-bold mb-1 col">Model Exam Marker Guidance:</strong>
            - <strong>For Open-Ended questions:</strong> Review the step-by-step calculations, diagrams or exact MOE keywords displayed under each question's explanation panel to verify if your answer qualifies for maximum alignment.
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
            >
              Restart This Practice
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:border-slate-350 bg-white rounded-lg text-xs font-semibold text-slate-700 transition"
            >
              Analyze Another School
            </button>
          </div>
        </div>
      ) : (
        /* Regular Question and Answering Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Left panel: Questions layout list */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Nav and Question status indicator */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-600">
                Question <span className="text-slate-900 font-mono text-sm font-bold">{activeIdx + 1}</span> of <span className="text-slate-900 font-mono">{totalQuestions}</span>
              </span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-7 h-7 rounded text-xs font-mono font-bold transition border ${
                      activeIdx === idx
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : checked[_.id]
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100'
                        : answers[_.id]
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-150'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Question Card */}
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm relative">
              
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-wider uppercase bg-slate-100 px-2.5 py-1 rounded text-slate-500 font-semibold border border-slate-150">
                  Topic: {currentQuestion.topic}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                  {currentQuestion.marks} Mark{currentQuestion.marks > 1 ? 's' : ''}
                </span>
              </div>

              {/* Main Question Body */}
              <div className="text-sm font-medium text-slate-805 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200 mb-5 whitespace-pre-wrap">
                {currentQuestion.question}
              </div>

              {/* Answering interface selector based on type */}
              <div className="space-y-3">
                {currentQuestion.type === 'mcq' && currentQuestion.options ? (
                  /* Render MCQ Radio Cards */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt, i) => {
                      const isSelected = userAnswer === opt;
                      return (
                        <button
                          key={i}
                          disabled={isChecked}
                          onClick={() => handleAnswerChange(currentQuestion.id, opt)}
                          className={`p-3 text-left text-xs rounded-xl border transition-all duration-150 flex items-start gap-2 ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/30 text-emerald-950 font-semibold'
                              : 'border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50'
                          } ${isChecked ? 'cursor-not-allowed opacity-80' : ''}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {i + 1}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : currentQuestion.type === 'synthesis' ? (
                  /* Sentence Synthesis Type */
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">Input your synthesized sentence below:</label>
                    <textarea
                      disabled={isChecked}
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Combine the sentences using the specific synthesis word model..."
                      className="w-full min-h-[80px] p-3 text-xs bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 resize-none"
                    />
                  </div>
                ) : (
                  /* Open Ended / Cloze Freeform Input */
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">Draft your answer explanation / key phrasing:</label>
                    <textarea
                      disabled={isChecked}
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Write your calculations, numerical value, or causal explanatory statements..."
                      className="w-full min-h-[100px] p-3 text-xs bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                    />
                  </div>
                )}
              </div>

              {/* Individual explanation / validation card */}
              {isChecked && (
                <div className="mt-6 p-4 rounded-xl border bg-slate-50 border-slate-200 text-xs animate-fade-in">
                  
                  {/* Correct answer validation */}
                  <div className="flex items-start gap-2.5 pb-3 border-b border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Expected Model Answer:</span>
                      <span className="font-mono text-emerald-800 font-semibold block mt-0.5 whitespace-pre-wrap">
                        {currentQuestion.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Calculations and analysis step-by-step logic */}
                  <div className="pt-3">
                    <span className="font-bold text-slate-800 block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> MOE Syllabus Method / Keyword Analysis:
                    </span>
                    <div className="mt-1 text-slate-650 leading-relaxed whitespace-pre-wrap">
                      {currentQuestion.explanation}
                    </div>
                  </div>

                </div>
              )}

              {/* Action Buttons inside Card */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
                {!isChecked ? (
                  <button
                    disabled={!userAnswer}
                    onClick={() => handleSingleCheck(activeIdx)}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Check Working Method
                  </button>
                ) : (
                  <div className="text-[11px] text-emerald-830 bg-emerald-100/30 px-2.5 py-1 rounded inline-flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Methods Checked
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    disabled={activeIdx === 0}
                    onClick={() => setActiveIdx((prev) => prev - 1)}
                    className="p-2 border border-slate-200 hover:border-slate-350 bg-white rounded-lg text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  
                  {activeIdx < totalQuestions - 1 ? (
                    <button
                      onClick={() => setActiveIdx((prev) => prev + 1)}
                      className="p-2 border border-slate-200 hover:border-slate-350 bg-white rounded-lg text-slate-700 transition"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitAll}
                      className="px-4 py-2 bg-emerald-650 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                    >
                      Finalize & Grade Paper
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Right panel: Sidebar quick advice & syllabus checklists */}
          <div className="lg:col-span-4 space-y-5">
            
            <div className="bg-white rounded-xl border border-slate-150 p-4">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider mb-2.5">
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Assessment Focus
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                This test sets mock questions based on the typical rigor of {schoolName}.
              </p>
              
              <div className="h-px bg-slate-100 my-3" />
              
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 block uppercase font-mono">Exam Properties</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-[10px] text-slate-400">Total Marks</span>
                    <span className="font-bold text-slate-700">{questions.reduce((a, b) => a + b.marks, 0)} pts</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-[10px] text-slate-400">Term Target</span>
                    <span className="font-bold text-slate-700 truncate block">{paperMeta.term.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider mb-2">
                🎓 SG Exam Revision Tips
              </h4>
              <ul className="space-y-2 text-[11px] text-slate-300 leading-relaxed list-disc list-inside">
                <li>Check your decimal accuracy and working steps regularly.</li>
                <li>In <strong>Science</strong>, identify are your variables explicitly linked to raw values or graphs?</li>
                <li>In <strong>English Sentence Synthesis</strong>, avoid repeating temporal connectors when converting sentence blocks.</li>
                <li>Be mindful of singular/plural subject-verb adjustments under stressful exam timings!</li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
