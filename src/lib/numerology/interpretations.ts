// Interpretações dos números de Destino conforme documento
export const destinyInterpretations = {
  1: {
    title: "INDEPENDÊNCIA",
    positiveTraits: [
      "Liderança", "criatividade", "caráter progressista", "vigor", "otimismo", 
      "fortes convicções", "competitividade", "independência", "sociabilidade"
    ],
    negativeTraits: [
      "Arrogância", "egoísmo", "ciúme", "antagonismo", "excesso de orgulho", 
      "hesitação", "impaciência"
    ],
    description: `É um líder nato; gosta de mandar em vez de fazer. É criativo e original, tem raciocínio lógico e rápido, e é capaz de discutir sobre os mais variados assuntos, até mesmo aqueles que conhece superficialmente.

Tem tendência a ser autoritário, de certa maneira possessivo e um tanto egocêntrico. Ainda que o lado aventureiro da sua natureza queira se expressar, a sua visão altamente pragmática e a preocupação com a segurança sugerem um certo materialismo.

Como líder, sente-se terrivelmente frustrado em posição subalterna e, por vezes, torna-se irascível, violento e inconsequente, sendo muito difícil trabalhar e conviver em sua companhia.`
  },

  2: {
    title: "COOPERAÇÃO",
    positiveTraits: [
      "Gentileza", "tato", "boas parcerias", "receptividade", "intuição", 
      "consideração", "harmonia", "agrada a todos"
    ],
    negativeTraits: [
      "Desconfiança", "falta de objetividade", "subserviência", "excesso de sensibilidade",
      "emotividade", "egoísmo", "tendência a ser desonesto"
    ],
    description: `É um diplomata por excelência. É aquele que harmoniza o grupo e a família; o que possui o dom da reconciliação. É cooperativo, aparentemente tímido e vulnerável, de certa maneira passivo, mas sempre atento aos detalhes de seu ambiente.

Amante das diversões e sociável pode ser um grande amigo e uma boa companhia. Mesmo sendo amoroso e afetuoso, deve tomar cuidado na escolha dos seus relacionamentos para que eles sejam duradouros.`
  },

  3: {
    title: "CRIATIVIDADE",
    positiveTraits: [
      "Bem-humorado", "feliz", "amigável", "produtivo", "criativo", "artístico", 
      "amor à liberdade", "talento com as palavras", "poder para desejar"
    ],
    negativeTraits: [
      "Entediado facilmente", "vaidoso", "excesso de imaginação", "orgulhoso", 
      "extravagante", "comodista", "preguiçoso", "esbanjador"
    ],
    description: `O nativo é um ser de rara animação, criatividade, expressão e popularidade. Pode parecer irresponsável para alguns que não o conhecem bem, mas na realidade é um ser altamente responsável, e prestativo com tudo e com todos.

Sua ambição e sua personalidade atraente podem levá-lo ao topo de qualquer carreira. É do tipo que trabalha em inúmeras atividades ao mesmo tempo e que quase sempre as deixa a meio caminho.`
  },

  4: {
    title: "ESTABILIDADE",
    positiveTraits: [
      "Organização", "autodisciplina", "firmeza", "trabalhador", "habilidade", 
      "talento com as mãos", "pragmático", "confiável", "preciso"
    ],
    negativeTraits: [
      "Falta de comunicação", "rigidez", "falta de sentimentos", "procrastinação", 
      "autoritarismo", "afeições ocultas", "ressentimento", "severidade"
    ],
    description: `São muito disciplinados, constantes, regulares e ordeiros. Perseverantes em seus propósitos, incansáveis trabalhadores, dificilmente deixam de atingir seus objetivos. Normalmente honesto, sincero e conservador, o 4 adapta-se a trabalhos rotineiros, metódicos e que requerem esforço concentrado.

Em virtude dos predicados descritos, sente-se mais à vontade lidando com situações rotineiras, já consagradas pelo uso, evitando o novo ou o incerto.`
  },

  5: {
    title: "LIBERDADE",
    positiveTraits: [
      "Versátil", "adaptável", "progressista", "fortes instintos", "magnético", 
      "sortudo", "ousado", "amante da liberdade", "perspicaz", "rápido"
    ],
    negativeTraits: [
      "Pouco confiável", "instável", "procrastinador", "inconsistente", 
      "excessivamente confiante", "cabeça-dura"
    ],
    description: `É normalmente divertido, alegre, ousado, dotado de poderes psíquicos, imaginação fértil, versatilidade e também amante da liberdade. Em virtude de ter os ouvidos muito sensíveis (não gosta de receber ordens), vive constantemente em busca de dinheiro.

É obstinado em seus propósitos (impaciente e impulsivo) e não descansa enquanto não consegue atingir seus objetivos. Gosta de estar em contato com o público, de preferência sendo o centro das atenções.`
  },

  6: {
    title: "RESPONSABILIDADE",
    positiveTraits: [
      "Universal", "fraterno", "compassivo", "confiável", "compreensivo", 
      "solidário", "idealista", "humanitário", "equilibrado", "artístico"
    ],
    negativeTraits: [
      "Insatisfeito", "ansiedade", "timidez", "irracionalidade", "teimosia", 
      "falta de harmonia", "dominação", "egoísmo", "desconfiança"
    ],
    description: `É normalmente sentimental, muito equilibrado, compreensivo, adora a família, a casa, os amigos, os filhos e é também excelente amante. Tem personalidade magnética e atrai sempre as atenções.

Profissionalmente sente-se realizado numa posição superior, onde pode contribuir para o desenvolvimento da empresa, das coisas e principalmente das pessoas envolvidas.`
  },

  7: {
    title: "SABEDORIA",
    positiveTraits: [
      "Culto", "confiável", "meticuloso", "idealista", "honesto", 
      "com poderes psíquicos", "científico", "racional", "reflexivo"
    ],
    negativeTraits: [
      "Dissimulado", "pouco amigável", "fingido", "cético", "confuso", 
      "inoportuno", "indiferente", "pouco sentimental", "sensível às críticas"
    ],
    description: `Além da integridade inerente do número 7, ele também possui em larga escala a independência de pensamento, a iniciativa e a ponderação. É também um perfeccionista e um tanto arredio a coisas e a novas amizades.

Analítico e ponderado, é muitas vezes crítico e concentrado nos seus próprios interesses. Com uma necessidade constante de ter uma maior autoconsciência, gosta de reunir informações.`
  },

  8: {
    title: "PODER MATERIAL",
    positiveTraits: [
      "Liderança", "meticulosidade", "trabalhador", "autoridade", "proteção", 
      "poder de cura", "bom juízo de valores"
    ],
    negativeTraits: [
      "Impaciência", "desperdício", "intolerância", "excesso de trabalho", 
      "dominação", "desencoraja-se facilmente", "falta de planejamento"
    ],
    description: `É normalmente organizado, muito dedicado aos negócios, criativo e com enorme potencial para ganhar dinheiro. É justo, leal, prático, generoso (quando quer) e tem grande capacidade executiva e grande senso de justiça.

Quando as coisas não saem como deseja, pode-se tornar direto (às vezes até demais), agressivo, com acessos de mau humor e com grande tendência a dominar a todos.`
  },

  9: {
    title: "UNIVERSALIDADE",
    positiveTraits: [
      "Idealista", "humanitário", "criativo", "sensível", "generoso", 
      "magnético", "poético", "caridoso", "desapegado", "sortudo", "popular"
    ],
    negativeTraits: [
      "Frustrado", "fragmentado", "inseguro", "egoísta", "pouco prático", "preocupado"
    ],
    description: `É normalmente universalista: sente compaixão por todos e quer melhorar o gênero humano. Tolerante e gentil, é na maior parte das vezes generoso e liberal. Sua intuição e seu poder psíquico indicam uma receptividade universal.

Dificilmente tem paz de espírito e tranquilidade, pois tem facilidade em atrair discórdia e desentendimentos. É um ser muito contraditório, pois sendo humanista e bondoso não deveria ser arrogante e revoltoso, mas o é.`
  },

  11: {
    title: "INSPIRAÇÃO",
    positiveTraits: [
      "Equilibrado", "concentrado", "objetivo", "entusiástico", "espiritualizado", 
      "idealista", "intuitivo", "habilidade para cura", "humanitário", "grande capacidade psíquica"
    ],
    negativeTraits: [
      "Complexo de superioridade", "excessivamente emotivo", "certo egoísmo", 
      "dominador", "magoa-se facilmente"
    ],
    description: `A grande virtude do 11 é a Fé. Esta Fé, em si mesmo, não representa propriamente religiosidade, mas também a Fé nos seus ideais, propósitos, pressentimentos, "sorte" ou em projetos que elabora.

Agindo corretamente, tem o potencial para inspirar as pessoas com seus ideais e imaginação. É um diplomata por excelência e possui a rara capacidade da harmonia e compreensão.`
  },

  22: {
    title: "CONSTRUÇÃO UNIVERSAL",
    positiveTraits: [
      "Universalidade", "intuição elevada", "pragmatismo", "praticidade", 
      "capacidade de organização", "capacidade de resolução de problemas"
    ],
    negativeTraits: [
      "Nervosismo", "complexo de inferioridade", "autoritarismo", "preguiça", "egoísmo"
    ],
    description: `É um número altruísta e voltado quase exclusivamente para a humanidade, para o todo, para a sabedoria. Vê tudo em larga escala e é altamente capaz de levar a bom termo qualquer projeto que vise o bem do Planeta.

Mentalmente arguto e intuitivo, gosta de tomar as próprias decisões. É uma pessoa humanitária, que tem uma visão realista da vida e, com sua força, pode dar apoio a quem precisa.`
  }
};

