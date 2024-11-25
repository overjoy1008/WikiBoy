// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import AnthropicService from '@/app/backend/llm/anthropic';

export async function POST(request: Request) {
  const { keyword } = await request.json();

  const anthropic_service = new AnthropicService();
  const chatHistory = [
    { role: 'system', content: 'You are a helpful assistant providing concise information.' },
    { role: 'user', content: `Tell me about ${keyword}` }
  ];

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const chatStream = anthropic_service.Claude35Sonnet(chatHistory, 1000);
        for await (const chunk of chatStream) {
          controller.enqueue(new TextEncoder().encode(`~~data~~${chunk}`));
        }
        controller.enqueue(new TextEncoder().encode('~~data~~[~~DONE~~]'));
      } catch (error) {
        console.error('Error in chat response:', error);
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}