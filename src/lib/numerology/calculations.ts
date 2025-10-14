import { LETTER_VALUES, VOWELS, MASTER_NUMBERS } from './constants';

/**
 * Remove acentos e converte para maiúsculo
 */
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z\s]/g, '');
}

/**
 * Reduz um número à sua forma simples (1-9, 11, 22, 33)
 */
export function reduceNumber(num: number): number {
  if (MASTER_NUMBERS.includes(num)) {
    return num;
  }

  while (num > 9) {
    const digits = num.toString().split('').map(Number);
    num = digits.reduce((sum, digit) => sum + digit, 0);
    
    if (MASTER_NUMBERS.includes(num)) {
      return num;
    }
  }

  return num;
}

/**
 * Calcula valor numerológico de uma string
 */
export function calculateLetterValue(letter: string): number {
  const normalizedLetter = normalizeString(letter)[0];
  return LETTER_VALUES[normalizedLetter as keyof typeof LETTER_VALUES] || 0;
}

/**
 * Calcula valor numerológico de um nome/palavra
 */
export function calculateNameValue(name: string): number {
  const normalized = normalizeString(name);
  let sum = 0;

  for (const char of normalized) {
    if (char !== ' ') {
      sum += calculateLetterValue(char);
    }
  }

  return reduceNumber(sum);
}

/**
 * Calcula Motivação (soma das vogais)
 */
export function calculateMotivation(fullName: string): number {
  const normalized = normalizeString(fullName);
  let sum = 0;

  for (const char of normalized) {
    if (VOWELS.includes(char)) {
      sum += calculateLetterValue(char);
    }
  }

  return reduceNumber(sum);
}

/**
 * Calcula Impressão (soma das consoantes)
 */
export function calculateImpression(fullName: string): number {
  const normalized = normalizeString(fullName);
  let sum = 0;

  for (const char of normalized) {
    if (char !== ' ' && !VOWELS.includes(char)) {
      sum += calculateLetterValue(char);
    }
  }

  return reduceNumber(sum);
}

/**
 * Calcula Expressão (soma total do nome)
 */
export function calculateExpression(fullName: string): number {
  return calculateNameValue(fullName);
}

/**
 * Calcula Destino (soma da data de nascimento)
 */
export function calculateDestiny(birthDate: Date): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const sum = day + month + year;
  return reduceNumber(sum);
}

/**
 * Calcula Missão (Expressão + Destino)
 */
export function calculateMission(expression: number, destiny: number): number {
  return reduceNumber(expression + destiny);
}

/**
 * Calcula Dia Natalício (não reduz, mantém de 1-31)
 */
export function calculateBirthDay(birthDate: Date): number {
  return birthDate.getDate();
}

/**
 * Calcula Tendências Ocultas (letras que faltam no nome)
 */
export function calculateHiddenTendencies(fullName: string): number[] {
  const normalized = normalizeString(fullName);
  const presentNumbers = new Set<number>();

  for (const char of normalized) {
    if (char !== ' ') {
      presentNumbers.add(calculateLetterValue(char));
    }
  }

  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  return missingNumbers;
}

/**
 * Calcula Lições Cármicas (baseado nas letras ausentes)
 */
export function calculateKarmicLessons(fullName: string): number[] {
  return calculateHiddenTendencies(fullName);
}

/**
 * Calcula Dívidas Cármicas (números 13, 14, 16, 19)
 */
export function calculateKarmicDebts(birthDate: Date): number[] {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  const karmicNumbers = [13, 14, 16, 19];
  const debts: number[] = [];

  // Verifica dia de nascimento
  if (karmicNumbers.includes(day)) {
    debts.push(day);
  }

  // Verifica mês (apenas 19 não se aplica a mês)
  if ([13, 14, 16].includes(month)) {
    debts.push(month);
  }

  // Verifica ano reduzido
  const yearReduced = reduceNumber(year);
  if (karmicNumbers.includes(yearReduced)) {
    debts.push(yearReduced);
  }

  return debts;
}

/**
 * Calcula Número Íntimo (primeiro nome + sobrenome)
 */
export function calculateIntimateNumber(firstName: string, lastName: string): number {
  return calculateNameValue(firstName + lastName);
}

/**
 * Calcula Ano Pessoal
 */
export function calculatePersonalYear(birthDate: Date, targetYear: number): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  
  const sum = day + month + targetYear;
  return reduceNumber(sum);
}

/**
 * Calcula Mês Pessoal
 */
export function calculatePersonalMonth(personalYear: number, targetMonth: number): number {
  const sum = personalYear + targetMonth;
  return reduceNumber(sum);
}

/**
 * Calcula Dia Pessoal
 */
