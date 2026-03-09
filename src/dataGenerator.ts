import { DataCenter, PrimaryCabin } from './types';

const CITIES = [
  { city: 'New York', country: 'USA', region: 'Americas', lat: 40.7128, lng: -74.0060 },
  { city: 'London', country: 'UK', region: 'Europe', lat: 51.5074, lng: -0.1278 },
  { city: 'Tokyo', country: 'Japan', region: 'Asia', lat: 35.6762, lng: 139.6503 },
  { city: 'Singapore', country: 'Singapore', region: 'Asia', lat: 1.3521, lng: 103.8198 },
  { city: 'Frankfurt', country: 'Germany', region: 'Europe', lat: 50.1109, lng: 8.6821 },
  { city: 'São Paulo', country: 'Brazil', region: 'Americas', lat: -23.5505, lng: -46.6333 },
  { city: 'Sydney', country: 'Australia', region: 'Asia', lat: -33.8688, lng: 151.2093 },
  { city: 'Mumbai', country: 'India', region: 'Asia', lat: 19.0760, lng: 72.8777 },
  { city: 'Paris', country: 'France', region: 'Europe', lat: 48.8566, lng: 2.3522 },
  { city: 'Amsterdam', country: 'Netherlands', region: 'Europe', lat: 52.3676, lng: 4.9041 },
  { city: 'Ashburn', country: 'USA', region: 'Americas', lat: 39.0438, lng: -77.4874 },
  { city: 'Dublin', country: 'Ireland', region: 'Europe', lat: 53.3498, lng: -6.2603 },
  { city: 'Hong Kong', country: 'China', region: 'Asia', lat: 22.3193, lng: 114.1694 },
  { city: 'Seoul', country: 'South Korea', region: 'Asia', lat: 37.5665, lng: 126.9780 },
  { city: 'Dubai', country: 'UAE', region: 'Middle East', lat: 25.2048, lng: 55.2708 },
  { city: 'Johannesburg', country: 'South Africa', region: 'Africa', lat: -26.2041, lng: 28.0473 },
  { city: 'Cape Town', country: 'South Africa', region: 'Africa', lat: -33.9249, lng: 18.4241 },
  { city: 'Lagos', country: 'Nigeria', region: 'Africa', lat: 6.5244, lng: 3.3792 },
  { city: 'Nairobi', country: 'Kenya', region: 'Africa', lat: -1.2921, lng: 36.8219 },
  { city: 'Santiago', country: 'Chile', region: 'Americas', lat: -33.4489, lng: -70.6693 },
  { city: 'Toronto', country: 'Canada', region: 'Americas', lat: 43.6532, lng: -79.3832 },
  { city: 'San Francisco', country: 'USA', region: 'Americas', lat: 37.7749, lng: -122.4194 },
  { city: 'Seattle', country: 'USA', region: 'Americas', lat: 47.6062, lng: -122.3321 },
  { city: 'Chicago', country: 'USA', region: 'Americas', lat: 41.8781, lng: -87.6298 },
  { city: 'Dallas', country: 'USA', region: 'Americas', lat: 32.7767, lng: -96.7970 },
  { city: 'Miami', country: 'USA', region: 'Americas', lat: 25.7617, lng: -80.1918 },
  { city: 'Madrid', country: 'Spain', region: 'Europe', lat: 40.4168, lng: -3.7038 },
  { city: 'Milan', country: 'Italy', region: 'Europe', lat: 45.4642, lng: 9.1899 },
  { city: 'Stockholm', country: 'Sweden', region: 'Europe', lat: 59.3293, lng: 18.0686 },
  { city: 'Zurich', country: 'Switzerland', region: 'Europe', lat: 47.3769, lng: 8.5417 },
  { city: 'Warsaw', country: 'Poland', region: 'Europe', lat: 52.2297, lng: 21.0122 },
  { city: 'Istanbul', country: 'Turkey', region: 'Europe', lat: 41.0082, lng: 28.9784 },
  { city: 'Tel Aviv', country: 'Israel', region: 'Middle East', lat: 32.0853, lng: 34.7818 },
  { city: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', lat: 24.7136, lng: 46.6753 },
  { city: 'Mumbai', country: 'India', region: 'Asia', lat: 19.0760, lng: 72.8777 },
  { city: 'Bangalore', country: 'India', region: 'Asia', lat: 12.9716, lng: 77.5946 },
  { city: 'Chennai', country: 'India', region: 'Asia', lat: 13.0827, lng: 80.2707 },
  { city: 'Jakarta', country: 'Indonesia', region: 'Asia', lat: -6.2088, lng: 106.8456 },
  { city: 'Bangkok', country: 'Thailand', region: 'Asia', lat: 13.7563, lng: 100.5018 },
  { city: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia', lat: 3.1390, lng: 101.6869 },
  { city: 'Manila', country: 'Philippines', region: 'Asia', lat: 14.5995, lng: 120.9842 },
  { city: 'Osaka', country: 'Japan', region: 'Asia', lat: 34.6937, lng: 135.5023 },
  { city: 'Melbourne', country: 'Australia', region: 'Asia', lat: -37.8136, lng: 144.9631 },
  { city: 'Auckland', country: 'New Zealand', region: 'Asia', lat: -36.8485, lng: 174.7633 },
] as const;

const PROVIDERS = ['AWS', 'GCP', 'Azure', 'Equinix', 'Digital Realty'] as const;
const RISK_LEVELS = ['low', 'medium', 'high', 'extreme'] as const;
const REDUNDANCY = ['N+1', '2N', '2N+1'] as const;

function generateCabin(): PrimaryCabin {
  const load = Math.floor(Math.random() * 40) + 10;
  return {
    substation: {
      voltageIn: 230,
      voltageOut: 13.8,
      transformers: [
        { id: 'T1', capacity: 100, load: Math.floor(Math.random() * 30) + 40, temp: Math.floor(Math.random() * 20) + 40 },
        { id: 'T2', capacity: 100, load: Math.floor(Math.random() * 30) + 40, temp: Math.floor(Math.random() * 20) + 40 }
      ]
    },
    generation: {
      type: Math.random() > 0.7 ? 'Hybrid' : 'Ethanol',
      units: [
        { id: 'EPP-1', output: 50, status: 'active', carbonNeutral: true },
        { id: 'EPP-2', output: 50, status: Math.random() > 0.5 ? 'active' : 'standby', carbonNeutral: true }
      ],
      solar: Math.random() > 0.5 ? {
        location: Math.random() > 0.5 ? 'local' : 'remote',
        capacity: 20,
        output: Math.floor(Math.random() * 15) + 5,
        integration: Math.random() > 0.5 ? 'SIN' : 'Private'
      } : undefined
    },
    bess: {
      systems: [
        { 
          id: 'BESS-A', 
          soc: Math.floor(Math.random() * 20) + 80, 
          capacity: 50, 
          status: 'idle', 
          chargeRate: 0,
          coupling: Math.random() > 0.5 ? 'AC' : 'DC',
          integration: Math.random() > 0.8 ? 'BESSxBESS' : 'standalone'
        },
        { 
          id: 'BESS-B', 
          soc: Math.floor(Math.random() * 20) + 80, 
          capacity: 50, 
          status: 'idle', 
          chargeRate: 0,
          coupling: Math.random() > 0.5 ? 'AC' : 'DC',
          integration: Math.random() > 0.8 ? 'BESSxBESS' : 'standalone'
        }
      ]
    },
    cooling: {
      chillers: [
        { id: 'CH-1', load: Math.floor(Math.random() * 10) + 5, status: 'online' },
        { id: 'CH-2', load: Math.floor(Math.random() * 10) + 5, status: 'online' },
        { id: 'CH-3', load: 0, status: 'standby' }
      ],
      cdu: { tempInlet: 18, tempOutlet: 24, flowRate: 450 },
      aisleTemp: Math.floor(Math.random() * 5) + 20,
      ahu: {
        temp: Math.floor(Math.random() * 4) + 18,
        humidity: Math.floor(Math.random() * 10) + 45
      }
    },
    itLoad: {
      pods: [
        { id: 'POD-1-10', load: load / 2, rackCount: 400, type: 'AI/GPU' },
        { id: 'POD-11-20', load: load / 2, rackCount: 400, type: 'General' }
      ],
      totalPUE: 1.1 + Math.random() * 0.1
    },
    sustainability: {
      carbonScope1: 0,
      carbonScope2: Math.floor(Math.random() * 200),
      carbonScope3: Math.floor(Math.random() * 600),
      wue: 0.2 + Math.random() * 0.1,
      cue: 0.04 + Math.random() * 0.03
    },
    measurement: { voltage: 13.8, current: Math.floor(Math.random() * 500) + 800, powerFactor: 0.95 + Math.random() * 0.04 },
    breaker: { status: 'closed', lastAction: '2026-03-01 08:00' },
    relays: { overcurrent: false, differential: false, thermal: false },
    ups: { batteryLevel: 100, load: Math.floor(Math.random() * 40) + 40, status: 'online' }
  };
}

export function generateDataCenters(count: number): DataCenter[] {
  const dcs: DataCenter[] = [];
  
  for (let i = 0; i < count; i++) {
    const cityData = CITIES[i % CITIES.length];
    const provider = PROVIDERS[Math.floor(Math.random() * PROVIDERS.length)];
    const riskLevel = RISK_LEVELS[Math.floor(Math.random() * RISK_LEVELS.length)];
    
    // Add some jitter to coordinates so they don't all overlap
    const lat = cityData.lat + (Math.random() - 0.5) * 0.5;
    const lng = cityData.lng + (Math.random() - 0.5) * 0.5;
    
    dcs.push({
      id: `dc-${i}`,
      name: `${provider} ${cityData.city} #${Math.floor(i / CITIES.length) + 1}`,
      provider: provider as any,
      location: {
        ...cityData,
        lat,
        lng,
        region: cityData.region as any
      },
      riskLevel: riskLevel as any,
      threats: [
        { type: 'Cyber Risk', description: 'Standard monitoring active', probability: Math.random() * 0.3 }
      ],
      redundancy: REDUNDANCY[Math.floor(Math.random() * REDUNDANCY.length)] as any,
      cabin: generateCabin(),
      liveStatus: Math.random() > 0.98 ? 'disruption' : 'available'
    });
  }
  
  return dcs;
}

export function createCustomDataCenter(config: {
  name: string;
  location: 'local' | 'remote';
  integration: 'SIN' | 'Private';
  coupling: 'AC' | 'DC';
  bessType: 'standalone' | 'BESSxBESS';
  solarCapacity: number;
}): DataCenter {
  const cityData = CITIES[Math.floor(Math.random() * CITIES.length)];
  const cabin = generateCabin();
  
  // Override with custom config
  cabin.generation.type = 'Hybrid';
  cabin.generation.solar = {
    location: config.location,
    capacity: config.solarCapacity,
    output: Math.floor(config.solarCapacity * 0.8),
    integration: config.integration
  };
  
  cabin.bess.systems = cabin.bess.systems.map(s => ({
    ...s,
    coupling: config.coupling,
    integration: config.bessType
  }));

  return {
    id: `custom-${Date.now()}`,
    name: config.name || `CUSTOM-PROJECT-${Date.now()}`,
    provider: 'Equinix',
    location: {
      ...cityData,
      lat: cityData.lat + (Math.random() - 0.5) * 0.1,
      lng: cityData.lng + (Math.random() - 0.5) * 0.1,
      region: cityData.region as any
    },
    riskLevel: 'low',
    threats: [],
    redundancy: '2N+1',
    cabin,
    liveStatus: 'available'
  };
}
