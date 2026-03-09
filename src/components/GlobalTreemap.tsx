import React, { useState } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { DataCenter } from '../types';

interface Props {
  dcs: DataCenter[];
  onSelect: (id: string) => void;
}

export const GlobalTreemap: React.FC<Props> = ({ dcs, onSelect }) => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  // Map regions to Continents
  const getContinent = (region: string) => {
    if (region === 'Middle East') return 'Asia';
    return region;
  };

  const allContinents = Array.from(new Set(dcs.map(dc => getContinent(dc.location.region))));
  
  const filteredDcs = selectedContinent 
    ? dcs.filter(dc => getContinent(dc.location.region) === selectedContinent)
    : dcs;

  const continentsToDisplay = selectedContinent ? [selectedContinent] : allContinents;

  const data = continentsToDisplay.map(continent => ({
    name: continent,
    children: filteredDcs
      .filter(dc => getContinent(dc.location.region) === continent)
      .sort((a, b) => b.cabin.ups.load - a.cabin.ups.load)
      .slice(0, 100)
      .map(dc => ({
        name: dc.name,
        size: dc.cabin.ups.load, // Use load as the size factor
        id: dc.id,
        risk: dc.riskLevel,
        provider: dc.provider,
        continent: continent
      }))
  }));

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, index, name, id, risk, provider } = props;

    const riskColor = 
      risk === 'extreme' ? '#ef4444' :
      risk === 'high' ? '#f97316' :
      risk === 'medium' ? '#eab308' : '#10b981';

    return (
      <g 
        onClick={() => onSelect(id)}
        className="cursor-pointer"
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: riskColor,
            stroke: '#1a1a1a',
            strokeWidth: 2,
            strokeOpacity: 0.5,
            fillOpacity: 0.8,
          }}
        />
        {width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={10}
            fontWeight="bold"
            className="pointer-events-none select-none uppercase tracking-tighter"
          >
            {name.split(' ')[0]}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="h-[350px] w-full bg-zinc-900/50 rounded-2xl border border-white/5 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Capacity Distribution (by Continent)</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedContinent(null)}
            className={`px-2 py-0.5 text-[8px] font-black rounded border transition-all ${
              selectedContinent === null 
                ? 'bg-white text-black border-white' 
                : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-white'
            }`}
          >
            ALL
          </button>
          {allContinents.map(continent => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`px-2 py-0.5 text-[8px] font-black rounded border transition-all uppercase ${
                selectedContinent === continent 
                  ? 'bg-white text-black border-white' 
                  : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:text-white'
              }`}
            >
              {continent}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
        >
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-black/90 border border-white/10 p-2 rounded shadow-xl text-[10px]">
                    <p className="font-bold text-white">{data.name}</p>
                    <p className="text-zinc-400">Continent: {data.continent}</p>
                    <p className="text-zinc-400">Provider: {data.provider}</p>
                    <p className="text-zinc-400">Load: {data.size}%</p>
                    <p className={`font-bold uppercase ${
                      data.risk === 'extreme' ? 'text-red-500' : 'text-green-500'
                    }`}>Risk: {data.risk}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  </div>
);
};
