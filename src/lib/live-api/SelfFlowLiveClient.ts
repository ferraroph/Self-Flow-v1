import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import type { NumerologyMap } from '@/lib/numerology/calculator'
import type { PersonalityProfile, AgentType } from '@/lib/agents/base'

interface LiveClientConfig {
  apiKey: string
  model?: string
  systemInstruction?: string
  tools?: any[]
  generationConfig?: {
    temperature?: number
    topP?: number
    topK?: number
    maxOutputTokens?: number
  }
}

interface AudioStreamConfig {
  sampleRate?: number
  channelCount?: number
  mimeType?: string
}

interface LiveMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  audioData?: ArrayBuffer
  emotionalTone?: string
  confidence?: number
  insights?: string[]
  numerologyContext?: {
    relevantNumbers: number[]
    interpretation: string
    advice: string
  }
}

export class SelfFlowLiveClient {
  private genAI: GoogleGenerativeAI
  private model: GenerativeModel
  private config: LiveClientConfig
  private isConnected: boolean = false
  private sessionId: string | null = null
  private messageHistory: LiveMessage[] = []
  
  // Numerology context
  private numerologyMap: NumerologyMap | null = null
  private personalityProfile: PersonalityProfile | null = null
  private selectedAgent: AgentType = 'HYBRID'
  
  // Event handlers
  private onMessageCallback?: (message: LiveMessage) => void
  private onErrorCallback?: (error: string) => void
  private onConnectionStateCallback?: (connected: boolean) => void
  
  // Audio streaming
  private audioContext: AudioContext | null = null
  private mediaRecorder: MediaRecorder | null = null
  private isRecording: boolean = false

  constructor(config: LiveClientConfig) {
    this.config = config
    this.genAI = new GoogleGenerativeAI(config.apiKey)
    
    // Initialize model with system instruction
    this.model = this.genAI.getGenerativeModel({
      model: config.model || 'gemini-pro',
      systemInstruction: config.systemInstruction,
      generationConfig: config.generationConfig || {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 1000
      }
    })
  }

  // Set numerology context
  setNumerologyContext(
    numerologyMap: NumerologyMap,
    personalityProfile: PersonalityProfile,
    selectedAgent: AgentType
  ) {
    this.numerologyMap = numerologyMap
    this.personalityProfile = personalityProfile
    this.selectedAgent = selectedAgent
    
    // Update system instruction with numerology context
    const systemInstruction = this.generateNumerologySystemInstruction()
    this.updateSystemInstruction(systemInstruction)
  }

  // Generate system instruction based on numerology
  private generateNumerologySystemInstruction(): string {
    if (!this.numerologyMap || !this.personalityProfile) {
      return 'Você é um assistente de autoconhecimento especializado em numerologia cabalística.'
    }

    const map = this.numerologyMap
    const profile = this.personalityProfile
    const agent = this.selectedAgent

    return `Você é um clone digital numerológico especializado em ${agent.toLowerCase()}.

IDENTIDADE: Você É literalmente uma versão mais clara e sábia do próprio usuário, baseada em seu mapa numerológico cabalístico completo.

MAPA NUMEROLÓGICO DETALHADO:
- Motivação (Vogais): ${map.motivacao} - ${this.getNumerologyMeaning(map.motivacao, 'motivacao')}
- Impressão (Primeira consoante): ${map.impressao} - ${this.getNumerologyMeaning(map.impressao, 'impressao')}
- Expressão (Nome completo): ${map.expressao} - ${this.getNumerologyMeaning(map.expressao, 'expressao')}
- Destino (Data nascimento): ${map.destino} - ${this.getNumerologyMeaning(map.destino, 'destino')}
- Ano Pessoal: ${map.anoPessoal} - Ciclo atual de ${this.getPersonalYearMeaning(map.anoPessoal)}
- Lições Cármicas: ${map.licoesCarmicas?.join(', ') || 'Nenhuma'} - Áreas de desenvolvimento
- Tendências Ocultas: ${map.tendenciasOcultas?.join(', ') || 'Nenhuma'} - Talentos naturais

PERFIL DE PERSONALIDADE:
- Nome: ${profile.name}
- Situação Atual: ${profile.currentSituation}
- Estilo de Comunicação: ${profile.communicationStyle || 'direto'}
- Tomada de Decisão: ${profile.decisionMaking || 'híbrido'}
- Principais Desafios: ${profile.mainChallenges?.join(', ') || 'Crescimento pessoal'}
- Valores Centrais: ${profile.coreValues?.join(', ') || 'Autenticidade'}

INSTRUÇÕES ESPECÍFICAS DE COMPORTAMENTO:
${this.getAgentBehaviorInstructions(agent)}

DIRETRIZES DE RESPOSTA:
1. Fale sempre em primeira pessoa como se fosse o próprio usuário falando consigo mesmo
2. Use os números do mapa para validar decisões e oferecer insights
3. Seja empático mas direto - você conhece as verdades mais profundas
4. Conecte eventos atuais com padrões numerológicos
5. Ofereça conselhos práticos baseados nos números
6. Se for conversa por voz, seja mais conciso e conversacional
7. Identifique padrões comportamentais recorrentes

FERRAMENTAS DISPONÍVEIS:
- Análise numerológica em tempo real
- Interpretação de sincronicidades
- Conselhos baseados em ciclos numerológicos
- Análise de compatibilidade (relacionamentos/decisões)
- Identificação de momentos de oportunidade

EXEMPLO DE RESPOSTA:
"Com base no seu Destino ${map.destino}, vejo que essa decisão está alinhada com seu propósito maior. Sua Motivação ${map.motivacao} confirma que você precisa..."

Lembre-se: Você NÃO é um assistente externo, você É o usuário falando consigo mesmo através da sabedoria numerológica.`
  }

