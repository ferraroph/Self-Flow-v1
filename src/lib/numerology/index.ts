import { 
  calculateMotivation,
  calculateImpression, 
  calculateExpression,
  calculateDestiny,
  calculateMission,
  calculateBirthDay,
  calculateHiddenTendencies,
  calculateKarmicLessons,
  calculateKarmicDebts,
  calculateIntimateNumber,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay,
  calculateLifeCycles,
  calculateChallenges,
  calculateDecisiveMoments,
  calculateAscensionDegree,
  calculateLoveNumber,
  calculateIntervalRelations
} from './calculations';

import { 
  destinyInterpretations,
  missionInterpretations,
  birthDayInterpretations,
  personalYearInterpretations,
  challengeInterpretations
} from './interpretations';

import { FAVORABLE_COLORS } from './constants';

import { 
  NumerologicalMap, 
  NumerologyReport, 
  NumerologyCalculationOptions,
  PersonalPredictions
} from './types';

import { analyzeNumerologicalCompatibility } from './compatibility';

/**
 * Função principal para gerar mapa numerológico completo
 */
export function generateNumerologicalMap(
  fullName: string,
  birthDate: Date,
  options: NumerologyCalculationOptions = {}
): NumerologicalMap {
  // Cálculos básicos
  const motivation = calculateMotivation(fullName);
  const impression = calculateImpression(fullName);
  const expression = calculateExpression(fullName);
  const destiny = calculateDestiny(birthDate);
  const mission = calculateMission(expression, destiny);
  const birthDay = calculateBirthDay(birthDate);

  // Análises especiais
  const hiddenTendencies = calculateHiddenTendencies(fullName);
  const karmicLessons = calculateKarmicLessons(fullName);
  const karmicDebts = calculateKarmicDebts(birthDate);
  
  // Extrair primeiro nome e último sobrenome
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const intimateNumber = calculateIntimateNumber(firstName, lastName);
  
  const ascensionDegree = calculateAscensionDegree(fullName);
  const intervalRelations = calculateIntervalRelations(fullName);

  // Ciclos e momentos
  const lifeCycles = calculateLifeCycles(birthDate);
  const challenges = calculateChallenges(birthDate);
  const decisiveMoments = calculateDecisiveMoments(birthDate);

  // Previsões para ano atual ou especificado
  const targetYear = options.targetYear || new Date().getFullYear();
  const targetMonth = options.targetMonth || (new Date().getMonth() + 1);
  const targetDay = options.targetDay || new Date().getDate();
  
  const personalYear = calculatePersonalYear(birthDate, targetYear);
  const personalMonth = calculatePersonalMonth(personalYear, targetMonth);
  const personalDay = calculatePersonalDay(personalMonth, targetDay);

  // Números do amor
  const loveNumber = calculateLoveNumber(expression, destiny);

  // Cores favoráveis baseadas no número de expressão
  const favorableColors = [...(FAVORABLE_COLORS[expression as keyof typeof FAVORABLE_COLORS] || FAVORABLE_COLORS[1])];

  // Números favoráveis (implementação básica)
  const favorableNumbers = calculateFavorableNumbers(birthDay, targetMonth);

  // Interpretações (se solicitadas)
  const interpretations = options.includeInterpretations !== false ? {
    destiny: destinyInterpretations[destiny as keyof typeof destinyInterpretations],
    mission: missionInterpretations[mission as keyof typeof missionInterpretations],
    birthDay: birthDayInterpretations[birthDay as keyof typeof birthDayInterpretations],
    personalYear: personalYearInterpretations[personalYear as keyof typeof personalYearInterpretations],
    challenges: [
      challengeInterpretations[challenges.first as keyof typeof challengeInterpretations],
      challengeInterpretations[challenges.second as keyof typeof challengeInterpretations],
      challengeInterpretations[challenges.main as keyof typeof challengeInterpretations]
    ],
    decisiveMoments: [
      { number: decisiveMoments.first.number, period: `${decisiveMoments.first.startYear}-${decisiveMoments.first.endYear}` },
      { number: decisiveMoments.second.number, period: `${decisiveMoments.second.startYear}-${decisiveMoments.second.endYear}` },
      { number: decisiveMoments.third.number, period: `${decisiveMoments.third.startYear}-${decisiveMoments.third.endYear}` },
      { number: decisiveMoments.fourth.number, period: `${decisiveMoments.fourth.startYear}+` }
    ]
  } : {} as any;

  return {
    fullName,
    birthDate,
    motivation,
    impression,
    expression,
    destiny,
    mission,
    birthDay,
    hiddenTendencies,
    karmicLessons,
    karmicDebts,
    intimateNumber,
    ascensionDegree,
    intervalRelations,
    lifeCycles,
    challenges,
    decisiveMoments,
    currentYear: {
      personalYear,
      personalMonth,
      personalDay
    },
    loveNumber,
    favorableColors,
    favorableNumbers,
    interpretations
  };
}

