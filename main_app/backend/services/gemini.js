const { GoogleGenAI, Type, Schema } = require("@google/genai");

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const eventSchema = {
  type: Type.OBJECT,
  properties: {
    year: { type: Type.INTEGER, description: "The year of the event (Current year + n)" },
    title: { type: Type.STRING, description: "Short headline of the life event" },
    description: { type: Type.STRING, description: "A first-person diary entry (max 150 words) describing the event, feelings, and consequences." },
    happiness: { type: Type.INTEGER, description: "Happiness score from 0 to 100" },
    wealth: { type: Type.INTEGER, description: "Wealth/Financial score from 0 to 100" },
  },
  required: ["year", "title", "description", "happiness", "wealth"],
};

const timelineSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "Timeline ID (A, B, or C)" },
    theme: { type: Type.STRING, enum: ["Safe", "Risk", "Chaos"] },
    description: { type: Type.STRING, description: "A short summary of this timeline's vibe" },
    events: {
      type: Type.ARRAY,
      items: eventSchema,
    },
  },
  required: ["id", "theme", "description", "events"],
};

const simulationSchema = {
  type: Type.OBJECT,
  properties: {
    timelines: {
      type: Type.ARRAY,
      items: timelineSchema,
    },
  },
};

const generateSimulation = async (input) => {
  const model = "gemini-2.5-flash";
  const currentYear = new Date().getFullYear();

  const prompt = `
    You are the Chronos Engine.
    User Profile:
    - Current Age: ${input.age}
    - Current Occupation: ${input.occupation}
    - Major Regret: ${input.regret || "None"}
    - The Split Decision: ${input.decision}

    Generate 3 distinct timelines for the next 5 years starting from ${currentYear + 1}.

    Timeline A (The Safe Path): Low variance, steady growth, playing it safe.
    Timeline B (The Risk Path): High variance, taking the leap defined in 'The Split Decision'. Could be great, could be hard.
    Timeline C (The Chaos Path): Unexpected random events, entropy, high strangeness.

    For each timeline, generate 5 sequential yearly events.
    The 'description' field must be written in first-person as a diary entry.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a sci-fi simulation engine. You are objective but creative.",
        responseMimeType: "application/json",
        responseSchema: simulationSchema,
        temperature: 0.8,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Chronos Engine");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Chronos Engine Malfunction:", error);
    throw error;
  }
};

module.exports = { generateSimulation };
