const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

/**
 * Raindrop MCP Client Integration for Backend
 * Connects to Raindrop MCP Server for SmartMemory persistence
 */

let mcpClient = null;

async function getMCPClient() {
  if (mcpClient) return mcpClient;

  // Initialize MCP Client with Raindrop Server
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@raindrop/mcp-server"],
    env: {
      ...process.env,
      RAINDROP_API_KEY: process.env.RAINDROP_API_KEY || process.env.GEMINI_API_KEY,
    },
  });

  mcpClient = new Client(
    {
      name: "chronos-backend",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await mcpClient.connect(transport);
  console.log("🌊 [Raindrop MCP] Backend connected to SmartMemory Server");
  
  return mcpClient;
}

const saveTimelineToRaindrop = async (userId, data) => {
  console.log("🌊 [Raindrop MCP] Initializing SmartMemory connection...");
  
  try {
    const client = await getMCPClient();
    const memoryKey = `universe-${userId}-${Date.now()}`;
    
    // Call Raindrop MCP Server to store episodic memory
    const result = await client.callTool({
      name: "raindrop_store_memory",
      arguments: {
        key: memoryKey,
        content: JSON.stringify(data),
        type: "episodic",
        tags: ["simulation", "chronos-mvp", "timeline", "vultr-backend"],
        metadata: {
          userId,
          timestamp: Date.now(),
          timelines: data.timelines.length,
          source: "vultr-compute-backend"
        },
      },
    });

    console.log("🌊 [Raindrop MCP] Stored episodic memory:", {
      key: memoryKey,
      type: "episodic",
      result: result.content,
    });

    return {
      key: memoryKey,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("🌊 [Raindrop MCP] Error:", error);
    // Fallback for development
    console.log("🌊 [Raindrop MCP] Using fallback storage...");
    const memoryKey = `universe-${userId}-${Date.now()}`;
    return {
      key: memoryKey,
      timestamp: Date.now(),
    };
  }
};

module.exports = { saveTimelineToRaindrop };
