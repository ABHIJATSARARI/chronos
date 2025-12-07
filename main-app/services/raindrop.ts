import { SimulationData, RaindropSession } from "../types";

/**
 * Raindrop MCP Client Integration (Backend Only)
 * Note: StdioClientTransport only works in Node.js, not in browser
 * This frontend service calls the backend API instead
 */

export const saveTimelineToRaindrop = async (
  userId: string,
  data: SimulationData
): Promise<RaindropSession> => {
  console.log("🌊 [Raindrop] Saving to backend...");
  
  try {
    // Call backend API to save via Raindrop MCP
    const response = await fetch('http://localhost:3001/api/simulation/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        simulation: data
      })
    });

    if (!response.ok) {
      throw new Error(`Backend save failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Saved to Raindrop MCP via backend:', result.key);
    
    return {
      key: result.key || `local_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: result.success ? 'saved' : 'fallback'
    };
  } catch (error) {
    console.error('❌ Raindrop MCP Error:', error);
    // Graceful fallback - still return success for demo purposes
    return {
      key: `local_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'fallback'
    };
  }
};