// Interpretações dos números de Missão (iguais às de Destino, pois Missão = Expressão + Destino)
export const missionInterpretations = {
  1: {
    title: "LIDERANÇA CRIATIVA",
    description: "Sua missão é liderar e inspirar através da criatividade e inovação. Deve desenvolver independência e originalidade."
  },
  2: {
    title: "DIPLOMACIA E COOPERAÇÃO",
    description: "Sua missão é harmonizar e unir as pessoas através da diplomacia e colaboração. Deve ser um mediador natural."
  },
  3: {
    title: "EXPRESSÃO ARTÍSTICA",
    description: "Sua missão é inspirar através das artes, comunicação e criatividade. Deve expressar alegria e otimismo."
  },
  4: {
    title: "CONSTRUÇÃO SÓLIDA",
    description: "Sua missão é construir bases sólidas e duradouras. Deve trabalhar com disciplina e organização."
  },
  5: {
    title: "LIBERDADE E MUDANÇA",
    description: "Sua missão é promover mudanças positivas e liberdade. Deve ser versátil e adaptável."
  },
  6: {
    title: "SERVIÇO À FAMÍLIA E COMUNIDADE",
    description: "Sua missão é servir e cuidar da família e comunidade. Deve assumir responsabilidades com amor."
  },
  7: {
    title: "BUSCA DA VERDADE",
    description: "Sua missão é buscar e compartilhar conhecimento espiritual. Deve desenvolver sabedoria interior."
  },
  8: {
    title: "SUCESSO MATERIAL JUSTO",
    description: "Sua missão é alcançar sucesso material de forma justa e ética. Deve liderar nos negócios com integridade."
  },
  9: {
    title: "SERVIÇO HUMANITÁRIO",
    description: "Sua missão é servir a humanidade com compaixão. Deve ser um exemplo de amor universal."
  },
  11: {
    title: "INSPIRAÇÃO ESPIRITUAL",
    description: "Sua missão é inspirar espiritualmente as pessoas. Deve ser um canal de luz e sabedoria superior."
  },
  22: {
    title: "CONSTRUTOR MUNDIAL",
    description: "Sua missão é construir algo significativo para a humanidade. Deve materializar ideais elevados."
  }
};

