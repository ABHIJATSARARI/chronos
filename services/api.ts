import { UserInput, SimulationData } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

/**
 * Generate simulation - can use backend API or direct Gemini call
 */
export const generateSimulationAPI = async (input: UserInput, geminiApiKey?: string): Promise<SimulationData> => {
  console.log('🔍 API Configuration:', {
    USE_BACKEND,
    BACKEND_URL,
    VITE_USE_BACKEND: import.meta.env.VITE_USE_BACKEND,
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    frontendOnlyMode: !USE_BACKEND,
  });

  if (USE_BACKEND) {
    // Use Backend API
    console.log('🌐 Using Backend API for simulation...');
    const response = await fetch(`${BACKEND_URL}/api/simulation/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Backend API request failed');
    }

    const result = await response.json();
    return result.data;
  } else {
    // Use direct Gemini API (frontend-only mode for GitHub Pages)
    console.log('✨ Using Direct Gemini API (Frontend-Only Mode)...');
    const { generateSimulation } = await import('./gemini');
    return generateSimulation(input, geminiApiKey);
  }
};

/**
 * Save timeline to backend API
 */
export const saveSimulationAPI = async (userId: string, data: SimulationData): Promise<{ key: string; timestamp: number }> => {
  if (USE_BACKEND) {
    console.log('🌐 Saving to Backend...');
    const response = await fetch(`${BACKEND_URL}/api/simulation/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, simulationData: data }),
    });

    if (!response.ok) {
      throw new Error('Backend save request failed');
    }

    const result = await response.json();
    return result.session;
  } else {
    // Frontend-only mode: No save functionality
    console.log('⚠️ Save functionality disabled in frontend-only mode');
    throw new Error('Save functionality requires backend. Please enable VITE_USE_BACKEND=true');
  }
};

/**
 * Health check for backend
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  if (!USE_BACKEND) {
    return false; // Backend disabled in frontend-only mode
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};
