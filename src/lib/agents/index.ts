/**
 * Self Flow - Factory de Agentes Especializados
 * 
 * Sistema que cria e gerencia clones digitais personalizados baseados em:
 * - Mapa numerológico completo
 * - Perfil comportamental do usuário
 * - Tipo de agente especializado escolhido
 */

import { BaseAgent, PersonalityProfile, AgentType } from './base';
import { EsotericAgent } from './esoteric';
import { PsychologicalAgent } from './psychological';
import { HybridAgent } from './hybrid';
import { NumerologyMap } from '@/lib/numerology/calculator';

export interface AgentCreationOptions {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  preferredAgent?: AgentType;
  autoDetect?: boolean;
}

export interface AgentRecommendation {
  recommendedAgent: AgentType;
  confidence: number;
  reasoning: string[];
  alternativeAgents: { type: AgentType; score: number }[];
}

/**
 * Factory principal para criação de agentes especializados
 */
export class AgentFactory {
  
  /**
   * Cria um agente especializado baseado nas preferências e perfil
   */
  static createAgent(options: AgentCreationOptions): BaseAgent {
    const { numerologyMap, personalityProfile, preferredAgent, autoDetect = false } = options;
    
    let selectedAgent: AgentType;
    
    if (autoDetect || !preferredAgent) {
      const recommendation = this.recommendAgent(numerologyMap, personalityProfile);
      selectedAgent = recommendation.recommendedAgent;
    } else {
      selectedAgent = preferredAgent;
    }
    
    switch (selectedAgent) {
      case 'ESOTERICO':
        return new EsotericAgent(numerologyMap, personalityProfile);
      case 'PSICOLOGICO':
        return new PsychologicalAgent(numerologyMap, personalityProfile);
      case 'HYBRID':
        return new HybridAgent(numerologyMap, personalityProfile);
      default:
        return new HybridAgent(numerologyMap, personalityProfile);
    }
  }
  
