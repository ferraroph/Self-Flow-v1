/**
 * Agente Híbrido - Integração Esotérica + Psicológica
 * 
 * Especializado em:
 * - Síntese entre sabedoria esotérica e ciência comportamental
 * - Abordagem holística integrando múltiplas dimensões
 * - Ponte entre insight espiritual e aplicação prática
 * - Desenvolvimento integral da personalidade
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { EsotericAgent } from './esoteric';
import { PsychologicalAgent } from './psychological';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class HybridAgent extends BaseAgent {
  private esotericAgent: EsotericAgent;
  private psychologicalAgent: PsychologicalAgent;

  constructor(numerologyMap: NumerologyMap, personalityProfile: PersonalityProfile) {
    super(numerologyMap, personalityProfile);
    this.esotericAgent = new EsotericAgent(numerologyMap, personalityProfile);
    this.psychologicalAgent = new PsychologicalAgent(numerologyMap, personalityProfile);
  }

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
    // Combina adaptações dos dois agentes especializados
    const esotericAdaptation = this.esotericAgent.adaptResponseToNumerology(baseResponse);
    const psychologicalAdaptation = this.psychologicalAgent.adaptResponseToNumerology(baseResponse);
    
    // Cria síntese única que integra ambas as perspectivas
    const integrationInsight = this.createIntegrativeInsight();
    
    return `${baseResponse}

🌟🧠 Perspectiva Integral: ${integrationInsight}

💫 Dimensão Energética: ${this.extractEsotericEssence(esotericAdaptation)}

🧪 Dimensão Científica: ${this.extractScientificEssence(psychologicalAdaptation)}`;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    // Combina insights dos dois agentes especializados
    const esotericInsights = this.esotericAgent.extractSpecializedInsights(conversationHistory);
    const psychologicalInsights = this.psychologicalAgent.extractSpecializedInsights(conversationHistory);
    
    // Adiciona insights integrativos únicos
    const integrativeInsights = this.generateIntegrativeInsights(conversationHistory);
    
    return [...esotericInsights, ...psychologicalInsights, ...integrativeInsights];
  }

  /**
   * Cria insight que integra perspectivas esotéricas e científicas
   */
  private createIntegrativeInsight(): string {
    const { numerologyMap, personalityProfile } = this;
    
    // Identifica convergências entre abordagens
    const spiritualOpening = personalityProfile.spiritualOpenness;
    const psychologicalInterest = personalityProfile.psychologicalInterest;
    
    if (spiritualOpening >= 4 && psychologicalInterest >= 4) {
      return `Sua abertura tanto espiritual (${spiritualOpening}/5) quanto científica (${psychologicalInterest}/5) cria terreno fértil para crescimento integral. Seu Destino ${numerologyMap.destino} se manifesta melhor quando você honra ambas as dimensões.`;
    }
    
    if (Math.abs(spiritualOpening - psychologicalInterest) > 2) {
      const dominant = spiritualOpening > psychologicalInterest ? 'espiritual' : 'científica';
      const secondary = spiritualOpening > psychologicalInterest ? 'científica' : 'espiritual';
      return `Você tem preferência pela abordagem ${dominant}, mas integrar mais da perspectiva ${secondary} potencializaria seu desenvolvimento baseado em seu perfil numerológico.`;
    }
    
    return `Seu perfil sugere capacidade natural para síntese entre sabedoria antiga e conhecimento moderno, especialmente considerando seu Harmônico Superior ${numerologyMap.harmonicoSuperior}.`;
  }

  /**
   * Extrai essência esotérica de uma resposta
   */
  private extractEsotericEssence(response: string): string {
    // Identifica elementos esotéricos na resposta e os destila
    const esotericKeywords = ['energia', 'ciclo', 'sincronicidade', 'propósito', 'missão'];
    const lines = response.split('\n').filter(line => 
      esotericKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );
    
    return lines[0] || "Os números revelam padrões energéticos únicos em sua situação atual.";
  }

  /**
   * Extrai essência científica de uma resposta
   */
  private extractScientificEssence(response: string): string {
    // Identifica elementos científicos na resposta e os destila
    const scientificKeywords = ['padrão', 'comportamental', 'neurológico', 'estratégia', 'evidência'];
    const lines = response.split('\n').filter(line => 
      scientificKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );
    
    return lines[0] || "Padrões comportamentais indicam oportunidades específicas de desenvolvimento.";
  }

  /**
   * Gera insights que só emergem da integração de ambas as abordagens
   */
  private generateIntegrativeInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap } = this;
    
    // Insight sobre integração de polaridades
    if (numerologyMap.motivacao !== numerologyMap.impressao) {
      insights.push(`A diferença entre sua Motivação interna (${numerologyMap.motivacao}) e Impressão externa (${numerologyMap.impressao}) representa uma polaridade criativa - tanto energeticamente quanto psicologicamente - que pode ser fonte de crescimento integral.`);
    }
    
    // Insight sobre timing cósmico e neuroplasticidade
    if (numerologyMap.anoPessoal === 1 || numerologyMap.anoPessoal === 8) {
      insights.push(`Seu Ano Pessoal ${numerologyMap.anoPessoal} cria alinhamento entre timing cósmico favorável e janelas de neuroplasticidade otimizadas - momento ideal para mudanças profundas.`);
    }
    
    // Insight sobre padrões cármicos e condicionamentos
    if (numerologyMap.licoesCarmicas.length > 0) {
      insights.push(`Suas Lições Cármicas ${JSON.stringify(numerologyMap.licoesCarmicas)} correspondem tanto a contratos de alma quanto a lacunas no desenvolvimento de habilidades específicas - abordagem integral acelera o progresso.`);
    }
    
    // Insight sobre sincronicidade e padrões cognitivos
    conversationHistory.forEach(message => {
      if (message.toLowerCase().includes('coincidência') || message.toLowerCase().includes('acaso')) {
        insights.push('O que você chama de coincidência pode ser tanto sincronicidade numerológica quanto viés de confirmação - ambas as lentes oferecem crescimento quando integradas.');
      }
    });
    
    return insights;
  }

  /**
   * Desenvolve práticas que integram desenvolvimento espiritual e psicológico
   */
  public developIntegrativePractices(): { practice: string; spiritual: string; psychological: string }[] {
    const { numerologyMap } = this;
    const practices: { practice: string; spiritual: string; psychological: string }[] = [];
    
    // Prática baseada no Ano Pessoal
    const yearPractices = {
      1: {
        practice: "Meditação de Intenção Consciente",
        spiritual: "Conecta com energia de novos começos cósmicos",
        psychological: "Ativa neuroplasticidade para formação de novos padrões"
      },
      3: {
        practice: "Journaling Criativo Estruturado", 
        spiritual: "Canaliza energia expressiva superior",
        psychological: "Desenvolve autoconsciência através da expressão"
      },
      7: {
        practice: "Contemplação Analítica",
        spiritual: "Aprofunda conexão com sabedoria interior",
        psychological: "Fortalece capacidade de meta-cognição"
      },
      9: {
        practice: "Ritual de Gratidão e Liberação",
        spiritual: "Honra ciclos de completude energética", 
        psychological: "Facilita processamento emocional de transições"
      }
    };
    
    const yearPractice = yearPractices[numerologyMap.anoPessoal as keyof typeof yearPractices];
    if (yearPractice) {
      practices.push(yearPractice);
    }
    
    return practices;
  }

  /**
   * Cria ponte entre linguagem esotérica e científica
   */
  public translateConcepts(concept: string, fromEsoteric: boolean): string {
    const translations: Record<string, string> = {
      // Esotérico → Científico
      'energia': 'padrão comportamental/emocional',
      'vibração': 'frequência de pensamentos/emoções',
      'karma': 'condicionamento comportamental',
      'sincronicidade': 'atenção seletiva + viés de confirmação',
      'intuição': 'processamento inconsciente de informações',
      'chakra': 'centro de regulação emocional/energética',
      
      // Científico → Esotérico  
      'neuroplasticidade': 'capacidade de transformação energética',
      'viés cognitivo': 'padrão de percepção condicionado',
      'regulação emocional': 'harmonização energética',
      'metacognição': 'consciência expandida',
      'condicionamento': 'padrão cármico',
      'dopamina': 'energia de motivação e recompensa'
    };
    
    const lowerConcept = concept.toLowerCase();
    
    if (fromEsoteric) {
      return translations[lowerConcept] || `expressão científica de ${concept}`;
    } else {
      const esotericKey = Object.keys(translations).find(key => 
        translations[key] === lowerConcept
      );
      return esotericKey || `dimensão esotérica de ${concept}`;
    }
  }

  /**
   * Avalia nível de integração atual do usuário
   */
  public assessIntegrationLevel(): { level: number; description: string; nextSteps: string[] } {
    const { personalityProfile } = this;
    
    const spiritualScore = personalityProfile.spiritualOpenness;
    const psychologicalScore = personalityProfile.psychologicalInterest;
    const reflectionScore = personalityProfile.selfReflectionLevel;
    
    const averageScore = (spiritualScore + psychologicalScore + reflectionScore) / 3;
    const integrationBalance = 5 - Math.abs(spiritualScore - psychologicalScore);
    
    const level = Math.round((averageScore + integrationBalance) / 2);
    
    const descriptions = {
      1: "Iniciante na jornada integral",
      2: "Desenvolvendo consciência das múltiplas dimensões", 
      3: "Experimentando integração entre abordagens",
      4: "Praticante experiente de desenvolvimento integral",
      5: "Mestre na síntese espiritual-científica"
    };
    
    const nextStepsMap = {
      1: ["Explore uma das abordagens mais profundamente", "Desenvolva curiosidade sobre a dimensão menos familiar"],
      2: ["Pratique traduzir conceitos entre linguagens", "Busque exemplos de integração bem-sucedida"],
      3: ["Desenvolva práticas que honrem ambas as dimensões", "Experimente sínteses próprias"],
      4: ["Compartilhe insights integrativos com outros", "Refine sua abordagem pessoal única"],
      5: ["Ensine outros sobre integração", "Explore fronteiras entre espiritualidade e ciência"]
    };
    
    return {
      level,
      description: descriptions[level as keyof typeof descriptions],
      nextSteps: nextStepsMap[level as keyof typeof nextStepsMap]
    };
  }
}