/**
 * Gera relatório numerológico completo formatado
 */
export function generateNumerologyReport(
  fullName: string,
  birthDate: Date,
  options: NumerologyCalculationOptions = {}
): NumerologyReport {
  const map = generateNumerologicalMap(fullName, birthDate, options);
  
  const age = new Date().getFullYear() - birthDate.getFullYear();
  
  const report: NumerologyReport = {
    personalInfo: {
      name: fullName,
      birthDate: birthDate.toLocaleDateString('pt-BR'),
      age
    },
    
    coreNumbers: {
      motivation: { 
        number: map.motivation, 
        interpretation: map.interpretations.destiny // Usar como base
      },
      impression: { 
        number: map.impression, 
        interpretation: map.interpretations.destiny 
      },
      expression: { 
        number: map.expression, 
        interpretation: map.interpretations.destiny 
      },
      destiny: { 
        number: map.destiny, 
        interpretation: map.interpretations.destiny 
      },
      mission: { 
        number: map.mission, 
        interpretation: map.interpretations.mission 
      },
      birthDay: { 
        number: map.birthDay, 
        interpretation: map.interpretations.birthDay 
      }
    },
    
    specialAnalyses: {
      hiddenTendencies: map.hiddenTendencies,
      karmicLessons: map.karmicLessons,
      karmicDebts: map.karmicDebts,
      ascensionDegree: map.ascensionDegree,
      intervalRelations: map.intervalRelations
    },
    
    lifePath: {
      cycles: map.lifeCycles,
      challenges: map.challenges,
      decisiveMoments: map.decisiveMoments
    },
    
    currentPredictions: {
      year: new Date().getFullYear(),
      personalYear: map.currentYear.personalYear,
      personalMonth: map.currentYear.personalMonth,
      personalDay: map.currentYear.personalDay,
      favorableNumbers: map.favorableNumbers,
      monthlyForecast: generateMonthlyForecast(map.currentYear.personalMonth),
      yearlyForecast: map.interpretations.personalYear?.objective || ''
    },
    
    loveAndRelationships: {
      loveNumber: map.loveNumber,
      interpretation: {}, // Adicionar interpretação do love number
      favorableColors: map.favorableColors
    }
  };
  
  // Adicionar análise de compatibilidade se dados do parceiro forem fornecidos
  if (options.partnerData) {
    const compatibilityData = analyzeNumerologicalCompatibility(
      { fullName, birthDate },
      options.partnerData
    );
    
    report.compatibility = {
      person1: {
        name: fullName,
        loveNumber: compatibilityData.person1.loveNumber,
        expression: compatibilityData.person1.expression,
        destiny: compatibilityData.person1.destiny
      },
      person2: {
        name: options.partnerData.fullName,
        loveNumber: compatibilityData.person2.loveNumber,
        expression: compatibilityData.person2.expression,
        destiny: compatibilityData.person2.destiny
      },
      compatibility: {
        type: compatibilityData.compatibility.love.type,
        description: compatibilityData.compatibility.love.description,
        compatibilityLevel: compatibilityData.compatibility.love.compatibilityLevel,
        score: compatibilityData.compatibility.overallScore
      },
      recommendations: generateCompatibilityRecommendations(compatibilityData.compatibility.love.type)
    };
  }
  
  return report;
}

