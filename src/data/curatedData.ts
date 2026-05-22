import { SchoolProfile, ExamPaperMeta, TermType, SubjectType } from '../types';

export const SCHOOLS: SchoolProfile[] = [
  {
    id: 'nanyang',
    name: 'Nanyang Primary School',
    shortName: 'Nanyang (NYPS)',
    badgeColor: 'border-rose-500 text-rose-600 bg-rose-50/50 hover:bg-rose-100/50',
    description: 'Renowned for rigorous academic standards, challenging problem-sum structures, and competitive PSLE tracking.',
    mathStyle: 'Features complex heuristics, multi-step word problems (e.g. spatial models, external change constants). Very high difficulty.',
    scienceStyle: 'Requires precise keywords in open-ended questions. Focuses heavily on experimental variables, water cycle, and force interactions.',
    englishStyle: 'Strong focus on idiom vocabulary, syntactically complex Sentence Synthesis, and detailed Comprehension Cloze.',
    difficultyRating: 5,
    focusSub: 'High-Order Heuristics & Key Phrasings'
  },
  {
    id: 'raffles',
    name: "Raffles Girls' Primary School",
    shortName: 'Raffles (RGPS)',
    badgeColor: 'border-teal-500 text-teal-600 bg-teal-50/50 hover:bg-teal-100/50',
    description: 'A GEP centre focusing heavily on analytical reasoning, conceptual depth, and real-world application of theories.',
    mathStyle: 'Emphasis on logical proofs, patterns logic, algebraic formulations, and multi-concept questions.',
    scienceStyle: 'High-order scenario analysis testing deep conceptual connections (e.g. ecosystems, energy conversions).',
    englishStyle: 'Highly literary comprehension exercises, advanced vocabulary cloze, and contextual sentence transformation.',
    difficultyRating: 5,
    focusSub: 'Conceptual Integration & Reasoning'
  },
  {
    id: 'taonan',
    name: 'Tao Nan School',
    shortName: 'Tao Nan (TNS)',
    badgeColor: 'border-cyan-500 text-cyan-600 bg-cyan-50/50 hover:bg-cyan-100/50',
    description: 'Rich historical school. Emphasizes foundational speed, structural clarity, and tricky structural phrasing.',
    mathStyle: 'Excellent speed-run papers, classic PSLE type models, percentage, speed, and standard heuristics.',
    scienceStyle: 'Focuses heavily on factual accuracy, classification concepts, cells, and photosynthesis.',
    englishStyle: 'Pragmatic standard vocabulary, strong spelling and grammar editing, focused on common trap points.',
    difficultyRating: 4,
    focusSub: 'Precision & Core Logic Speed'
  },
  {
    id: 'rosyth',
    name: 'Rosyth School',
    shortName: 'Rosyth (ROSYTH)',
    badgeColor: 'border-indigo-500 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100/50',
    description: 'GEP and integrated curriculum hub. Tests creative applications of MOE syllabus definitions.',
    mathStyle: 'Unusual spatial visuals, nets of 3D, non-routine paper folding puzzles, and tricky area questions.',
    scienceStyle: 'Very strong design experiment assessment, graphing analysis, and identification of anomalies/control variables.',
    englishStyle: 'Very strong vocabulary, situational comprehensions, and editing questions testing complex tenses.',
    difficultyRating: 5,
    focusSub: 'Non-Routine Problem Solving'
  },
  {
    id: 'acs',
    name: 'Anglo-Chinese School (Primary)',
    shortName: 'ACS Primary (ACS P)',
    badgeColor: 'border-amber-500 text-amber-600 bg-amber-50/50 hover:bg-amber-100/50',
    description: 'Fosters conceptual confidence. Strong on grammar, active scenario modeling, and application-based questions.',
    mathStyle: 'Focuses on ratio, speed/motion, financial models (gst, discounts), and practical visual geometries.',
    scienceStyle: 'Practical electricity setups, magnetic attraction patterns, respiratory and transport systems.',
    englishStyle: 'Spectacular narrative comprehension pieces, premium editing exercises, and colloquial pitfalls analysis.',
    difficultyRating: 4,
    focusSub: 'Pragmatic Applications'
  },
  {
    id: 'henrypark',
    name: 'Henry Park Primary School',
    shortName: 'Henry Park (HPPS)',
    badgeColor: 'border-orange-500 text-orange-600 bg-orange-50/50 hover:bg-orange-100/50',
    description: 'Builds comprehensive baseline mastery. Highly aligned with actual PSLE style distributions.',
    mathStyle: 'Clear step-by-step models, solid fractions & ratio questions, circular areas and angles.',
    scienceStyle: 'Well-structured questions on plant/human reproduction, energy stores, and basic chemistry/matter.',
    englishStyle: 'Highly structured editing checklists, concise synthesis rules, and straightforward comprehensions.',
    difficultyRating: 4,
    focusSub: 'Optimal PSLE Consistency'
  },
  {
    id: 'stnicholas',
    name: "CHIJ St. Nicholas Girls' School",
    shortName: 'St. Nicholas (SNGS)',
    badgeColor: 'border-purple-500 text-purple-600 bg-purple-50/50 hover:bg-purple-100/50',
    description: 'Renowned academic pedigree. Focuses on structural perfection, rigorous templates, and neat working models.',
    mathStyle: 'Heavy algebraic methods, perfect decimal modeling, volume, and advanced pie-chart interpretation.',
    scienceStyle: 'Rigorous marking standard requiring complete causal link statements in open-ended answers.',
    englishStyle: 'Advanced grammar MCQs, intricate relative pronouns synthesis, and nuanced vocabulary.',
    difficultyRating: 4.5,
    focusSub: 'Rhetorical & Analytical Rigor'
  },
  {
    id: 'mgs',
    name: "Methodist Girls' School (Primary)",
    shortName: 'MGS Primary',
    badgeColor: 'border-indigo-600 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100/50',
    description: 'Nurtures independent think-tanks. Focuses on literal interpretation boundaries and precise mathematics proofs.',
    mathStyle: 'Very strong fractions and decimals calculations speed paper, circle models, and composite area.',
    scienceStyle: 'Focuses on cell functions, reproduction differences, energy transformations, and environmental issues.',
    englishStyle: 'Superb literary text comprehensions, complex prepositions, and nuanced editing exercises.',
    difficultyRating: 4.5,
    focusSub: 'Precision Reasoning'
  }
];

