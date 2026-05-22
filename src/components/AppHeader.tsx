import React from 'react';
import { BookOpen, Search, Award, GraduationCap, CheckCircle } from 'lucide-react';

interface AppHeaderProps {
  totalPapers: number;
  totalSchools: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ totalPapers, totalSchools }) => {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
      {/* Decorative backdrop graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <GraduationCap className="w-3.5 h-3.5" /> MOE Singapore Syllabus (P5 & P6)
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-slate-800 text-slate-300 uppercase">
                Academic Portal
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-100 via-teal-100 to-white bg-clip-text text-transparent">
              SG Exam Trawler <span className="text-emerald-400 font-medium">P5 & P6</span>
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Trawl, compare, and study mock examination questions synthesized from Singapore's top prestigious primary schools. Fully indexed by Term Assessments and subjects (CA1, SA1, CA2, SA2).
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm self-start md:self-auto">
            <div className="px-3 border-r border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Top Schools</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold text-emerald-400">{totalSchools}</span>
                <span className="text-xs text-slate-500">Elite</span>
              </div>
            </div>
            
            <div className="px-3 border-r border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Indexed Papers</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold text-teal-400">{totalPapers}</span>
                <span className="text-xs text-slate-500">Curated</span>
              </div>
            </div>

            <div className="px-3">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">AI Mock Generator</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-300 font-medium bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25">
                <CheckCircle className="w-3 h-3 text-emerald-400 animate-pulse" /> Active
              </div>
            </div>
          </div>

        </div>

        {/* Localized banner strip explaining real value */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <strong className="text-slate-300 font-medium">Heuristics Trawling:</strong> Double-models, external change constants, and non-routine structures.
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <strong className="text-slate-300 font-medium">Science Precision:</strong> Strict keyword causality grading and scientific hypotheses.
          </span>
        </div>

      </div>
    </header>
  );
};