// Interpretações dos Dias Natalícios (1-31)
export const birthDayInterpretations = {
  1: {
    title: "DIA DA LIDERANÇA",
    positiveTraits: [
      "Liderança", "criatividade", "caráter progressista", "vigor", "otimismo", 
      "fortes convicções", "competitividade", "independência", "sociabilidade"
    ],
    negativeTraits: [
      "Arrogância", "egoísmo", "ciúme", "antagonismo", "excesso de orgulho", 
      "hesitação", "impaciência"
    ],
    description: `É um líder nato; gosta de mandar em vez de fazer. É criativo e original, tem raciocínio lógico e rápido, e é capaz de discutir sobre os mais variados assuntos, até mesmo aqueles que conhece superficialmente.

O nascido no dia um necessita saber para poder e querer. Estudar, projetar, manter a consistência no objetivo deve ser sua principal característica.`
  },

  2: {
    title: "DIA DA DIPLOMACIA",
    positiveTraits: ["Gentileza", "tato", "boas parcerias", "receptividade", "intuição", "consideração", "harmonia"],
    negativeTraits: ["Desconfiança", "falta de objetividade", "subserviência", "excesso de sensibilidade", "emotividade", "egoísmo"],
    description: `É um ser diplomata por excelência. É aquele que harmoniza o grupo e a família; o que possui o dom da reconciliação. É cooperativo, aparentemente tímido e vulnerável, de certa maneira passivo, mas sempre atento aos detalhes de seu ambiente.`
  },
  3: {
    title: "DIA DA POPULARIDADE",
    positiveTraits: ["Bem-humorado", "feliz", "amigável", "produtivo", "criativo", "artístico", "amor à liberdade", "talento com as palavras"],
    negativeTraits: ["Entediado facilmente", "vaidoso", "excesso de imaginação", "orgulhoso", "extravagante", "comodista", "preguiçoso"],
    description: `O nativo deste dia é um ser de rara animação, criatividade, expressão e popularidade. Pode parecer irresponsável para alguns que não o conhecem bem, mas na realidade é um ser altamente responsável, e prestativo com tudo e com todos.`
  },
  4: {
    title: "DIA DA PERSISTÊNCIA",
    positiveTraits: ["Organização", "autodisciplina", "firmeza", "trabalhador", "habilidade", "talento com as mãos", "pragmático", "confiável"],
    negativeTraits: ["Falta de comunicação", "rigidez", "falta de sentimentos", "procrastinação", "autoritarismo", "severidade"],
    description: `Os nascidos neste dia são muito disciplinados, constantes, regulares e ordeiros. Perseverantes em seus propósitos, incansáveis trabalhadores, dificilmente deixam de atingir seus objetivos.`
  },
  5: {
    title: "DIA DA VERSATILIDADE",
    positiveTraits: ["Versátil", "adaptável", "progressista", "fortes instintos", "magnético", "sortudo", "ousado", "amante da liberdade"],
    negativeTraits: ["Pouco confiável", "instável", "procrastinador", "inconsistente", "excessivamente confiante", "cabeça-dura"],
    description: `O nascido neste dia é normalmente divertido, alegre, ousado, dotado de poderes psíquicos, imaginação fértil, versatilidade e também amante da liberdade.`
  },
  6: {
    title: "DIA DO AMOR",
    positiveTraits: ["Universal", "fraterno", "compassivo", "confiável", "compreensivo", "solidário", "idealista", "humanitário"],
    negativeTraits: ["Insatisfeito", "ansiedade", "timidez", "irracionalidade", "teimosia", "dominação", "egoísmo"],
    description: `O nascido no dia seis é normalmente sentimental, muito equilibrado, compreensivo, adora a família, a casa, os amigos, os filhos e é também excelente amante.`
  },
  7: {
    title: "DIA DA INSPIRAÇÃO",
    positiveTraits: ["Culto", "confiável", "meticuloso", "idealista", "honesto", "com poderes psíquicos", "científico", "racional"],
    negativeTraits: ["Dissimulado", "pouco amigável", "fingido", "cético", "confuso", "inoportuno", "indiferente"],
    description: `Além da integridade inerente do número sete, ele também possui em larga escala a independência de pensamento, a iniciativa e a ponderação. É também um perfeccionista.`
  },
  8: {
    title: "DIA DO ÊXITO MATERIAL",
    positiveTraits: ["Liderança", "meticulosidade", "trabalhador", "autoridade", "proteção", "poder de cura", "bom juízo"],
    negativeTraits: ["Impaciência", "desperdício", "intolerância", "excesso de trabalho", "dominação", "falta de planejamento"],
    description: `O nascido neste dia é normalmente organizado, muito dedicado aos negócios, criativo e com enorme potencial para ganhar dinheiro.`
  },
  9: {
    title: "DIA DO HUMANISMO",
    positiveTraits: ["Idealista", "humanitário", "criativo", "sensível", "generoso", "magnético", "poético", "caridoso"],
    negativeTraits: ["Frustrado", "fragmentado", "inseguro", "egoísta", "pouco prático", "preocupado"],
    description: `O nativo deste dia é normalmente universalista: sente compaixão por todos e quer melhorar o gênero humano. Tolerante e gentil, é na maior parte das vezes generoso e liberal.`
  },
  10: {
    title: "DIA DA AUTOCONFIANÇA",
    positiveTraits: ["Liderança", "criatividade", "caráter progressista", "vigor", "otimismo", "fortes convicções", "independência"],
    negativeTraits: ["Arrogância", "ciúme", "egoísmo", "orgulho", "antagonismo", "falta de controle", "hesitação"],
    description: `O nativo deste dia é audacioso, progressista, independente, prestativo, amigo, atraente fisicamente, cativante e sempre pronto a ajudar àqueles que lhe pedem auxílio.`
  },
  11: {
    title: "DIA DA HARMONIA",
    positiveTraits: ["Equilíbrio", "concentração", "objetividade", "entusiasmo", "inspiração", "espiritualidade", "idealismo"],
    negativeTraits: ["Complexo de superioridade", "falta de objetivos", "excesso de emotividade", "dominador", "hipersensível"],
    description: `Apesar de ter como lema a harmonia, a inspiração está sempre presente em sua vida. É um diplomata por excelência; delicado nos termos, ações, possuindo tato e discernimento.`
  },
  12: {
    title: "DIA DA AUTO-EXPRESSÃO",
    positiveTraits: ["Criativo", "atraente", "capacidade de iniciativa", "disciplinador", "assertivo", "confiante"],
    negativeTraits: ["Reclusivo", "excêntrico", "pouco cooperativo", "excessivamente sensível", "falta de auto-estima"],
    description: `É comunicador nato; pela sua criatividade, expressão, e argumentação, consegue convencer todas as pessoas. Tem gosto artístico, habilidade manual, é idealista.`
  },
  13: {
    title: "DIA DA PERÍCIA",
    positiveTraits: ["Ambicioso", "criativo", "amor pela liberdade", "expressivo", "grande iniciativa"],
    negativeTraits: ["Impulsivo", "indeciso", "autoritário", "pouco emotivo", "rebelde"],
    description: `O nativo deste dia é meticuloso, autoritário, sistemático, prático, econômico, trabalhador incansável, sempre lutando em prol dos seus objetivos.`
  },
  14: {
    title: "DIA DA COMPREENSÃO",
    positiveTraits: ["Ações decididas", "trabalhador", "sortudo", "criativo", "pragmático", "imaginativo", "habilidoso"],
    negativeTraits: ["Excessivamente cauteloso", "impulsivo", "instável", "sem consideração", "teimoso"],
    description: `Potencial intelectual, perspectiva pragmática e forte determinação são algumas das qualidades associadas a esta data de nascimento.`
  },
  15: {
    title: "DIA DO MAGNETISMO PESSOAL",
    positiveTraits: ["Disposição", "generosidade", "responsabilidade", "amabilidade", "cooperação", "ideias criativas"],
    negativeTraits: ["Inquieto", "autocentrado", "medo de mudar", "perda da fé", "preocupação", "indecisão"],
    description: `Como o dia sugere: "magnetismo pessoal", esse magnetismo é levado às últimas consequências, pois tanto homens como mulheres lhe acham simpático, agradável, afetuoso e interessante.`
  },
  16: {
    title: "DIA DO TRIUNFO",
    positiveTraits: ["Responsabilidade", "integridade", "intuição", "sociabilidade", "cooperação", "discernimento"],
    negativeTraits: ["Preocupação", "insatisfação", "irritabilidade", "egoísmo", "ceticismo", "falta de solidariedade"],
    description: `É um extremista! Quem nasce neste dia pode ser o mais miserável dos seres, ou o maior dos ricos. Dependendo da vida que levar, pode transformar seu possuidor numa pessoa poderosa, rica.`
  },
  17: {
    title: "DIA DA PERSPICÁCIA",
    positiveTraits: ["Ponderação", "especialização", "capacidade de planejamento", "senso para negócios", "trabalhador", "científico"],
    negativeTraits: ["Distante", "teimoso", "descuidado", "mal-humorado", "sensível", "crítico", "preocupado"],
    description: `O nativo deste dia é naturalmente um líder inteligente e arguto. Está quase sempre de bom humor e consegue ser simpático até com os opositores.`
  },
  18: {
    title: "DIA DO PODER MENTAL",
    positiveTraits: ["Progressista", "assertivo", "alto poder de intuição", "corajoso", "resoluto", "eficiente"],
    negativeTraits: ["Emoções descontroladas", "falta de ordem", "egoísmo", "vaidade", "ambição desmedida"],
    description: `O dia 18 é o dia dos bruxos, dos magos, dos médiuns famosos e dos religiosos poderosos. É, também, o dia dos seres felizes e infelizes, ou seja, o dia dos extremos.`
  },
  19: {
    title: "DIA DO CARÁTER",
    positiveTraits: ["Dinamismo", "criatividade", "liderança", "progressismo", "otimismo", "competitividade", "independência"],
    negativeTraits: ["Egocentrismo", "preocupação", "medo de ser rejeitado", "materialismo", "impaciência", "tendência à depressão"],
    description: `19 é o dia do sucesso, da prosperidade e também da felicidade. Esta vibração altamente positiva tem em si embutido também certa tendência à arrogância à teimosia e à vaidade.`
  },
  20: {
    title: "DIA DA SENSIBILIDADE",
    positiveTraits: ["Boas parcerias", "gentileza", "tato", "receptividade", "intuição", "consideração", "harmonia"],
    negativeTraits: ["Desconfiança", "subserviência", "timidez", "sensibilidade excessiva", "egoísmo", "tendência a magoar-se"],
    description: `O nativo deste dia é sensível, intuitivo, adaptável e compreensivo, e gosta de pertencer a um grupo. Em geral aprecia atividades cooperativas.`
  },
  21: {
    title: "DIA DO IDEALISMO",
    positiveTraits: ["Inspiração", "criatividade", "uniões por amor", "relacionamentos duradouros"],
    negativeTraits: ["Dependência", "temperamental", "nervoso", "falta de visão", "medo de mudanças"],
    description: `Apesar de ser idealista e liberal, o nativo deste dia necessita da companhia de outras pessoas, pois dessa irmandade depende o seu sucesso e também o seu bem estar.`
  },
  22: {
    title: "DIA DA PRATICIDADE",
    positiveTraits: ["Intuição elevada", "pragmatismo", "praticidade", "habilidade com as mãos", "capacidade de organização"],
    negativeTraits: ["Esquemas de enriquecimento rápido", "nervosismo", "autoritarismo", "materialismo", "falta de visão"],
    description: `O nativo deste dia, como especificado, é tremendamente prático, adapta-se a qualquer tipo de trabalho e para atingir seus objetivos é capaz de feitos heroicos.`
  },
  23: {
    title: "DIA DA PERSUASÃO",
    positiveTraits: ["Lealdade", "responsabilidade", "adora viajar", "comunicativo", "intuitivo", "criativo", "versátil"],
    negativeTraits: ["Egoísta", "inseguro", "teimoso", "inflexível", "crítico", "reservado", "preconceituoso"],
    description: `É o número do sucesso material, do dinheiro, e o seu portador precisa aprender a seguir caminhos profissionais, de preferência os de alto nível.`
  },
  24: {
    title: "DIA DA UNIÃO",
    positiveTraits: ["Energia", "idealismo", "habilidades práticas", "forte determinação", "honestidade", "franqueza", "justiça"],
    negativeTraits: ["Materialista", "muito econômico", "aversão à rotina", "pouco confiável", "dominador", "teimoso"],
    description: `Quem nasce no dia 24, além dos predicados descritos, é também grande amigo, amante da verdade e tolerante com as falhas alheias.`
  },
  25: {
    title: "DIA DO PROGRESSO",
    positiveTraits: ["Altamente intuitivo", "perfeccionista", "perceptivo", "mente criativa", "ponderado", "talento para lidar com pessoas"],
    negativeTraits: ["Impulsivo", "impaciiente", "excessivamente emotivo", "ciumento", "reservado", "instável"],
    description: `O nativo deste dia, além da ambição material inerente ao ser humano, vive constantemente em busca do desejo da moralidade.`
  },
  26: {
    title: "DIA DA JUSTIÇA",
    positiveTraits: ["Prático", "atencioso", "orgulhoso da família", "entusiástico", "corajoso", "justo", "perseverante"],
    negativeTraits: ["Teimoso", "rebelde", "falta de entusiasmo", "falta de persistência", "relacionamentos instáveis"],
    description: `A justiça na sua mais pura expressão, a perseverança e a moderação são as principais características do nativo deste dia.`
  },
  27: {
    title: "DIA DA AUDÁCIA",
    positiveTraits: ["Versátil", "imaginativo", "criativo", "resoluto", "corajoso", "compreensivo", "inventivo", "espiritual"],
    negativeTraits: ["Brigão", "inquieto", "nervoso", "desconfiado", "protelador"],
    description: `O nativo deste excelente dia é normalmente conhecedor dos mistérios da vida e pode, se quiser, ir a extremos: para o bem ou para o mal.`
  },
  28: {
    title: "DIA DO QUERER",
    positiveTraits: ["Compaixão", "progressismo", "temperamento artístico", "ambição", "trabalho", "vida doméstica estável"],
    negativeTraits: ["Sonhador", "falta de compaixão", "autoritário", "agressividade", "falta de confiança", "orgulho"],
    description: `É muito contraditório, pois nasceu com o dom do querer, mas vive se queixando. Livre dessa face doentia poderá se impor a tudo e a todos.`
  },
  29: {
    title: "DIA DA ESPIRITUALIDADE",
    positiveTraits: ["Inspiração", "equilíbrio", "paz interior", "generosidade", "sucesso", "criatividade", "intuição", "misticismo"],
    negativeTraits: ["Nervosismo", "mau humor", "extremismo", "falta de consideração", "arrogância", "orgulho"],
    description: `Quem nasce neste dia e souber direcionar sua vida para o bem, conseguirá tudo o que desejar. É um ser altamente espiritualizado.`
  },
  30: {
    title: "DIA DA REALIZAÇÃO",
    positiveTraits: ["Amor à diversão", "lealdade", "amizade", "talento com as palavras", "criatividade", "generosidade"],
    negativeTraits: ["Preguiça", "obstinação", "impaciência", "insegurança", "indiferença", "desperdício de energia"],
    description: `Amável e caloroso, gosta de atividades sociais e pode ser excepcionalmente carismático e leal. Estar apaixonado ou emocionalmente satisfeito é um requisito fundamental.`
  },
  31: {
    title: "DIA DA HABILIDADE",
    positiveTraits: ["Liderança", "criatividade", "progressista", "vigoroso", "otimista", "fortes convicções", "competitivo"],
    negativeTraits: ["Arrogância", "ciúme", "egoísmo", "orgulho", "fraqueza de caráter", "hesitação", "impaciência"],
    description: `Como o número indica, os seus nativos possuem grande habilidade, capacidade, autoridade, e gostam de segurança econômica, e também dão grande valor às suas realizações.`
  }
};

