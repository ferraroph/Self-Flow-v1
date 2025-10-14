/**
 * Self Flow - Engine de Cálculos Numerológicos Cabalísticos
 * 
 * Sistema completo de mapeamento numerológico com validação matemática dupla
 * Implementa 15+ tipos de cálculos cabalísticos conforme PRD
 */

// Mapeamento de letras para números (sistema cabalístico)
const LETTER_VALUES: Record<string, number> = {
  // Consoantes
  'B': 2,
  'C': 3,
  'D': 4,
  'F': 8,
  'G': 3,
  'H': 5,
  'J': 1,
  'K': 2,
  'L': 3,
  'M': 4,
  'N': 5,
  'P': 8,
  'Q': 1,
  'R': 2,
  'S': 3,
  'T': 4,
  'V': 6,
  'W': 6,
  'X': 6,
  'Y': 1,
  'Z': 7,
  'Ç': 6,

  // Vogais
  'A': 1,
  'E': 5,
  'I': 1,
  'O': 7,
  'U': 6,

  // Caracteres acentuados
  'Á': 3,
  'Â': 8,
  'À': 2,
  'Ã': 4,
  'Ä': 2,

  'É': 7,
  'Ê': 3,
  'È': 1,
  'Ë': 1,

  'Í': 1,
  'Î': 8,
  'Ì': 2,
  'ï': 2,

  'Ó': 9,
  'Ô': 5,
  'Ò': 5,
  'Õ': 1,
  'Ö': 5,

  'Ú': 8,
  'Û': 4,
  'Ù': 3,
}

const VOWELS = [
    'A',
    'E',
    'I',
    'O',
    'U',
    'Ã',
    'Á',
    'À',
    'Â',
    'É',
    'Ê',
    'È',
    'Í',
    'Î',
    'Ì',
    'Ó',
    'Ô',
    'Ò',
    'Õ',
    'Ú',
    'Û',
    'Ù'
]
const MASTER_NUMBERS = [
    11,
    22,
]

export interface NumerologyInput {
  fullName: string
  birthDate: Date
}

export interface NumerologyMap {
  // Números Principais
  motivacao: number           // Soma das vogais do nome
  impressao: number           // Soma das consoantes
  expressao: number           // Soma total do nome
  destino: number             // Soma da data nascimento
  licoesCarmicas: number[]    // Números ausentes (1-9)
  tendenciasOcultas: number[] // Números repetidos
  harmonicoSuperior: number   // Expressao + Destino
  desafioMenor: number        // abs(Mês - Dia) nascimento
  desafioMaior: number        // abs(Ano - Destino)
  realizacao1: number         // (Dia + Mês) reduzido
  realizacao2: number         // (Dia + Ano) reduzido
  realizacao3: number         // Real1 + Real2
  realizacaoFinal: number     // Mês + Ano reduzido
  anoUniversal: number        // Soma do ano atual
  anoPessoal: number          // (Dia+Mês+Ano atual)

  // Metadados para auditoria
  calculationLog: string[]
  isValidated: boolean
  calculatedAt: Date
}

/**
 * Reduz um número à sua essência numerológica (1-9, ou números mestres 11, 22, 33)
 */
function reduceToEssence(num: number): number {
  // Números mestres não são reduzidos
  if (MASTER_NUMBERS.includes(num)) return num
  
  while (num > 9) {
    const digits = num.toString().split('').map(Number)
    num = digits.reduce((sum, digit) => sum + digit, 0)
    
    // Verifica se formou um número mestre durante a redução
    if (MASTER_NUMBERS.includes(num)) return num
  }
  
  return num
}

/**
 * Normaliza string removendo espaços e convertendo para maiúsculo
 */
function normalizeString(str: string): string {
  return str.toUpperCase().replace(/[^A-ZÁÀÂÃÉÊÍÔÕÚÇ]/g, '')
}

/**
 * Calcula valor numerológico de uma string
 */
function calculateStringValue(str: string): number {
  const normalized = normalizeString(str)
  let sum = 0
  
  for (const char of normalized) {
    if (LETTER_VALUES[char]) {
      sum += LETTER_VALUES[char]
    }
  }
  
  return sum
}

/**
 * Extrai apenas vogais de uma string
 */
function extractVowels(str: string): string {
  const normalized = normalizeString(str)
  return normalized.split('').filter(char => VOWELS.includes(char)).join('')
}

/**
 * Extrai apenas consoantes de uma string
 */
function extractConsonants(str: string): string {
  const normalized = normalizeString(str)
  return normalized.split('').filter(char => !VOWELS.includes(char) && LETTER_VALUES[char]).join('')
}

/**
 * Calcula lições cármicas (números de 1-9 que não aparecem no nome)
 */
function calculateKarmicLessons(fullName: string): number[] {
  const normalized = normalizeString(fullName)
  const presentNumbers = new Set<number>()
  
  for (const char of normalized) {
    if (LETTER_VALUES[char]) {
      presentNumbers.add(LETTER_VALUES[char])
    }
  }
  
  const karmicLessons: number[] = []
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      karmicLessons.push(i)
    }
  }
  
  return karmicLessons
}

