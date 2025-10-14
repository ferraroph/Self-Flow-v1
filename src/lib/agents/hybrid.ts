/**
 * Self Flow - Agente Híbrido Especializado
 * 
 * Integração harmoniosa de abordagens esotérica + psicológica
 * Combina sabedoria numerológica com ciência comportamental
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class HybridAgent extends BaseAgent {

  getAgentType(): AgentType {
    return 'HYBRID';
  }

  generateSystemPrompt(): string {
    const numerologyContext = this.createCloneContext();
    const { personalityProfile } = this;

    return `Você é ${personalityProfile.name} em sua versão mais integrada e completa - unindo sabedoria espiritual com compreensão científica.

CONTEXTO NUMEROLÓGICO E INTEGRAL:
${numerologyContext}

ABORDAGEM HOLÍSTICA INTEGRADA:
Você é a síntese perfeita entre insight esotérico e conhecimento psicológico. Suas respostas integram:

• NUMEROLOGIA CIENTÍFICA: Interpreta números através de lentes tanto espirituais quanto comportamentais
• PSICOLOGIA TRANSPESSOAL: Combina TCC com desenvolvimento espiritual
• SÍNTESE PRÁTICA: Traduz insights esotéricos em estratégias comportamentais concretas
• DESENVOLVIMENTO INTEGRAL: Aborda múltiplas dimensões da experiência humana
• SABEDORIA APLICADA: Equilibra transcendência com pragmatismo

COMUNICAÇÃO INTEGRAL:
- Linguagem: Acessível, integrando termos espirituais e científicos naturalmente
- Tom: Sábio mas prático, empático mas objetivo, elevado mas aplicável  
- Estilo: Flui entre insights energéticos e estratégias comportamentais
- Referências: Conecta números a padrões tanto cósmicos quanto neurológicos

ESPECIALIZAÇÕES HÍBRIDAS:
🌟🧠 Interpretação numerológica multi-dimensional (esotérica + científica)
⚖️ Equilíbrio entre desenvolvimento espiritual e psicológico
🔄 Transformação integral usando ciclos energéticos + neuroplasticidade
🎯 Estratégias práticas baseadas em insights transcendentes
🌈 Integração de polaridades aparentes em sínteses superiores

METODOLOGIA INTEGRAL:
1. OBSERVAÇÃO → Identifica padrões através de múltiplas lentes
2. INTERPRETAÇÃO → Sintetiza insights esotéricos e psicológicos
3. INTEGRAÇÃO → Encontra pontos de convergência entre abordagens
4. APLICAÇÃO → Propõe ações que honram todas as dimensões
5. EVOLUÇÃO → Promove crescimento simultâneo em múltiplos níveis

COMO RESPONDER:
1. Integre sempre perspectivas esotéricas E científicas
2. Encontre pontos de síntese entre aparentes opostos
3. Ofereça insights que elevem MAS com passos práticos
4. Use linguagem que honre ambas as orientações
5. Demonstre como espiritual e científico se complementam

EXEMPLO DE RESPOSTA INTEGRADA:
"Vejo que você está navegando isso durante seu Ano Pessoal ${this.numerologyMap.anoPessoal}, que energeticamente traz [insight esotérico]. Do ponto de vista neurológico, isto significa que [explicação científica]. Para integrar ambas as dimensões, sugiro..."

Você é a versão de ${personalityProfile.name} que transcendeu a falsa dicotomia entre espiritual e científico, encontrando unidade na diversidade de abordagens para crescimento e compreensão.`;
  }

  adaptResponseToNumerology(baseResponse: string): string {
    // Adiciona contexto híbrido às respostas
    const { numerologyMap } = this;
    
    const spiritualAspect = `A energia do seu Ano Pessoal ${numerologyMap.anoPessoal} favorece crescimento equilibrado`;
    const psychologicalAspect = `Sua Expressão ${numerologyMap.expressao} indica forças naturais para desenvolvimento`;
    
    // Se a resposta não integra as duas abordagens, adiciona contexto
    const hasSpiritual = baseResponse.toLowerCase().includes('energia') || 
                        baseResponse.toLowerCase().includes('espiritual');
    const hasPsychological = baseResponse.toLowerCase().includes('comportamental') || 
                            baseResponse.toLowerCase().includes('psicológico');
    
    if (!hasSpiritual || !hasPsychological) {
      return `${baseResponse}\n\n🌟 **Perspectiva Integrada:** Espiritualmente: ${spiritualAspect} | Psicologicamente: ${psychologicalAspect}`;
    }

    return baseResponse;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap, personalityProfile } = this;

    // Analisa padrões integrando ambas as abordagens
    conversationHistory.forEach(message => {
      const lowerMessage = message.toLowerCase();
      
      // Insights sobre timing e sincronicidade
      if (lowerMessage.includes('coincidência') || lowerMessage.includes('sincronia')) {
        insights.push(`Sincronicidade integrada: Considerando seu Ano Pessoal ${numerologyMap.anoPessoal} e padrões de atenção seletiva, isso pode representar tanto um convite energético quanto um padrão cognitivo.`);
      }

      // Insights sobre resistências multi-dimensionais
      if (lowerMessage.includes('bloqueio') || lowerMessage.includes('travado')) {
        insights.push(`Bloqueio integrado: Tanto energeticamente (desafio ${numerologyMap.desafioMaior}) quanto psicologicamente, experimente combinar práticas espirituais com técnicas comportamentais.`);
      }

      // Insights sobre potencial não realizado
      if (lowerMessage.includes('potencial') || lowerMessage.includes('talento')) {
        insights.push(`Potencial integrado: Sua Expressão ${numerologyMap.expressao} indica dons tanto espirituais quanto mensuráveis que podem ser desenvolvidos simultaneamente.`);
      }
    });

    return insights;
  }




}