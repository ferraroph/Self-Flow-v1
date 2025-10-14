import React, { createContext, useContext, useState, useEffect } from 'react'
import type { NumerologyMap } from '@/lib/numerology/calculator'
import type { PersonalityProfile, AgentType } from '@/lib/agents/base'

// Types para o LiveAPI
interface LiveAPIConfig {
  apiKey: string
  model?: string
  systemInstruction?: string
  tools?: any[]
}

interface LiveAPIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  audioData?: ArrayBuffer
  emotionalTone?: string
  confidence?: number
  insights?: string[]
}

interface LiveAPIState {
  isConnected: boolean
  isRecording: boolean
  isSpeaking: boolean
  messages: LiveAPIMessage[]
  error: string | null
  sessionId: string | null
  isLoading: boolean
  audioLevel: number
  config: LiveAPIConfig | null
}

interface LiveAPIContextType extends LiveAPIState {
  // Connection methods
  connect: (config: LiveAPIConfig) => Promise<void>
  disconnect: () => Promise<void>
  reconnect: () => Promise<void>
  
  // Audio methods
  startRecording: () => Promise<void>
  stopRecording: () => void
  sendAudio: (audioData: ArrayBuffer) => Promise<void>
  
  // Message methods
  sendTextMessage: (message: string) => Promise<void>
  clearMessages: () => void
  
  // Utility methods
  setSystemInstruction: (instruction: string) => void
  generateNumerologyPrompt: (map: NumerologyMap, profile: PersonalityProfile, agent: AgentType) => string
  
  // Error handling
  clearError: () => void
}

// Context
const LiveAPIContext = createContext<LiveAPIContextType | null>(null)

// Hook para usar o contexto
export const useLiveAPI = () => {
  const context = useContext(LiveAPIContext)
  if (!context) {
    throw new Error('useLiveAPI deve ser usado dentro de um LiveAPIProvider')
  }
  return context
}

// Provider Component
interface LiveAPIProviderProps {
  children: React.ReactNode
  numerologyMap?: NumerologyMap
  personalityProfile?: PersonalityProfile
  selectedAgent?: AgentType
  onMessage?: (message: LiveAPIMessage) => void
  onError?: (error: string) => void
  onInsightGenerated?: (insight: string) => void
}

