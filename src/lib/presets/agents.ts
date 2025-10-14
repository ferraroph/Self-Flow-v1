// Agent presets for Self Flow
export interface AgentPreset {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  personality: {
    empathy: number;
    directness: number;
    creativity: number;
    analytical: number;
  };
  voiceSettings?: {
    pitch: number;
    speed: number;
    tone: string;
  };
}

export const DEFAULT_AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'esoterico',
    name: 'Agente Esotérico',
    description: 'Focado em aspectos espirituais e numerológicos',
    systemPrompt: 'Você é um guia espiritual especializado em numerologia cabalística...',
    personality: {
      empathy: 0.9,
      directness: 0.6,
      creativity: 0.8,
      analytical: 0.7
    },
    voiceSettings: {
      pitch: 1.0,
      speed: 0.9,
      tone: 'mystical'
    }
  },
  {
    id: 'psicologico',
    name: 'Agente Psicológico',
    description: 'Baseado em ciência comportamental e TCC',
    systemPrompt: 'Você é um psicólogo especializado em autoconhecimento...',
    personality: {
      empathy: 0.8,
      directness: 0.8,
      creativity: 0.6,
      analytical: 0.9
    },
    voiceSettings: {
      pitch: 1.0,
      speed: 1.0,
      tone: 'professional'
    }
  },
  {
    id: 'hybrid',
    name: 'Agente Híbrido',
    description: 'Equilibra intuição espiritual com racionalidade',
    systemPrompt: 'Você integra sabedoria espiritual com análise psicológica...',
    personality: {
      empathy: 0.85,
      directness: 0.7,
      creativity: 0.75,
      analytical: 0.8
    },
    voiceSettings: {
      pitch: 1.0,
      speed: 0.95,
      tone: 'balanced'
    }
  }
];

// Voice configurations
export const INTERLOCUTOR_VOICE = {
  GENTLE: 'gentle',
  CONFIDENT: 'confident', 
  WISE: 'wise',
  ENERGETIC: 'energetic'
} as const;

export const INTERLOCUTOR_VOICES = [
  { id: 'gentle', name: 'Gentil', description: 'Voz suave e acolhedora' },
  { id: 'confident', name: 'Confiante', description: 'Voz firme e segura' },
  { id: 'wise', name: 'Sábio', description: 'Voz profunda e contemplativa' },
  { id: 'energetic', name: 'Energético', description: 'Voz dinâmica e motivadora' }
];

export type InterlocutorVoice = typeof INTERLOCUTOR_VOICE[keyof typeof INTERLOCUTOR_VOICE];

export default DEFAULT_AGENT_PRESETS;