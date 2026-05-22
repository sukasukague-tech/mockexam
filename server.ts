import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent for telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('⚠️ GEMINI_API_KEY environment variable is not defined. Falling back to simulated school style responses.');
}

// Ensure lazy evaluation and safety check for Gemini queries
const getGeminiClient = (): GoogleGenAI => {
  if (!ai) {
    throw new Error('GEMINI_API_KEY is missing or the SDK failed to initialize. Please configure it in your Secrets setting.');
  }
  return ai;
};

// API: Analyze School Exam Styles with Gemini
app.post('/api/school/analyze', async (req: Request, res: Response) => {
  try {
    const { schoolName, focusSub, difficulty, mathStyle, scienceStyle, englishStyle } = req.body;

    if (!schoolName) {
      res.status(400).json({ error: 'School name is required' });
      return;
    }

    const client = getGeminiClient();

    const prompt = `Provide an in-depth, expert-level academic analysis of the past examination paper patterns and pedagogy from standard prestigious primary schools in Singapore, specifically focusing on "${schoolName}".

Metadata profile:
- Primary Level Focus: P5 & P6 (Critical PSLE preparation years)
- Focus Area: ${focusSub || 'High Heuristics'}
- Average Paper Difficulty rating: ${difficulty || 4}/5
- Math Exam Patterns: ${mathStyle || 'Challenging heuristics and double-model questions'}
- Science Exam Patterns: ${scienceStyle || 'Precise causal requirements and open-ended experiment analysis'}
- English Exam Patterns: ${englishStyle || 'Advanced vocabulary cloze, tough synthesis transformation'}

Format the analysis with beautiful markdown structure. Include the following sections:
1. 🎯 PRIMARY PEDAGOGY: Describe the school\'s unique academic approach for P5/P6.
2. 🧩 MATH EXAM TRAPS: 3 typical tricky heuristic traps they set, and how students should approach them (referencing the "Model Method" or Unit visual methods).
3. 📝 SCIENCE SCENARIOS: The exact keyword strictness they enforce regarding causal linkages (e.g. "Result, Cause, Effect") and common experimental traps (e.g. control variables, raw data anomalies).
4. ✍️ ENGLISH RIGOR: Analysis of Sentence Synthesis structures they favor (e.g., using "Exhausted as", "Neither... nor", "Lest") and cloze strategies.
5. 💡 STUDENT & PARENT REVISION BLUEPRINT: 3 actionable study hacks tailormade for overcoming this school\'s challenging revision sheets.

Keep the tone academic, encouraging, ultra-professional, and hyper-localized to the Singapore MOE (Ministry of Education) curriculum.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    res.json({ analysis: response.text || 'No analysis could be compiled.' });
  } catch (error: any) {
    console.error('Gemini School Analysis error:', error);
    res.status(500).json({
      error: 'Failed to generate academic profile',
      details: error?.message || String(error),
    });
  }
});

// API: Generate Mock Examination Questions modeled on top SG schools
app.post('/api/exam/generate', async (req: Request, res: Response) => {
  try {
    const { schoolName, level, subject, term, topicStyle, difficulty } = req.body;

    if (!schoolName || !level || !subject) {
      res.status(400).json({ error: 'School name, level (P5/P6), and subject are required.' });
      return;
    }

    const client = getGeminiClient();

    const prompt = `Generate a set of 4 highly realistic Singapore Primary School exam questions modeled precisely after "${schoolName}" style for level ${level}, subject "${subject}", for "${term || 'Term 4 SA2/Prelims'}".
    
Featured Topics to cover: ${topicStyle || 'General Core MOE Syllabus Chapters'}.
School Style Profile and expected difficulty: ${difficulty || 'High-Order'} difficulty. 

Create questions following these criteria:
- Integrate typical patterns found in top papers (such as Nanyang's complex model heuristics for Math, Raffles-style experimental hypothesis testing for Science, or ACS-style Sentence Synthesis with demanding vocabulary for English).
- Distribute question types correctly:
  - If subject is Mathematics: Provide some MCQ, and some Open-ended model questions. For open-ended, the correctAnswer should be a pure numerical value (or straightforward numeric string) so the student can check easily, and the explanation must show the step-by-step working.
  - If subject is Science: Provide 1 process MCQ, and 3 open-ended scenario-based experimental template questions.
  - If subject is English: Provide 2 synthesis items (incorporating specific keywords, e.g. "No sooner had", "Adjective + as", "Only after"), and 2 high-level multiple choice questions testing critical grammar rules.

YOUR RESPONSE MUST STRICTLY COMPLY WITH THE GIVEN JSON SCHEMA. Do not output any chat prose or markdown syntax around the JSON itself.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'A list of mock primary school examination questions.',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'Unique question id, e.g. q-1, q-2' },
              type: { type: Type.STRING, description: 'Must be one of: mcq, open-ended, synthesis, cloze' },
              question: { type: Type.STRING, description: 'The comprehensive body of the exam question, formatted professionally.' },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Must provide exactly 4 elements for MCQ type. Leave empty/null for non-MCQ questions.'
              },
              correctAnswer: { type: Type.STRING, description: 'For MCQ: must match the text of the correct option exactly. For other types: the model correct phrasing or numerical value.' },
              explanation: { type: Type.STRING, description: 'Hyper-detailed, step-by-step model explanation illustrating calculations, reasoning, or MOE approved keywords.' },
              topic: { type: Type.STRING, description: 'Syllabus chapter this belongs to, e.g. Speed, Electricity' },
              marks: { type: Type.INTEGER, description: 'Standard mark allocating weighting (usually 1, 2, or 3 marks)' }
            },
            required: ['id', 'type', 'question', 'correctAnswer', 'explanation', 'topic', 'marks']
          }
        }
      }
    });

    const text = response.text || '[]';
    res.json({ questions: JSON.parse(text) });
  } catch (error: any) {
    console.error('Gemini Exam Generation error:', error);
    res.status(500).json({
      error: 'Failed to build mock paper',
      details: error?.message || String(error),
    });
  }
});

// Setup dev vs production environments
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SG Exam Trawler backend successfully serving on port ${PORT}`);
  });
}

startServer();
