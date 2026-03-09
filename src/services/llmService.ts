import { GoogleGenAI } from "@google/genai";
import { LLMConfig } from "../types/llm";

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

async function callGemini(config: LLMConfig, system: string, messages: Message[]) {
  const apiKey = config.apiKey || (process.env.GEMINI_API_KEY as string);
  if (!apiKey) throw new Error("Gemini API Key missing");
  
  const ai = new GoogleGenAI({ apiKey });
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  
  const lastMessage = messages[messages.length - 1].content;
  
  const response = await ai.models.generateContent({
    model: config.model,
    contents: [...history, { role: 'user', parts: [{ text: lastMessage }] }],
    config: {
      systemInstruction: system,
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
    }
  });
  
  return response.text || "No response received.";
}

async function callOpenAICompat(config: LLMConfig, system: string, messages: Message[]) {
  const url = `${config.baseUrl}/v1/chat/completions`;
  const body = {
    model: config.model,
    max_tokens: config.maxTokens,
    temperature: config.temperature,
    messages: [
      { role: "system", content: system },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ],
  };
  
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;

  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${errorData.error?.message || res.statusText}`);
  }
  
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response received.";
}

async function callAnthropic(config: LLMConfig, system: string, messages: Message[]) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.maxTokens,
      system,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`HTTP ${res.status}: ${errorData.error?.message || res.statusText}`);
  }
  
  const data = await res.json();
  return data.content?.map((c: any) => c.text || "").join("") || "No response received.";
}

export async function callLLM(config: LLMConfig, system: string, messages: Message[]) {
  switch (config.providerId) {
    case 'gemini':
      return callGemini(config, system, messages);
    case 'anthropic':
      return callAnthropic(config, system, messages);
    case 'openai':
    case 'ollama':
    case 'lmstudio':
    case 'custom':
    default:
      return callOpenAICompat(config, system, messages);
  }
}