export const TERMS: TermType[] = [
  'Term 1 (CA1/WA1)',
  'Term 2 (SA1/WA2)',
  'Term 3 (CA2/WA3)',
  'Term 4 (SA2/Prelims)'
];

export const SYLLABUS_CHAPS = {
  P5: {
    Mathematics: ['Whole Numbers', 'Fractions', 'Decimals', 'Ratio', 'Volume (Cube/Cuboid)', 'Area of Triangle', 'Angles & Geometry'],
    Science: ['Water Cycle & States of Water', 'Reproduction in Plants', 'Reproduction in Humans', 'Cells Structure & Function', 'Respiratory & Circulatory Systems', 'Matter', 'Electricity Systems'],
    English: ['Grammar & Part Of Speech', 'Synthesis & Transformation (Connectors)', 'Editing (Spelling & Core Grammar)', 'Comprehension Cloze Patterns', 'Comprehension Reading Logics']
  },
  P6: {
    Mathematics: ['Algebra Basics', 'Advanced Fractions & Percentages', 'Ratio & Proportion Heuristics', 'Speed & Rate problems', 'Circles (Area & Perimeter)', 'Composite Area & Perimeter', 'Pie Charts & Averages', 'Angles in Geometrical Figures', 'Solid Figures & Nets'],
    Science: ['Forces (Gravity, Friction, Elastic)', 'Energy Forms & Uses', 'Photosynthesis & Respiration', 'Organisms Food Webs & Energy Transfer', 'Adaptations to Environment', 'Man\'s Impact on the Environment'],
    English: ['Advanced Synthesis (Active/Passive, Direct/Indirect)', 'Complex Relative Clauses', 'Precision Editing checklist', 'High-Frequency PSLE Vocabulary', 'Open Ended Deductive Comprehension']
  }
};

