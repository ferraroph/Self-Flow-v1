/**
 * Agente Psicológico - TCC + Neurociência + Análise Comportamental
 * 
 * Especializado em:
 * - Terapia Cognitivo-Comportamental aplicada
 * - Padrões comportamentais baseados em numerologia
 * - Neuroplasticidade e mudança de hábitos
 * - Desenvolvimento de inteligência emocional
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class PsychologicalAgent extends BaseAgent {
  getAgentType(): AgentType {
    return 'PSICOLOGICO';
  }

  generateSystemPrompt(): string {
    const numerologyContext = this.createCloneContext();
    const { personalityProfile } = this;

    return `Você é ${personalityProfile.name} em sua versão mais psicologicamente consciente e emocionalmente inteligente.

CONTEXTO NUMEROLÓGICO E COMPORTAMENTAL:
${numerologyContext}

ABORDAGEM PSICOLÓGICA BASEADA EM EVIDÊNCIAS:
Você integra insights numerológicos com ciência comportamental moderna. Suas respostas combinam:

• TCC APLICADA: Identifica padrões de pensamento usando numerologia como framework
• NEUROCIÊNCIA: Explica como padrões numerológicos refletem estruturas neurais
• ANÁLISE COMPORTAMENTAL: Mapeia comportamentos através dos números pessoais
• INTELIGÊNCIA EMOCIONAL: Desenvolve autorregulação baseada em insights numerológicos  
• MUDANÇA DE HÁBITOS: Usa ciclos numerológicos para otimizar transformações

COMUNICAÇÃO CIENTÍFICA E EMPÁTICA:
- Linguagem: Científica mas acessível, baseada em evidências
- Tom: Empático, analítico, focado em soluções práticas
- Estilo: Combina dados numerológicos com estratégias comportamentais
- Referências: Sempre conecta números a padrões comportamentais observáveis

ESPECIALIZAÇÕES:
🧠 Mapeamento de padrões cognitivos através da numerologia
📊 Análise comportamental baseada em números pessoais
🎯 Estratégias de mudança alinhadas com ciclos numerológicos
💡 Desenvolvimento de metacognição usando insights numerológicos
🔄 Reestruturação cognitiva através de compreensão numerológica

FRAMEWORK TCC-NUMEROLÓGICO:
1. SITUAÇÃO → Como os números pessoais influenciam a percepção
2. PENSAMENTOS → Padrões cognitivos revelados pela numerologia  
3. EMOÇÕES → Reações emocionais típicas do perfil numerológico
4. COMPORTAMENTOS → Ações alinhadas ou desalinhadas com os números
5. CONSEQUÊNCIAS → Resultados quando age em harmonia numerológica

COMO RESPONDER:
1. Identifique padrões comportamentais através dos números pessoais
2. Explique a ciência por trás dos insights numerológicos
3. Proponha intervenções baseadas em evidências + numerologia
4. Use o ciclo pessoal atual para timing das mudanças
5. Desenvolva estratégias práticas de autorregulação

EXEMPLO DE RESPOSTA:
"Analisando seu padrão, vejo que sua Motivação ${this.numerologyMap.motivacao} indica [comportamento típico]. A neurociência mostra que [explicação]. Durante seu Ano Pessoal ${this.numerologyMap.anoPessoal}, você pode..."

Você é a versão de ${personalityProfile.name} que entende profundamente seus padrões psicológicos e sabe como usar a numerologia como ferramenta de autodesenvolvimento científico.`;
  }

  adaptResponseToNumerology(baseResponse: string): string {
    const { numerologyMap } = this;
    
    let adaptedResponse = baseResponse;
    
    // Adiciona análise comportamental baseada nos números
    const behavioralInsight = this.analyzeBehavioralPattern();
    if (behavioralInsight) {
      adaptedResponse += `\n\n🧠 Análise Comportamental: ${behavioralInsight}`;
    }
    
    // Conecta com estratégias de mudança baseadas no ciclo atual
    const changeStrategy = this.suggestChangeStrategy(numerologyMap.anoPessoal);
    adaptedResponse += `\n\n📈 Estratégia de Mudança (Ano Pessoal ${numerologyMap.anoPessoal}): ${changeStrategy}`;
    
    return adaptedResponse;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap } = this;
    
    // Analisa padrões cognitivos nas conversas
    conversationHistory.forEach(message => {
      const lowerMessage = message.toLowerCase();
      
      // Identifica distorções cognitivas
      if (lowerMessage.includes('sempre') || lowerMessage.includes('nunca')) {
        insights.push('Padrão de pensamento dicotômico detectado - sua Expressão sugere mais flexibilidade');
      }
      
      if (lowerMessage.includes('deveria') || lowerMessage.includes('preciso')) {
        insights.push('Padrão de autocobrança excessiva - revise expectativas baseadas em seu Destino');
      }
      
      if (lowerMessage.includes('não consigo') || lowerMessage.includes('impossível')) {
        insights.push('Padrão de desamparo - seus números mostram capacidades não exploradas');
      }
      
      // Identifica padrões emocionais
      if (lowerMessage.includes('ansioso') || lowerMessage.includes('preocupado')) {
        insights.push(`Ansiedade pode estar relacionada ao desalinhamento com seu Ano Pessoal ${numerologyMap.anoPessoal}`);
      }
      
      if (lowerMessage.includes('frustrado') || lowerMessage.includes('irritado')) {
        insights.push('Frustração pode indicar resistência aos desafios numerológicos atuais');
      }
    });
    
    // Insights baseados em padrões numerológicos vs comportamentais
    if (numerologyMap.desafioMaior > 7) {
      insights.push('Desafio Maior elevado sugere necessidade de desenvolver resiliência emocional');
    }
    
    if (numerologyMap.motivacao !== numerologyMap.expressao) {
      insights.push('Dissonância entre motivação interna e expressão externa pode gerar conflito identitário');
    }
    
    return insights;
  }

  /**
   * Analisa padrões comportamentais baseados nos números centrais
   */
  private analyzeBehavioralPattern(): string {
    const { numerologyMap, personalityProfile } = this;
    
    // Análise Motivação vs Expressão
    const motivationExpression = numerologyMap.motivacao - numerologyMap.expressao;
    
    if (Math.abs(motivationExpression) > 5) {
      return `Há tensão significativa entre seus desejos internos (${numerologyMap.motivacao}) e expressão externa (${numerologyMap.expressao}). Isso pode gerar ansiedade de autenticidade.`;
    }
    
    if (numerologyMap.motivacao === numerologyMap.expressao) {
      return `Seus desejos internos e expressão externa estão alinhados (${numerologyMap.motivacao}). Isso favorece autenticidade e bem-estar psicológico.`;
    }
    
    // Análise Destino vs Comportamento atual
    if (personalityProfile.currentSituation.toLowerCase().includes('perdido') && numerologyMap.destino > 0) {
      return `Seu Destino ${numerologyMap.destino} oferece direcionamento claro. A sensação de estar perdido pode indicar desconexão temporária com seu propósito numerológico.`;
    }
    
    return `Seus padrões comportamentais refletem a interação complexa entre Motivação ${numerologyMap.motivacao}, Expressão ${numerologyMap.expressao} e Destino ${numerologyMap.destino}.`;
  }

  /**
   * Sugere estratégias de mudança baseadas no Ano Pessoal
   */
  private suggestChangeStrategy(personalYear: number): string {
    const strategies: Record<number, string> = {
      1: "Momento ideal para iniciar novos hábitos. Neuroplasticidade favorecida para mudanças pioneiras. Use técnicas de implementação de intenções.",
      2: "Foque em mudanças colaborativas. Busque accountability partners. Desenvolva hábitos relacionais e de cooperação.",
      3: "Use criatividade para mudança. Gamifique processos de transformação. Expresse mudanças através de arte ou comunicação.",
      4: "Construa mudanças estruturadas. Use sistemas organizacionais. Implemente rotinas consistentes com progressão gradual.",
      5: "Varie estratégias de mudança. Experimente diferentes abordagens. Mantenha flexibilidade no processo de transformação.",
      6: "Conecte mudanças ao bem-estar familiar/comunitário. Use motivação altruísta para sustentar transformações pessoais.",
      7: "Período ideal para mudanças internas profundas. Use mindfulness, autorreflexão e práticas contemplativas.",
      8: "Foque em mudanças que ampliem reconhecimento e sucesso. Use métricas objetivas para acompanhar progresso.",
      9: "Momento de finalizar ciclos antigos. Use técnicas de perdão, gratidão e liberação para facilitar transformações.",
      11: "Confie na intuição para guiar mudanças. Use práticas de conexão com sabedoria interior.",
      22: "Implemente mudanças sistêmicas de grande escala. Pense em impacto duradouro e construção de legado."
    };
    
    return strategies[personalYear] || `Use abordagens experimentais adequadas à energia única do número ${personalYear}`;
  }

  /**
   * Identifica vieses cognitivos baseados no perfil numerológico
   */
  public identifyCognitiveBiases(): string[] {
    const biases: string[] = [];
    const { numerologyMap, personalityProfile } = this;
    
    // Viés baseado na Motivação
    if (numerologyMap.motivacao === 1) {
      biases.push("Viés de confirmação para ideias próprias (Motivação 1 - independência)");
    } else if (numerologyMap.motivacao === 2) {
      biases.push("Viés de aprovação social excessiva (Motivação 2 - cooperação)");
    } else if (numerologyMap.motivacao === 8) {
      biases.push("Viés de otimismo quanto ao controle (Motivação 8 - poder)");
    }
    
    // Viés baseado na Expressão
    if (numerologyMap.expressao === 3) {
      biases.push("Viés de disponibilidade - lembra mais facilmente informações expressivas");
    } else if (numerologyMap.expressao === 7) {
      biases.push("Viés de ancoragem em análises iniciais");
    }
    
    // Viés baseado no padrão de tomada de decisão
    if (personalityProfile.decisionMaking === 'intuitivo') {
      biases.push("Viés da intuição - pode subestimar análise racional quando necessária");
    } else if (personalityProfile.decisionMaking === 'racional') {
      biases.push("Viés da racionalização - pode ignorar inputs emocionais válidos");
    }
    
    return biases;
  }

  /**
   * Desenvolve estratégias de regulação emocional numerológica
   */
  public developEmotionalRegulation(): { trigger: string; strategy: string }[] {
    const { numerologyMap } = this;
    const strategies: { trigger: string; strategy: string }[] = [];
    
    // Estratégias baseadas nos Desafios
    strategies.push({
      trigger: `Situações relacionadas ao Desafio Menor (${numerologyMap.desafioMenor})`,
      strategy: "Respire profundamente, lembre que este é um padrão conhecido. Use sua Expressão como recurso."
    });
    
    strategies.push({
      trigger: `Situações relacionadas ao Desafio Maior (${numerologyMap.desafioMaior})`,
      strategy: "Pause, reconheça o gatilho cármico. Conecte-se com seu Destino para perspectiva maior."
    });
    
    // Estratégias baseadas na Motivação
    if (numerologyMap.motivacao <= 3) {
      strategies.push({
        trigger: "Sentimentos de inadequação ou insegurança",
        strategy: `Ative sua Motivação ${numerologyMap.motivacao} - você tem recursos internos específicos para esta situação.`
      });
    }
    
    return strategies;
  }

  /**
   * Cria plano de desenvolvimento de hábitos numerológicamente alinhado
   */
  public createHabitDevelopmentPlan(): { area: string; habit: string; timing: string }[] {
    const { numerologyMap } = this;
    const plan: { area: string; habit: string; timing: string }[] = [];
    
    // Hábitos baseados no Ano Pessoal
    const yearBasedHabits = {
      1: { area: "Liderança", habit: "Tome uma micro-decisão autônoma diariamente" },
      2: { area: "Relacionamentos", habit: "Pratique escuta ativa por 10 minutos diários" },
      3: { area: "Criatividade", habit: "Dedique 15 minutos diários à expressão criativa" },
      7: { area: "Autoconhecimento", habit: "Pratique 10 minutos de autorreflexão diária" },
      8: { area: "Conquistas", habit: "Defina e revise metas materiais semanalmente" },
      9: { area: "Serviço", habit: "Execute uma ação altruísta diária" }
    };
    
    const yearHabit = yearBasedHabits[numerologyMap.anoPessoal as keyof typeof yearBasedHabits];
    if (yearHabit) {
      plan.push({
        area: yearHabit.area,
        habit: yearHabit.habit,
        timing: `Otimizado para Ano Pessoal ${numerologyMap.anoPessoal}`
      });
    }
    
    return plan;
  }
}