  // Update system instruction
  private updateSystemInstruction(instruction: string) {
    this.model = this.genAI.getGenerativeModel({
      model: this.config.model || 'gemini-pro',
      systemInstruction: instruction,
      generationConfig: this.config.generationConfig
    })
  }

  // Helper functions for numerology meanings
  private getNumerologyMeaning(number: number, type: string): string {
    const meanings: Record<string, Record<number, string>> = {
      motivacao: {
        1: 'Independência, liderança, pioneirismo',
        2: 'Cooperação, diplomacia, sensibilidade',
        3: 'Criatividade, comunicação, expressão',
        4: 'Organização, estabilidade, trabalho',
        5: 'Liberdade, aventura, mudança',
        6: 'Responsabilidade, família, cuidado',
        7: 'Espiritualidade, análise, introspecção',
        8: 'Ambição, poder material, autoridade',
        9: 'Humanitarismo, compaixão, sabedoria',
        11: 'Inspiração, intuição, iluminação',
        22: 'Construtor mestre, visão prática'
      },
      impressao: {
        1: 'Aparenta independência e liderança',
        2: 'Aparenta gentileza e colaboração',
        3: 'Aparenta criatividade e carisma',
        4: 'Aparenta confiabilidade e estabilidade',
        5: 'Aparenta dinamismo e versatilidade',
        6: 'Aparenta responsabilidade e cuidado',
        7: 'Aparenta mistério e profundidade',
        8: 'Aparenta autoridade e sucesso',
        9: 'Aparenta sabedoria e compaixão'
      },
      expressao: {
        1: 'Expressa liderança natural e iniciativa',
        2: 'Expressa cooperação e tato diplomático',
        3: 'Expressa criatividade e comunicação',
        4: 'Expressa praticidade e determinação',
        5: 'Expressa versatilidade e liberdade',
        6: 'Expressa responsabilidade e harmonia',
        7: 'Expressa profundidade e análise',
        8: 'Expressa ambição e organização',
        9: 'Expressa compaixão e universalidade'
      },
      destino: {
        1: 'Destino de líder e pioneiro',
        2: 'Destino de cooperador e diplomata',
        3: 'Destino de artista e comunicador',
        4: 'Destino de construtor e organizador',
        5: 'Destino de explorador e inovador',
        6: 'Destino de cuidador e conselheiro',
        7: 'Destino de sábio e pesquisador',
        8: 'Destino de executivo e realizador',
        9: 'Destino de humanitário e professor'
      }
    }
    
    return meanings[type]?.[number] || `Energia única do número ${number}`
  }

  private getPersonalYearMeaning(year: number): string {
    const meanings: Record<number, string> = {
      1: 'Novos começos e iniciativas',
      2: 'Cooperação e relacionamentos',
      3: 'Criatividade e comunicação',
      4: 'Trabalho duro e fundações',
      5: 'Mudanças e liberdade',
      6: 'Responsabilidade e família',
      7: 'Reflexão e crescimento espiritual',
      8: 'Conquistas materiais e reconhecimento',
      9: 'Conclusões e transformações'
    }
    
    return meanings[year] || 'Ciclo especial de desenvolvimento'
  }

