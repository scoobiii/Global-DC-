export type LLMProviderId = 'anthropic' | 'openai' | 'ollama' | 'lmstudio' | 'custom' | 'gemini';

export interface LLMProvider {
  id: LLMProviderId;
  label: string;
  icon: string;
  color: string;
  defaultModel: string;
  models: string[];
  baseUrl: string;
  urlEditable: boolean;
  keyPlaceholder: string;
  note: string;
}

export interface LLMConfig {
  providerId: LLMProviderId;
  model: string;
  apiKey: string;
  baseUrl: string;
  maxTokens: number;
  temperature: number;
}

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: 'gemini',
    label: 'Google Gemini',
    icon: '✨',
    color: '#4285F4',
    defaultModel: 'gemini-1.5-flash',
    models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'],
    baseUrl: 'https://generativelanguage.googleapis.com',
    urlEditable: false,
    keyPlaceholder: 'AIzaSy...',
    note: 'Google AI Studio API Key',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    icon: '◈',
    color: '#CC785C',
    defaultModel: 'claude-3-5-sonnet-20240620',
    models: ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'],
    baseUrl: 'https://api.anthropic.com',
    urlEditable: false,
    keyPlaceholder: 'sk-ant-api03-...',
    note: 'API key from console.anthropic.com',
  },
  {
    id: 'openai',
    label: 'OpenAI',
    icon: '◎',
    color: '#10A37F',
    defaultModel: 'gpt-4o',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    baseUrl: 'https://api.openai.com',
    urlEditable: false,
    keyPlaceholder: 'sk-proj-...',
    note: 'API key from platform.openai.com',
  },
  {
    id: 'ollama',
    label: 'Ollama Local',
    icon: '⬡',
    color: '#3B9EFF',
    defaultModel: 'llama3',
    models: ['llama3', 'mistral', 'phi3', 'deepseek-coder'],
    baseUrl: 'http://localhost:11434',
    urlEditable: true,
    keyPlaceholder: '(no key needed)',
    note: 'Local Ollama instance',
  },
  {
    id: 'lmstudio',
    label: 'LM Studio',
    icon: '◉',
    color: '#B06EFF',
    defaultModel: 'local-model',
    models: ['local-model'],
    baseUrl: 'http://localhost:1234',
    urlEditable: true,
    keyPlaceholder: 'lm-studio',
    note: 'OpenAI-compatible local API',
  },
];

export const DEFAULT_LLM_CONFIG: LLMConfig = {
  providerId: 'gemini',
  model: 'gemini-1.5-flash',
  apiKey: '',
  baseUrl: 'https://generativelanguage.googleapis.com',
  maxTokens: 1000,
  temperature: 0.7,
};
