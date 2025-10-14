import { calculateLoveNumber } from './calculations';

// Sistema de números do amor baseado no documento
export interface LoveCompatibility {
  vibrates: number[];
  attracts: number[];
  opposite: number[];
  passive: number[];
}

export const loveCompatibilityTable: { [key: number]: LoveCompatibility } = {
  1: {
    vibrates: [9],
    attracts: [4, 8], 
    opposite: [6, 7],
    passive: [2, 3, 5]
  },
  2: {
    vibrates: [8],
    attracts: [7, 9],
    opposite: [5],
    passive: [1, 3, 4, 6]
  },
  3: {
    vibrates: [7],
    attracts: [5, 6, 9],
    opposite: [4, 8],
    passive: [1, 2]
  },
  4: {
    vibrates: [6],
    attracts: [1, 8],
    opposite: [3, 5],
    passive: [2, 7, 9]
  },
  5: {
    vibrates: [5],
    attracts: [3, 9],
    opposite: [2, 4, 6], // 6 é profundamente oposto
    passive: [1, 7, 8]
  },
  6: {
    vibrates: [4],
    attracts: [3, 7, 9],
    opposite: [1, 8, 5], // 5 é profundamente oposto
    passive: [2]
  },
  7: {
    vibrates: [3],
    attracts: [2, 6],
    opposite: [1, 9],
    passive: [4, 5, 8]
  },
  8: {
    vibrates: [2],
    attracts: [1, 4],
    opposite: [3, 6],
    passive: [5, 7, 9]
  },
  9: {
    vibrates: [1],
    attracts: [2, 3, 5, 6],
    opposite: [7],
    passive: [4, 8]
  }
};

// Interpretações dos números do amor do documento
export const loveNumberInterpretations = {
  1: {
    title: "AMOR INTELECTUAL",
    description: `Este número é o do idílio (amor poético), mas a atração deve ter uma base intelectual. Como este número também estimula a variedade, não será muito fácil chegar-se a uma união duradoura, pois haverá a tentação de se tratar de duas coisas ao mesmo tempo. 

Além disso, a tendência intelectual prejudicará o fogo da paixão. Os casamentos podem ocorrer de repente, e também podem ocorrer encontros quando você estiver fazendo uma viagem bem longe de casa ou em um centro de estudos.`
  },

  2: {
    title: "AMOR ESTÁVEL",
    description: `Este número é discriminador na escolha de um cônjuge, principalmente por causa do seu acentuado interesse pelo conforto e pela estabilidade. A sugestão pode desempenhar um papel importante na sua vida e deve ter cuidado para impedir críticas indevidas por parte de parentes ou amigos.

Você há de querer uma pessoa inteligente, mas que seja acima de tudo prática e capaz de garantir a segurança financeira que você deseja.`
  },

  3: {
    title: "AMOR IDEALISTA",
    description: `Às vezes você tem a infelicidade de conhecer seus parceiros ideais demasiadamente tarde, quando normalmente já estão casados. Você é muito idealista para compartilhar seu casamento, mas o seu espírito de sacrifício pode ser explorado maldosamente por aqueles em quem confia.

Se deixar agir a sua intuição, a sua escolha será correta, pois você compreende muito bem as motivações das pessoas e, em via de regra, escolherá alguém cujos interesses combinem com os seus.`
  },

  4: {
    title: "AMOR EMOCIONAL",
    description: `Você sentirá uma forte atração pelo casamento, devido à sua natureza emocional e afetiva, mas nem sempre terá a necessária discrição, e a sua escolha lhe poderá acarretar dificuldades. Seu caminho será ainda mais dificultado pela inveja e despeito de outras pessoas.

No casamento, embora procure um parceiro ativo e dominador, poderá haver atritos conjugais, com certa frequência, se houver muitas exigências de sua parte.`
  },

  5: {
    title: "AMOR MUTÁVEL",
    description: `Este número acarreta viagens, mudanças e variedades. É quase certo que a pessoa se casará e se separará mais de uma vez, devido à inquietação e gosto pela mudança. Por outro lado, os dois cônjuges, mesmo separados, podem e normalmente mantêm negócios juntos.

Não costuma ser muito seletivo em seus relacionamentos, principalmente até os 25 anos e com isso vive trocando de parceiro constantemente. O aconselhável é o casamento depois de trinta anos.`
  },

  6: {
    title: "AMOR TÍMIDO",
    description: `Não sendo muito precoces, as pessoas possuidoras deste número, embora ardentes no íntimo, são tímidas e pouco expressivas. No entanto, experimentam períodos de exaltação, e se não houver cuidado, tais ardores poderão acarretar a formação de alianças não muito satisfatórias.

Se o casamento ocorrer depois de 33 anos de idade, haverá mais esperança de seu sucesso e estabilidade.`
  },

  7: {
    title: "AMOR MÚLTIPLO", 
    description: `As pessoas regidas por este número são muitas vezes consideradas namoradeiras e até volúveis. Não é verdade. Embora não devam se casar muito jovens, quase sempre isso acontece e, em consequência, normalmente esses relacionamentos duram pouco.

Frequentemente se casa mais de uma vez, e têm muitos casos amorosos, sem que procure aventuras. Haverá muitas separações de pessoas amadas, amigas, e até mesmo mortes prematuras de pessoas queridas.`
  },

  8: {
    title: "AMOR PARA TODA VIDA",
    description: `As pessoas governadas por este número se casam para toda a vida, pois são sinceras e honradas, mas curiosamente, costumam ocorrer muitas vezes idílios desfeitos antes do casamento, por falta de sinceridade da outra parte.

Se sofrer tal coisa, a pessoa pode custar a se recuperar e, se enviuvar depois de um casamento feliz, raramente se casa de novo. A religião e a filosofia desempenham um papel importante em sua vida.`
  },

  9: {
    title: "AMOR SUPREMO",
    description: `O casamento será a aspiração suprema e constante, e você a ele sacrificará todos os seus pensamentos, esperanças e aspirações, desde muito jovem. Na juventude, a tendência é de gostar e até namorar com pessoas bem mais velhas do que você.

Deve tomar cuidado para que os seus objetivos e atividades profissionais sejam compatíveis com os do seu cônjuge, pois, do contrário, terá muitas decepções e aborrecimentos.`
  }
};

