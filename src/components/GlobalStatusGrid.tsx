import React from 'react';
import { DataCenter } from '../types';
import { Activity, Battery, Zap, ShieldAlert } from 'lucide-react';

interface Props {
  dcs: DataCenter[];
  onSelect: (id: string) => void;
  selectedId: string;
}

export const GlobalStatusGrid: React.FC<Props> = ({ dcs, onSelect, selectedId }) => {
  const displayDcs = dcs.slice(0, 50);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Showing {displayDcs.length} of {dcs.length.toLocaleString()} Assets
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Healthy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[8px] text-zinc-500 font-bold uppercase">Disruption</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayDcs.map((dc) => {
        const isSelected = selectedId === dc.id;
        return (
          <div 
            key={dc.id}
            onClick={() => onSelect(dc.id)}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              isSelected 
                ? 'bg-zinc-800 border-blue-500 ring-1 ring-blue-500' 
                : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                    dc.provider === 'AWS' ? 'bg-orange-500/10 border-orange-500/50 text-orange-500' :
                    dc.provider === 'GCP' ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' :
                    'bg-zinc-500/10 border-zinc-500/50 text-zinc-400'
                  }`}>
                    {dc.provider}
                  </span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                    dc.liveStatus === 'available' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                    'bg-red-500/10 border-red-500/50 text-red-500'
                  }`}>
                    {dc.liveStatus.toUpperCase()}
                  </span>
                  {dc.cabin.generation.type === 'Hybrid' && (
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded border bg-yellow-500/10 border-yellow-500/50 text-yellow-500">
                      HYBRID
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{dc.name}</h4>
                <p className="text-[10px] text-zinc-500 uppercase">{dc.location.region}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${dc.cabin.breaker.status === 'closed' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase">Voltage</p>
                  <p className="text-xs font-mono text-white">{dc.cabin.measurement.voltage}kV</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-blue-400" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase">Load</p>
                  <p className="text-xs font-mono text-white">{dc.cabin.ups.load}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-3 h-3 text-green-400" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase">BESS SoC</p>
                  <p className="text-xs font-mono text-white">{dc.cabin.bess.systems[0]?.soc ?? 0}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3 h-3 text-red-400" />
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase">Risk</p>
                  <p className={`text-xs font-bold uppercase ${
                    dc.riskLevel === 'extreme' ? 'text-red-500' : 'text-orange-500'
                  }`}>{dc.riskLevel}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
