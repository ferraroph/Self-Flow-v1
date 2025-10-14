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