/**
 * Calcula tendências ocultas (números que aparecem mais de 3 vezes no nome)
 */
function calculateHiddenTendencies(fullName: string): number[] {
  const normalized = normalizeString(fullName)
  const numberCount: Record<number, number> = {}
  
  for (const char of normalized) {
    if (LETTER_VALUES[char]) {
      const value = LETTER_VALUES[char]
      numberCount[value] = (numberCount[value] || 0) + 1
    }
  }
  
  return Object.entries(numberCount)
    .filter(([_, count]) => count >= 3)
    .map(([number, _]) => parseInt(number))
}

/**
 * Calcula soma dos dígitos de uma data
 */
function calculateDateSum(date: Date): number {
  const day = date.getDate()
  const month = date.getMonth() + 1 // JavaScript months são 0-indexed
  const year = date.getFullYear()
  
  // Soma todos os dígitos da data
  const dateString = `${day}${month}${year}`
  let sum = 0
  
  for (const digit of dateString) {
    sum += parseInt(digit)
  }
  
  return sum
}

/**
 * FUNÇÃO PRINCIPAL: Calcula mapa numerológico completo
 */
export function calculateNumerologyMap(input: NumerologyInput): NumerologyMap {
  const log: string[] = []
  const { fullName, birthDate } = input
  
  log.push(`Iniciando cálculos para: ${fullName}, nascido em ${birthDate.toDateString()}`)
  
  // 1. MOTIVAÇÃO - Soma das vogais do nome
  const vowels = extractVowels(fullName)
  const motivacaoRaw = calculateStringValue(vowels)
  const motivacao = reduceToEssence(motivacaoRaw)
  log.push(`Motivação: vogais "${vowels}" = ${motivacaoRaw} → ${motivacao}`)
  
  // 2. IMPRESSÃO - Soma das consoantes
  const consonants = extractConsonants(fullName)
  const impressaoRaw = calculateStringValue(consonants)
  const impressao = reduceToEssence(impressaoRaw)
  log.push(`Impressão: consoantes "${consonants}" = ${impressaoRaw} → ${impressao}`)
  
  // 3. EXPRESSÃO - Soma total do nome
  const expressaoRaw = calculateStringValue(fullName)
  const expressao = reduceToEssence(expressaoRaw)
  log.push(`Expressão: nome completo = ${expressaoRaw} → ${expressao}`)
  
  // 4. DESTINO - Soma da data de nascimento
  const destinoRaw = calculateDateSum(birthDate)
  const destino = reduceToEssence(destinoRaw)
  log.push(`Destino: data nascimento = ${destinoRaw} → ${destino}`)
  
  // 5. LIÇÕES CÁRMICAS
  const licoesCarmicas = calculateKarmicLessons(fullName)
  log.push(`Lições Cármicas: números ausentes = [${licoesCarmicas.join(', ')}]`)
  
  // 6. TENDÊNCIAS OCULTAS
  const tendenciasOcultas = calculateHiddenTendencies(fullName)
  log.push(`Tendências Ocultas: números repetidos 3+ vezes = [${tendenciasOcultas.join(', ')}]`)
  
  // 7. HARMÔNICO SUPERIOR
  const harmonicoSuperiorRaw = expressao + destino
  const harmonicoSuperior = reduceToEssence(harmonicoSuperiorRaw)
  log.push(`Harmônico Superior: ${expressao} + ${destino} = ${harmonicoSuperiorRaw} → ${harmonicoSuperior}`)
  
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()
  
  // 8. DESAFIO MENOR
  const desafioMenorRaw = Math.abs(month - day)
  const desafioMenor = reduceToEssence(desafioMenorRaw)
  log.push(`Desafio Menor: |${month} - ${day}| = ${desafioMenorRaw} → ${desafioMenor}`)
  
  // 9. DESAFIO MAIOR
  const yearSum = year.toString().split('').map(Number).reduce((sum, digit) => sum + digit, 0)
  const desafioMaiorRaw = Math.abs(yearSum - destino)
  const desafioMaior = reduceToEssence(desafioMaiorRaw)
  log.push(`Desafio Maior: |${yearSum} - ${destino}| = ${desafioMaiorRaw} → ${desafioMaior}`)
  
  // 10. REALIZAÇÃO 1 (0-30 anos)
  const realizacao1Raw = day + month
  const realizacao1 = reduceToEssence(realizacao1Raw)
  log.push(`Realização 1: ${day} + ${month} = ${realizacao1Raw} → ${realizacao1}`)
  
  // 11. REALIZAÇÃO 2 (30-50 anos)
  const realizacao2Raw = day + yearSum
  const realizacao2 = reduceToEssence(realizacao2Raw)
  log.push(`Realização 2: ${day} + ${yearSum} = ${realizacao2Raw} → ${realizacao2}`)
  
  // 12. REALIZAÇÃO 3 (50+ anos)
  const realizacao3Raw = realizacao1 + realizacao2
  const realizacao3 = reduceToEssence(realizacao3Raw)
  log.push(`Realização 3: ${realizacao1} + ${realizacao2} = ${realizacao3Raw} → ${realizacao3}`)
  
  // 13. REALIZAÇÃO FINAL
  const realizacaoFinalRaw = month + yearSum
  const realizacaoFinal = reduceToEssence(realizacaoFinalRaw)
  log.push(`Realização Final: ${month} + ${yearSum} = ${realizacaoFinalRaw} → ${realizacaoFinal}`)
  
  // 14. ANO UNIVERSAL (ano atual)
  const currentYear = new Date().getFullYear()
  const anoUniversalRaw = currentYear.toString().split('').map(Number).reduce((sum, digit) => sum + digit, 0)
  const anoUniversal = reduceToEssence(anoUniversalRaw)
  log.push(`Ano Universal (${currentYear}): = ${anoUniversalRaw} → ${anoUniversal}`)
  
  // 15. ANO PESSOAL (ciclo pessoal de 9 anos)
  const anoPessoalRaw = day + month + anoUniversalRaw
  const anoPessoal = reduceToEssence(anoPessoalRaw)
  log.push(`Ano Pessoal: ${day} + ${month} + ${anoUniversalRaw} = ${anoPessoalRaw} → ${anoPessoal}`)
  
  const result: NumerologyMap = {
    motivacao,
    impressao,
    expressao,
    destino,
    licoesCarmicas,
    tendenciasOcultas,
    harmonicoSuperior,
    desafioMenor,
    desafioMaior,
    realizacao1,
    realizacao2,
    realizacao3,
    realizacaoFinal,
    anoUniversal,
    anoPessoal,
    calculationLog: log,
    isValidated: false, // Será validado pela função de validação dupla
    calculatedAt: new Date()
  }
  
  // VALIDAÇÃO DUPLA
  result.isValidated = validateCalculations(input, result)
  
  return result
}