// Interpretações dos Anos Pessoais (1-9)
export const personalYearInterpretations = {
  1: {
    title: "PLANTANDO AS SEMENTES",
    objective: "Ano para começar coisas novas",
    whatToDo: "Ser independente, criativo, seguro, seletivo e seguir a própria intuição",
    dangers: "Falta de iniciativa que poderá influenciar em todo ciclo de 9 anos"
  },
  2: {
    title: "AS SEMENTES CRIAM RAÍZES",
    objective: "Ano para agir com discrição e ser paciente e receptivo",
    whatToDo: "Ser diplomata, delicado e cooperativo no trato com as outras pessoas",
    dangers: "Propensão para discussões ou ser excessivamente atrevido"
  },
  3: {
    title: "SURGEM OS PRIMEIROS BROTOS",
    objective: "Ano de crescimento pessoal e cultivo de novas amizades",
    whatToDo: "Dar vazão à criatividade, evitar extravagâncias e dispersão de energia",
    dangers: "Perda de grandes oportunidades em razão da dispersão das energias"
  },
  4: {
    title: "CAVANDO E CAPINANDO",
    objective: "Ano de restrições, trabalho duro e autodisciplina",
    whatToDo: "Ser autodisciplinado, metódico e dar forma concreta às ideias",
    dangers: "Negligência com a saúde e acomodamento profissional"
  },
  5: {
    title: "FORMAM-SE OS BOTÕES",
    objective: "Ano para abandonar-se aos impulsos da vida e viver o presente",
    whatToDo: "Desenvolver a própria personalidade, tornar-se adaptável e aproveitar as oportunidades",
    dangers: "Dispersão de energias, excesso de atividades sexuais e não acompanhar o ritmo normal da vida"
  },
  6: {
    title: "FLORAÇÃO",
    objective: "Ano para dedicação altruísta à família e à comunidade",
    whatToDo: "Amar e dedicar-se mais à família em todos os seus aspectos",
    dangers: "Ser excessivamente idealista e esperar demasiado dos outros"
  },
  7: {
    title: "AS PLANTAS DÃO FRUTOS",
    objective: "Ano para isolamento, descanso e aperfeiçoamento interior",
    whatToDo: "Estudar os significados últimos da vida e evitar atividades materialistas",
    dangers: "Negligenciar a saúde, forçar decisões, ser crítico e permitir que complexos aflorem"
  },
  8: {
    title: "ÉPOCA DA COLHEITA",
    objective: "Ano dinâmico e materialista. Hora de pagar e cobrar dívidas",
    whatToDo: "Ter coragem de ousar grandes feitos, usar o bom senso, preocupar-se com o dinheiro e ser organizado",
    dangers: "Ser emotivo, sentimental e gastar mais do que ganha"
  },
  9: {
    title: "ÉPOCA DE LIMPAR A TERRA",
    objective: "Ano de faxina entre o fim de um ciclo e o começo do próximo",
    whatToDo: "Excelente fase para escrever, representar, viajar e para dedicar-se a estudos metafísicos",
    dangers: "Ser ciumento e possessivo"
  }
};