export const INDEXED_PAPERS: ExamPaperMeta[] = [
  // Primary 6
  {
    id: 'paper-p6-ny-m-sa2',
    schoolId: 'nanyang',
    level: 'P6',
    subject: 'Mathematics',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Nanyang P6 Math Preliminary Examination Paper 2',
    totalMarks: 55,
    featuredTopics: ['Composite Area', 'Speed & Rate problems', 'Ratio & Proportion Heuristics', 'Pie Charts & Averages'],
    estimatedTimeMin: 90,
    difficulty: 'High-Order'
  },
  {
    id: 'paper-p6-rg-s-sa2',
    schoolId: 'raffles',
    level: 'P6',
    subject: 'Science',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Raffles Girls\' P6 Science prelims Year-End Paper',
    totalMarks: 44,
    featuredTopics: ['Adaptations to Environment', 'Forces (Gravity, Friction, Elastic)', 'Energy Forms & Uses'],
    estimatedTimeMin: 75,
    difficulty: 'High-Order'
  },
  {
    id: 'paper-p6-tn-m-sa1',
    schoolId: 'taonan',
    level: 'P6',
    subject: 'Mathematics',
    year: 2025,
    term: 'Term 2 (SA1/WA2)',
    name: 'Tao Nan P6 Math SA1 Mid-Year Paper',
    totalMarks: 40,
    featuredTopics: ['Advanced Fractions & Percentages', 'Algebra Basics', 'Angles in Geometrical Figures'],
    estimatedTimeMin: 60,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p6-ro-s-sa2',
    schoolId: 'rosyth',
    level: 'P6',
    subject: 'Science',
    year: 2024,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Rosyth School P6 Science PSLE Preliminary Trial',
    totalMarks: 44,
    featuredTopics: ['Photosynthesis & Respiration', 'Organisms Food Webs & Energy Transfer', 'Forces (Gravity, Friction, Elastic)'],
    estimatedTimeMin: 75,
    difficulty: 'High-Order'
  },
  {
    id: 'paper-p6-acs-e-sa2',
    schoolId: 'acs',
    level: 'P6',
    subject: 'English',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'ACS Primary P6 English Preliminary Paper 2',
    totalMarks: 45,
    featuredTopics: ['Advanced Synthesis (Active/Passive, Direct/Indirect)', 'High-Frequency PSLE Vocabulary'],
    estimatedTimeMin: 60,
    difficulty: 'Challenging'
  },
  {
    id: 'paper-p6-sn-m-ca1',
    schoolId: 'stnicholas',
    level: 'P6',
    subject: 'Mathematics',
    year: 2025,
    term: 'Term 1 (CA1/WA1)',
    name: 'St. Nicholas Girls\' P6 Math WA1 Continual assessment',
    totalMarks: 30,
    featuredTopics: ['Algebra Basics', 'Advanced Fractions & Percentages'],
    estimatedTimeMin: 45,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p6-hp-s-ca2',
    schoolId: 'henrypark',
    level: 'P6',
    subject: 'Science',
    year: 2024,
    term: 'Term 3 (CA2/WA3)',
    name: 'Henry Park P6 Science WA3 Topical Trawl Assessment',
    totalMarks: 30,
    featuredTopics: ['Organisms Food Webs & Energy Transfer', 'Energy Forms & Uses'],
    estimatedTimeMin: 45,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p6-mg-e-sa1',
    schoolId: 'mgs',
    level: 'P6',
    subject: 'English',
    year: 2025,
    term: 'Term 2 (SA1/WA2)',
    name: 'MGS Primary P6 English SA1 Semester Examination',
    totalMarks: 50,
    featuredTopics: ['Complex Relative Clauses', 'Precision Editing checklist'],
    estimatedTimeMin: 50,
    difficulty: 'Challenging'
  },

  // Primary 5
  {
    id: 'paper-p5-ny-m-sa2',
    schoolId: 'nanyang',
    level: 'P5',
    subject: 'Mathematics',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Nanyang P5 Math Final Year-End SA2 Paper 2',
    totalMarks: 50,
    featuredTopics: ['Ratio', 'Fractions', 'Volume (Cube/Cuboid)', 'Area of Triangle'],
    estimatedTimeMin: 80,
    difficulty: 'Challenging'
  },
  {
    id: 'paper-p5-rg-s-sa2',
    schoolId: 'raffles',
    level: 'P5',
    subject: 'Science',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Raffles Girls\' P5 Science SA2 Academic Paper',
    totalMarks: 40,
    featuredTopics: ['Electricity Systems', 'Water Cycle & States of Water', 'Cells Structure & Function'],
    estimatedTimeMin: 60,
    difficulty: 'Challenging'
  },
  {
    id: 'paper-p5-ny-s-sa1',
    schoolId: 'nanyang',
    level: 'P5',
    subject: 'Science',
    year: 2025,
    term: 'Term 2 (SA1/WA2)',
    name: 'Nanyang P5 Science SA1 Mid-Year Examination',
    totalMarks: 40,
    featuredTopics: ['Reproduction in Plants', 'Reproduction in Humans', 'Cells Structure & Function'],
    estimatedTimeMin: 60,
    difficulty: 'Challenging'
  },
  {
    id: 'paper-p5-tn-m-ca2',
    schoolId: 'taonan',
    level: 'P5',
    subject: 'Mathematics',
    year: 2024,
    term: 'Term 3 (CA2/WA3)',
    name: 'Tao Nan P5 Math WA3 Topical Test',
    totalMarks: 25,
    featuredTopics: ['Ratio', 'Volume (Cube/Cuboid)'],
    estimatedTimeMin: 35,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p5-ro-e-sa2',
    schoolId: 'rosyth',
    level: 'P5',
    subject: 'English',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'Rosyth School P5 English Final Year Assessment',
    totalMarks: 40,
    featuredTopics: ['Synthesis & Transformation (Connectors)', 'Editing (Spelling & Core Grammar)'],
    estimatedTimeMin: 50,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p5-acs-m-sa1',
    schoolId: 'acs',
    level: 'P5',
    subject: 'Mathematics',
    year: 2024,
    term: 'Term 2 (SA1/WA2)',
    name: 'ACS Primary P5 Math Mid-Year SA1 Paper 2',
    totalMarks: 40,
    featuredTopics: ['Fractions', 'Decimals', 'Area of Triangle'],
    estimatedTimeMin: 60,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p5-hp-s-ca1',
    schoolId: 'henrypark',
    level: 'P5',
    subject: 'Science',
    year: 2025,
    term: 'Term 1 (CA1/WA1)',
    name: 'Henry Park P5 Science CA1 Continual Assessment',
    totalMarks: 20,
    featuredTopics: ['Respiratory & Circulatory Systems', 'Cells Structure & Function'],
    estimatedTimeMin: 30,
    difficulty: 'Standard'
  },
  {
    id: 'paper-p5-sn-e-sa2',
    schoolId: 'stnicholas',
    level: 'P5',
    subject: 'English',
    year: 2025,
    term: 'Term 4 (SA2/Prelims)',
    name: 'St. Nicholas Girls\' P5 English Final SA2 Paper',
    totalMarks: 45,
    featuredTopics: ['Synthesis & Transformation (Connectors)', 'Comprehension Cloze Patterns'],
    estimatedTimeMin: 60,
    difficulty: 'Challenging'
  }
];

