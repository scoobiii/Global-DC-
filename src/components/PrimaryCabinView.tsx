import React from 'react';
import { DataCenter, UIStyle } from '../types';
import { Activity, Battery, Zap, ShieldAlert, Thermometer, Cpu, Leaf, Wind, Droplets, Server, BarChart3, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { MiniMap } from './MiniMap';

interface Props {
  dc: DataCenter;
  style: UIStyle;
}

export const PrimaryCabinView: React.FC<Props> = ({ dc, style }) => {
  const cabin = dc.cabin;
  const isClassic = style === 'classic-scada';
  const isMicroX = style === 'micro-scada-x';

  const containerClass = isClassic 
    ? "border-2 border-[#00FF00] p-4 bg-black" 
    : isMicroX 
    ? "bg-[#252525] p-6 rounded-lg border border-[#444]" 
    : "bg-zinc-900 p-6 rounded-2xl border border-white/10";

  const labelClass = isClassic ? "text-[#00FF00] uppercase text-[10px]" : "text-zinc-500 text-[10px] font-bold uppercase tracking-wider";
  const valueClass = isClassic ? "text-[#FFFF00] text-sm" : "text-white text-sm font-bold";
  const sectionTitleClass = isClassic ? "text-[#00FF00] text-xs font-black border-b border-[#00FF00] mb-3 pb-1" : "text-zinc-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2";

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h3 className={isClassic ? "text-[#00FF00] text-xl font-bold" : "text-white text-lg font-black flex items-center gap-2"}>
            {!isClassic && <Zap className="w-5 h-5 text-yellow-400" />}
            INFRAESTRUTURA CRÍTICA - ZERO DIESEL ECO-SYSTEM
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">SISTEMA INTEGRADO: SUBESTAÇÃO / ETANOL / BESS / HVAC</p>
        </div>
        <div className="flex gap-4">
          <div className={`px-3 py-1 rounded text-[10px] font-black border ${cabin.breaker.status === 'closed' ? 'bg-green-900/50 text-green-400 border-green-500' : 'bg-red-900/50 text-red-400 border-red-500'}`}>
            BREAKER: {cabin.breaker.status.toUpperCase()}
          </div>
          <div className="px-3 py-1 rounded text-[10px] font-black border bg-emerald-900/50 text-emerald-400 border-emerald-500">
            PUE: {cabin.itLoad.totalPUE.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 1. SUBSTATION & PROTECTION */}
        <div className="space-y-6">
          <div>
            <h4 className={sectionTitleClass}>
              <Activity className="w-4 h-4 text-blue-400" />
              Subestação & Proteção
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={labelClass}>Voltage In</p>
                <p className={valueClass}>{cabin.substation.voltageIn} kV</p>
              </div>
              <div>
                <p className={labelClass}>Voltage Out</p>
                <p className={valueClass}>{cabin.substation.voltageOut} kV</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-4">
              <p className={labelClass}>Power Quality</p>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase">Voltage</p>
                  <p className="text-xs font-bold text-white">{cabin.measurement.voltage}kV</p>
                </div>
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase">Current</p>
                  <p className="text-xs font-bold text-white">{cabin.measurement.current}A</p>
                </div>
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase">PF</p>
                  <p className="text-xs font-bold text-white">{cabin.measurement.powerFactor.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className={labelClass}>Breaker Status</p>
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${cabin.breaker.status === 'closed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {cabin.breaker.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[8px] text-zinc-500 uppercase">Last Action: {cabin.breaker.lastAction}</p>
              
              <div className="mt-3 space-y-1">
                <p className={labelClass}>Relays</p>
                <div className="grid grid-cols-3 gap-1">
                  <div className={`text-[7px] p-1 rounded text-center border ${cabin.relays.overcurrent ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>OVERCURRENT</div>
                  <div className={`text-[7px] p-1 rounded text-center border ${cabin.relays.differential ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>DIFF</div>
                  <div className={`text-[7px] p-1 rounded text-center border ${cabin.relays.thermal ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>THERMAL</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className={labelClass}>Transformers</p>
              {cabin.substation.transformers.map(t => (
                <div key={t.id} className="p-2 bg-white/5 rounded border border-white/5">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-zinc-400 font-bold">{t.id} ({t.capacity}MVA)</span>
                    <span className={t.temp > 60 ? 'text-orange-400' : 'text-emerald-400'}>{t.temp}°C</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${t.load}%` }} className="h-full bg-blue-500" />
                  </div>
                  <p className="text-[9px] text-right mt-1 text-zinc-500">LOAD: {t.load}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. ENERGY STORAGE (BESS) & UPS */}
        <div className="space-y-6">
          <div>
            <h4 className={sectionTitleClass}>
              <Battery className="w-4 h-4 text-yellow-400" />
              BESS & UPS
            </h4>
            <div className="space-y-4">
              {cabin.bess.systems.map(s => (
                <div key={s.id} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 font-bold">{s.id}</span>
                      <span className="text-[8px] text-zinc-600 uppercase tracking-tighter">{s.coupling} Coupled | {s.integration}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase">{s.status}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-white">{s.soc}% SoC</span>
                        <span className="text-[9px] text-zinc-500">{s.chargeRate} MW</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${s.soc}%` }} 
                          className={`h-full ${s.soc < 20 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl">
              <p className={labelClass}>UPS Distribution</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase">Battery</p>
                  <p className="text-lg font-black text-white">{cabin.ups.batteryLevel}%</p>
                </div>
                <div>
                  <p className="text-[8px] text-zinc-500 uppercase">Load</p>
                  <p className="text-lg font-black text-white">{cabin.ups.load}%</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] text-purple-300 font-bold uppercase">{cabin.ups.status}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className={sectionTitleClass}>
              <Leaf className="w-4 h-4 text-emerald-400" />
              Power Generation {cabin.generation.type === 'Hybrid' ? '(Hybrid)' : '(Etanol)'}
            </h4>
            <div className="space-y-2 mb-4">
              {cabin.generation.units.map(u => (
                <div key={u.id} className="flex items-center justify-between p-2 bg-emerald-500/5 border border-emerald-500/10 rounded">
                  <span className="text-[10px] text-emerald-200 font-bold">{u.id}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white font-bold">{u.output} MW</span>
                    <div className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                  </div>
                </div>
              ))}
            </div>

            {cabin.generation.solar && (
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <p className={labelClass}>Solar Plant ({cabin.generation.solar.location})</p>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${cabin.generation.solar.integration === 'SIN' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {cabin.generation.solar.integration}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase">Output</p>
                    <p className="text-sm font-bold text-white">{cabin.generation.solar.output} MW</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-zinc-500 uppercase">Capacity</p>
                    <p className="text-xs font-bold text-zinc-400">{cabin.generation.solar.capacity} MWp</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. COOLING & HVAC */}
        <div className="space-y-6">
          <div>
            <h4 className={sectionTitleClass}>
              <Wind className="w-4 h-4 text-blue-300" />
              Cooling (HVAC)
            </h4>
            <div className="space-y-3 mb-4">
              {cabin.cooling.chillers.map(c => (
                <div key={c.id} className="flex items-center justify-between p-2 bg-blue-500/5 border border-blue-500/10 rounded">
                  <span className="text-[10px] text-blue-200 font-bold">{c.id}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white font-bold">{c.load} MW</span>
                    <div className={`w-2 h-2 rounded-full ${c.status === 'online' ? 'bg-blue-400' : 'bg-zinc-600'}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <span className={labelClass}>CDU Flow</span>
                <span className="text-xs font-bold text-white">{cabin.cooling.cdu.flowRate} GPM</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-800/50 p-2 rounded">
                  <p className={labelClass}>Inlet</p>
                  <p className="text-sm font-bold text-blue-400">{cabin.cooling.cdu.tempInlet}°C</p>
                </div>
                <div className="bg-zinc-800/50 p-2 rounded">
                  <p className={labelClass}>Outlet</p>
                  <p className="text-sm font-bold text-orange-400">{cabin.cooling.cdu.tempOutlet}°C</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-xl text-center">
              <p className={labelClass}>Aisle Temp</p>
              <p className="text-xl font-black text-blue-400">{cabin.cooling.aisleTemp}°C</p>
            </div>
            <div className="p-3 bg-zinc-900/50 border border-white/10 rounded-xl text-center">
              <p className={labelClass}>AHU Temp</p>
              <p className="text-xl font-black text-white">{cabin.cooling.ahu.temp}°C</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-900/50 border border-white/10 rounded-xl">
            <div className="flex justify-between items-center">
              <p className={labelClass}>AHU Humidity</p>
              <p className="text-sm font-bold text-blue-300">{cabin.cooling.ahu.humidity}%</p>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${cabin.cooling.ahu.humidity}%` }} className="h-full bg-blue-500" />
            </div>
          </div>
        </div>

        {/* 4. IT LOAD & SUSTAINABILITY */}
        <div className="space-y-6">
          <div>
            <h4 className={sectionTitleClass}>
              <Server className="w-4 h-4 text-zinc-300" />
              IT Load (PODs)
            </h4>
            <div className="space-y-3">
              {cabin.itLoad.pods.map(p => (
                <div key={p.id} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-zinc-400 font-bold">{p.id}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${p.type === 'AI/GPU' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                      {p.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={labelClass}>Load</p>
                      <p className="text-lg font-black text-white">{p.load} MW</p>
                    </div>
                    <div className="text-right">
                      <p className={labelClass}>Racks</p>
                      <p className="text-sm font-bold text-zinc-300">{p.rackCount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className={sectionTitleClass}>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Sustainability Metrics
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                <p className={labelClass}>PUE</p>
                <p className="text-sm font-bold text-emerald-400">{cabin.itLoad.totalPUE.toFixed(2)}</p>
              </div>
              <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                <p className={labelClass}>WUE</p>
                <p className="text-sm font-bold text-emerald-400">{cabin.sustainability.wue.toFixed(2)}</p>
              </div>
              <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                <p className={labelClass}>CUE</p>
                <p className="text-sm font-bold text-emerald-400">{cabin.sustainability.cue.toFixed(2)}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className={sectionTitleClass}>
                <MapPin className="w-4 h-4 text-blue-400" />
                Geospatial Context
              </h4>
              <MiniMap 
                lat={dc.location.lat} 
                lng={dc.location.lng} 
                name={dc.name} 
                riskLevel={dc.riskLevel} 
              />
              <div className="mt-2 flex justify-between text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">
                <span>LAT: {dc.location.lat.toFixed(4)}</span>
                <span>LNG: {dc.location.lng.toFixed(4)}</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-800/50 rounded border border-white/5">
              <p className={labelClass}>Carbon Emissions (tCO2e)</p>
              <div className="grid grid-cols-3 gap-1 mt-2">
                <div className="text-center">
                  <p className="text-[7px] text-zinc-500">SCOPE 1</p>
                  <p className="text-xs font-bold text-white">{cabin.sustainability.carbonScope1}</p>
                </div>
                <div className="text-center">
                  <p className="text-[7px] text-zinc-500">SCOPE 2</p>
                  <p className="text-xs font-bold text-white">{cabin.sustainability.carbonScope2}</p>
                </div>
                <div className="text-center">
                  <p className="text-[7px] text-zinc-500">SCOPE 3</p>
                  <p className="text-xs font-bold text-white">{cabin.sustainability.carbonScope3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