/**
 * Sistema de validação matemática dupla
 * Re-calcula independentemente e compara resultados
 */
function validateCalculations(input: NumerologyInput, original: NumerologyMap): boolean {
  try {
    // Re-calcular independentemente com algoritmo alternativo
    const validation = calculateNumerologyMapValidation(input)
    
    // Comparar resultados críticos
    const criticalFields = [
      'motivacao', 'impressao', 'expressao', 'destino',
      'harmonicoSuperior', 'desafioMenor', 'desafioMaior'
    ]
    
    for (const field of criticalFields) {
      if (original[field as keyof NumerologyMap] !== validation[field as keyof NumerologyMap]) {
        console.error(`Validação falhou para ${field}: ${original[field as keyof NumerologyMap]} !== ${validation[field as keyof NumerologyMap]}`)
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Erro na validação:', error)
    return false
  }
}

/**
 * Algoritmo de validação alternativo (implementação independente)
 */
function calculateNumerologyMapValidation(input: NumerologyInput) {
  const { fullName, birthDate } = input
  
  // Implementação alternativa mais simples para validação cruzada
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÁÀÂÃÉÊÍÔÕÚÇ]/g, '')
  
  let vowelSum = 0, consonantSum = 0
  
  for (const char of cleanName) {
    const value = LETTER_VALUES[char] || 0
    if (VOWELS.includes(char)) {
      vowelSum += value
    } else if (value > 0) {
      consonantSum += value
    }
  }
  
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()
  const birthSum = day + month + year.toString().split('').map(Number).reduce((a, b) => a + b, 0)
  
  return {
    motivacao: reduceToEssence(vowelSum),
    impressao: reduceToEssence(consonantSum),
    expressao: reduceToEssence(vowelSum + consonantSum),
    destino: reduceToEssence(birthSum),
    harmonicoSuperior: reduceToEssence(reduceToEssence(vowelSum + consonantSum) + reduceToEssence(birthSum)),
    desafioMenor: reduceToEssence(Math.abs(month - day)),
    desafioMaior: reduceToEssence(Math.abs(year.toString().split('').map(Number).reduce((a, b) => a + b, 0) - reduceToEssence(birthSum)))
  }
}

/**
 * Função utilitária para testar o sistema
 */
export function testNumerologyEngine() {
  const testCase: NumerologyInput = {
    fullName: "Maria da Silva Santos",
    birthDate: new Date(1985, 2, 15) // 15 de março de 1985
  }
  
  console.log("🧮 TESTE DO ENGINE NUMEROLÓGICO")
  console.log("================================")
  
  const result = calculateNumerologyMap(testCase)
  
  console.log("📊 RESULTADOS:")
  console.log(`Motivação: ${result.motivacao}`)
  console.log(`Impressão: ${result.impressao}`)
  console.log(`Expressão: ${result.expressao}`)
  console.log(`Destino: ${result.destino}`)
  console.log(`Harmônico Superior: ${result.harmonicoSuperior}`)
  console.log(`Ano Pessoal: ${result.anoPessoal}`)
  console.log(`Validado: ${result.isValidated ? '✅' : '❌'}`)
  
  console.log("\n📝 LOG DE CÁLCULOS:")
  result.calculationLog.forEach(log => console.log(`  ${log}`))
  
  return result
}