import React from 'react';
import { Sun, Cloud, Moon, ZapOff, Play, Pause, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const SystemControlPanel = ({ scenario, setScenario, activeSystem }) => {
  
  const scenarios = [
    { id: 'sunny', icon: Sun, label: 'Sunny' },
    { id: 'cloudy', icon: Cloud, label: 'Cloudy' },
    { id: 'night', icon: Moon, label: 'Night' },
    { id: 'outage', icon: ZapOff, label: 'Outage', disabled: activeSystem === 'ongrid' } // On-grid just shuts down, not interesting simulation usually
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      
      {/* Scenarios */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Simulation Scenario</label>
        <div className="grid grid-cols-4 gap-2">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                disabled={s.disabled}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                  scenario.id === s.id 
                    ? 'bg-[#1a3a52] text-white shadow-md transform scale-105' 
                    : s.disabled ? 'opacity-30 cursor-not-allowed bg-gray-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats Display (Read-only for now based on scenario) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
           <div className="text-xs text-orange-600 font-bold uppercase">Solar Generation</div>
           <div className="text-xl font-bold text-gray-800">{scenario.data.solar}%</div>
           <div className="w-full h-1.5 bg-orange-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: `${scenario.data.solar}%` }} />
           </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
           <div className="text-xs text-blue-600 font-bold uppercase">Home Load</div>
           <div className="text-xl font-bold text-gray-800">{scenario.data.load}%</div>
           <div className="w-full h-1.5 bg-blue-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${scenario.data.load}%` }} />
           </div>
        </div>
      </div>

    </div>
  );
};

export default SystemControlPanel;