// Interpretações dos Desafios (0-8)
export const challengeInterpretations = {
  0: {
    title: "DESAFIO DA ESCOLHA",
    description: `É o desafio da escolha. Caso tenha um desafio 0, poderá ser altamente evoluído e terá de tomar suas próprias decisões. Deve atentar para todos os desafios sem uma ênfase especial em qualquer deles. Espera-se que decida por si mesmo quais as armadilhas que a vida lhe reserva.

O consulente com esse Desafio está vibrando em todas as esferas e o "dever aprender" passa a ser uma "obrigação", visto que muitas coisas especiais e elevadas lhe estão sendo projetadas.`
  },
  1: {
    title: "DESAFIO DA INDEPENDÊNCIA",
    description: `Precisará aprender a se situar num meio termo entre um sentimento excessivo ou insuficiente de sua própria personalidade ou importância. Precisa aprender a ser firme, positivo independente e autoconfiante, sem impor sua vontade às outras pessoas ou esperar que tudo gire em torno de si.`
  },
  2: {
    title: "DESAFIO DA SENSIBILIDADE",
    description: `Poderá tender a ser tão sensível em relação aos seus próprios sentimentos e a passar tanto tempo pensando neles, que acabará não tomando conhecimento dos sentimentos dos outros. Pequenas coisas são ampliadas fora de qualquer proporção e nunca esquecidas ou perdoadas. Precisa aprender a cuidar de si mesmo, a cultivar uma atitude mais liberal e tolerante.`
  },
  3: {
    title: "DESAFIO DA EXPRESSÃO",
    description: `Precisará aprender a situar-se num meio termo, entre ter medo de contatos sociais e ser por demais festeiro. Tem de aprender a ser sociável e a exprimir suas ideias e sentimentos sem dispersar suas energias ou comportar-se como pessoa fútil.`
  },
  4: {
    title: "DESAFIO DO TRABALHO",
    description: `É o mais fácil de todos os desafios, visto que não há nenhum conflito envolvido. Precisa aprender a situar-se num meio termo entre agir como um "burro de carga" ou ser preguiçoso.`
  },
  5: {
    title: "DESAFIO DA LIBERDADE",
    description: `Precisa aprender a situar-se num meio-termo entre desejar uma liberdade excessiva e ter um receio injustificado dela - entre uma ânsia exagerada de experiências sensuais e o medo de tentar coisas novas. Precisa aprender a não buscar sexo, álcool e drogas e - o mais difícil de tudo - precisa aprender quando e como renunciar a pessoas ou coisas.`
  },
  6: {
    title: "DESAFIO DA RESPONSABILIDADE",
    description: `Precisa aprender a situar-se num meio termo entre comportar-se como um "capacho" ou ser demasiado exigente e dominador. Precisa aprender a aceitar as pessoas como elas são sem esperar que elas vivam de acordo com os seus padrões; respeitar os pontos de vista de todos.`
  },
  7: {
    title: "DESAFIO DA SABEDORIA",
    description: `Precisará aprender a situar-se num meio termo entre o orgulho excessivo e a modéstia exagerada. Deveria tomar cuidado para não se refugiar dentro de si mesmo e nem tentar escapar das coisas desagradáveis da vida, recorrendo ao álcool e às drogas. É particularmente importante uma boa educação, aprender a compreender o que se passa no mundo à sua volta e - acima de tudo - ter fé.`
  },
  8: {
    title: "DESAFIO DO PODER",
    description: `Precisará aprender a situar-se num meio termo entre uma preocupação excessiva com as questões materiais, e um desinteresse exagerado em relação a esse assunto. Precisa aprender a utilizar corretamente o dinheiro e o poder e a voltar seu pensamento para outras coisas que não o dinheiro e o que ele poderá fazer por você.`
  }
};