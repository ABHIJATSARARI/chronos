import React, { useState } from 'react';
import { UserInput } from '../types';

interface TerminalInputProps {
  onSubmit: (data: UserInput) => void;
  isSimulating: boolean;
  theme: 'cyberpunk' | 'minimalist';
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, isSimulating, theme }) => {
  const [form, setForm] = useState<UserInput>({
    age: 25,
    occupation: '',
    regret: '',
    decision: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isCyber = theme === 'cyberpunk';

  const isFormValid = form.occupation && form.decision && form.age > 0;

  return (
    <div className="w-full max-w-3xl mx-auto p-1">
      <div className={`relative overflow-hidden transition-all duration-500 p-8
        ${isCyber 
          ? 'bg-gradient-to-br from-black via-gray-950 to-black border border-green-500/30 rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
          : 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl'
        }`}>
        
        {/* Decorative header - Cyber only */}
        {isCyber && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-green-500/50"></div>
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-green-500/50"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-green-500/50"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-green-500/50"></div>
          </>
        )}
        
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-bold tracking-widest uppercase flex items-center gap-3
            ${isCyber ? 'text-green-500' : 'text-white tracking-tight'}`}>
            {isCyber && <span className="w-3 h-3 bg-green-500 animate-pulse inline-block rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>}
            {isCyber ? 'Origin Parameters' : 'Define Your Reality'}
          </h2>
          {!isCyber && (
            <div className="text-xs text-zinc-500 font-semibold tracking-wider">STEP 1</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className={`text-sm uppercase tracking-wider flex items-center gap-2
                ${isCyber ? 'text-green-500/70' : 'text-zinc-400 font-semibold text-xs'}`}>
                <span className={`text-lg ${isCyber ? 'text-green-500' : 'text-zinc-500'}`}>👤</span>
                Subject Age
              </label>
              <input
                type="number"
                name="age"
                min="1"
                max="120"
                value={form.age}
                onChange={handleChange}
                className={`w-full p-4 outline-none transition-all duration-200 text-lg font-semibold
                  ${isCyber 
                    ? 'bg-black border-2 border-green-800 focus:border-green-400 text-green-400 group-hover:border-green-600' 
                    : 'bg-zinc-800/50 border-2 border-zinc-700 focus:border-zinc-500 text-white rounded-xl focus:bg-zinc-800 group-hover:border-zinc-600'
                  }`}
                required
              />
            </div>
            <div className="space-y-2 group">
              <label className={`text-sm uppercase tracking-wider flex items-center gap-2
                ${isCyber ? 'text-green-500/70' : 'text-zinc-400 font-semibold text-xs'}`}>
                <span className={`text-lg ${isCyber ? 'text-green-500' : 'text-zinc-500'}`}>💼</span>
                Current Role
              </label>
              <input
                type="text"
                name="occupation"
                placeholder="e.g. Software Engineer"
                value={form.occupation}
                onChange={handleChange}
                className={`w-full p-4 outline-none transition-all duration-200 text-lg
                  ${isCyber 
                    ? 'bg-black border-2 border-green-800 focus:border-green-400 text-green-400 placeholder-green-800 group-hover:border-green-600' 
                    : 'bg-zinc-800/50 border-2 border-zinc-700 focus:border-zinc-500 text-white rounded-xl focus:bg-zinc-800 placeholder-zinc-600 group-hover:border-zinc-600'
                  }`}
                required
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className={`text-sm uppercase tracking-wider flex items-center gap-2
              ${isCyber ? 'text-green-500/70' : 'text-zinc-400 font-semibold text-xs'}`}>
              <span className={`text-lg ${isCyber ? 'text-green-500' : 'text-zinc-500'}`}>💭</span>
              Primary Regret <span className="text-xs opacity-50">(Optional)</span>
            </label>
            <input
              type="text"
              name="regret"
              placeholder="e.g. Not pursuing creative writing"
              value={form.regret}
              onChange={handleChange}
              className={`w-full p-4 outline-none transition-all duration-200 text-lg
                ${isCyber 
                  ? 'bg-black border-2 border-green-800 focus:border-green-400 text-green-400 placeholder-green-800 group-hover:border-green-600' 
                  : 'bg-zinc-800/50 border-2 border-zinc-700 focus:border-zinc-500 text-white rounded-xl focus:bg-zinc-800 placeholder-zinc-600 group-hover:border-zinc-600'
                }`}
            />
          </div>

          <div className="space-y-2 group">
            <label className={`text-sm uppercase tracking-wider font-bold flex items-center gap-2
              ${isCyber ? 'text-purple-400' : 'text-blue-400'}`}>
              <span className="text-xl">⚡</span>
              The Divergence Point
            </label>
            <textarea
              name="decision"
              rows={3}
              placeholder="What life-changing decision splits your reality? e.g., Quit my stable job to start a tech company."
              value={form.decision}
              onChange={handleChange}
              className={`w-full p-4 outline-none transition-all duration-200 text-lg resize-none
                ${isCyber 
                  ? 'bg-black border-2 border-purple-800 focus:border-purple-500 text-purple-300 placeholder-purple-900 group-hover:border-purple-600' 
                  : 'bg-zinc-800/50 border-2 border-blue-700 focus:border-blue-500 text-white rounded-xl focus:bg-zinc-800 placeholder-zinc-600 group-hover:border-blue-600'
                }`}
              required
            />
            <p className={`text-xs ${isCyber ? 'text-gray-600' : 'text-zinc-600'}`}>
              This decision will branch into 3 distinct timelines: Safe, Risk, and Chaos
            </p>
          </div>

          <button
            type="submit"
            disabled={isSimulating || !isFormValid}
            className={`w-full py-5 text-center font-bold text-lg tracking-[0.2em] uppercase border-2 transition-all duration-300 relative overflow-hidden group
              ${isSimulating || !isFormValid
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:shadow-2xl cursor-pointer transform hover:scale-[1.02]'}
              ${isCyber
                ? (isSimulating || !isFormValid
                    ? 'bg-gray-900 border-gray-700 text-gray-500' 
                    : 'bg-green-900/20 border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)]')
                : (isSimulating || !isFormValid
                    ? 'bg-zinc-800 border-zinc-800 text-zinc-500' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg hover:shadow-blue-500/50')
              }`}
          >
            {/* Animated background for non-disabled state */}
            {!isSimulating && isFormValid && (
              <span className={`absolute inset-0 bg-gradient-to-r ${isCyber ? 'from-green-500 to-green-400' : 'from-blue-400 to-purple-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            )}
            <span className="relative z-10">
              {isSimulating ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Initializing Divergence Engine...
                </span>
              ) : !isFormValid ? (
                'Complete Required Fields'
              ) : (
                'Begin Simulation'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};