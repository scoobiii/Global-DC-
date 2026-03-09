import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

interface Props {
  lat: number;
  lng: number;
  name: string;
  riskLevel: string;
}

const createMiniMarkerIcon = (riskLevel: string) => {
  const riskColor = 
    riskLevel === 'extreme' ? '#ef4444' :
    riskLevel === 'high' ? '#f97316' :
    riskLevel === 'medium' ? '#eab308' : '#22c55e';

  return L.divIcon({
    className: 'custom-mini-marker',
    html: `<div class="w-3 h-3 rounded-full border border-white shadow-sm" style="background-color: ${riskColor};"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export const MiniMap: React.FC<Props> = ({ lat, lng, name, riskLevel }) => {
  return (
    <div className="w-full h-32 rounded-xl border border-white/10 overflow-hidden relative group">
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        style={{ width: '100%', height: '100%', background: '#0A0A0A' }}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <TileLayer
          url="https://tiles.openinframap.org/power/{z}/{x}/{y}.png"
          opacity={0.6}
        />
        <Marker 
          position={[lat, lng]} 
          icon={createMiniMarkerIcon(riskLevel)}
        />
      </MapContainer>
      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 border border-white/10 rounded text-[8px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity z-[1000]">
        {name}
      </div>
    </div>
  );
};