export function calculatePersonalDay(personalMonth: number, targetDay: number): number {
  const sum = personalMonth + targetDay;
  return reduceNumber(sum);
}

/**
 * Calcula Ciclos de Vida
 */
export function calculateLifeCycles(birthDate: Date): {
  first: { number: number; startYear: number; endYear: number };
  second: { number: number; startYear: number; endYear: number };
  third: { number: number; startYear: number; endYear: number };
} {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  const destiny = calculateDestiny(birthDate);

  // Primeiro Ciclo: Mês do nascimento
  const firstCycle = reduceNumber(month);
  const maturityAge = 37 - destiny;
  const firstEnd = year + maturityAge;

  // Segundo Ciclo: Dia do nascimento (dura 27 anos)
  const secondCycle = (day === 11 || day === 22) ? day : reduceNumber(day);
  const secondStart = firstEnd + 1;
  const secondEnd = secondStart + 27;

  // Terceiro Ciclo: Ano do nascimento (resto da vida)
  const thirdCycle = (year === 11 || year === 22) ? year : reduceNumber(year);
  const thirdStart = secondEnd + 1;

  return {
    first: { number: firstCycle, startYear: year, endYear: firstEnd },
    second: { number: secondCycle, startYear: secondStart, endYear: secondEnd },
    third: { number: thirdCycle, startYear: thirdStart, endYear: 9999 }
  };
}

/**
 * Calcula Desafios
 */
export function calculateChallenges(birthDate: Date): {
  first: number;
  second: number;
  main: number;
} {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const dayReduced = reduceNumber(day);
  const monthReduced = reduceNumber(month);
  const yearReduced = reduceNumber(year);

  const firstChallenge = Math.abs(dayReduced - monthReduced);
  const secondChallenge = Math.abs(dayReduced - yearReduced);
  const mainChallenge = Math.abs(firstChallenge - secondChallenge);

  return {
    first: firstChallenge,
    second: secondChallenge,
    main: mainChallenge
  };
}

/**
 * Calcula Momentos Decisivos
 */
export function calculateDecisiveMoments(birthDate: Date): {
  first: { number: number; startYear: number; endYear: number };
  second: { number: number; startYear: number; endYear: number };
  third: { number: number; startYear: number; endYear: number };
  fourth: { number: number; startYear: number; endYear: number };
} {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  const cycles = calculateLifeCycles(birthDate);

  // Primeiro Momento: Dia + Mês
  const firstMoment = (day + month === 11 || day + month === 22) ? 
    day + month : reduceNumber(day + month);

  // Segundo Momento: Dia + Ano (dura 9 anos)
  const secondMoment = (day + year === 11 || day + year === 22) ? 
    day + year : reduceNumber(day + year);

  // Terceiro Momento: Primeiro + Segundo (dura 9 anos)
  const thirdMoment = (firstMoment + secondMoment === 11 || firstMoment + secondMoment === 22) ? 
    firstMoment + secondMoment : reduceNumber(firstMoment + secondMoment);

  // Quarto Momento: Mês + Ano (resto da vida)
  const fourthMoment = (month + year === 11 || month + year === 22) ? 
    month + year : reduceNumber(month + year);

  const secondStart = cycles.first.endYear + 1;
  const thirdStart = secondStart + 9;
  const fourthStart = thirdStart + 9;

  return {
    first: { number: firstMoment, startYear: year, endYear: cycles.first.endYear },
    second: { number: secondMoment, startYear: secondStart, endYear: secondStart + 8 },
    third: { number: thirdMoment, startYear: thirdStart, endYear: thirdStart + 8 },
    fourth: { number: fourthMoment, startYear: fourthStart, endYear: 9999 }
  };
}

/**
 * Calcula Grau de Ascensão (comparação vogais vs consoantes)
 */
export function calculateAscensionDegree(fullName: string): 'ascending' | 'equal' | 'descending' {
  const motivation = calculateMotivation(fullName);
  const impression = calculateImpression(fullName);

  if (motivation > impression) return 'descending';
  if (motivation < impression) return 'ascending';
  return 'equal';
}

/**
 * Calcula Números do Amor (Expressão + Destino)
 */
export function calculateLoveNumber(expression: number, destiny: number): number {
  return reduceNumber(expression + destiny);
}

/**
 * Calcula Relações Intervalores (excessos numéricos no nome)
 */
export function calculateIntervalRelations(fullName: string): { [key: number]: number } {
  const normalized = normalizeString(fullName);
  const letterCounts: { [key: number]: number } = {};

  for (const char of normalized) {
    if (char !== ' ') {
      const value = calculateLetterValue(char);
      letterCounts[value] = (letterCounts[value] || 0) + 1;
    }
  }

  return letterCounts;
}