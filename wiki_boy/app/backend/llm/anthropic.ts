// app/backend/llm/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";

export default class AnthropicService {
  private anthropic: Anthropic;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  async* Claude35Sonnet(chatHistory: any[], max_tokens: number) {
    const system_prompt = chatHistory.shift()['content'];
    
    const stream = await this.anthropic.messages.stream({
      messages: chatHistory,
      system: system_prompt,
      model: 'claude-3-5-sonnet-20240620',
      max_tokens,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
        // console.log(chunk.delta.text);
        yield chunk.delta.text;
      }
    }
  }
}