  /**
   * Recomenda o melhor agente baseado no perfil completo
   */
  static recommendAgent(
    numerologyMap: NumerologyMap, 
    personalityProfile: PersonalityProfile
  ): AgentRecommendation {
    
    const scores = {
      ESOTERICO: 0,
      PSICOLOGICO: 0,
      HYBRID: 0
    };
    
    const reasoning: string[] = [];
    
    // ANÁLISE BASEADA EM PERFIL COMPORTAMENTAL
    
    // Abertura espiritual
    if (personalityProfile.spiritualOpenness >= 4) {
      scores.ESOTERICO += 3;
      scores.HYBRID += 2;
      reasoning.push(`Alta abertura espiritual (${personalityProfile.spiritualOpenness}/5) favorece abordagem esotérica`);
    } else if (personalityProfile.spiritualOpenness <= 2) {
      scores.PSICOLOGICO += 3;
      scores.HYBRID += 1;
      reasoning.push(`Baixa abertura espiritual (${personalityProfile.spiritualOpenness}/5) favorece abordagem científica`);
    }
    
    // Interesse psicológico
    if (personalityProfile.psychologicalInterest >= 4) {
      scores.PSICOLOGICO += 3;
      scores.HYBRID += 2;
      reasoning.push(`Alto interesse psicológico (${personalityProfile.psychologicalInterest}/5) favorece abordagem científica`);
    } else if (personalityProfile.psychologicalInterest <= 2) {
      scores.ESOTERICO += 2;
      scores.HYBRID += 1;
    }
    
    // Nível de autorreflexão
    if (personalityProfile.selfReflectionLevel >= 4) {
      scores.HYBRID += 2;
      scores.ESOTERICO += 1;
      scores.PSICOLOGICO += 1;
      reasoning.push(`Alto nível de autorreflexão favorece abordagem integral`);
    }
    
    // Estilo de tomada de decisão
    if (personalityProfile.decisionMaking === 'intuitivo') {
      scores.ESOTERICO += 2;
      reasoning.push('Tomada de decisão intuitiva alinha com abordagem esotérica');
    } else if (personalityProfile.decisionMaking === 'racional') {
      scores.PSICOLOGICO += 2;
      reasoning.push('Tomada de decisão racional alinha com abordagem científica');
    } else if (personalityProfile.decisionMaking === 'híbrido') {
      scores.HYBRID += 3;
      reasoning.push('Tomada de decisão híbrida indica preferência por integração');
    }
    
    // Estilo de comunicação
    if (personalityProfile.communicationStyle === 'empático') {
      scores.ESOTERICO += 1;
      scores.HYBRID += 1;
    } else if (personalityProfile.communicationStyle === 'analítico') {
      scores.PSICOLOGICO += 1;
      scores.HYBRID += 1;
    } else if (personalityProfile.communicationStyle === 'criativo') {
      scores.ESOTERICO += 2;
    }
    
    // ANÁLISE BASEADA EM NUMEROLOGIA
    
    // Números mestres indicam potencial espiritual
    const hasMasterNumbers = [
      numerologyMap.motivacao,
      numerologyMap.expressao,
      numerologyMap.destino,
      numerologyMap.harmonicoSuperior
    ].some(num => [11, 22, 33].includes(num));
    
    if (hasMasterNumbers) {
      scores.ESOTERICO += 2;
      scores.HYBRID += 1;
      reasoning.push('Presença de números mestres indica potencial para abordagem esotérica');
    }
    
    // Complexidade numerológica (muitas lições cármicas)
    if (numerologyMap.licoesCarmicas.length >= 3) {
      scores.PSICOLOGICO += 1;
      scores.HYBRID += 2;
      reasoning.push('Múltiplas lições cármicas podem se beneficiar de abordagem estruturada');
    }
    
    // Ano Pessoal espiritual (7, 11) vs prático (4, 8)
    if ([7, 11].includes(numerologyMap.anoPessoal)) {
      scores.ESOTERICO += 1;
      reasoning.push(`Ano Pessoal ${numerologyMap.anoPessoal} favorece desenvolvimento espiritual`);
    } else if ([4, 8].includes(numerologyMap.anoPessoal)) {
      scores.PSICOLOGICO += 1;
      reasoning.push(`Ano Pessoal ${numerologyMap.anoPessoal} favorece abordagem prática`);
    }
    
    // PONTUAÇÃO FINAL E RECOMENDAÇÃO
    
    // Bonificação para híbrido se scores estão equilibrados
    const maxScore = Math.max(...Object.values(scores));
    const balancedScores = Object.values(scores).filter(score => score >= maxScore - 1).length >= 2;
    
    if (balancedScores) {
      scores.HYBRID += 2;
      reasoning.push('Perfil equilibrado indica benefício da abordagem integral');
    }
    
    // Determina agente recomendado
    const recommendedAgent = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as AgentType] > scores[b[0] as AgentType] ? a : b
    )[0] as AgentType;
    
    const maxFinalScore = scores[recommendedAgent];
    const confidence = Math.min((maxFinalScore / 10) * 100, 100);
    
    // Cria lista de alternativas
    const alternativeAgents = Object.entries(scores)
      .filter(([type, _]) => type !== recommendedAgent)
      .map(([type, score]) => ({ type: type as AgentType, score }))
      .sort((a, b) => b.score - a.score);
    
    return {
      recommendedAgent,
      confidence: Math.round(confidence),
      reasoning,
      alternativeAgents
    };
  }
  
  /**
   * Cria perfil comportamental básico para testes
   */
  static createTestProfile(name: string, preferences: Partial<PersonalityProfile> = {}): PersonalityProfile {
    return {
      name,
      age: 35,
      currentSituation: 'Buscando mais clareza e direcionamento na vida',
      mainChallenges: ['Ansiedade', 'Decisões importantes', 'Autoconfiança'],
      coreValues: ['Autenticidade', 'Crescimento', 'Conexão'],
      communicationStyle: 'empático',
      decisionMaking: 'híbrido',
      stressResponse: 'reflexão',
      motivationStyle: 'intrínseca',
      spiritualOpenness: 3,
      psychologicalInterest: 3,
      selfReflectionLevel: 4,
      ...preferences
    };
  }
  
  /**
   * Validações para criação de agente
   */
  static validateAgentCreation(options: AgentCreationOptions): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validar numerologyMap
    if (!options.numerologyMap) {
      errors.push('Mapa numerológico é obrigatório');
    } else {
      if (!options.numerologyMap.isValidated) {
        errors.push('Mapa numerológico deve estar validado');
      }
      
      const requiredNumbers = ['motivacao', 'expressao', 'destino', 'anoPessoal'];
      for (const field of requiredNumbers) {
        if (!options.numerologyMap[field as keyof NumerologyMap]) {
          errors.push(`Campo numerológico obrigatório ausente: ${field}`);
        }
      }
    }
    
    // Validar personalityProfile
    if (!options.personalityProfile) {
      errors.push('Perfil de personalidade é obrigatório');
    } else {
      if (!options.personalityProfile.name?.trim()) {
        errors.push('Nome é obrigatório no perfil');
      }
      
      const requiredRanges = [
        'spiritualOpenness',
        'psychologicalInterest', 
        'selfReflectionLevel'
      ];
      
      for (const field of requiredRanges) {
        const value = options.personalityProfile[field as keyof PersonalityProfile];
        if (typeof value !== 'number' || value < 1 || value > 5) {
          errors.push(`${field} deve ser um número entre 1 e 5`);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

/**
 * Utilitários para gerenciamento de agentes
 */
export class AgentManager {
  
  /**
   * Compara eficácia de diferentes agentes para um perfil
   */
  static compareAgentsForProfile(
    numerologyMap: NumerologyMap,
    personalityProfile: PersonalityProfile
  ): { agentType: AgentType; suitabilityScore: number; strengths: string[] }[] {
    
    const results: { agentType: AgentType; suitabilityScore: number; strengths: string[] }[] = [];
    
    // Analisa cada tipo de agente
    const agentTypes: AgentType[] = ['ESOTERICO', 'PSICOLOGICO', 'HYBRID'];
    
    for (const agentType of agentTypes) {
      const agent = AgentFactory.createAgent({
        numerologyMap,
        personalityProfile,
        preferredAgent: agentType
      });
      
      const suitabilityScore = this.calculateSuitabilityScore(agentType, personalityProfile);
      const strengths = this.identifyAgentStrengths(agentType, numerologyMap, personalityProfile);
      
      results.push({
        agentType,
        suitabilityScore,
        strengths
      });
    }
    
    return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  }
  
  /**
   * Calcula score de adequação de um agente para um perfil
   */
  private static calculateSuitabilityScore(
    agentType: AgentType,
    profile: PersonalityProfile
  ): number {
    let score = 0;
    
    switch (agentType) {
      case 'ESOTERICO':
        score += profile.spiritualOpenness * 20;
        score += (5 - profile.psychologicalInterest) * 10;
        score += profile.selfReflectionLevel * 15;
        break;
        
      case 'PSICOLOGICO':
        score += profile.psychologicalInterest * 20;
        score += (5 - profile.spiritualOpenness) * 10;
        score += (profile.decisionMaking === 'racional' ? 25 : 0);
        break;
        
      case 'HYBRID':
        const balance = 5 - Math.abs(profile.spiritualOpenness - profile.psychologicalInterest);
        score += balance * 15;
        score += profile.selfReflectionLevel * 20;
        score += (profile.decisionMaking === 'híbrido' ? 30 : 15);
        break;
    }
    
    return Math.min(score, 100);
  }
  
  /**
   * Identifica forças específicas de cada agente para um perfil
   */
  private static identifyAgentStrengths(
    agentType: AgentType,
    numerologyMap: NumerologyMap,
    profile: PersonalityProfile
  ): string[] {
    const strengths: string[] = [];
    
    switch (agentType) {
      case 'ESOTERICO':
        strengths.push('Interpretação profunda de padrões numerológicos');
        strengths.push('Conexão com propósito e missão de vida');
        if ([11, 22, 33].includes(numerologyMap.destino)) {
          strengths.push('Especialização em números mestres');
        }
        if (profile.spiritualOpenness >= 4) {
          strengths.push('Alinhamento com abertura espiritual');
        }
        break;
        
      case 'PSICOLOGICO':
        strengths.push('Estratégias comportamentais baseadas em evidências');
        strengths.push('Desenvolvimento de habilidades práticas');
        if (numerologyMap.licoesCarmicas.length > 0) {
          strengths.push('Abordagem estruturada para desenvolvimento de lacunas');
        }
        if (profile.psychologicalInterest >= 4) {
          strengths.push('Alinhamento com interesse científico');
        }
        break;
        
      case 'HYBRID':
        strengths.push('Integração de múltiplas perspectivas');
        strengths.push('Flexibilidade de abordagem');
        strengths.push('Síntese entre intuição e análise');
        if (profile.selfReflectionLevel >= 4) {
          strengths.push('Aproveitamento de alta capacidade reflexiva');
        }
        break;
    }
    
    return strengths;
  }
}

// Exports para uso em outros módulos
export {
  BaseAgent,
  EsotericAgent,
  PsychologicalAgent,
  HybridAgent
};