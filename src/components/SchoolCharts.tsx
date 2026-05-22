import React, { useState } from 'react';
import { SchoolProfile } from '../types';
import { Award, Zap, Book, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface SchoolChartsProps {
  schools: SchoolProfile[];
  onSelectSchool: (school: SchoolProfile) => void;
  selectedSchoolId?: string;
}

type MetricType = 'heuristics' | 'scienceKeywords' | 'englishRigor' | 'difficulty';

export const SchoolCharts: React.FC<SchoolChartsProps> = ({
  schools,
  onSelectSchool,
  selectedSchoolId,
}) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('difficulty');

  // Let's define rating values of schools for the metric dimensions:
  // 1. heuristics: Math model difficulty
  // 2. scienceKeywords: strictness on answers
  // 3. englishRigor: verbalsophistication
  // 4. difficulty: aggregate
  const getMetricDetails = (school: SchoolProfile, metric: MetricType) => {
    switch (metric) {
      case 'heuristics':
        if (school.id === 'nanyang') return { score: 98, label: 'Extreme Heuristics', sub: 'Double models, quantity change sets' };
        if (school.id === 'rosyth') return { score: 95, label: 'Unusual Spatial Puzzles', sub: 'Visual geometric paper models' };
        if (school.id === 'raffles') return { score: 92, label: 'Pattern Inference', sub: 'Predictive mathematical patterns' };
        if (school.id === 'stnicholas') return { score: 90, label: 'High Algebraic', sub: 'Structured decimal systems' };
        if (school.id === 'mgs') return { score: 88, label: 'Rigorous Decimals', sub: 'Composite areas & ratios' };
        if (school.id === 'taonan') return { score: 85, label: 'Speed Excellence', sub: 'Speed runs & standard PSLE setups' };
        if (school.id === 'henrypark') return { score: 82, label: 'Baseline Heuristics', sub: 'Consistent step modeling' };
        return { score: 80, label: 'Standard Models', sub: 'Direct physical modeling' };
      
      case 'scienceKeywords':
        if (school.id === 'nanyang') return { score: 96, label: 'Causal Word Exactness', sub: 'Requires direct Cause-Result linking' };
        if (school.id === 'stnicholas') return { score: 95, label: 'Precision Templates', sub: 'Exacting sequence of science proof' };
        if (school.id === 'rosyth') return { score: 94, label: 'Experimental Control', sub: 'Anomalies and variable changes focus' };
        if (school.id === 'raffles') return { score: 92, label: 'Scenario Synthesis', sub: 'Adaptability in unencountered scenarios' };
        if (school.id === 'mgs') return { score: 88, label: 'Fact-Classification', sub: 'Detailed cells & energy types' };
        if (school.id === 'henrypark') return { score: 85, label: 'Structured Diagrams', sub: 'Electricity diagrams, food webs' };
        if (school.id === 'taonan') return { score: 84, label: 'Definition Specific', sub: 'Exact MOE textbook definitions' };
        return { score: 80, label: 'Practical Explanations', sub: 'Magnetic loops and force values' };

      case 'englishRigor':
        if (school.id === 'raffles') return { score: 98, label: 'Sophisticated Lexical', sub: 'Literary comprehension and idiomatic items' };
        if (school.id === 'acs') return { score: 95, label: 'Narrative Mastery', sub: 'Contextual synthesis and grammar traps' };
        if (school.id === 'mgs') return { score: 92, label: 'Nuanced Editing Check', sub: 'Exceptional tense structures & spellings' };
        if (school.id === 'stnicholas') return { score: 90, label: 'Rhetorical Sophistication', sub: 'Syntactic transformation complexity' };
        if (school.id === 'nanyang') return { score: 88, label: 'Advanced Sentence Connects', sub: 'Negative qualifiers, prepositions' };
        if (school.id === 'rosyth') return { score: 86, label: 'Intricate Cloze Passages', sub: 'Dense context and vocabulary gaps' };
        if (school.id === 'henrypark') return { score: 82, label: 'Symmetric Synthesis', sub: 'Direct and indirect speech patterns' };
        return { score: 80, label: 'Core Grammar Drills', sub: 'Focus on singular-plural and editing' };

      case 'difficulty':
      default:
        if (school.id === 'nanyang' || school.id === 'rosyth' || school.id === 'raffles') 
          return { score: 96, label: 'Highest Tier (Elite)', sub: 'Demands absolute conceptual command' };
        if (school.id === 'stnicholas' || school.id === 'mgs') 
          return { score: 90, label: 'Advanced Rigorous Tier', sub: 'High-order exam formats' };
        if (school.id === 'acs' || school.id === 'taonan' || school.id === 'henrypark') 
          return { score: 85, label: 'Highly Competitive Tier', sub: 'Excellent PSLE simulator content' };
        return { score: 82, label: 'Strict MOE Alignment', sub: 'Standard top primary tier' };
    }
  };

  const getMetricTitle = () => {
    switch (activeMetric) {
      case 'heuristics': return 'Math Heuristic Problem-Solving Intensity';
      case 'scienceKeywords': return 'Science Open-Ended Keyword Strictness';
      case 'englishRigor': return 'English Sentence Sophistication & Lexicon';
      case 'difficulty':
      default: return 'Overall Exam Assessment Difficulty Index';
    }
  };

  const getMetricDesc = () => {
    switch (activeMetric) {
      case 'heuristics':
        return 'Measures the proportion of non-routine problem sums requiring advanced heuristics, visual spatial models, or multi-step algebra methods.';
      case 'scienceKeywords':
        return 'Indicates the strictness of open-ended marking schemes. Higher score demands precise scientific terms and absolute cohesive causal link explanations (Result ➜ Reason).';
      case 'englishRigor':
        return 'Fractions of difficult verbal synthesis qualifiers (e.g. "Hardly had...", "Lest") and advanced lexicon demands in vocabulary cloze passages.';
      case 'difficulty':
      default:
        return 'Overall aggregate assessment toughness representing how much standard textbook boundaries are exceeded by a school\'s tests.';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" /> Top Schools Academic Style Profiles
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Click on key metrics to analyze core differences between prestigious primary schools, and tap on a school bar to filter indexed exam papers.
          </p>
        </div>
        
        {/* Metric selection controls */}
        <div className="flex flex-wrap gap-1.5 self-start bg-slate-100 p-1 rounded-lg">
          {(['difficulty', 'heuristics', 'scienceKeywords', 'englishRigor'] as MetricType[]).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 capitalize ${
                activeMetric === metric
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {metric === 'scienceKeywords' ? 'Science Keywords' : metric === 'englishRigor' ? 'English Rigor' : metric}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Visual Comparison Matrix Bar Chart (Modern SVG Layout) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded">
              {getMetricTitle()}
            </span>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              {getMetricDesc()}
            </p>
          </div>

          <div className="space-y-3 mt-4">
            {schools.map((school) => {
              const { score, label, sub } = getMetricDetails(school, activeMetric);
              const isSelected = selectedSchoolId === school.id;
              
              return (
                <div
                  key={school.id}
                  onClick={() => onSelectSchool(school)}
                  className={`group relative p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/20 shadow-sm'
                      : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {school.shortName}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] bg-emerald-600 text-white font-semibold px-1 rounded">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-400 font-mono">
                        {label}
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-700">
                        {score}%
                      </span>
                    </div>
                  </div>

                  {/* High Quality Styled Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-400 group-hover:bg-emerald-600'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 group-hover:text-slate-500">
                    {sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* School style deep detail card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-slate-100 rounded-2xl p-6 relative overflow-hidden shadow-md">
          {/* subtle pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          {(() => {
            const currentSchool = schools.find(s => s.id === (selectedSchoolId || 'nanyang')) || schools[0];
            return (
              <div className="space-y-5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-semibold">
                      Elite School Profile
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <Zap className="w-3.5 h-3.5 fill-amber-400" /> Heuristic Level: {currentSchool.difficultyRating}/5
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-3 leading-tight">
                    {currentSchool.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {currentSchool.description}
                  </p>
                  
                  <div className="h-px bg-slate-800 my-4" />

                  {/* School Stylings list */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-1 rounded bg-slate-800 text-emerald-300 mt-0.5 shrink-0 font-bold">∑</div>
                      <div>
                        <span className="font-semibold text-white block">Mathematics Testing Style:</span>
                        <span className="text-slate-350 leading-relaxed block mt-0.5">{currentSchool.mathStyle}</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Book className="w-3.5 h-3.5 text-teal-300 mt-1 shrink-0" />
                      <div>
                        <span className="font-semibold text-white block">Science OE Keyword Strictest:</span>
                        <span className="text-slate-350 leading-relaxed block mt-0.5">{currentSchool.scienceStyle}</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-300 mt-1 shrink-0" />
                      <div>
                        <span className="font-semibold text-white block">English Sentence Syntax:</span>
                        <span className="text-slate-350 leading-relaxed block mt-0.5">{currentSchool.englishStyle}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4">
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-slate-400">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1.5">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" /> Focus Trawling Strategy:
                    </div>
                    <span className="text-[11px] block leading-relaxed">
                      This school frequently targets the <span className="text-emerald-300 font-semibold">{currentSchool.focusSub}</span> chapter. Practicing tests with specific weighting is highly advised.
                    </span>
                  </div>
                </div>

              </div>
            );
          })()}

        </div>

      </div>

    </div>
  );
};
