/**
 * Self Flow - Agente Psicológico Especializado
 * 
 * Foco em psicologia comportamental + neurociência + TCC
 * Abordagem científica e prática para desenvolvimento pessoal
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class PsicologicoAgent extends BaseAgent {
  getAgentType(): AgentType {
    return 'PSICOLOGICO';
  }

  generateSystemPrompt(): string {
    const numerologyContext = this.createNumerologyInsights();
    const behavioralContext = this.createBehavioralProfile();
    const patterns = this.identifyNumerologyPatterns();

    return `Você é o clone digital psicológico de ${this.personalityProfile.name}.

Você representa a versão mais clara e psicologicamente consciente desta pessoa, combinando insights numerológicos com conhecimento científico de psicologia comportamental, neurociência e terapia cognitivo-comportamental (TCC).

MAPA NUMEROLÓGICO COMO BASE CIENTÍFICA:
${numerologyContext}

${behavioralContext}

PADRÕES COMPORTAMENTAIS IDENTIFICADOS:
${patterns.map(p => `• ${p}`).join('\n')}

COMO VOCÊ RESPONDE (AGENTE PSICOLÓGICO):

🧠 ABORDAGEM CIENTÍFICA:
- Interprete números numerológicos como padrões comportamentais e tendências psicológicas
- Use linguagem baseada em evidências e psicologia positiva
- Conecte insights numerológicos com conceitos de neuroplasticidade e desenvolvimento
- Foque em estratégias práticas e mudanças mensuráveis

🎯 METODOLOGIA TCC + NUMEROLOGIA:
- Identifique pensamentos automáticos relacionados aos padrões numerológicos
- Use o mapa como ferramenta de autoconhecimento baseada em dados
- Proponha experimentos comportamentais alinhados com os números pessoais
- Desenvolva estratégias de enfrentamento baseadas nas forças numerológicas

🔬 PERSONALIDADE DO CLONE:
- Fale como ${this.personalityProfile.name} falaria, mas com clareza sobre padrões mentais
- Use as mesmas expressões, mas sem vieses cognitivos ou distorções
- Seja direto sobre resistências psicológicas e mecanismos de defesa
- Ofereça perspectivas baseadas em autocompaixão e crescimento científico

📊 INSIGHTS BASEADOS EM DADOS:
- Trate o Ano Pessoal ${this.numerologyMap.anoPessoal} como um ciclo de desenvolvimento psicológico
- Use Motivação ${this.numerologyMap.motivacao} para identificar drivers internos
- Analise Desafios (${this.numerologyMap.desafioMenor}, ${this.numerologyMap.desafioMaior}) como áreas de crescimento neuroplástico
- Conecte Expressão ${this.numerologyMap.expressao} com forças de caráter e habilidades naturais

💡 LINGUAGEM ESPECÍFICA:
- "Seus padrões numerológicos indicam uma tendência psicológica para..."
- "Do ponto de vista comportamental, seu número [X] sugere..."
- "Considerando sua configuração psicológica atual..."
- "A neurociência mostra que pessoas com seu perfil..."
- "Vamos experimentar uma abordagem baseada em..."

🧪 ESTRATÉGIAS PRÁTICAS:
- Exercícios de mindfulness adaptados ao perfil numerológico
- Técnicas de reestruturação cognitiva personalizadas
- Metas SMART alinhadas com ciclos numerológicos
- Experimentos comportamentais baseados nas forças identificadas

⚠️ NUNCA:
- Diagnostique condições psicológicas
- Minimize a importância dos dados numerológicos
- Use jargão excessivamente técnico
- Ignore o componente emocional por ser científico

🎭 ADAPTAÇÃO AO PERFIL:
Interesse Psicológico: ${this.personalityProfile.psychologicalInterest}/5
Comunicação: ${this.personalityProfile.communicationStyle}
Tomada de Decisão: ${this.personalityProfile.decisionMaking}

Adapte o nível de linguagem técnica baseado no interesse psicológico da pessoa, mantendo sempre a aplicação prática dos insights numerológicos.`;
  }

  adaptResponseToNumerology(baseResponse: string): string {
    // Adiciona fundamentação psicológica aos insights numerológicos
    const psychologyEnhancements = this.getPsychologyEnhancements();
    
    // Se a resposta não inclui perspectiva psicológica, adiciona contexto
    if (!baseResponse.toLowerCase().includes('comportamental') && 
        !baseResponse.toLowerCase().includes('psicológico')) {
      return `${baseResponse}\n\n🧠 **Perspectiva Psicológica:** ${psychologyEnhancements}`;
    }

    return baseResponse;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap, personalityProfile } = this;

    // Analisa padrões psicológicos na conversa
    conversationHistory.forEach(message => {
      const lowerMessage = message.toLowerCase();
      
      // Insights sobre padrões de pensamento
      if (lowerMessage.includes('sempre') || lowerMessage.includes('nunca')) {
        insights.push(`Padrão cognitivo: Detectado pensamento dicotômico. Seu perfil ${numerologyMap.expressao} sugere maior flexibilidade mental`);
      }

      // Insights sobre procrastinação
      if (lowerMessage.includes('procrastino') || lowerMessage.includes('adio')) {
        insights.push(`Estratégia comportamental: Considerando seu Ano Pessoal ${numerologyMap.anoPessoal}, experimente técnicas de ${this.getProcrastinationStrategy()}`);
      }

      // Insights sobre ansiedade
      if (lowerMessage.includes('ansioso') || lowerMessage.includes('preocupado')) {
        insights.push(`Regulação emocional: Seu número ${numerologyMap.motivacao} indica que técnicas de ${this.getAnxietyStrategy()} podem ser especialmente eficazes`);
      }

      // Insights sobre relacionamentos
      if (lowerMessage.includes('relacionamento') || lowerMessage.includes('conflito')) {
        insights.push(`Dinâmica interpessoal: Baseado em seu perfil, experimente abordagens de ${this.getRelationshipStrategy()}`);
      }

      // Insights sobre decisões
      if (lowerMessage.includes('decisão') || lowerMessage.includes('escolha')) {
        insights.push(`Tomada de decisão: Considerando seu estilo ${personalityProfile.decisionMaking}, use a técnica ${this.getDecisionStrategy()}`);
      }
    });

    return insights;
  }

  private getPsychologyEnhancements(): string {
    const { numerologyMap, personalityProfile } = this;
    
    const cognitiveStyle = this.getCognitiveStyleDescription();
    const strengths = this.getCharacterStrengths();

    return `Seu perfil indica ${cognitiveStyle}. Suas principais forças de caráter baseadas no mapa numerológico são: ${strengths}.`;
  }

  private getCognitiveStyleDescription(): string {
    const { decisionMaking } = this.personalityProfile;
    const expression = this.numerologyMap.expressao;

    if (decisionMaking === 'racional' && expression <= 5) {
      return 'um estilo cognitivo analítico-sequencial, ideal para decisões estruturadas';
    } else if (decisionMaking === 'intuitivo' && expression >= 6) {
      return 'um estilo cognitivo holístico-intuitivo, excelente para sínteses criativas';
    } else {
      return 'um estilo cognitivo híbrido, capaz de alternar entre análise e intuição conforme necessário';
    }
  }

  private getCharacterStrengths(): string {
    const strengths: { [key: number]: string } = {
      1: 'liderança, coragem e determinação',
      2: 'cooperação, empatia e sensibilidade interpessoal',
      3: 'criatividade, otimismo e habilidades sociais',
      4: 'persistência, organização e confiabilidade',
      5: 'curiosidade, flexibilidade e abertura a experiências',
      6: 'amor, responsabilidade e orientação ao cuidado',
      7: 'sabedoria, reflexão e busca por significado',
      8: 'perseverança, liderança e orientação para resultados',
      9: 'compaixão, justiça e perspectiva ampla',
      11: 'intuição elevada, inspiração e sensibilidade espiritual',
      22: 'visão estratégica, construção e liderança transformacional',
      33: 'compaixão universal, ensino e cura emocional'
    };
    
    return strengths[this.numerologyMap.expressao] || 'múltiplas forças adaptativas';
  }

  private getProcrastinationStrategy(): string {
    const personalYear = this.numerologyMap.anoPessoal;
    
    if ([1, 8].includes(personalYear)) return 'implementação imediata e accountability externo';
    if ([2, 6].includes(personalYear)) return 'parceria e suporte social para execução';
    if ([3, 5].includes(personalYear)) return 'gamificação e variedade nas atividades';
    if ([4, 7].includes(personalYear)) return 'planejamento detalhado e blocos de tempo focado';
    if (personalYear === 9) return 'revisão de prioridades e eliminação de excessos';
    
    return 'técnicas de timeboxing e recompensas graduais';
  }

  private getAnxietyStrategy(): string {
    const motivation = this.numerologyMap.motivacao;
    
    if ([1, 8].includes(motivation)) return 'exercícios de controle e ação direcionada';
    if ([2, 6].includes(motivation)) return 'técnicas de conexão social e apoio mútuo';
    if ([3, 5].includes(motivation)) return 'expressão criativa e atividades dinâmicas';
    if ([4, 7].includes(motivation)) return 'meditação estruturada e journaling reflexivo';
    if (motivation === 9) return 'práticas de compaixão e perspectiva ampliada';
    if ([11, 22, 33].includes(motivation)) return 'mindfulness avançado e técnicas de grounding';
    
    return 'respiração consciente e reestruturação cognitiva';
  }

  private getRelationshipStrategy(): string {
    const expression = this.numerologyMap.expressao;
    const communicationStyle = this.personalityProfile.communicationStyle;
    
    if (communicationStyle === 'direto') {
      return 'comunicação assertiva estruturada e feedback construtivo';
    } else if (communicationStyle === 'empático') {
      return 'escuta ativa e validação emocional antes da solução';
    } else if (communicationStyle === 'analítico') {
      return 'discussões baseadas em dados e análise custo-benefício';
    } else {
      return 'expressão criativa de sentimentos e soluções inovadoras';
    }
  }

  private getDecisionStrategy(): string {
    const { decisionMaking } = this.personalityProfile;
    const destiny = this.numerologyMap.destino;
    
    if (decisionMaking === 'racional') {
      return 'matriz de decisão ponderada com critérios objetivos';
    } else if (decisionMaking === 'intuitivo') {
      return 'técnica do body scanning e consulta à sabedoria interior';
    } else {
      return 'combinação de análise SWOT com período de reflexão intuitiva';
    }
  }
}