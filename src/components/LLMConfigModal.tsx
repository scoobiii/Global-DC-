import React, { useState } from 'react';
import { LLMConfig, LLM_PROVIDERS, LLMProviderId } from '../types/llm';
import { Settings, X, Check, AlertCircle, Globe, Cpu } from 'lucide-react';
import { callLLM } from '../services/llmService';

interface Props {
  config: LLMConfig;
  onSave: (config: LLMConfig) => void;
  onClose: () => void;
}

export const LLMConfigModal: React.FC<Props> = ({ config, onSave, onClose }) => {
  const [draft, setDraft] = useState<LLMConfig>({ ...config });
  const [showKey, setShowKey] = useState(false);
  const [testState, setTestState] = useState<'idle' | 'testing' | 'ok' | 'err'>('idle');
  const [testMsg, setTestMsg] = useState('');

  const provider = LLM_PROVIDERS.find(p => p.id === draft.providerId) || LLM_PROVIDERS[0];

  const set = (k: keyof LLMConfig, v: any) => setDraft(d => ({ ...d, [k]: v }));

  const switchProvider = (id: LLMProviderId) => {
    const p = LLM_PROVIDERS.find(x => x.id === id)!;
    setDraft(d => ({
      ...d,
      providerId: id,
      model: p.defaultModel,
      baseUrl: p.baseUrl,
      apiKey: '',
    }));
    setTestState('idle');
  };

  const testConnection = async () => {
    setTestState('testing');
    setTestMsg('');
    try {
      const reply = await callLLM(
        { ...draft, maxTokens: 50, temperature: 0 },
        "You are a test assistant. Respond with 'OK' if you receive this.",
        [{ role: 'user', content: 'ping' }]
      );
      setTestState('ok');
      setTestMsg(reply.slice(0, 100));
    } catch (e: any) {
      setTestState('err');
      setTestMsg(e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-white font-bold">LLM Configuration</h2>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Web vs Local AI Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Select Provider</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LLM_PROVIDERS.map(p => (
                <button
                  key={p.id}
                  onClick={() => switchProvider(p.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-bold ${
                    draft.providerId === p.id 
                      ? 'bg-white/5 border-white/20 text-white' 
                      : 'bg-transparent border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-zinc-600 italic">{provider.note}</p>
          </div>

          {/* Base URL (if editable) */}
          {provider.urlEditable && (
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Base URL</label>
              <div className="flex items-center gap-2 bg-black border border-white/10 rounded-lg px-3 py-2">
                <Globe className="w-4 h-4 text-zinc-600" />
                <input
                  value={draft.baseUrl}
                  onChange={e => set('baseUrl', e.target.value)}
                  className="bg-transparent border-none outline-none text-zinc-300 text-xs flex-1 font-mono"
                  placeholder="http://localhost:11434"
                />
              </div>
            </div>
          )}

          {/* Model Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Model</label>
              <select
                value={draft.model}
                onChange={e => set('model', e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300 text-xs outline-none focus:border-blue-500/50"
              >
                {provider.models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Custom Model Name</label>
              <input
                value={draft.model}
                onChange={e => set('model', e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-zinc-300 text-xs outline-none focus:border-blue-500/50 font-mono"
                placeholder="llama3"
              />
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">API Key</label>
            <div className="flex items-center gap-2 bg-black border border-white/10 rounded-lg px-3 py-2">
              <input
                type={showKey ? 'text' : 'password'}
                value={draft.apiKey}
                onChange={e => set('apiKey', e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-300 text-xs flex-1 font-mono"
                placeholder={provider.keyPlaceholder}
              />
              <button 
                onClick={() => setShowKey(!showKey)}
                className="text-zinc-600 hover:text-zinc-400"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="mt-1 text-[9px] text-zinc-600 uppercase tracking-tighter">Stored in memory only. Cleared on refresh.</p>
          </div>

          {/* Test Connection */}
          <div className="p-4 bg-black/50 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={testConnection}
                disabled={testState === 'testing'}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase rounded-lg transition-all disabled:opacity-50"
              >
                <Cpu className="w-3 h-3" />
                {testState === 'testing' ? 'Testing...' : 'Test Connection'}
              </button>
              {testState === 'ok' && <Check className="w-5 h-5 text-green-500" />}
              {testState === 'err' && <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>
            {testMsg && (
              <div className={`text-[10px] font-mono p-2 rounded border ${
                testState === 'ok' ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'
              }`}>
                {testMsg}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-zinc-500 hover:text-white text-[10px] font-bold uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase rounded-lg transition-all shadow-lg shadow-blue-900/20"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
