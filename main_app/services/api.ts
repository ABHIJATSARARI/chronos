import { UserInput, SimulationData } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

/**
 * Generate simulation - can use backend API or direct Gemini call
 */
export const generateSimulationAPI = async (input: UserInput): Promise<SimulationData> => {
  if (USE_BACKEND) {
    // Use Vultr Backend API
    console.log('🌐 Using Vultr Backend API for simulation...');
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
    // Use direct Gemini API (for local development)
    const { generateSimulation } = await import('./gemini');
    return generateSimulation(input);
  }
};

/**
 * Save timeline to backend API
 */
export const saveSimulationAPI = async (userId: string, data: SimulationData): Promise<{ key: string; timestamp: number }> => {
  if (USE_BACKEND) {
    console.log('🌐 Saving to Vultr Backend...');
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
    // Use direct Raindrop MCP (for local development)
    const { saveTimelineToRaindrop } = await import('./raindrop');
    return saveTimelineToRaindrop(userId, data);
  }
};

/**
 * Health check for backend
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};
