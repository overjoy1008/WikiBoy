// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import AnthropicService from '@/app/backend/llm/anthropic';

export async function POST(request: Request) {
    const { keyword, tocMode } = await request.json();
  
    const systemPrompts = {
//     default: `너는 위키피디아에 나오는 키워드 정리를 도와주는 전문가야. 예를 들어 딥러닝의 키워드에 대해 물어보면, 머신러닝, CNN, RNN 등 그와 관련된 키워드를 떠올릴 수 있어야 해. 답변은 항상 JSON 형태로 줘 키워드가 한글이면 한글 위주로, 키워드가 영어면 영어 위주로 제시해야 해.
//   {
//       "keyword": [머신러닝, CNN, RNN, ...]
//   }`,
    default: `너는 위키피디아에 나오는 키워드 정리를 도와주는 전문가야. 예를 들어 AND Gate 키워드에 대해 물어보면, OR Gate, NOT Gate, XOR Gate, SR Latch, D Flip-Flop 등 그와 관련된 키워드이자 동일한 위상에 있는 키워드를 최대한 많이 떠올릴 수 있어야 해. 답변은 항상 JSON 형태로 줘 키워드가 한글이면 한글 위주로, 키워드가 영어면 영어 위주로 제시해야 해.
  {
      "keyword": [OR Gate, NOT Gate, XOR Gate, SR Latch, D Flip-Flop, ...]
  }`,
    toc: `너는 위키피디아에 나오는 키워드의 목차를 정리해주는 교수님 및 학술 전문가야. 예를 들어 알고리즘의 키워드에 대해 물어보면, Asymptotic Notation, Insertion Sort, Merge Sort, Divide-and-Conquer, Hiring Problem, Heapsort 등 그와 관련된 목차의 순서대로 키워드를 떠올릴 수 있어야 해. 답변은 항상 JSON 형태로 줘.
  {
      "keyword": ["1. Asymptotic Notation", "2. Insertion Sort", "3. Merge Sort", "3-1. Divide-and-Conquer", "4. Hiring Problem", "5. Heapsort"...]
  }`
    };

    console.log(`Received tocMode: ${tocMode}`);
  
    const anthropic_service = new AnthropicService();
    const chatHistory = [
      { 
        role: 'system', 
        content: tocMode ? systemPrompts.toc : systemPrompts.default 
      },
      { 
        role: 'user', 
        content: `키워드: ${keyword}\nJSON 형태로만 답변해줘.` 
      }
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