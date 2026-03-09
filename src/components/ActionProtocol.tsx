import React from 'react';
import { CheckCircle2, Circle, Clock, ShieldCheck, ZapOff } from 'lucide-react';

export const ActionProtocol: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pre-Outage Actions */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          AÇÕES PRÉ-OUTAGE (MITIGAÇÃO)
        </h3>
        <div className="space-y-4">
          {[
            "Verificar autonomia de BESS (Min 4h)",
            "Testar partida de geradores em carga",
            "Sincronizar relés de proteção primária",
            "Ativar redundância de rede via satélite",
            "Checklist de segurança perimetral (Anti-Drone)"
          ].map((action, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer">
              <div className="text-zinc-600 group-hover:text-green-400 transition-colors">
                {i < 3 ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
              </div>
              <span className={`text-sm ${i < 3 ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Outage Actions */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-bold flex items-center gap-2 mb-6">
          <ZapOff className="w-5 h-5 text-orange-400" />
          AÇÕES PÓS-OUTAGE (RECOVERY)
        </h3>
        <div className="space-y-4">
          {[
            "Isolar cabine primária danificada",
            "Transferir carga para DC redundante",
            "Avaliação de danos estruturais (Drone Impact)",
            "Análise forense de logs de proteção",
            "Relatório de Root Cause Analysis (RCA)"
          ].map((action, i) => (
            <div key={i} className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-zinc-600" />
              <span className="text-sm text-zinc-400">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
