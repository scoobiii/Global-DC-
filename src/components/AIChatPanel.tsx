import React, { useState, useRef, useEffect } from 'react';
import { LLMConfig, LLM_PROVIDERS } from '../types/llm';
import { callLLM, Message } from '../services/llmService';
import { Send, Bot, User, Sparkles, X, ChevronDown, ChevronUp, Cpu, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  config: LLMConfig;
  onOpenConfig: () => void;
}

export const AIChatPanel: React.FC<Props> = ({ config, onOpenConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am the DC Sentinel AI assistant. I can help you analyze risk levels, sustainability metrics, or suggest action protocols for your data centers. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const provider = LLM_PROVIDERS.find(p => p.id === config.providerId) || LLM_PROVIDERS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are the DC Sentinel AI, a specialized assistant for a global data center monitoring dashboard. 
      You have access to real-time metrics about data centers, including PUE, risk levels (geopolitical, environmental, cyber), and sustainability data.
      Your tone is professional, technical, and alert. 
      Provide concise but insightful analysis. 
      If asked about specific data centers, assume you are looking at a fleet of strategic assets.`;

      const response = await callLLM(config, systemPrompt, [...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Please check your LLM configuration.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-zinc-800/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Sentinel AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                      {provider.label} · {config.model}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onOpenConfig}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white"
                  title="Configure LLM"
                >
                  {config.providerId === 'ollama' || config.providerId === 'lmstudio' ? <Cpu className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user' ? 'bg-zinc-800' : 'bg-blue-500/10'
                  }`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-zinc-800/50 text-zinc-300 border border-white/5 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-zinc-900">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Sentinel AI..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-zinc-300 outline-none focus:border-blue-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-blue-600"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? <ChevronDown className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>
    </div>
  );
};
