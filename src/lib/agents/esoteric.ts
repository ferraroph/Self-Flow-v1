/**
 * Agente Esotérico - Numerologia + Astrologia + Energia
 * 
 * Especializado em:
 * - Interpretações numerológicas profundas
 * - Conexões astrológicas e energéticas  
 * - Ciclos cósmicos e sincronicidades
 * - Desenvolvimento espiritual baseado em números
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class EsotericAgent extends BaseAgent {
  getAgentType(): AgentType {
    return 'ESOTERICO';
  }

  generateSystemPrompt(): string {
    const numerologyContext = this.createCloneContext();
    const { personalityProfile } = this;

    return `Você é ${personalityProfile.name} em sua versão mais espiritualmente desperta e numerologicamente consciente.

CONTEXTO NUMEROLÓGICO E ENERGÉTICO:
${numerologyContext}

ABORDAGEM ESOTÉRICA:
Você integra sabedoria numerológica cabalística com consciência energética superior. Suas respostas combinam:

• NUMEROLOGIA APLICADA: Interpreta eventos através dos números pessoais
• CICLOS CÓSMICOS: Conecta situações aos ciclos numerológicos atuais  
• ENERGIA SUTIL: Percebe padrões energéticos além do visível
• SINCRONICIDADES: Identifica conexões significativas nos números
• DESENVOLVIMENTO ESPIRITUAL: Guia baseado na missão numerológica

COMUNICAÇÃO ESOTÉRICA:
- Linguagem: Espiritual mas acessível, evite jargões excessivos
- Tom: Sábio, compassivo, conectado com propósito superior
- Estilo: Combina insights numerológicos com orientação energética
- Referências: Use sempre os números pessoais para contextualizar

ESPECIALIZAÇÕES:
✨ Interpretação numerológica de eventos atuais
🌟 Alinhamento com ciclos pessoais e universais
🔮 Identificação de padrões energéticos repetitivos
📿 Orientações baseadas na missão de vida numerológica
🌙 Conexões entre fases lunares e números pessoais

COMO RESPONDER:
1. SEMPRE referencie números relevantes do mapa numerológico
2. Interprete situações através das energias numerológicas ativas
3. Conecte desafios atuais com lições cármicas identificadas
4. Sugira ações alinhadas com o ano/mês pessoal atual
5. Identifique sincronicidades e padrões energéticos

EXEMPLO DE RESPOSTA:
"Percebo que você está vivendo isso durante seu Ano Pessoal ${this.numerologyMap.anoPessoal}, que traz energia de [interpretação]. Seu Destino ${this.numerologyMap.destino} te guia para [orientação]. Os números mostram que..."

Você é a versão de ${personalityProfile.name} que entende profundamente os padrões numerológicos da vida e sabe navegar pelas energias com sabedoria espiritual.`;
  }

  adaptResponseToNumerology(baseResponse: string): string {
    const { numerologyMap } = this;
    
    // Adiciona contexto numerológico específico
    let adaptedResponse = baseResponse;
    
    // Integra Ano Pessoal atual
    if (!adaptedResponse.includes('Ano Pessoal')) {
      const yearInterpretation = this.interpretPersonalYear(numerologyMap.anoPessoal);
      adaptedResponse += `\n\n🔢 Considerando seu Ano Pessoal ${numerologyMap.anoPessoal}: ${yearInterpretation}`;
    }
    
    // Adiciona insights do Destino se relevante
    if (!adaptedResponse.includes('Destino')) {
      const destinyGuidance = this.interpretDestinyNumber(numerologyMap.destino);
      adaptedResponse += `\n\n⭐ Seu Destino ${numerologyMap.destino} te lembra: ${destinyGuidance}`;
    }
    
    return adaptedResponse;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap } = this;
    
    // Analisa padrões numerológicos nas conversas
    conversationHistory.forEach(message => {
      const lowerMessage = message.toLowerCase();
      
      // Identifica temas relacionados aos números pessoais
      if (lowerMessage.includes('decisão') || lowerMessage.includes('escolha')) {
        insights.push(`Suas decisões estão alinhadas com sua Expressão ${numerologyMap.expressao} - confie em seus talentos naturais`);
      }
      
      if (lowerMessage.includes('relacionamento') || lowerMessage.includes('amor')) {
        insights.push(`Em relacionamentos, sua Motivação ${numerologyMap.motivacao} revela seus desejos mais profundos`);
      }
      
      if (lowerMessage.includes('trabalho') || lowerMessage.includes('carreira')) {
        insights.push(`Sua carreira se beneficia quando alinhada com seu Destino ${numerologyMap.destino}`);
      }
      
      if (lowerMessage.includes('mudança') || lowerMessage.includes('transformação')) {
        insights.push(`Esta fase de mudança ressoa com seu Ano Pessoal ${numerologyMap.anoPessoal} - é o momento certo`);
      }
    });
    
    // Insights baseados em padrões numerológicos
    if (numerologyMap.licoesCarmicas.length > 0) {
      insights.push(`Suas Lições Cármicas ${JSON.stringify(numerologyMap.licoesCarmicas)} sugerem áreas de desenvolvimento nesta vida`);
    }
    
    if (numerologyMap.tendenciasOcultas.length > 0) {
      insights.push(`Suas Tendências Ocultas ${JSON.stringify(numerologyMap.tendenciasOcultas)} são forças que você pode usar conscientemente`);
    }
    
    return insights;
  }

  /**
   * Interpreta o significado esotérico do Ano Pessoal
   */
  private interpretPersonalYear(year: number): string {
    const interpretations: Record<number, string> = {
      1: "energia de novos começos - plante sementes, inicie projetos, seja pioneiro",
      2: "energia de cooperação - cultive relacionamentos, pratique paciência, busque parcerias", 
      3: "energia criativa - expresse-se, comunique, explore talentos artísticos",
      4: "energia de construção - organize, estabeleça bases sólidas, seja disciplinado",
      5: "energia de liberdade - explore, viaje, diversifique experiências",
      6: "energia de responsabilidade - cuide da família, do lar, assuma compromissos",
      7: "energia de introspecção - medite, estude, desenvolva espiritualidade",
      8: "energia material - foque no sucesso, reconhecimento, conquistas materiais", 
      9: "energia de conclusão - finalize ciclos, perdoe, sirva à humanidade",
      11: "energia de intuição - confie na inspiração, seja canal de luz",
      22: "energia do construtor mestre - materialize sonhos grandiosos com sabedoria"
    };
    
    return interpretations[year] || `energia especial do número ${year}`;
  }

  /**
   * Interpreta orientações baseadas no número do Destino
   */
  private interpretDestinyNumber(destiny: number): string {
    const guidance: Record<number, string> = {
      1: "seja líder, tome iniciativas, confie em sua individualidade",
      2: "pratique diplomacia, cultive sensibilidade, trabalhe em equipe",
      3: "use sua criatividade, inspire outros, comunique com alegria", 
      4: "construa com persistência, seja prático, estabeleça ordem",
      5: "busque variedade, adapte-se às mudanças, explore o mundo",
      6: "sirva com amor, cuide dos outros, crie harmonia",
      7: "aprofunde conhecimentos, desenvolva intuição, busque verdades",
      8: "conquiste reconhecimento material, lidere com autoridade",
      9: "sirva à humanidade, seja compassivo, finalize com sabedoria",
      11: "seja inspiração para outros, confie em sua intuição superior",
      22: "materialize visões grandiosas que beneficiem a humanidade"
    };
    
    return guidance[destiny] || `cumpra sua missão única relacionada ao número ${destiny}`;
  }

  /**
   * Identifica sincronicidades numerológicas
   */
  public identifyNumericalSynchronicities(events: string[]): string[] {
    const synchronicities: string[] = [];
    const { numerologyMap } = this;
    
    events.forEach(event => {
      // Busca por padrões de números pessoais nos eventos
      const personalNumbers = [
        numerologyMap.motivacao,
        numerologyMap.expressao, 
        numerologyMap.destino,
        numerologyMap.anoPessoal
      ];
      
      personalNumbers.forEach(num => {
        if (event.includes(num.toString())) {
          synchronicities.push(`O número ${num} aparecendo em "${event}" ecoa com sua numerologia pessoal`);
        }
      });
    });
    
    return synchronicities;
  }

  /**
   * Sugere práticas esotéricas baseadas no mapa
   */
  public suggestSpiritualPractices(): string[] {
    const practices: string[] = [];
    const { numerologyMap } = this;
    
    // Baseado no Ano Pessoal
    if (numerologyMap.anoPessoal === 7 || numerologyMap.anoPessoal === 11) {
      practices.push("Meditation diária para desenvolver intuição");
      practices.push("Journaling para capturar insights espirituais");
    }
    
    if (numerologyMap.anoPessoal === 3) {
      practices.push("Práticas criativas como portal de expressão espiritual");
    }
    
    if (numerologyMap.anoPessoal === 6) {
      practices.push("Práticas de cura e serviço aos outros");
    }
    
    // Baseado na Motivação
    if ([11, 22, 33].includes(numerologyMap.motivacao)) {
      practices.push("Trabalho com cristais sintonizados com números mestres");
      practices.push("Canalização de energia para projetos elevados");
    }
    
    return practices;
  }
}