import React, { useState, useEffect } from 'react';

interface Step {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: Step[] = [
  {
    target: 'input-form',
    title: '1. Define Your Reality',
    description: 'Enter your current life details and the pivotal decision that will split your timeline into multiple universes.',
    position: 'bottom'
  },
  {
    target: 'simulate-button',
    title: '2. Begin Simulation',
    description: 'Click here to generate 3 divergent timelines powered by Gemini AI: Safe, Risk, and Chaos paths.',
    position: 'top'
  },
  {
    target: 'multiverse-graph',
    title: '3. Explore Timelines',
    description: 'Hover over nodes to see happiness and wealth scores. Click nodes to read AI-generated diary entries from your alternate lives.',
    position: 'top'
  },
  {
    target: 'save-button',
    title: '4. Save to Raindrop SmartMemory',
    description: 'Persist your timelines using Raindrop MCP Server for future exploration and queries.',
    position: 'bottom'
  },
  {
    target: 'theme-toggle',
    title: '5. Toggle Theme',
    description: 'Switch between Cyberpunk and Minimalist themes to match your aesthetic preference.',
    position: 'bottom'
  }
];

interface InteractiveTourProps {
  onComplete: () => void;
}

export const InteractiveTour: React.FC<InteractiveTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Position the tooltip near the target element (centered when possible)
    const targetElement = document.getElementById(tourSteps[currentStep]?.target);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const step = tourSteps[currentStep];
      
      const tooltipWidth = 384; // w-96 = 24rem = 384px
      const tooltipHeight = 250; // approximate height with content
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let top = 0;
      let left = 0;

      switch (step.position) {
        case 'top':
          top = rect.top - tooltipHeight - 30;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          
          // Keep within viewport
          if (top < 20) top = rect.bottom + 30; // Flip to bottom if no room on top
          break;
          
        case 'bottom':
          top = rect.bottom + 30;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          
          // Keep within viewport
          if (top + tooltipHeight > viewport.height - 20) {
            top = rect.top - tooltipHeight - 30; // Flip to top if no room on bottom
          }
          break;
          
        case 'left':
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - 30;
          
          // Keep within viewport
          if (left < 20) left = rect.right + 30; // Flip to right if no room on left
          break;
          
        case 'right':
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + 30;
          
          // Keep within viewport
          if (left + tooltipWidth > viewport.width - 20) {
            left = rect.left - tooltipWidth - 30; // Flip to left if no room on right
          }
          break;
      }

      // Center horizontally if tooltip would go off-screen
      if (left < 20) {
        left = (viewport.width - tooltipWidth) / 2;
      } else if (left + tooltipWidth > viewport.width - 20) {
        left = (viewport.width - tooltipWidth) / 2;
      }

      // Center vertically if tooltip would go off-screen
      if (top < 20) {
        top = (viewport.height - tooltipHeight) / 2;
      } else if (top + tooltipHeight > viewport.height - 20) {
        top = (viewport.height - tooltipHeight) / 2;
      }

      // Final boundary checks with center fallback
      left = Math.max(20, Math.min(left, viewport.width - tooltipWidth - 20));
      top = Math.max(20, Math.min(top, viewport.height - tooltipHeight - 20));

      setPosition({ top, left });

      // Highlight the element
      targetElement.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.8)';
      targetElement.style.transition = 'box-shadow 0.3s ease';
      targetElement.style.position = 'relative';
      targetElement.style.zIndex = '60';

      return () => {
        targetElement.style.boxShadow = '';
        targetElement.style.zIndex = '';
      };
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('chronos-tour-completed', 'true');
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('chronos-tour-completed', 'true');
    onComplete();
  };

  if (currentStep >= tourSteps.length) {
    handleComplete();
    return null;
  }

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm" onClick={handleSkip} />

      {/* Tour Card */}
      <div
        className="fixed z-[60] w-80 md:w-96 bg-gradient-to-br from-purple-900/95 to-black border-2 border-purple-500 rounded-xl shadow-2xl animate-fade-in"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {/* Progress Dots */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {tourSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-purple-500 w-8'
                  : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
              <p className="text-sm text-purple-300">{step.description}</p>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-purple-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 text-sm font-semibold text-purple-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <span className="text-xs text-gray-500 font-mono">
              {currentStep + 1} / {tourSteps.length}
            </span>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next →'}
            </button>
          </div>

          {/* Skip Link */}
          <button
            onClick={handleSkip}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors pt-2"
          >
            Skip tour
          </button>
        </div>
      </div>
    </>
  );
};