export const LiveAPIProvider: React.FC<LiveAPIProviderProps> = ({
  children,
  numerologyMap,
  personalityProfile,
  selectedAgent = 'HYBRID',
  onMessage,
  onError,
  onInsightGenerated
}) => {
  // State
  const [state, setState] = useState<LiveAPIState>({
    isConnected: false,
    isRecording: false,
    isSpeaking: false,
    messages: [],
    error: null,
    sessionId: null,
    isLoading: false,
    audioLevel: 0,
    config: null
  })

  // Audio recording refs
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const analyserRef = React.useRef<AnalyserNode | null>(null)
  const streamRef = React.useRef<MediaStream | null>(null)

  // WebSocket/Connection ref for real-time streaming
  const connectionRef = React.useRef<WebSocket | null>(null)

  // Generate system instruction based on numerology
  const generateNumerologyPrompt = React.useCallback((
    map: NumerologyMap, 
    profile: PersonalityProfile, 
    agent: AgentType
  ): string => {
    const basePrompt = `Você é um clone digital especializado em ${agent.toLowerCase()}.

MAPA NUMEROLÓGICO COMPLETO:
- Motivação: ${map.motivacao} (${getNumerologyMeaning(map.motivacao, 'motivacao')})
- Impressão: ${map.impressao} (${getNumerologyMeaning(map.impressao, 'impressao')})
- Expressão: ${map.expressao} (${getNumerologyMeaning(map.expressao, 'expressao')})
- Destino: ${map.destino} (${getNumerologyMeaning(map.destino, 'destino')})
- Lições Cármicas: ${map.licoesCarmicas?.join(', ') || 'Nenhuma'}
- Tendências Ocultas: ${map.tendenciasOcultas?.join(', ') || 'Nenhuma'}
- Ano Pessoal: ${map.anoPessoal}

PERFIL DE PERSONALIDADE:
- Nome: ${profile.name}
- Situação Atual: ${profile.currentSituation}
- Principais Desafios: ${profile.mainChallenges?.join(', ') || 'Não definido'}
- Valores Centrais: ${profile.coreValues?.join(', ') || 'Não definido'}
- Estilo de Comunicação: ${profile.communicationStyle || 'direto'}
- Tomada de Decisão: ${profile.decisionMaking || 'híbrido'}
- Abertura Espiritual: ${profile.spiritualOpenness || 3}/5
- Interesse Psicológico: ${profile.psychologicalInterest || 3}/5

INSTRUÇÕES ESPECÍFICAS:
${getAgentInstructions(agent)}

FUNCIONALIDADES DISPONÍVEIS:
- Análise numerológica detalhada
- Insights comportamentais personalizados
- Conselhos baseados no mapa numerológico
- Análise de decisões importantes
- Suporte emocional personalizado

Responda sempre de forma empática, precisa e personalizada baseando-se no mapa numerológico do usuário. Se for uma conversa por voz, mantenha respostas mais concisas e conversacionais.`

    return basePrompt
  }, [])

  // Helper function to get numerology meanings
  const getNumerologyMeaning = (number: number, type: string): string => {
    // Esta função deveria vir do sistema de interpretações numerológicas
    const meanings: Record<string, Record<number, string>> = {
      motivacao: {
        1: 'Liderança e independência',
        2: 'Cooperação e sensibilidade', 
        3: 'Criatividade e comunicação',
        4: 'Organização e estabilidade',
        5: 'Liberdade e aventura',
        6: 'Responsabilidade e cuidado',
        7: 'Espiritualidade e análise',
        8: 'Ambição e poder material',
        9: 'Humanitarismo e compaixão'
      },
      impressao: {
        1: 'Aparenta ser independente',
        2: 'Aparenta ser diplomático',
        3: 'Aparenta ser criativo',
        4: 'Aparenta ser confiável',
        5: 'Aparenta ser aventureiro',
        6: 'Aparenta ser responsável',
        7: 'Aparenta ser misterioso',
        8: 'Aparenta ser poderoso',
        9: 'Aparenta ser sábio'
      },
      expressao: {
        1: 'Expressa liderança natural',
        2: 'Expressa cooperação',
        3: 'Expressa criatividade',
        4: 'Expressa praticidade',
        5: 'Expressa versatilidade',
        6: 'Expressa cuidado',
        7: 'Expressa profundidade',
        8: 'Expressa autoridade',
        9: 'Expressa compaixão'
      },
      destino: {
        1: 'Destino de líder',
        2: 'Destino de mediador',
        3: 'Destino de comunicador',
        4: 'Destino de construtor',
        5: 'Destino de explorador',
        6: 'Destino de cuidador',
        7: 'Destino de sábio',
        8: 'Destino de executivo',
        9: 'Destino de humanitário'
      }
    }
    
    return meanings[type]?.[number] || 'Significado único'
  }

  // Helper function to get agent-specific instructions
  const getAgentInstructions = (agent: AgentType): string => {
    switch (agent) {
      case 'ESOTERICO':
        return `Como agente esotérico, você deve:
- Focar em aspectos espirituais e numerológicos
- Conectar padrões numerológicos com sincronicidades
- Oferecer insights sobre propósito de vida e missão da alma
- Usar linguagem mística mas acessível
- Integrar conceitos de astrologia quando relevante`
        
      case 'PSICOLOGICO':
        return `Como agente psicológico, você deve:
- Focar em padrões comportamentais e psicológicos
- Usar a numerologia como ferramenta de autoconhecimento
- Aplicar conceitos de TCC e neurociência
- Oferecer estratégias práticas de desenvolvimento pessoal
- Manter abordagem científica e racional`
        
      case 'HYBRID':
        return `Como agente híbrido, você deve:
- Integrar aspectos esotéricos e psicológicos
- Equilibrar intuição e racionalidade
- Adaptar a linguagem ao contexto da conversa
- Oferecer tanto insights espirituais quanto estratégias práticas
- Ser versátil na abordagem conforme a necessidade do usuário`
        
      default:
        return 'Ofereça insights baseados no mapa numerológico do usuário'
    }
  }

  // Connection methods
  const connect = async (config: LiveAPIConfig) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      // Validate API key
      if (!config.apiKey) {
        throw new Error('API Key do Google AI é obrigatória')
      }

      // Set system instruction if not provided
      if (!config.systemInstruction && numerologyMap && personalityProfile) {
        config.systemInstruction = generateNumerologyPrompt(numerologyMap, personalityProfile, selectedAgent)
      }

      // For now, simulate connection - real implementation would use Google AI Live API
      // TODO: Implement real WebSocket connection to Google AI Live API
      setTimeout(() => {
        const sessionId = `session_${Date.now()}`
        setState(prev => ({
          ...prev,
          isConnected: true,
          isLoading: false,
          sessionId,
          config,
          error: null
        }))
        
        // Send welcome message
        const welcomeMessage: LiveAPIMessage = {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: `Olá! Sou seu clone digital baseado em seu mapa numerológico. Vejo que você tem Motivação ${numerologyMap?.motivacao} e Destino ${numerologyMap?.destino}. Como posso ajudá-lo hoje?`,
          timestamp: new Date(),
          emotionalTone: 'welcoming'
        }
        
        setState(prev => ({
          ...prev,
          messages: [welcomeMessage]
        }))
        
        onMessage?.(welcomeMessage)
      }, 1000)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro na conexão'
      setState(prev => ({ 
        ...prev, 
        error: errorMessage,
        isLoading: false,
        isConnected: false 
      }))
      onError?.(errorMessage)
    }
  }

  const disconnect = async () => {
    // Close WebSocket connection
    if (connectionRef.current) {
      connectionRef.current.close()
      connectionRef.current = null
    }
    
    // Stop any ongoing recording
    stopRecording()
    
    setState(prev => ({
      ...prev,
      isConnected: false,
      sessionId: null,
      config: null,
      isLoading: false
    }))
  }

  const reconnect = async () => {
    if (state.config) {
      await disconnect()
      await connect(state.config)
    }
  }

  // Audio methods
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        } 
      })
      
      streamRef.current = stream
      
      // Create audio context for level monitoring
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      analyserRef.current.fftSize = 256
      
      // Create media recorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      })
      
      const audioChunks: Blob[] = []
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      }
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        const arrayBuffer = await audioBlob.arrayBuffer()
        await sendAudio(arrayBuffer)
      }
      
      mediaRecorderRef.current.start()
      setState(prev => ({ ...prev, isRecording: true }))
      
      // Start audio level monitoring
      monitorAudioLevel()
      
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error)
      setState(prev => ({ 
        ...prev, 
        error: 'Não foi possível acessar o microfone' 
      }))
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop()
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    
    setState(prev => ({ 
      ...prev, 
      isRecording: false,
      audioLevel: 0 
    }))
  }

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    
    const updateLevel = () => {
      if (!analyserRef.current || !state.isRecording) return
      
      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length
      const normalizedLevel = average / 255
      
      setState(prev => ({ ...prev, audioLevel: normalizedLevel }))
      
      if (state.isRecording) {
        requestAnimationFrame(updateLevel)
      }
    }
    
    updateLevel()
  }

  const sendAudio = async (audioData: ArrayBuffer) => {
    if (!state.isConnected || !state.sessionId) {
      throw new Error('Não conectado ao serviço de voz')
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      // TODO: Implement real audio processing with Google AI Live API
      // For now, simulate transcription and response
      setTimeout(async () => {
        // Simulate transcription
        const transcribedText = '[Áudio transcrito - implementação em desenvolvimento]'
        
        // Add user message
        const userMessage: LiveAPIMessage = {
          id: `msg_${Date.now()}`,
          role: 'user',
          content: transcribedText,
          timestamp: new Date(),
          audioData
        }
        
        // Generate response based on numerology
        const response = await generateResponse(transcribedText)
        
        const assistantMessage: LiveAPIMessage = {
          id: `msg_${Date.now() + 1}`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          emotionalTone: 'supportive'
        }
        
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, userMessage, assistantMessage],
          isLoading: false
        }))
        
        onMessage?.(userMessage)
        onMessage?.(assistantMessage)
      }, 2000)
      
    } catch (error) {
      console.error('Erro ao processar áudio:', error)
      setState(prev => ({ 
        ...prev, 
        error: 'Erro ao processar áudio',
        isLoading: false 
      }))
    }
  }

  const sendTextMessage = async (message: string) => {
    if (!state.isConnected || !state.sessionId) {
      throw new Error('Não conectado ao serviço')
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      // Add user message
      const userMessage: LiveAPIMessage = {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date()
      }
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage]
      }))
      
      onMessage?.(userMessage)
      
      // Generate response
      const response = await generateResponse(message)
      
      const assistantMessage: LiveAPIMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        emotionalTone: 'supportive'
      }
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }))
      
      onMessage?.(assistantMessage)
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setState(prev => ({ 
        ...prev, 
        error: 'Erro ao enviar mensagem',
        isLoading: false 
      }))
    }
  }

  // Helper function to generate response based on numerology
  const generateResponse = async (input: string): Promise<string> => {
    if (!numerologyMap) {
      return 'Preciso do seu mapa numerológico para oferecer insights personalizados.'
    }
    
    // TODO: Integrate with Google AI for real responses
    // For now, generate based on numerology patterns
    const responses = [
      `Considerando sua Motivação ${numerologyMap.motivacao}, vejo que ${input.toLowerCase().includes('trabalho') ? 'sua carreira' : 'essa situação'} está alinhada com seu propósito numerológico.`,
      `Seu número de Destino ${numerologyMap.destino} sugere que ${input.toLowerCase().includes('decisão') ? 'essa escolha' : 'esse momento'} é importante para seu crescimento.`,
      `Com base em seu mapa numerológico, posso ajudá-lo a entender melhor essa questão. Sua Expressão ${numerologyMap.expressao} indica...`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Utility methods
  const clearMessages = () => {
    setState(prev => ({ ...prev, messages: [] }))
  }

  const setSystemInstruction = (instruction: string) => {
    setState(prev => ({
      ...prev,
      config: prev.config ? { ...prev.config, systemInstruction: instruction } : null
    }))
  }

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }))
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  const contextValue: LiveAPIContextType = {
    ...state,
    connect,
    disconnect,
    reconnect,
    startRecording,
    stopRecording,
    sendAudio,
    sendTextMessage,
    clearMessages,
    setSystemInstruction,
    generateNumerologyPrompt,
    clearError
  }

  return (
    <LiveAPIContext.Provider value={contextValue}>
      {children}
    </LiveAPIContext.Provider>
  )
}

export default LiveAPIContext