// Offline fallback mock questions so that the user doesn't get a blank page if the API fails
export const FALLBACK_QUESTIONS: Record<string, any[]> = {
  'Mathematics': [
    {
      id: 'math-idx-1',
      type: 'mcq',
      question: 'At a primary school sports day, the ratio of the number of boys to the number of girls is 5 : 3. After 120 boys leave and 50 girls arrive, the ratio of the number of boys to the number of girls becomes 1 : 1. How many children were there at the sports day at first?',
      options: [
        '340 children',
        '420 children',
        '680 children',
        '510 children'
      ],
      correctAnswer: '680 children',
      explanation: 'Let boys = 5u and girls = 3u. First state: Boys - 120, Girls + 50 to get 1:1 ratio.\nSo 5u - 120 = 3u + 50.\nRearranging the terms: 5u - 3u = 120 + 50 => 2u = 170 => u = 85.\nTotal children initially = 5u + 3u = 8u.\n8 * 85 = 680 children.',
      topic: 'Ratio & Proportion Heuristics',
      marks: 3
    },
    {
      id: 'math-idx-2',
      type: 'open-ended',
      question: 'The figure shows a shaded composite rectangle. A circle of radius 7cm is cut out from the centre of a square of side 20cm. Find the remaining area of the square. (Take \u03c0 = 22/7)',
      correctAnswer: '246',
      explanation: 'Area of square = 20cm * 20cm = 400 cm\u00b2.\nArea of circle of radius 7cm = \u03c0 * r\u00b2 = (22/7) * 7 * 7 = 154 cm\u00b2.\nRemaining area = 400 - 154 = 246 cm\u00b2.',
      topic: 'Circles (Area & Perimeter)',
      marks: 2
    },
    {
      id: 'math-idx-3',
      type: 'mcq',
      question: 'Nanyang Math Style Heuristics: John spent 2/5 of his savings on a bicycle and 1/3 of the remaining on accessories. He had $180 left. What was his original savings?',
      options: [
        '$450',
        '$600',
        '$360',
        '$540'
      ],
      correctAnswer: '$450',
      explanation: 'John spent 2/5 on a typewriter/bicycle. Remaining = 3/5.\nHe spent 1/3 of the remaining on accessories = 1/3 * 3/5 = 1/5.\nTotal spent = 2/5 + 1/5 = 3/5.\nRemaining balance = 2/5 of savings.\nThus 2/5 of savings = $180 => 1/5 = $90 => Savings = 5 * 90 = $450.',
      topic: 'Advanced Fractions & Percentages',
      marks: 2
    }
  ],
  'Science': [
    {
      id: 'sci-idx-1',
      type: 'open-ended',
      question: 'Rosyth Experimental Science: A student sets up an experiment with two sealed containers, A and B. Container A holds a live grasshopper and moist cotton wool. Container B holds moist cotton wool with no insects. If container A\'s carbon dioxide levels rise drastically after 2 hours while B\'s remains constant, state the process responsible for the change and explain why Container B was prepared.',
      correctAnswer: 'Respiration; Container B acts as a control setup to verify that the increase in carbon dioxide was solely due to the respiration of the grasshopper, and not from the cotton wool or surrounding atmosphere.',
      explanation: 'The process is respiration. Container B acts as a control setup, which is essential to prove that the grasshopper\'s respiration is the sole variable producing carbon dioxide, ensuring a fair, reliable experiment.',
      topic: 'Photosynthesis & Respiration',
      marks: 3
    },
    {
      id: 'sci-idx-2',
      type: 'mcq',
      question: 'Which of the following describes what happens to the force of friction and the speed of an object moving on sand compared to smooth tiles?',
      options: [
        'Frictional force increases, speed increases',
        'Frictional force increases, speed decreases',
        'Frictional force decreases, speed decreases',
        'Frictional force remains the same, speed decreases'
      ],
      correctAnswer: 'Frictional force increases, speed decreases',
      explanation: 'Sand has a rougher surface than tiles, increasing opposing frictional force. Enhanced friction slows down the speed of the slide or roll.',
      topic: 'Forces (Gravity, Friction, Elastic)',
      marks: 2
    }
  ],
  'English': [
    {
      id: 'eng-idx-1',
      type: 'synthesis',
      question: 'Combine the sentences into a single sentence using the word provided. The sentence must be grammatically complete and convey the exact meaning.\n\nSentences: Marcus was extremely exhausted. He completed the full 2.4km running trial.\nWord to use: "Exhausted as"',
      correctAnswer: 'Exhausted as Marcus was, he completed the full 2.4km running trial.',
      explanation: 'Using the concession structure "Adjective + as + Subject + Verb", the correct phrasing transforms into: "Exhausted as Marcus was, he completed..."',
      topic: 'Advanced Synthesis (Active/Passive, Direct/Indirect)',
      marks: 2
    },
    {
      id: 'eng-idx-2',
      type: 'cloze',
      question: 'Fill in the blank with the most appropriate word to fit the context:\n\nThe Principal\'s stellar speech _________ the students to strive for academic greatness and support each other with compassion.',
      correctAnswer: 'inspired',
      explanation: 'The context of motivating students to achieve high goals corresponds to "inspired" or "motivated" or "challenged". "inspired" is standard.',
      topic: 'High-Frequency PSLE Vocabulary',
      marks: 1
    }
  ]
};
