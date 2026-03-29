export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ProgressRecord {
  id: string;
  user_id: string;
  score: number;
  total: number;
  created_at: string;
}

export interface SummarizerResponse {
  executiveSummary: string;
  keyConcepts: string[];
  whyItMatters: string;
  mnemonic: string;
}