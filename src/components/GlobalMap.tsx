import React, { useEffect } from 'react';
import { DataCenter } from '../types';
import { MapContainer, TileLayer, Marker, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

interface Props {
  dcs: DataCenter[];
  selectedId: string;
  onSelect: (id: string) => void;
}

// Custom Marker Icon
const createMarkerIcon = (riskLevel: string, isSelected: boolean) => {
  const riskColor = 
    riskLevel === 'extreme' ? '#ef4444' :
    riskLevel === 'high' ? '#f97316' :
    riskLevel === 'medium' ? '#eab308' : '#22c55e';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex flex-col items-center">
        <div class="w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all ${isSelected ? 'scale-150 ring-4 ring-white/20' : ''}" 
             style="background-color: ${riskColor};">
        </div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const MapHandler = ({ selectedDc }: { selectedDc: DataCenter | undefined }) => {
  const map = useMap();
  useEffect(() => {
    if (map && selectedDc) {
      map.setView([selectedDc.location.lat, selectedDc.location.lng], 6, { animate: true });
    }
  }, [map, selectedDc]);
  return null;
};

export const GlobalMap: React.FC<Props> = ({ dcs, selectedId, onSelect }) => {
  const selectedDc = dcs.find(dc => dc.id === selectedId);

  return (
    <div className="relative w-full h-[400px] bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%', background: '#0A0A0A' }}
        zoomControl={false}
        attributionControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="CartoDB Dark">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Power Infrastructure">
            <TileLayer
              url="https://tiles.openinframap.org/power/{z}/{x}/{y}.png"
              opacity={0.8}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Telecoms">
            <TileLayer
              url="https://tiles.openinframap.org/telecoms/{z}/{x}/{y}.png"
              opacity={0.8}
            />
          </LayersControl.Overlay>
        </LayersControl>

        {dcs.slice(0, 500).map((dc) => (
          <Marker
            key={dc.id}
            position={[dc.location.lat, dc.location.lng]}
            icon={createMarkerIcon(dc.riskLevel, selectedId === dc.id)}
            eventHandlers={{
              click: () => onSelect(dc.id),
            }}
          />
        ))}

        <MapHandler selectedDc={selectedDc} />
      </MapContainer>

      <div className="absolute bottom-4 left-4 flex gap-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] text-zinc-300 font-bold uppercase">Extreme Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-zinc-300 font-bold uppercase">Low Risk</span>
        </div>
        <div className="w-px h-3 bg-white/10 mx-1" />
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] text-zinc-300 font-bold uppercase">OpenInfraMap Layers Active</span>
        </div>
      </div>
    </div>
  );
};
