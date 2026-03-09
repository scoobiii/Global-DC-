import React from 'react';
import { DataCenter } from '../types';
import { ShieldAlert, AlertTriangle, Info, Target } from 'lucide-react';

interface Props {
  dc: DataCenter;
}

export const RiskAnalysisPanel: React.FC<Props> = ({ dc }) => {
  const riskColor = 
    dc.riskLevel === 'extreme' ? 'text-red-500' :
    dc.riskLevel === 'high' ? 'text-orange-500' :
    dc.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          ANÁLISE DE RISCO GEOPOLÍTICO
        </h3>
        <span className={`text-xs font-black px-2 py-1 rounded border ${riskColor.replace('text', 'border')} ${riskColor.replace('text', 'bg-opacity-10 bg')}`}>
          {dc.riskLevel.toUpperCase()}
        </span>
      </div>

      <div className="space-y-4">
        {dc.threats.map((threat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <span className="text-white font-semibold">{threat.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  threat.probability > 0.8 ? 'bg-red-500 animate-pulse' :
                  threat.probability > 0.5 ? 'bg-orange-500' :
                  'bg-emerald-500'
                }`} />
                <span className="text-xs text-zinc-500 font-mono">PROB: {(threat.probability * 100).toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {threat.description}
            </p>
            <div className="mt-3 w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-1000 ease-out" 
                style={{ width: `${threat.probability * 100}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3">Redundância de Infraestrutura</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-zinc-800/50 p-3 rounded-lg border border-white/5">
            <p className="text-[10px] text-zinc-500 mb-1">TIER / TOPOLOGY</p>
            <p className="text-lg font-bold text-white">{dc.redundancy}</p>
          </div>
          <div className="flex-1 bg-zinc-800/50 p-3 rounded-lg border border-white/5">
            <p className="text-[10px] text-zinc-500 mb-1">STATUS</p>
            <p className="text-lg font-bold text-green-400">OPERATIONAL</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex flex-col gap-3">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
          <p className="text-xs text-blue-200 leading-tight">
            Monitoramento ativo de vetores de ataque por drones. Protocolos de interferência eletrônica (Electronic Warfare) em standby.
          </p>
        </div>
        <a 
          href={
            dc.provider === 'AWS' ? 'https://health.aws.amazon.com/health/status' :
            dc.provider === 'GCP' ? 'https://status.cloud.google.com/' :
            dc.provider === 'Azure' ? 'https://status.azure.com/en-us/status' :
            '#'
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase flex items-center gap-1 mt-1"
        >
          View Official {dc.provider} Status Dashboard →
        </a>
      </div>
    </div>
  );
};
