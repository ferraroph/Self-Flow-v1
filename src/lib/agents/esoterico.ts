/**
 * Self Flow - Agente Esotérico Especializado
 * 
 * Foco em numerologia cabalística + astrologia + esoterismo
 * Abordagem intuitiva e espiritual para autoconhecimento
 */

import { BaseAgent, AgentType, PersonalityProfile } from './base';
import { NumerologyMap } from '@/lib/numerology/calculator';

export class EsotericoAgent extends BaseAgent {
  getAgentType(): AgentType {
    return 'ESOTERICO';
  }

  generateSystemPrompt(): string {
    const numerologyContext = this.createNumerologyInsights();
    const behavioralContext = this.createBehavioralProfile();
    const patterns = this.identifyNumerologyPatterns();

    return `Você é o clone digital esotérico de ${this.personalityProfile.name}.

Você representa a versão mais clara e espiritualmente conectada desta pessoa, combinando sabedoria numerológica cabalística tradicional com intuição profunda sobre padrões energéticos e propósito de vida.

MAPA NUMEROLÓGICO COMPLETO:
${numerologyContext}

${behavioralContext}

PADRÕES NUMEROLÓGICOS IDENTIFICADOS:
${patterns.map(p => `• ${p}`).join('\n')}

COMO VOCÊ RESPONDE (AGENTE ESOTÉRICO):

🔮 ABORDAGEM ESPIRITUAL:
- Interprete tudo através da lente numerológica cabalística
- Conecte padrões de vida com números pessoais
- Use linguagem que honre tanto a ciência quanto a espiritualidade
- Referencia ciclos naturais, sincronicidades e energia universal

🌟 PERSONALIDADE DO CLONE:
- Fale como ${this.personalityProfile.name} falaria, mas com clareza total sobre padrões espirituais
- Use as mesmas expressões, mas sem filtros emocionais ou medos
- Seja direto sobre bloqueios energéticos e resistências inconscientes
- Ofereça perspectivas que transcendem limitações materiais

🎯 INSIGHTS NUMEROLÓGICOS:
- Sempre conecte situações atuais com números do mapa
- Explique como o Ano Pessoal ${this.numerologyMap.anoPessoal} afeta decisões atuais
- Use Motivação ${this.numerologyMap.motivacao} e Expressão ${this.numerologyMap.expressao} para mostrar potenciais ocultos
- Referencie desafios (${this.numerologyMap.desafioMenor}, ${this.numerologyMap.desafioMaior}) como oportunidades de crescimento

💫 LINGUAGEM ESPECÍFICA:
- "Seu mapa numerológico revela que..."
- "A energia do seu número [X] sugere..."
- "Considerando seu ciclo atual..."
- "Espiritualmente, você está sendo convidado a..."
- "Seus números mostram um padrão de..."

⚡ NUNCA:
- Faça generalizações sem base no mapa pessoal
- Ignore aspectos práticos por ser esotérico
- Use linguagem que desconecte da realidade
- Contradiga informações já estabelecidas sobre a pessoa

🎭 TONE ESPECÍFICO BASEADO NO PERFIL:
Comunicação: ${this.personalityProfile.communicationStyle}
Decisões: ${this.personalityProfile.decisionMaking}  
Abertura Espiritual: ${this.personalityProfile.spiritualOpenness}/5

Adapte seu tom para ser receptivo ao nível de abertura espiritual desta pessoa, mantendo sempre a base numerológica sólida.`;
  }

  adaptResponseToNumerology(baseResponse: string): string {
    // Adiciona contexto numerológico específico às respostas
    const numerologyEnhancements = this.getNumerologyEnhancements();
    
    // Se a resposta não menciona numerologia, adiciona contexto
    if (!baseResponse.toLowerCase().includes('número') && 
        !baseResponse.toLowerCase().includes('numerológico')) {
      return `${baseResponse}\n\n💫 **Insight Numerológico:** ${numerologyEnhancements}`;
    }

    return baseResponse;
  }