/**
 * Calcula números favoráveis para o mês (implementação básica)
 */
function calculateFavorableNumbers(birthDay: number, month: number): number[] {
  // Implementação simplificada - usar a redução do dia de nascimento
  const base = birthDay > 9 ? birthDay % 9 || 9 : birthDay;
  const favorableNumbers: number[] = [base];
  
  // Adicionar múltiplos até 31
  for (let i = 2; i <= 5; i++) {
    const next = (base * i) % 31 || 31;
    if (next <= 31 && !favorableNumbers.includes(next)) {
      favorableNumbers.push(next);
    }
  }
  
  return favorableNumbers.sort((a, b) => a - b);
}

/**
 * Gera recomendações baseadas no tipo de compatibilidade
 */
function generateCompatibilityRecommendations(type: string): string[] {
  const recommendations: { [key: string]: string[] } = {
    'vibrates': [
      'Canalizem a paixão intensa para fortalecer o amor',
      'Evitem ciúmes exagerados e possessividade',
      'Usem a atração sexual como base para construir intimidade emocional'
    ],
    'attracts': [
      'Cultivem a harmonia natural entre vocês',
      'Mantenham a amabilidade e compreensão mútua',
      'Este é um relacionamento com grande potencial de sucesso'
    ],
    'opposite': [
      'Usem a diplomacia constantemente',
      'Ambos devem ceder em muitos pontos',
      'Nunca tentem adaptar o outro aos próprios ideais',
      'Desenvolvam paciência e tolerância'
    ],
    'passive': [
      'Trabalhem para transformar amizade em amor',
      'Um dos parceiros pode precisar ser mais expressivo',
      'Cultivem interesses românticos ativamente'
    ],
    'same': [
      'Alimentem a relação com novidade constante',
      'Evitem que o relacionamento se torne monótono',
      'Usem a imaginação para manter o interesse'
    ]
  };
  
  return recommendations[type] || ['Desenvolvam comunicação aberta e honesta'];
}

/**
 * Gera previsão mensal básica
 */
function generateMonthlyForecast(personalMonth: number): string {
  const monthlyForecasts: { [key: number]: string } = {
    1: "Mês dos pioneiros, das pessoas influentes, dos inventores e dos planejadores. Excelente para negócios e especulações.",
    2: "Mês passivo e receptivo. Mantenha-se calmo, gentil, bondoso e organizado. Evite iniciar novos projetos.",
    3: "Mês dos extrovertidos, das pessoas criativas. Bom período para fazer novos amigos, discutir e planejar.",
    4: "Mês dos realistas e equilibrados. Mantenha a justiça a todo custo e seja organizado, prático e racional.",
    5: "Mês movimentado e impaciente. Excelente período para conhecer pessoas e tentar novos projetos.",
    6: "Período para manter-se calmo, sereno e equilibrado. Mantenha a rotina e permaneça em casa.",
    7: "Mês de introspecção. Mantenha-se isolado, contemplativo e discreto. Evite decisões importantes.",
    8: "Mês dos empresários e políticos. Excelente para negócios que envolvem muito dinheiro.",
    9: "Mês da espiritualidade e intelectualidade. Canalize objetivos para a humanidade como um todo."
  };
  
  return monthlyForecasts[personalMonth] || "Período de transição e preparação.";
}

/**
 * Função para análise rápida de compatibilidade
 */
export function quickCompatibilityCheck(
  person1Name: string,
  person1BirthDate: Date,
  person2Name: string,
  person2BirthDate: Date
) {
  return analyzeNumerologicalCompatibility(
    { fullName: person1Name, birthDate: person1BirthDate },
    { fullName: person2Name, birthDate: person2BirthDate }
  );
}

/**
 * Exporta todas as funções de cálculo para uso individual
 */
export * from './calculations';
export * from './interpretations';
export * from './compatibility';
export * from './constants';
export * from './types';