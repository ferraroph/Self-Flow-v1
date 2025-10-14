// Tipos e interfaces para o sistema completo de numerologia cabalística

export interface NumerologicalMap {
  // Informações básicas
  fullName: string;
  birthDate: Date;
  
  // Números principais
  motivation: number; // Soma das vogais
  impression: number; // Soma das consoantes  
  expression: number; // Soma total do nome
  destiny: number; // Soma da data de nascimento
  mission: number; // Expressão + Destino
  birthDay: number; // Dia do nascimento (1-31, não reduz)
  
  // Análises especiais
  hiddenTendencies: number[]; // Números ausentes no nome
  karmicLessons: number[]; // Baseado nas letras ausentes
  karmicDebts: number[]; // Números 13, 14, 16, 19
  intimateNumber: number; // Primeiro nome + sobrenome
  ascensionDegree: 'ascending' | 'equal' | 'descending'; // Comparação vogais vs consoantes
  intervalRelations: { [key: number]: number }; // Excessos numéricos
  
  // Ciclos temporais
  lifeCycles: {
    first: { number: number; startYear: number; endYear: number };
    second: { number: number; startYear: number; endYear: number };
    third: { number: number; startYear: number; endYear: number };
  };
  
  // Desafios e momentos
  challenges: {
    first: number;
    second: number;
    main: number;
  };
  
  decisiveMoments: {
    first: { number: number; startYear: number; endYear: number };
    second: { number: number; startYear: number; endYear: number };
    third: { number: number; startYear: number; endYear: number };
    fourth: { number: number; startYear: number; endYear: number };
  };
  
  // Previsões (ano atual)
  currentYear: {
    personalYear: number;
    personalMonth: number; // Para o mês atual
    personalDay: number; // Para o dia atual
  };
  
  // Números do amor
  loveNumber: number; // Expressão + Destino
  
  // Cores e elementos visuais
  favorableColors: string[];
  favorableNumbers: number[]; // Para o mês atual
  
  // Interpretações
  interpretations: {
    destiny: any;
    mission: any;
    birthDay: any;
    personalYear: any;
    challenges: any[];
    decisiveMoments: any[];
  };
}

export interface PersonalPredictions {
  year: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  favorableNumbers: number[];
  monthlyForecast: string;
  yearlyForecast: string;
}

export interface CompatibilityAnalysis {
  person1: {
    name: string;
    loveNumber: number;
    expression: number;
    destiny: number;
  };
  person2: {
    name: string;
    loveNumber: number;
    expression: number;
    destiny: number;
  };
  compatibility: {
    type: 'vibrates' | 'attracts' | 'opposite' | 'passive' | 'same';
    description: string;
    compatibilityLevel: 'excellent' | 'good' | 'challenging' | 'neutral';
    score: number;
  };
  recommendations: string[];
}

export interface NumerologyCalculationOptions {
  includeInterpretations?: boolean;
  targetYear?: number;
  targetMonth?: number;
  targetDay?: number;
  includePredictions?: boolean;
  includeCompatibility?: boolean;
  partnerData?: {
    fullName: string;
    birthDate: Date;
  };
}

// Interfaces para as interpretações
export interface NumberInterpretation {
  title: string;
  positiveTraits?: string[];
  negativeTraits?: string[];
  description: string;
}

export interface ChallengeInterpretation {
  title: string;
  description: string;
}

export interface PersonalYearInterpretation {
  title: string;
  objective: string;
  whatToDo: string;
  dangers: string;
}

// Interface para exportação de dados
export interface NumerologyReport {
  personalInfo: {
    name: string;
    birthDate: string;
    age: number;
  };
  
  coreNumbers: {
    motivation: { number: number; interpretation: NumberInterpretation };
    impression: { number: number; interpretation: NumberInterpretation };
    expression: { number: number; interpretation: NumberInterpretation };
    destiny: { number: number; interpretation: NumberInterpretation };
    mission: { number: number; interpretation: NumberInterpretation };
    birthDay: { number: number; interpretation: NumberInterpretation };
  };
  
  specialAnalyses: {
    hiddenTendencies: number[];
    karmicLessons: number[];
    karmicDebts: number[];
    ascensionDegree: string;
    intervalRelations: { [key: number]: number };
  };
  
  lifePath: {
    cycles: NumerologicalMap['lifeCycles'];
    challenges: NumerologicalMap['challenges'];
    decisiveMoments: NumerologicalMap['decisiveMoments'];
  };
  
  currentPredictions: PersonalPredictions;
  
  loveAndRelationships: {
    loveNumber: number;
    interpretation: any;
    favorableColors: string[];
  };
  
  compatibility?: CompatibilityAnalysis;
}

// Constantes para validação
export const VALID_MASTER_NUMBERS = [11, 22, 33] as const;
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19] as const;
export const CHALLENGE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

// Tipos utilitários
export type MasterNumber = typeof VALID_MASTER_NUMBERS[number];
export type KarmicDebtNumber = typeof KARMIC_DEBT_NUMBERS[number];
export type ChallengeNumber = typeof CHALLENGE_NUMBERS[number];
export type ReducedNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NumerologyNumber = ReducedNumber | MasterNumber;