import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getChatHistory(userId: string, limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

export async function saveChatMessage(
  userId: string,
  role: 'user' | 'assistant',
  content: string
) {
  try {
    const { data, error } = await supabase
      .from('chats')
      .insert([{ user_id: userId, role, content, created_at: new Date().toISOString() }])
      .select();
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return null;
  }
}

export async function saveProgress(userId: string, score: number, total: number) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .insert([{ user_id: userId, score, total, created_at: new Date().toISOString() }])
      .select();
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error saving progress:', error);
    return null;
  }
}

export async function getProgress(userId: string, limit: number = 20) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching progress:', error);
    return [];
  }
}