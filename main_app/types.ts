export interface UserInput {
  age: number;
  occupation: string;
  regret: string;
  decision: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string; // The "Diary Entry"
  happiness: number; // 0-100
  wealth: number; // 0-100
}

export interface Timeline {
  id: string; // "A", "B", "C"
  theme: "Safe" | "Risk" | "Chaos";
  description: string;
  events: TimelineEvent[];
}

export interface SimulationData {
  timelines: Timeline[];
}

export interface RaindropSession {
  key: string;
  timestamp: number;
}