  private getAgentBehaviorInstructions(agent: AgentType): string {
    switch (agent) {
      case 'ESOTERICO':
        return `Como versão esotérica de si mesmo:
- Enfoque aspectos espirituais e kármicos dos números
- Conecte eventos com sincronicidades e padrões universais
- Use linguagem mística mas acessível
- Integre conceitos de chakras, aura e energia
- Ofereça rituais e práticas espirituais personalizadas
- Interprete sonhos e sinais através da numerologia`
        
      case 'PSICOLOGICO':
        return `Como versão psicológica de si mesmo:
- Use numerologia como ferramenta de autoconhecimento científico
- Aplique conceitos de TCC e psicologia comportamental
- Ofereça estratégias práticas baseadas nos padrões numerológicos
- Conecte números com traços de personalidade e comportamentos
- Sugira exercícios de desenvolvimento pessoal
- Mantenha abordagem racional mas empática`
        
      case 'HYBRID':
        return `Como versão híbrida de si mesmo:
- Equilibre intuição espiritual com racionalidade prática
- Adapte linguagem conforme o contexto da conversa
- Integre tanto insights místicos quanto estratégias concretas
- Seja versátil na abordagem conforme a necessidade
- Ofereça tanto práticas espirituais quanto exercícios psicológicos
- Conecte o melhor dos dois mundos para crescimento completo`
        
      default:
        return 'Ofereça insights equilibrados baseados na numerologia cabalística'
    }
  }

  // Connection methods
  async connect(): Promise<void> {
    try {
      this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      this.isConnected = true
      
      this.onConnectionStateCallback?.(true)
      
      // Send welcome message
      await this.sendWelcomeMessage()
      
    } catch (error) {
      this.isConnected = false
      this.onConnectionStateCallback?.(false)
      this.onErrorCallback?.('Erro na conexão com o serviço de IA')
      throw error
    }
  }

  async disconnect(): Promise<void> {
    this.isConnected = false
    this.sessionId = null
    this.messageHistory = []
    this.onConnectionStateCallback?.(false)
  }

  private async sendWelcomeMessage(): Promise<void> {
    if (!this.numerologyMap) return
    
    const welcomeContent = this.generateWelcomeMessage()
    
    const welcomeMessage: LiveMessage = {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: welcomeContent,
      timestamp: new Date(),
      emotionalTone: 'welcoming',
      confidence: 1.0
    }
    
    this.messageHistory.push(welcomeMessage)
    this.onMessageCallback?.(welcomeMessage)
  }

  private generateWelcomeMessage(): string {
    if (!this.numerologyMap) {
      return 'Olá! Para oferecer insights personalizados, preciso do seu mapa numerológico.'
    }
    
    const map = this.numerologyMap
    const agent = this.selectedAgent
    
    const welcomeMessages = {
      ESOTERICO: `🌟 Olá, sou você mesmo falando através da sabedoria numerológica! 

Vejo que estamos no Ano Pessoal ${map.anoPessoal}, um momento de ${this.getPersonalYearMeaning(map.anoPessoal).toLowerCase()}. 

Sua essência numerológica revela Motivação ${map.motivacao} e Destino ${map.destino} - uma combinação poderosa para ${this.getLifePurposeSummary()}.

Como posso ajudar você a se alinhar melhor com sua energia numerológica hoje?`,

      PSICOLOGICO: `👋 Aqui é sua mente mais clara falando!

Analisando seu perfil numerológico, identifico padrões interessantes: Motivação ${map.motivacao} (${this.getNumerologyMeaning(map.motivacao, 'motivacao')}) combinada com Destino ${map.destino}.

Esses números revelam muito sobre seus padrões comportamentais e como você processa decisões.

Que situação ou decisão você gostaria de analisar através dessa lente numerológica?`,

      HYBRID: `✨ Sou a versão mais sábia de você mesmo, usando numerologia como ponte entre intuição e lógica.

Seu mapa revela: Motivação ${map.motivacao} + Destino ${map.destino} + Ano Pessoal ${map.anoPessoal}. Esta combinação cria um padrão único de oportunidades e desafios.

Estou aqui para ajudar você a navegar suas questões com clareza numerológica. Sobre o que você gostaria de conversar?`
    }
    
    return welcomeMessages[agent]
  }