  extractSpecializedInsights(conversationHistory: string[]): string[] {
    const insights: string[] = [];
    const { numerologyMap, personalityProfile } = this;

    // Analisa padrões esotéricos na conversa
    conversationHistory.forEach(message => {
      const lowerMessage = message.toLowerCase();
      
      // Insights sobre ciclos
      if (lowerMessage.includes('momento') || lowerMessage.includes('timing')) {
        insights.push(`Momento energético: Você está no Ano Pessoal ${numerologyMap.anoPessoal}, que favorece ${this.getYearEnergyDescription()}`);
      }

      // Insights sobre resistências
      if (lowerMessage.includes('dificuldade') || lowerMessage.includes('bloqueio')) {
        insights.push(`Desafio evolutivo: Seu número ${numerologyMap.desafioMaior} indica que superar ${this.getChallengeDescription()} é parte do seu crescimento`);
      }

      // Insights sobre propósito
      if (lowerMessage.includes('propósito') || lowerMessage.includes('missão')) {
        insights.push(`Propósito numerológico: Seu Destino ${numerologyMap.destino} revela que você veio para ${this.getDestinyDescription()}`);
      }

      // Insights sobre talentos
      if (lowerMessage.includes('talento') || lowerMessage.includes('habilidade')) {
        insights.push(`Talentos naturais: Sua Expressão ${numerologyMap.expressao} mostra dons especiais em ${this.getExpressionTalents()}`);
      }
    });

    return insights;
  }

  private getNumerologyEnhancements(): string {
    const { numerologyMap } = this;
    
    const currentEnergy = `No seu Ano Pessoal ${numerologyMap.anoPessoal}, a energia universal ${this.getYearEnergyDescription()}.`;
    
    const harmonic = numerologyMap.harmonicoSuperior > 10 ? 
      `Seu Harmônico Superior ${numerologyMap.harmonicoSuperior} indica um caminho de maestria espiritual.` :
      `Seu Harmônico Superior ${numerologyMap.harmonicoSuperior} sugere integração prática de talentos.`;

    return `${currentEnergy} ${harmonic}`;
  }

  private getYearEnergyDescription(): string {
    const energies: { [key: number]: string } = {
      1: 'novos começos e iniciativas corajosas',
      2: 'cooperação, parcerias e desenvolvimento da sensibilidade',
      3: 'criatividade, comunicação e expansão social',
      4: 'construção sólida, organização e trabalho consistente',
      5: 'liberdade, aventura e expansão de horizontes',
      6: 'responsabilidade familiar, cura e serviço aos outros',
      7: 'introspecção profunda, espiritualidade e sabedoria interior',
      8: 'conquistas materiais, liderança e reconhecimento',
      9: 'conclusões, transformação e preparação para novo ciclo'
    };
    
    return energies[this.numerologyMap.anoPessoal] || 'crescimento e evolução';
  }

  private getChallengeDescription(): string {
    const challenges: { [key: number]: string } = {
      1: 'desenvolver independência e liderança',
      2: 'aprender cooperação e diplomacia',
      3: 'expressar criatividade sem dispersão',
      4: 'construir com paciência e persistência',
      5: 'equilibrar liberdade com responsabilidade',
      6: 'servir sem se sacrificar completamente',
      7: 'confiar na intuição sem isolamento',
      8: 'liderar com integridade e compaixão',
      9: 'transformar com sabedoria e desapego'
    };
    
    return challenges[this.numerologyMap.desafioMaior] || 'superar limitações pessoais';
  }

  private getDestinyDescription(): string {
    const destinies: { [key: number]: string } = {
      1: 'liderar e iniciar novos caminhos',
      2: 'harmonizar e conectar pessoas',
      3: 'inspirar através da criatividade e comunicação',
      4: 'construir bases sólidas para o futuro',
      5: 'expandir horizontes e trazer inovação',
      6: 'curar e nutrir comunidades',
      7: 'ensinar sabedoria espiritual profunda',
      8: 'organizar e liderar grandes empreendimentos',
      9: 'servir à humanidade com compaixão universal',
      11: 'iluminar caminhos através da intuição espiritual',
      22: 'construir sonhos visionários em realidade',
      33: 'ensinar amor incondicional em grande escala'
    };
    
    return destinies[this.numerologyMap.destino] || 'crescer e evoluir constantemente';
  }

  private getExpressionTalents(): string {
    const talents: { [key: number]: string } = {
      1: 'liderança natural, inovação e pioneirismo',
      2: 'diplomacia, mediação e sensibilidade emocional',
      3: 'comunicação artística, criatividade e carisma',
      4: 'organização, construção e trabalho metódico',
      5: 'comunicação dinâmica, versatilidade e aventura',
      6: 'cura, conselheiro natural e harmonia familiar',
      7: 'pesquisa profunda, análise e sabedoria espiritual',
      8: 'administração, negócios e liderança material',
      9: 'compaixão universal, arte e serviço humanitário',
      11: 'inspiração intuitiva, canalização e iluminação',
      22: 'construção visionária, projetos de grande escala',
      33: 'ensino superior, cura espiritual e amor universal'
    };
    
    return talents[this.numerologyMap.expressao] || 'múltiplas habilidades criativas';
  }
}