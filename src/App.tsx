import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { GlobalMap } from './components/GlobalMap';
import { GlobalStatusGrid } from './components/GlobalStatusGrid';
import { GlobalTreemap } from './components/GlobalTreemap';
import { PrimaryCabinView } from './components/PrimaryCabinView';
import { RiskAnalysisPanel } from './components/RiskAnalysisPanel';
import { ActionProtocol } from './components/ActionProtocol';
import { CustomProjectConfig } from './components/CustomProjectConfig';
import { MOCK_DCS as INITIAL_DCS } from './constants';
import { createCustomDataCenter } from './dataGenerator';
import { UIStyle } from './types';
import { LayoutDashboard, Globe, ShieldAlert, Zap, Settings, Bell, Activity, Plus, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LLMConfig, DEFAULT_LLM_CONFIG } from './types/llm';
import { LLMConfigModal } from './components/LLMConfigModal';
import { AIChatPanel } from './components/AIChatPanel';

function DashboardContent() {
  const { style, setStyle } = useTheme();
  const [dcs, setDcs] = useState(INITIAL_DCS);
  const [selectedDcId, setSelectedDcId] = useState(INITIAL_DCS[0].id);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLLMConfigOpen, setIsLLMConfigOpen] = useState(false);
  const [llmConfig, setLlmConfig] = useState<LLMConfig>(DEFAULT_LLM_CONFIG);
  
  const selectedDc = dcs.find(dc => dc.id === selectedDcId) || dcs[0];

  const handleDeploy = (config: any) => {
    const newDc = createCustomDataCenter(config);
    setDcs([newDc, ...dcs]);
    setSelectedDcId(newDc.id);
  };

  const isClassic = style === 'classic-scada';
  const isMicroX = style === 'micro-scada-x';

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-black tracking-tighter flex items-center gap-3 ${isClassic ? 'text-[#00FF00]' : 'text-white'}`}>
            <LayoutDashboard className="w-8 h-8" />
            GLOBAL DC SENTINEL
            <span className="text-xs font-normal bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE THREAT MONITOR</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">
            Monitoring {dcs.length.toLocaleString()} Strategic Assets | Geopolitical Tension: <span className="text-red-400">CRITICAL</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-900 border border-white/10 p-1 rounded-lg">
            {(['classic-scada', 'micro-scada-x', 'modern-dark'] as UIStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                  style === s ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" />
            Novo Projeto
          </button>
          <button 
            onClick={() => setIsLLMConfigOpen(true)}
            className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white group relative"
            title="LLM Configuration"
          >
            <Cpu className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-black" />
          </button>
          <button className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Map & Protocols */}
        <div className="xl:col-span-8 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Global Asset Distribution</h2>
              </div>
              <GlobalMap 
                dcs={dcs} 
                selectedId={selectedDcId} 
                onSelect={setSelectedDcId} 
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Capacity Heatmap</h2>
              </div>
              <GlobalTreemap 
                dcs={dcs} 
                onSelect={setSelectedDcId} 
              />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Real-Time Metrics Overview</h2>
            </div>
            <GlobalStatusGrid 
              dcs={dcs} 
              onSelect={setSelectedDcId} 
              selectedId={selectedDcId} 
            />
          </section>

          <section>
            <ActionProtocol />
          </section>
        </div>

        {/* Right Column: Detailed DC View */}
        <div className="xl:col-span-4 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDc.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedDc.name}</h2>
                    <p className="text-zinc-500 text-xs font-medium">{selectedDc.location.city}, {selectedDc.location.country}</p>
                  </div>
                  <Settings className="w-5 h-5 text-zinc-600 cursor-pointer hover:text-white" />
                </div>
                
                <RiskAnalysisPanel dc={selectedDc} />
              </div>

              <PrimaryCabinView dc={selectedDc} style={style} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="mt-12 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            SCADA CORE: ONLINE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            ENCRYPTION: AES-256 ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            SYNCING WITH GLOBAL COMMAND...
          </div>
        </div>
        <div>
          © 2026 DC SENTINEL | V4.2.0-STABLE
        </div>
      </footer>

      <CustomProjectConfig 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        onDeploy={handleDeploy}
      />

      <AIChatPanel 
        config={llmConfig} 
        onOpenConfig={() => setIsLLMConfigOpen(true)} 
      />

      {isLLMConfigOpen && (
        <LLMConfigModal 
          config={llmConfig} 
          onSave={(cfg) => { setLlmConfig(cfg); setIsLLMConfigOpen(false); }} 
          onClose={() => setIsLLMConfigOpen(false)} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
