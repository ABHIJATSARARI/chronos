import React from 'react';
import { TimelineEvent } from '../types';

interface DiaryModalProps {
  event: TimelineEvent | null;
  theme: string;
  onClose: () => void;
  appTheme: 'cyberpunk' | 'minimalist';
}

export const DiaryModal: React.FC<DiaryModalProps> = ({ event, theme, onClose, appTheme }) => {
  if (!event) return null;

  const isCyber = appTheme === 'cyberpunk';

  const getThemeColor = () => {
    switch (theme) {
      case 'Safe': return isCyber ? 'text-blue-400 border-blue-500' : 'text-blue-500 border-blue-300';
      case 'Risk': return isCyber ? 'text-purple-400 border-purple-500' : 'text-purple-500 border-purple-300';
      case 'Chaos': return isCyber ? 'text-red-400 border-red-500' : 'text-red-500 border-red-300';
      default: return 'text-white border-white';
    }
  };

  const themeClass = getThemeColor();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className={`max-w-lg w-full p-6 relative transition-all
          ${isCyber 
            ? `bg-black border-2 ${themeClass.split(' ')[1]} shadow-[0_0_50px_rgba(0,0,0,0.8)]` 
            : `bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl text-zinc-100`
          }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl hover:text-white transition-colors text-gray-500"
        >
          ×
        </button>

        <div className={`flex justify-between items-end border-b pb-2 mb-4 ${isCyber ? 'border-gray-800' : 'border-zinc-800'}`}>
          <h2 className="text-3xl font-bold">{event.year}</h2>
          <span className={`text-sm uppercase tracking-wider ${themeClass.split(' ')[0]}`}>
            Universe: {theme}
          </span>
        </div>

        <h3 className="text-xl mb-4 font-bold">{event.title}</h3>

        <div className={`p-4 mb-6 ${isCyber ? 'bg-gray-900/50 rounded border border-gray-800' : 'bg-zinc-950/50 rounded-lg border border-zinc-800'}`}>
          <p className={`${isCyber ? 'text-gray-300 font-mono' : 'text-zinc-400 font-sans'} italic leading-relaxed`}>
            "{event.description}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 text-center ${isCyber ? 'bg-black border border-gray-800' : 'bg-zinc-950 border border-zinc-800 rounded-lg'}`}>
            <div className="text-xs text-gray-500 uppercase mb-1">Happiness Index</div>
            <div className={`text-xl font-bold ${event.happiness > 50 ? (isCyber ? 'text-green-500' : 'text-emerald-500') : (isCyber ? 'text-red-500' : 'text-rose-500')}`}>
              {event.happiness}%
            </div>
            <div className={`w-full h-1 mt-2 ${isCyber ? 'bg-gray-800' : 'bg-zinc-800'}`}>
              <div className={`h-1 ${event.happiness > 50 ? (isCyber ? 'bg-green-500' : 'bg-emerald-500') : (isCyber ? 'bg-red-500' : 'bg-rose-500')}`} style={{ width: `${event.happiness}%` }}></div>
            </div>
          </div>
          <div className={`p-3 text-center ${isCyber ? 'bg-black border border-gray-800' : 'bg-zinc-950 border border-zinc-800 rounded-lg'}`}>
            <div className="text-xs text-gray-500 uppercase mb-1">Wealth Index</div>
            <div className="text-xl font-bold text-yellow-500">
              {event.wealth}%
            </div>
            <div className={`w-full h-1 mt-2 ${isCyber ? 'bg-gray-800' : 'bg-zinc-800'}`}>
              <div className="bg-yellow-500 h-1" style={{ width: `${event.wealth}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};