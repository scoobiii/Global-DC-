export type UIStyle = 'classic-scada' | 'micro-scada-x' | 'modern-dark';

export interface ElectricalComponent {
  id: string;
  name: string;
  status: 'nominal' | 'warning' | 'critical' | 'offline';
  value?: number;
  unit?: string;
}

export interface PrimaryCabin {
  substation: {
    voltageIn: number; // 230kV
    voltageOut: number; // 13.8kV
    transformers: {
      id: string;
      capacity: number; // MVA
      load: number; // %
      temp: number;
    }[];
  };
  generation: {
    type: 'Ethanol' | 'Hybrid';
    units: {
      id: string;
      output: number; // MW
      status: 'active' | 'standby' | 'maintenance';
      carbonNeutral: boolean;
    }[];
    solar?: {
      location: 'local' | 'remote';
      capacity: number; // MW
      output: number; // MW
      integration: 'SIN' | 'Private';
    };
  };
  bess: {
    systems: {
      id: string;
      soc: number;
      capacity: number; // MWh
      status: 'idle' | 'charging' | 'discharging';
      chargeRate: number; // MW
      coupling: 'AC' | 'DC';
      integration: 'standalone' | 'BESSxBESS';
    }[];
  };
  cooling: {
    chillers: {
      id: string;
      load: number; // MW
      status: 'online' | 'standby';
    }[];
    cdu: {
      tempInlet: number;
      tempOutlet: number;
      flowRate: number; // GPM
    };
    aisleTemp: number; // 18-27°C
    ahu: {
      temp: number;
      humidity: number;
    };
  };
  itLoad: {
    pods: {
      id: string;
      load: number; // MW
      rackCount: number;
      type: 'AI/GPU' | 'General';
    }[];
    totalPUE: number;
  };
  sustainability: {
    carbonScope1: number;
    carbonScope2: number;
    carbonScope3: number;
    wue: number;
    cue: number;
  };
  measurement: {
    voltage: number;
    current: number;
    powerFactor: number;
  };
  breaker: {
    status: 'closed' | 'open' | 'tripped';
    lastAction: string;
  };
  relays: {
    overcurrent: boolean;
    differential: boolean;
    thermal: boolean;
  };
  ups: {
    batteryLevel: number;
    load: number;
    status: 'online' | 'bypass' | 'battery';
  };
}

export interface DataCenter {
  id: string;
  name: string;
  provider: 'AWS' | 'GCP' | 'Azure' | 'Equinix' | 'Digital Realty';
  location: {
    city: string;
    country: string;
    region: 'Middle East' | 'Americas' | 'Europe' | 'Asia' | 'Africa';
    lat: number;
    lng: number;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  threats: {
    type: string;
    description: string;
    probability: number;
  }[];
  redundancy: 'N+1' | '2N' | '2N+1';
  cabin: PrimaryCabin;
  liveStatus: 'available' | 'disruption' | 'outage';
  lastOutage?: string;
}

export interface OutageAction {
  id: string;
  type: 'pre' | 'post';
  description: string;
  completed: boolean;
}
