import React, { useState, useEffect } from 'react';
import { TerminalInput } from './components/TerminalInput';
import { MultiverseGraph } from './components/MultiverseGraph';
import { DiaryModal } from './components/DiaryModal';
import { SplashScreen } from './components/SplashScreen';
import { InteractiveTour } from './components/InteractiveTour';
import { UserInput, SimulationData, TimelineEvent } from './types';
import { generateSimulationAPI, checkBackendHealth } from './services/api';
import { saveTimelineToRaindrop } from './services/raindrop';

type Theme = 'cyberpunk' | 'minimalist';

const App: React.FC = () => {
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{ event: TimelineEvent, theme: string } | null>(null);
  const [raindropStatus, setRaindropStatus] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('cyberpunk');
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showTour, setShowTour] = useState(false);
  
  // State to control the fade transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if backend is enabled
  const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth().then(setBackendHealthy);
  }, []);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Always show tour on load
    setTimeout(() => setShowTour(true), 500);
  };

  // Manage Global Styles for Theme
  useEffect(() => {
    const scanline = document.querySelector('.crt-scanline') as HTMLElement;
    
    if (theme === 'cyberpunk') {
      document.body.style.fontFamily = "'Share Tech Mono', monospace";
      document.body.style.backgroundColor = "#0a0a0a";
      if (scanline) scanline.style.opacity = '0.15';
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
      document.body.style.backgroundColor = "#18181b"; // Zinc 950
      if (scanline) scanline.style.opacity = '0';
    }
  }, [theme]);

  const toggleTheme = () => {
    // Start fade out
    setIsTransitioning(true);
    
    // Wait for the fade out transition to complete (300ms) before switching theme
    setTimeout(() => {
      setTheme(prev => prev === 'cyberpunk' ? 'minimalist' : 'cyberpunk');
      
      // Small delay to ensure the DOM has updated with new theme styles before fading in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleSimulationStart = async (input: UserInput, geminiApiKey?: string) => {
    setLoading(true);
    setError(null);
    setRaindropStatus(null);
    setSimulationData(null);

    try {
      // 1. Generate Timeline via Backend API or Direct Gemini
      const data = await generateSimulationAPI(input, geminiApiKey);
      setSimulationData(data);
    } catch (err) {
      console.error('Simulation error:', err);
      setError(err instanceof Error ? err.message : "Divergence Engine Failed. Timeline collapsed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUniverse = () => {
    if (!simulationData) return;
    setRaindropStatus("Syncing with Raindrop SmartMemory...");
    saveTimelineToRaindrop("user-123", simulationData).then((session) => {
      setRaindropStatus(`Saved to Universe Memory: ${session.key}`);
    }).catch(err => {
      console.error("Raindrop Error", err);
      setRaindropStatus("Memory Sync Failed");
    });
  };

  const resetSimulation = () => {
    setSimulationData(null);
    setError(null);
    setRaindropStatus(null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 relative transition-colors duration-500 ${theme === 'minimalist' ? 'bg-zinc-950 text-zinc-100' : 'bg-black text-gray-200'}`}>
      
      {/* Background Grid - Only for Cyberpunk */}
      <div 
        className={`fixed inset-0 z-[-1] transition-opacity duration-500 ${theme === 'cyberpunk' ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'linear-gradient(rgba(20,20,20,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,20,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-50" id="theme-toggle">
        <button
          onClick={toggleTheme}
          disabled={isTransitioning}
          className={`group relative px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-all duration-300 rounded-lg overflow-hidden
            ${theme === 'cyberpunk' 
              ? 'border-green-500 text-green-400 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
              : 'border-blue-500 text-blue-400 hover:text-black shadow-lg'
            }
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
          `}
        >
          <span className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ${
            theme === 'cyberpunk' ? 'bg-green-500' : 'bg-blue-500'
          }`}></span>
          <span className="relative z-10 flex items-center gap-2">
            {theme === 'cyberpunk' ? '🌐 MINIMAL MODE' : '⚡ CYBER MODE'}
          </span>
        </button>
      </div>

      {/* Fixed Logo in Top Left Corner */}
      <div className="fixed top-6 left-6 z-50 group">
        <img 
          src="/logo.png" 
          alt="Chronos Logo" 
          className={`w-14 h-14 md:w-16 md:h-16 transition-all duration-500 ${
            theme === 'cyberpunk' 
              ? 'drop-shadow-[0_0_20px_rgba(139,92,246,0.8)] hover:drop-shadow-[0_0_30px_rgba(139,92,246,1)]' 
              : 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]'
          } hover:scale-110 cursor-pointer hover:rotate-12`}
          onClick={() => window.location.reload()}
          title="Reload Chronos"
        />
        <div className={`absolute -bottom-6 left-0 text-[10px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
          theme === 'cyberpunk' ? 'text-purple-400' : 'text-blue-400'
        }`}>
          CHRONOS
        </div>
      </div>

      {/* Content Wrapper for Theme Transition */}
      <div className={`w-full flex flex-col items-center transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header */}
        <header className="mb-16 text-center mt-8 relative">
          <h1 className={`text-6xl md:text-8xl font-black mb-4 tracking-tighter transition-all duration-500 ${
            theme === 'cyberpunk' 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 via-white to-green-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] animate-gradient-shift'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400'
            }`}
            style={{ backgroundSize: '200% auto' }}>
            CHRONOS
          </h1>
          <div className={`w-32 h-1 mx-auto mb-4 rounded-full transition-all duration-500 ${
            theme === 'cyberpunk' 
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-green-500'
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`} />
          <p className={`uppercase tracking-[0.4em] text-sm md:text-base font-semibold transition-colors duration-500 ${
            theme === 'cyberpunk' ? 'text-gray-300' : 'text-zinc-400'
          }`}>
            The Multiverse Engine v.2.5
          </p>
          {/* Powered By Badge */}
          <div className={`mt-8 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-500 ${
            theme === 'cyberpunk' 
              ? 'bg-gray-900/50 border-gray-800 shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
              : 'bg-zinc-900/50 border-zinc-800 shadow-lg'
          }`}>
            <span className={`text-xs uppercase tracking-wider ${
              theme === 'cyberpunk' ? 'text-gray-500' : 'text-zinc-500'
            }`}>Powered by</span>
            <span className={`text-sm font-bold px-2 py-1 rounded ${
              theme === 'cyberpunk' ? 'text-purple-400 bg-purple-500/10' : 'text-blue-400 bg-blue-500/10'
            }`}>Gemini 2.5</span>
            <span className="opacity-30">•</span>
            <span className={`text-sm font-bold px-2 py-1 rounded ${
              theme === 'cyberpunk' ? 'text-green-400 bg-green-500/10' : 'text-emerald-400 bg-emerald-500/10'
            }`}>Raindrop MCP</span>
            <span className="opacity-30">•</span>
            <span className={`text-sm font-bold px-2 py-1 rounded ${
              theme === 'cyberpunk' ? 'text-red-400 bg-red-500/10' : 'text-rose-400 bg-rose-500/10'
            }`}>Vultr</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full max-w-5xl z-10">
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 mb-8 rounded text-center animate-pulse">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="relative">
                {/* Spinning rings */}
                <div className={`w-24 h-24 border-4 border-t-transparent rounded-full animate-spin
                  ${theme === 'cyberpunk' ? 'border-purple-500' : 'border-blue-500'}`}></div>
                <div className={`absolute top-3 left-3 w-18 h-18 border-4 border-b-transparent rounded-full animate-spin-reverse
                  ${theme === 'cyberpunk' ? 'border-green-500' : 'border-purple-500'}`} style={{ animationDuration: '1.5s' }}></div>
              </div>
              <div className="space-y-2 text-center">
                <p className={`text-lg font-bold animate-pulse
                  ${theme === 'cyberpunk' ? 'text-green-500 font-mono' : 'text-zinc-100 font-sans tracking-wide'}`}>
                  CALCULATING PROBABILISTIC OUTCOMES
                </p>
                <p className={`text-sm ${theme === 'cyberpunk' ? 'text-gray-600' : 'text-zinc-600'}`}>
                  Accessing Gemini 2.5 Flash Neural Network...
                </p>
                <div className={`flex items-center justify-center gap-2 text-xs mt-4
                  ${theme === 'cyberpunk' ? 'text-green-500/50' : 'text-zinc-500'}`}>
                  <span className="animate-pulse">▸</span>
                  <span>Generating Safe Path...</span>
                </div>
                <div className={`flex items-center justify-center gap-2 text-xs
                  ${theme === 'cyberpunk' ? 'text-purple-500/50' : 'text-blue-500/50'}`}>
                  <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>▸</span>
                  <span>Generating Risk Path...</span>
                </div>
                <div className={`flex items-center justify-center gap-2 text-xs
                  ${theme === 'cyberpunk' ? 'text-red-500/50' : 'text-purple-500/50'}`}>
                  <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>▸</span>
                  <span>Generating Chaos Path...</span>
                </div>
              </div>
            </div>
          )}

          {/* Input Phase */}
          {!loading && !simulationData && (
            <div className="animate-fade-in-up" id="input-form">
              <TerminalInput onSubmit={handleSimulationStart} isSimulating={loading} theme={theme} requiresApiKey={!USE_BACKEND} />
            </div>
          )}

          {/* Results Phase */}
          {!loading && simulationData && (
            <div className="animate-fade-in space-y-6">
              {/* Success notification */}
              <div className={`p-4 rounded-xl border backdrop-blur-sm flex items-center gap-4 animate-slide-down
                ${theme === 'cyberpunk'
                  ? 'bg-green-900/20 border-green-500/50 text-green-400'
                  : 'bg-emerald-900/20 border-emerald-500/50 text-emerald-300'}`}>
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-bold">Simulation Complete</p>
                  <p className="text-xs opacity-75">3 divergent timelines generated successfully</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className={`text-xs font-mono transition-colors flex items-center gap-4
                  ${theme === 'cyberpunk' ? 'text-gray-500' : 'text-zinc-500'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse
                      ${theme === 'cyberpunk' ? 'bg-green-500' : 'bg-emerald-400'}`} />
                    <span className={theme === 'cyberpunk' ? 'text-green-500' : 'text-emerald-400'}>STABLE</span>
                  </div>
                  {raindropStatus && (
                    <span className={`pl-4 border-l
                      ${theme === 'cyberpunk' ? 'text-purple-400 border-gray-700' : 'text-zinc-400 border-zinc-700'}`}>
                      {raindropStatus}
                    </span>
                  )}
                </div>
                <div className="flex gap-3" id="save-button">
                  {USE_BACKEND && (
                    <button 
                      onClick={handleSaveUniverse}
                      className={`text-xs uppercase tracking-widest px-5 py-3 transition-all border-2 rounded-lg font-bold flex items-center gap-2 group
                        ${theme === 'cyberpunk'
                          ? 'text-green-400 hover:text-green-300 border-green-900 hover:border-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}`}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">💾</span>
                      Save Universe
                    </button>
                  )}
                  <button 
                    onClick={resetSimulation}
                    className={`text-xs uppercase tracking-widest px-5 py-3 transition-all border-2 rounded-lg font-bold flex items-center gap-2 group
                      ${theme === 'cyberpunk'
                        ? 'text-red-400 hover:text-red-300 border-red-900 hover:border-red-500 hover:bg-red-500/10'
                        : 'text-zinc-500 hover:text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'}`}
                  >
                    <span className="text-lg group-hover:rotate-180 transition-transform duration-500">↻</span>
                    Reset Timeline
                  </button>
                </div>
              </div>
              
              <div className={`backdrop-blur p-1 md:p-4 rounded-xl transition-all duration-500
                ${theme === 'cyberpunk' 
                  ? 'bg-black/80 border border-gray-800 shadow-2xl' 
                  : 'bg-zinc-900/50 border border-zinc-800 shadow-sm'
                }`} id="multiverse-graph">
                <MultiverseGraph 
                  data={simulationData} 
                  onEventClick={(event, themeName) => setSelectedEvent({ event, theme: themeName })}
                  theme={theme}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {simulationData.timelines.map(t => {
                  const themeColors = {
                    'Safe': theme === 'cyberpunk' ? 'from-blue-600 to-blue-800' : 'from-blue-500 to-blue-700',
                    'Risk': theme === 'cyberpunk' ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-purple-700',
                    'Chaos': theme === 'cyberpunk' ? 'from-red-600 to-red-800' : 'from-red-500 to-red-700'
                  };
                  const borderColors = {
                    'Safe': theme === 'cyberpunk' ? 'border-blue-500/50' : 'border-blue-400/50',
                    'Risk': theme === 'cyberpunk' ? 'border-purple-500/50' : 'border-purple-400/50',
                    'Chaos': theme === 'cyberpunk' ? 'border-red-500/50' : 'border-red-400/50'
                  };
                  const textColors = {
                    'Safe': theme === 'cyberpunk' ? 'text-blue-400' : 'text-blue-300',
                    'Risk': theme === 'cyberpunk' ? 'text-purple-400' : 'text-purple-300',
                    'Chaos': theme === 'cyberpunk' ? 'text-red-400' : 'text-red-300'
                  };
                  
                  return (
                    <div key={t.id} className={`relative p-6 rounded-xl transition-all duration-300 border-2 group hover:scale-105 cursor-pointer overflow-hidden
                      ${theme === 'cyberpunk'
                        ? 'bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 backdrop-blur-sm'}
                      ${borderColors[t.theme]}`}>
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${themeColors[t.theme]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`text-3xl font-bold ${textColors[t.theme]}`}>
                            {t.id}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider
                            ${theme === 'cyberpunk' ? 'bg-black/50' : 'bg-zinc-950/50'}
                            ${textColors[t.theme]}`}>
                            {t.theme}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed
                          ${theme === 'cyberpunk' ? 'text-gray-300' : 'text-zinc-300'}`}>
                          {t.description}
                        </p>
                        <div className={`mt-4 pt-4 border-t flex items-center gap-2 text-xs
                          ${theme === 'cyberpunk' ? 'border-gray-800 text-gray-500' : 'border-zinc-800 text-zinc-600'}`}>
                          <span>📊 {t.events.length} events</span>
                          <span>•</span>
                          <span>⏱️ 5 years</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className={`mt-20 text-xs text-center ${theme === 'cyberpunk' ? 'text-gray-700' : 'text-zinc-600'}`}>
          <p>POWERED BY GEMINI 2.5 FLASH • VULTR COMPUTE • RAINDROP MEMORY</p>
        </footer>

      </div>

      {/* Modals - Outside the transition wrapper so they don't fade if theme is switched while open */}
      {selectedEvent && (
        <DiaryModal 
          event={selectedEvent.event} 
          theme={selectedEvent.theme} 
          onClose={() => setSelectedEvent(null)}
          appTheme={theme}
        />
      )}

      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Interactive Tour */}
      {showTour && <InteractiveTour onComplete={() => setShowTour(false)} />}

      {/* Custom Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;