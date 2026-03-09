import React, { useState } from 'react';
import { X, Plus, Sun, Battery, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (config: any) => void;
}

export const CustomProjectConfig: React.FC<Props> = ({ isOpen, onClose, onDeploy }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    name: '',
    location: 'local' as 'local' | 'remote',
    integration: 'SIN' as 'SIN' | 'Private',
    coupling: 'AC' as 'AC' | 'DC',
    bessType: 'standalone' as 'standalone' | 'BESSxBESS',
    solarCapacity: 50
  });

  const handleFinish = () => {
    onDeploy(config);
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-800/50">
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter uppercase">Configuração de Novo Projeto</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Custom Asset Deployment Engine</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
                <div className={`h-full bg-blue-500 transition-all duration-500 ${step >= s ? 'w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nome do Projeto</label>
                  <input 
                    type="text" 
                    placeholder="Ex: SENTINEL-SOLAR-01"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Localização Solar</label>
                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                      {['local', 'remote'].map((l) => (
                        <button
                          key={l}
                          onClick={() => setConfig({ ...config, location: l })}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${
                            config.location === l ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Integração de Rede</label>
                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                      {['SIN', 'Private'].map((i) => (
                        <button
                          key={i}
                          onClick={() => setConfig({ ...config, integration: i })}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${
                            config.integration === i ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Acoplamento BESS</label>
                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                      {['AC', 'DC'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setConfig({ ...config, coupling: c })}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${
                            config.coupling === c ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Arquitetura BESS</label>
                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                      {['standalone', 'BESSxBESS'].map((b) => (
                        <button
                          key={b}
                          onClick={() => setConfig({ ...config, bessType: b })}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${
                            config.bessType === b ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Capacidade Solar (MWp)</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    step="10"
                    className="w-full accent-blue-500"
                    value={config.solarCapacity}
                    onChange={(e) => setConfig({ ...config, solarCapacity: parseInt(e.target.value) })}
                  />
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                    <span>10 MWp</span>
                    <span className="text-white">{config.solarCapacity} MWp</span>
                    <span>500 MWp</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Pronto para Deploy</h3>
                <p className="text-sm text-zinc-500">O projeto <span className="text-white font-bold">{config.name || 'UNNAMED'}</span> será integrado à rede <span className="text-white font-bold">{config.integration}</span> com arquitetura <span className="text-white font-bold">{config.bessType}</span>.</p>
                
                <div className="bg-black/50 border border-white/5 rounded-xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-zinc-500">Solar Location</span>
                    <span className="text-white">{config.location}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-zinc-500">Coupling Type</span>
                    <span className="text-white">{config.coupling}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-zinc-500">Target Capacity</span>
                    <span className="text-white">{config.solarCapacity} MWp</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-zinc-800/30 border-t border-white/5 flex justify-between">
          <button 
            onClick={() => step > 1 && setStep(step - 1)}
            className={`px-6 py-2 text-[10px] font-bold uppercase rounded transition-all ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Voltar
          </button>
          <button 
            onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
            className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg transition-all shadow-lg shadow-blue-900/20"
          >
            {step === 3 ? 'Finalizar Deploy' : 'Continuar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
