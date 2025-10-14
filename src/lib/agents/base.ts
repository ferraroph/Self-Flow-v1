/**
 * Self Flow - Sistema Base Multi-Agente
 * 
 * Sistema que cria clones digitais personalizados baseados em:
 * - Mapa numerológico cabalístico completo
 * - Perfil comportamental do onboarding
 * - Tipo de agente especializado escolhido
 */

import { NumerologyMap } from '@/lib/numerology/calculator';

export type AgentType = 'ESOTERICO' | 'PSICOLOGICO' | 'HYBRID';

export interface PersonalityProfile {
  // Dados pessoais básicos
  name: string;
  age: number;
  currentSituation: string;
  mainChallenges: string[];
  coreValues: string[];
  
  // Perfil comportamental
  communicationStyle: 'direto' | 'empático' | 'analítico' | 'criativo';
  decisionMaking: 'racional' | 'intuitivo' | 'híbrido';
  stressResponse: 'ação' | 'reflexão' | 'busca_ajuda';
  motivationStyle: 'intrínseca' | 'extrínseca' | 'mista';
  
  // Preferências de abordagem
  spiritualOpenness: 1 | 2 | 3 | 4 | 5; // 1=cético, 5=muito aberto
  psychologicalInterest: 1 | 2 | 3 | 4 | 5; // 1=baixo, 5=muito interessado
  selfReflectionLevel: 1 | 2 | 3 | 4 | 5; // 1=pouco, 5=muito reflexivo
}

export interface AgentPersona {
  agentType: AgentType;
  systemPrompt: string;
  communicationStyle: string;
  specializations: string[];
  numerologyIntegration: string;
}

/**
 * Classe base para todos os agentes especializados
 */
export abstract class BaseAgent {
  protected numerologyMap: NumerologyMap;
  protected personalityProfile: PersonalityProfile;
  protected agentType: AgentType;

  constructor(numerologyMap: NumerologyMap, personalityProfile: PersonalityProfile) {
    this.numerologyMap = numerologyMap;
    this.personalityProfile = personalityProfile;
    this.agentType = this.getAgentType();
  }

  /**
   * Cada agente define seu tipo específico
   */
  abstract getAgentType(): AgentType;

  /**
   * Gera o system prompt personalizado para o clone
   */
  abstract generateSystemPrompt(): string;

  /**
   * Adapta a resposta baseada no perfil numerológico
   */
  abstract adaptResponseToNumerology(baseResponse: string): string;

  /**
   * Identifica insights específicos do tipo de agente
   */
  abstract extractSpecializedInsights(conversationHistory: string[]): string[];

  /**
   * Cria sumário numerológico relevante para o agente
   */
  protected createNumerologyInsights(): string {
    const { numerologyMap } = this;
    
    const coreNumbers = `
Números Centrais:
• Motivação: ${numerologyMap.motivacao} (impulsos internos)
• Expressão: ${numerologyMap.expressao} (talentos naturais)  
• Destino: ${numerologyMap.destino} (propósito de vida)
• Harmônico Superior: ${numerologyMap.harmonicoSuperior} (integração)`;

    const challenges = `
Desafios Evolutivos:
• Desafio Menor: ${numerologyMap.desafioMenor} (obstáculo inicial)
• Desafio Maior: ${numerologyMap.desafioMaior} (desafio principal)`;

    const cycles = `
Ciclos Atuais:
• Ano Pessoal: ${numerologyMap.anoPessoal} (energia do ano)
• Realizações: ${numerologyMap.realizacao1} → ${numerologyMap.realizacao2} → ${numerologyMap.realizacao3}`;

    const karmic = `
Aspectos Cármicos:
• Lições: ${numerologyMap.licoesCarmicas.length > 0 ? JSON.stringify(numerologyMap.licoesCarmicas) : 'Nenhuma'}
• Tendências: ${numerologyMap.tendenciasOcultas.length > 0 ? JSON.stringify(numerologyMap.tendenciasOcultas) : 'Nenhuma'}`;

    return `${coreNumbers}\n\n${challenges}\n\n${cycles}\n\n${karmic}`;
  }