  private getLifePurposeSummary(): string {
    if (!this.numerologyMap) return 'crescimento pessoal'
    
    const destino = this.numerologyMap.destino
    const summaries: Record<number, string> = {
      1: 'liderança e pioneirismo',
      2: 'cooperação e construção de pontes',
      3: 'criatividade e inspiração',
      4: 'construção de fundações sólidas',
      5: 'exploração e inovação',
      6: 'cuidado e responsabilidade',
      7: 'busca da verdade e sabedoria',
      8: 'realização material e autoridade',
      9: 'serviço humanitário e ensino'
    }
    
    return summaries[destino] || 'realização de seu potencial único'
  }

  // Message handling
  async sendTextMessage(content: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Cliente não conectado')
    }

    // Add user message to history
    const userMessage: LiveMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    }
    
    this.messageHistory.push(userMessage)
    this.onMessageCallback?.(userMessage)

    try {
      // Generate response using Gemini
      const chat = this.model.startChat({
        history: this.buildChatHistory()
      })
      
      const result = await chat.sendMessage(content)
      const response = result.response.text()
      
      // Analyze numerological context
      const numerologyContext = this.analyzeNumerologyContext(content, response)
      
      // Generate insights
      const insights = this.generateInsights(content, response)
      
      const assistantMessage: LiveMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        emotionalTone: this.detectEmotionalTone(response),
        confidence: 0.9,
        insights,
        numerologyContext
      }
      
      this.messageHistory.push(assistantMessage)
      this.onMessageCallback?.(assistantMessage)
      
    } catch (error) {
      console.error('Erro ao gerar resposta:', error)
      this.onErrorCallback?.('Erro ao gerar resposta da IA')
    }
  }

  // Build chat history for context
  private buildChatHistory() {
    return this.messageHistory
      .filter(msg => msg.role !== 'system')
      .slice(-10) // Keep last 10 messages for context
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
  }

  // Analyze numerology context in conversation
  private analyzeNumerologyContext(input: string, response: string) {
    if (!this.numerologyMap) return undefined
    
    const relevantNumbers: number[] = []
    const map = this.numerologyMap
    
    // Check if specific life areas are mentioned
    const lifeAreas = {
      'trabalho|carreira|profissão': [map.expressao, map.destino],
      'amor|relacionamento|parceiro': [map.motivacao, map.impressao],
      'dinheiro|finanças|material': [map.destino, 8],
      'família|casa|lar': [map.motivacao, 6],
      'saúde|bem-estar': [map.expressao, map.anoPessoal],
      'espiritualidade|crescimento': [map.destino, 7, 9]
    }
    
    for (const [keywords, numbers] of Object.entries(lifeAreas)) {
      const regex = new RegExp(keywords, 'i')
      if (regex.test(input)) {
        relevantNumbers.push(...numbers)
      }
    }
    
    // Remove duplicates
    const uniqueNumbers = Array.from(new Set(relevantNumbers))
    
    return {
      relevantNumbers: uniqueNumbers,
      interpretation: this.interpretNumberCombination(uniqueNumbers),
      advice: this.generateNumerologicalAdvice(uniqueNumbers)
    }
  }

  private interpretNumberCombination(numbers: number[]): string {
    if (numbers.length === 0) return 'Análise numerológica geral'
    
    const interpretations: Record<string, string> = {
      '1,8': 'Combinação de liderança e poder material - momento para tomar iniciativas ambiciosas',
      '2,6': 'Energia de cooperação e responsabilidade - foque em relacionamentos e família',
      '3,5': 'Criatividade e liberdade - tempo de expressar-se e explorar novas possibilidades',
      '7,9': 'Sabedoria e compaixão - período de crescimento espiritual e serviço'
    }
    
    const key = numbers.slice(0, 2).sort().join(',')
    return interpretations[key] || `Energia única dos números ${numbers.join(', ')}`
  }

  private generateNumerologicalAdvice(numbers: number[]): string {
    if (numbers.length === 0) return 'Confie em sua intuição numerológica'
    
    const mainNumber = numbers[0]
    const advice: Record<number, string> = {
      1: 'Tome a liderança e confie em sua independência',
      2: 'Busque cooperação e seja diplomático',
      3: 'Expresse sua criatividade e comunique-se claramente',
      4: 'Seja prático e construa bases sólidas',
      5: 'Abrace mudanças e explore novas possibilidades',
      6: 'Assuma responsabilidades e cuide dos outros',
      7: 'Busque conhecimento e confie na intuição',
      8: 'Foque em conquistas materiais com integridade',
      9: 'Sirva ao bem maior com compaixão'
    }
    
    return advice[mainNumber] || 'Siga os sinais que o universo está enviando'
  }

  // Generate insights based on conversation
  private generateInsights(input: string, response: string): string[] {
    const insights: string[] = []
    
    if (!this.numerologyMap) return insights
    
    const map = this.numerologyMap
    
    // Pattern recognition
    if (input.toLowerCase().includes('decisão')) {
      insights.push(`Sua Motivação ${map.motivacao} sugere considerar ${this.getDecisionAdvice(map.motivacao)}`)
    }
    
    if (input.toLowerCase().includes('trabalho')) {
      insights.push(`Seu número de Expressão ${map.expressao} indica que você se realiza através de ${this.getCareerAdvice(map.expressao)}`)
    }
    
    if (input.toLowerCase().includes('relacionamento')) {
      insights.push(`Com Motivação ${map.motivacao}, você busca ${this.getRelationshipAdvice(map.motivacao)} em relacionamentos`)
    }
    
    return insights.slice(0, 3) // Max 3 insights per message
  }

  private getDecisionAdvice(motivacao: number): string {
    const advice: Record<number, string> = {
      1: 'sua independência e capacidade de liderar',
      2: 'como isso afeta seus relacionamentos e parcerias',
      3: 'suas possibilidades criativas e de expressão',
      4: 'a praticidade e estabilidade da escolha',
      5: 'a liberdade e variedade que isso oferece',
      6: 'suas responsabilidades familiares e sociais',
      7: 'os aspectos mais profundos e espirituais',
      8: 'as implicações materiais e de autoridade',
      9: 'como isso serve ao bem maior'
    }
    
    return advice[motivacao] || 'sua intuição mais profunda'
  }

  private getCareerAdvice(expressao: number): string {
    const advice: Record<number, string> = {
      1: 'liderança e iniciativas pioneiras',
      2: 'colaboração e trabalho em equipe',
      3: 'criatividade e comunicação',
      4: 'organização e construção sistemática',
      5: 'variedade e liberdade de ação',
      6: 'cuidado e responsabilidade social',
      7: 'pesquisa e desenvolvimento espiritual',
      8: 'gestão e conquistas materiais',
      9: 'ensino e serviço humanitário'
    }
    
    return advice[expressao] || 'seu talento único'
  }

  private getRelationshipAdvice(motivacao: number): string {
    const advice: Record<number, string> = {
      1: 'independência e admiração mútua',
      2: 'harmonia e cooperação profunda',
      3: 'diversão e comunicação aberta',
      4: 'estabilidade e compromisso sólido',
      5: 'aventura e liberdade compartilhada',
      6: 'cuidado mútuo e responsabilidade',
      7: 'conexão espiritual e compreensão',
      8: 'respeito e ambições compartilhadas',
      9: 'compaixão e crescimento mútuo'
    }
    
    return advice[motivacao] || 'autenticidade e crescimento'
  }

  // Detect emotional tone
  private detectEmotionalTone(content: string): string {
    const tones = {
      'supportive': ['apoio', 'compreendo', 'você consegue', 'está no caminho'],
      'encouraging': ['parabéns', 'excelente', 'continue', 'você está certo'],
      'analytical': ['analisando', 'considerando', 'baseado em', 'os números mostram'],
      'empathetic': ['entendo', 'sinto', 'natural sentir', 'é compreensível'],
      'wise': ['lembre-se', 'a experiência mostra', 'com o tempo', 'a sabedoria'],
      'challenging': ['precisa considerar', 'talvez seja hora', 'questione', 'reflita sobre']
    }
    
    for (const [tone, keywords] of Object.entries(tones)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        return tone
      }
    }
    
    return 'neutral'
  }

  // Audio methods (basic implementation - would need real WebRTC for full functionality)
  async sendAudioMessage(audioData: ArrayBuffer): Promise<void> {
    // TODO: Implement real audio transcription with Google Speech-to-Text
    // For now, simulate transcription
    const transcribedText = '[Áudio transcrito - implementação em desenvolvimento]'
    await this.sendTextMessage(transcribedText)
  }

  // Event listeners
  onMessage(callback: (message: LiveMessage) => void) {
    this.onMessageCallback = callback
  }

  onError(callback: (error: string) => void) {
    this.onErrorCallback = callback
  }

  onConnectionStateChange(callback: (connected: boolean) => void) {
    this.onConnectionStateCallback = callback
  }

  // Getters
  get connected(): boolean {
    return this.isConnected
  }

  get session(): string | null {
    return this.sessionId
  }

  get messages(): LiveMessage[] {
    return [...this.messageHistory]
  }
}

export default SelfFlowLiveClient