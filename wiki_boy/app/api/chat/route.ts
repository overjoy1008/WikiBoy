// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import AnthropicService from '@/app/backend/llm/anthropic';

export async function POST(request: Request) {
  const { keyword } = await request.json();

  const anthropic_service = new AnthropicService();
  const chatHistory = [
    { role: 'system', content: `너는 위키피디아에 나오는 키워드 정리를 도와주는 전문가야. 예를 들어 딥러닝의 키워드에 대해 물어보면, 머신러닝, CNN, RNN 등 그와 관련된 키워드를 떠올릴 수 있어야 해. 답변은 항상 JSON 형태로 줘 키워드가 한글이면 한글 위주로, 키워드가 영어면 영어 위주로 제시해야 해.
{
    "keyword": [머신러닝, CNN, RNN, ...]
}` },
    { role: 'user', content: `키워드: ${keyword}\nJSON 형태로만 답변해줘.` }
  ];

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const chatStream = anthropic_service.Claude35Sonnet(chatHistory, 512, 0);
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