  /**
   * Cria perfil comportamental estruturado
   */
  protected createBehavioralProfile(): string {
    const { personalityProfile } = this;
    
    return `
PERFIL COMPORTAMENTAL:
• Nome: ${personalityProfile.name}
• Situação Atual: ${personalityProfile.currentSituation}
• Principais Desafios: ${personalityProfile.mainChallenges.join(', ')}
• Valores Centrais: ${personalityProfile.coreValues.join(', ')}
• Estilo Comunicação: ${personalityProfile.communicationStyle}
• Tomada Decisão: ${personalityProfile.decisionMaking}
• Resposta ao Stress: ${personalityProfile.stressResponse}
• Motivação: ${personalityProfile.motivationStyle}`;
  }

  /**
   * Identifica padrões numerológicos relevantes
   */
  protected identifyNumerologyPatterns(): string[] {
    const patterns: string[] = [];
    const { numerologyMap } = this;

    // Números mestres
    if ([11, 22, 33].includes(numerologyMap.motivacao)) {
      patterns.push(`Motivação ${numerologyMap.motivacao} indica alto potencial espiritual/criativo`);
    }

    if ([11, 22, 33].includes(numerologyMap.expressao)) {
      patterns.push(`Expressão ${numerologyMap.expressao} sugere missão de liderança/ensino`);
    }

    // Padrões de desafios
    if (numerologyMap.desafioMenor === numerologyMap.desafioMaior) {
      patterns.push(`Desafios alinhados (${numerologyMap.desafioMenor}) indicam foco específico de crescimento`);
    }

    // Ciclo atual
    if (numerologyMap.anoPessoal === 1) {
      patterns.push(`Ano Pessoal 1 - Fase de novos começos e iniciativas`);
    } else if (numerologyMap.anoPessoal === 9) {
      patterns.push(`Ano Pessoal 9 - Fase de conclusões e transformações`);
    }

    // Harmônico Superior
    if (numerologyMap.harmonicoSuperior === numerologyMap.destino) {
      patterns.push(`Harmônico igual ao Destino - Vida alinhada com propósito`);
    }

    return patterns;
  }

  /**
   * Cria contexto completo para o clone
   */
  public createCloneContext(): string {
    return `
${this.createNumerologyInsights()}

${this.createBehavioralProfile()}

PADRÕES IDENTIFICADOS:
${this.identifyNumerologyPatterns().map(p => `• ${p}`).join('\n')}

AGENTE ESPECIALIZADO: ${this.agentType}
`;
  }
}

/**
 * Utilitários para processamento de respostas
 */
export class ResponseProcessor {
  /**
   * Identifica tom emocional de uma mensagem
   */
  static identifyEmotionalTone(message: string): string {
    const anxietyWords = ['preocupado', 'ansioso', 'estressado', 'nervoso'];
    const confidenceWords = ['confiante', 'seguro', 'determinado', 'focado'];
    const confusionWords = ['confuso', 'perdido', 'incerto', 'dúvida'];
    
    const lowerMessage = message.toLowerCase();
    
    if (anxietyWords.some(word => lowerMessage.includes(word))) return 'ansioso';
    if (confidenceWords.some(word => lowerMessage.includes(word))) return 'confiante';
    if (confusionWords.some(word => lowerMessage.includes(word))) return 'confuso';
    
    return 'neutro';
  }

  /**
   * Extrai temas principais de uma conversa
   */
  static extractConversationThemes(messages: string[]): string[] {
    const themes = new Set<string>();
    const keywords = {
      'carreira': ['trabalho', 'profissional', 'carreira', 'emprego'],
      'relacionamentos': ['relacionamento', 'amor', 'parceiro', 'família'],
      'autoconhecimento': ['autoconhecimento', 'crescimento', 'desenvolvimento'],
      'espiritualidade': ['espiritual', 'energia', 'universo', 'propósito'],
      'decisões': ['decisão', 'escolha', 'dilema', 'dúvida']
    };

    messages.forEach(message => {
      const lowerMessage = message.toLowerCase();
      Object.entries(keywords).forEach(([theme, words]) => {
        if (words.some(word => lowerMessage.includes(word))) {
          themes.add(theme);
        }
      });
    });

    return Array.from(themes);
  }
}