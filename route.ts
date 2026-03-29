import { NextRequest, NextResponse } from 'next/server';
import { summarizeContent } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const summary = await summarizeContent(content);
    return NextResponse.json({ summary, success: true });
  } catch (error) {
    console.error('Summarize API error:', error);
    return NextResponse.json({ error: 'Failed to summarize content' }, { status: 500 });
  }
}
