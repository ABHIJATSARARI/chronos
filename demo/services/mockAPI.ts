import { UserInput, SimulationData } from "../types";

// Mock simulation data generator for demo
export const generateMockSimulation = async (input: UserInput): Promise<SimulationData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const currentYear = new Date().getFullYear();
  
  return {
    timelines: [
      {
        id: "A",
        theme: "Safe",
        description: "The steady, predictable path forward",
        events: [
          {
            year: currentYear + 1,
            title: "Stability Achieved",
            description: `I chose the safe route. ${input.decision} seemed too risky, so I stayed with what I know. My ${input.occupation} role feels comfortable, predictable. The routine brings peace of mind, even if excitement is rare. I sleep well at night knowing tomorrow will be much like today.`,
            happiness: 70,
            wealth: 65
          },
          {
            year: currentYear + 2,
            title: "Incremental Progress",
            description: `Two years in, I've received a modest promotion. The safe choices compound slowly but surely. ${input.regret || 'No major regrets'} still crosses my mind sometimes, but I've made peace with it. Life is pleasant, if unremarkable. My savings grow steadily.`,
            happiness: 72,
            wealth: 72
          },
          {
            year: currentYear + 3,
            title: "Comfortable Plateau",
            description: `Midway through this journey, I've found my groove. The decision to avoid ${input.decision} feels distant now. My career in ${input.occupation} has plateaued at a comfortable level. Friends say I seem content, though I wonder if content is the same as happy. The path ahead is clear and safe.`,
            happiness: 75,
            wealth: 78
          },
          {
            year: currentYear + 4,
            title: "Reflection Phase",
            description: `Four years down the safe path. I'm financially secure, emotionally stable. Sometimes I wonder what would have happened if I'd taken the risk. ${input.regret || 'My choices'} shaped who I am today. The what-ifs are quieter now. I've built something solid, if not spectacular.`,
            happiness: 74,
            wealth: 82
          },
          {
            year: currentYear + 5,
            title: "Peaceful Resolution",
            description: `Five years later, I understand why I chose this path. The stability I've built as a ${input.occupation} provides foundation for everything else. ${input.decision} was a fork in the road I didn't take, and that's okay. I've learned that safety isn't cowardice—it's wisdom. My life is good, genuinely good.`,
            happiness: 80,
            wealth: 85
          }
        ]
      },
      {
        id: "B",
        theme: "Risk",
        description: "The bold leap into the unknown",
        events: [
          {
            year: currentYear + 1,
            title: "The Leap of Faith",
            description: `I did it. ${input.decision}—I actually went through with it. Left my ${input.occupation} position and jumped. The first months are terrifying and exhilarating. Every day brings new challenges I've never faced before. ${input.regret || 'My past hesitations'} feel like they're from another lifetime. I'm scared, but I'm alive.`,
            happiness: 60,
            wealth: 45
          },
          {
            year: currentYear + 2,
            title: "Struggling to Swim",
            description: `Year two is brutal. ${input.decision} turned out to be harder than I imagined. Money is tight, stress is high. But there are moments of breakthrough that make it all worthwhile. I'm learning skills I never knew I'd need. Some days I question everything. Other days, I feel like I'm exactly where I need to be.`,
            happiness: 55,
            wealth: 40
          },
          {
            year: currentYear + 3,
            title: "Breaking Through",
            description: `Something shifted. The risk is starting to pay off. ${input.decision} led me to opportunities I couldn't have imagined. My former life as a ${input.occupation} feels like a different person. I'm not wealthy yet, but I'm growing. The happiness comes from progress, not arrival. I'm building something real.`,
            happiness: 75,
            wealth: 60
          },
          {
            year: currentYear + 4,
            title: "Momentum Builds",
            description: `Four years in, the trajectory is clear. Taking the risk with ${input.decision} was the right call. I've faced setbacks that would have destroyed the old me, but each one made me stronger. ${input.regret || 'My fears'} seem trivial now. I'm not just surviving—I'm thriving. The struggle forged something unbreakable.`,
            happiness: 85,
            wealth: 75
          },
          {
            year: currentYear + 5,
            title: "Vindication",
            description: `Five years ago, ${input.decision} seemed impossible. Now it's my reality. I've built something remarkable by taking that risk. Former colleagues from my ${input.occupation} days reach out asking how I did it. The answer: I chose fear over regret. The financial and emotional rewards exceed my wildest dreams. I'm proof that calculated risks can transform lives.`,
            happiness: 92,
            wealth: 88
          }
        ]
      },
      {
        id: "C",
        theme: "Chaos",
        description: "The unpredictable, entropy-driven timeline",
        events: [
          {
            year: currentYear + 1,
            title: "Unexpected Catalyst",
            description: `Everything changed when I least expected it. A random encounter, a chance meeting—suddenly ${input.decision} became irrelevant because the universe threw me a curveball. I lost my ${input.occupation} job due to restructuring I never saw coming. Chaos reigns. I'm scrambling to adapt to a reality I didn't plan for.`,
            happiness: 45,
            wealth: 35
          },
          {
            year: currentYear + 2,
            title: "Strange Opportunities",
            description: `Year two brought bizarre opportunities. Someone I met randomly offered me something completely outside my expertise. ${input.regret || 'My expectations'} mean nothing now—life has its own plans. I'm doing things I never imagined. It's terrifying but oddly liberating. Control is an illusion I've abandoned.`,
            happiness: 52,
            wealth: 48
          },
          {
            year: currentYear + 3,
            title: "Embracing Entropy",
            description: `I've stopped fighting the chaos. ${input.decision} was just one of a thousand factors I couldn't control. My career path looks nothing like my ${input.occupation} background. Random events keep reshaping my life. I'm learning to surf the waves of uncertainty instead of drowning in them. It's exhausting but strangely meaningful.`,
            happiness: 65,
            wealth: 55
          },
          {
            year: currentYear + 4,
            title: "Chaotic Stability",
            description: `Four years of unpredictability have taught me resilience. ${input.decision} and ${input.regret || 'my plans'} seem quaint now—life doesn't follow scripts. I've built a strange kind of stability within the chaos. Each disruption is just another puzzle to solve. I'm financially volatile but emotionally unshakeable. The chaos made me antifragile.`,
            happiness: 70,
            wealth: 62
          },
          {
            year: currentYear + 5,
            title: "The Chaos Dividend",
            description: `Five years of entropy led somewhere remarkable. By abandoning control and embracing randomness, I've ended up in a place I could never have planned. My journey from ${input.occupation} to here involved a dozen unexpected pivots. ${input.decision} mattered less than my adaptability. I've learned the ultimate lesson: the only constant is change, and that's beautiful.`,
            happiness: 88,
            wealth: 78
          }
        ]
      }
    ]
  };
};

// Mock health check
export const checkMockHealth = async (): Promise<boolean> => {
  return true;
};

// Mock Raindrop save
export const saveMockToRaindrop = async (): Promise<{ key: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { key: `DEMO-${Date.now()}` };
};