/**
 * Calcula compatibilidade entre dois números do amor
 */
export function calculateLoveCompatibility(loveNumber1: number, loveNumber2: number): {
  type: 'vibrates' | 'attracts' | 'opposite' | 'passive' | 'same';
  description: string;
  compatibilityLevel: 'excellent' | 'good' | 'challenging' | 'neutral';
} {
  if (loveNumber1 === loveNumber2) {
    return {
      type: 'same',
      description: 'Indivíduos com o mesmo número do Amor são compatíveis e harmônicos, porém o relacionamento tende a tornar-se monótono com o passar dos anos. A convivência necessita ser "alimentada" continuamente.',
      compatibilityLevel: 'good'
    };
  }

  const compatibility1 = loveCompatibilityTable[loveNumber1];
  
  if (compatibility1.vibrates.includes(loveNumber2)) {
    return {
      type: 'vibrates',
      description: 'Números que "vibram" um com o outro: é sinal de forte atração sexual (paixão) que pode, caso não se transforme em amor, levar à separação em virtude de ciúmes exagerados, inconstância sexual, arrogância.',
      compatibilityLevel: 'challenging'
    };
  }

  if (compatibility1.attracts.includes(loveNumber2)) {
    return {
      type: 'attracts',
      description: 'Números que se "atraem": são totalmente compatíveis entre si e o amor e sexo se mesclam ardentemente. Tendem para a amabilidade, cordialidade, delicadeza e compreensão mútuas.',
      compatibilityLevel: 'excellent'
    };
  }

  if (compatibility1.opposite.includes(loveNumber2)) {
    return {
      type: 'opposite',
      description: 'Números "opostos": este não é o pior dos relacionamentos quando os envolvidos têm consciência do fato e são intelectualmente desenvolvidos. Ambos devem usar a diplomacia constantemente.',
      compatibilityLevel: 'challenging'
    };
  }

  if (compatibility1.passive.includes(loveNumber2)) {
    return {
      type: 'passive',
      description: 'Números "passivos": não sofrem influências negativas ou positivas. Este tipo de relacionamento transforma os parceiros em "amigos", em vez de "amantes".',
      compatibilityLevel: 'neutral'
    };
  }

  return {
    type: 'passive',
    description: 'Relacionamento neutro sem características específicas definidas.',
    compatibilityLevel: 'neutral'
  };
}

/**
 * Analisa compatibilidade numerológica completa entre duas pessoas
 */
export function analyzeNumerologicalCompatibility(
  person1: { fullName: string; birthDate: Date },
  person2: { fullName: string; birthDate: Date }
) {
  const { calculateExpression, calculateDestiny, calculateMotivation, calculateBirthDay } = require('./calculations');
  
  // Números da pessoa 1
  const p1Expression = calculateExpression(person1.fullName);
  const p1Destiny = calculateDestiny(person1.birthDate);
  const p1Love = calculateLoveNumber(p1Expression, p1Destiny);
  const p1Motivation = calculateMotivation(person1.fullName);
  const p1BirthDay = calculateBirthDay(person1.birthDate);

  // Números da pessoa 2
  const p2Expression = calculateExpression(person2.fullName);
  const p2Destiny = calculateDestiny(person2.birthDate);
  const p2Love = calculateLoveNumber(p2Expression, p2Destiny);
  const p2Motivation = calculateMotivation(person2.fullName);
  const p2BirthDay = calculateBirthDay(person2.birthDate);

  // Análises de compatibilidade
  const loveCompatibility = calculateLoveCompatibility(p1Love, p2Love);
  
  return {
    person1: {
      expression: p1Expression,
      destiny: p1Destiny,
      loveNumber: p1Love,
      motivation: p1Motivation,
      birthDay: p1BirthDay
    },
    person2: {
      expression: p2Expression,
      destiny: p2Destiny,
      loveNumber: p2Love,
      motivation: p2Motivation,
      birthDay: p2BirthDay
    },
    compatibility: {
      love: loveCompatibility,
      overallScore: calculateOverallCompatibilityScore(loveCompatibility.compatibilityLevel)
    }
  };
}

function calculateOverallCompatibilityScore(loveLevel: string): number {
  switch (loveLevel) {
    case 'excellent': return 85;
    case 'good': return 70;
    case 'neutral': return 50;
    case 'challenging': return 35;
    default: return 50;
  }
}