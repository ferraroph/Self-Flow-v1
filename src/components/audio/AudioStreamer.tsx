import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Wifi,
  WifiOff,
  Loader2,
  Square,
  Play,
  Pause
} from 'lucide-react'
import { useLiveAPI } from '@/lib/live-api/LiveAPIContext'
import type { NumerologyMap } from '@/lib/numerology/calculator'
import type { PersonalityProfile, AgentType } from '@/lib/agents/base'

interface AudioStreamerProps {
  numerologyMap: NumerologyMap
  personalityProfile: PersonalityProfile
  selectedAgent: AgentType
  onTranscription?: (text: string) => void
  onAudioResponse?: (audioUrl: string) => void
  onError?: (error: string) => void
  className?: string
}

interface AudioVisualizerProps {
  audioLevel: number
  isRecording: boolean
  barCount?: number
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  audioLevel, 
  isRecording, 
  barCount = 20 
}) => {
  const [bars, setBars] = useState<number[]>(new Array(barCount).fill(0))

  useEffect(() => {
    if (!isRecording) {
      setBars(new Array(barCount).fill(0))
      return
    }

    const interval = setInterval(() => {
      const newBars = new Array(barCount).fill(0).map((_, i) => {
        // Create wave effect
        const baseHeight = audioLevel * 100
        const waveOffset = Math.sin((Date.now() / 100) + (i * 0.5)) * 20
        const randomVariation = (Math.random() - 0.5) * 30
        
        return Math.max(2, baseHeight + waveOffset + randomVariation)
      })
      setBars(newBars)
    }, 50)

    return () => clearInterval(interval)
  }, [isRecording, audioLevel, barCount])

  return (
    <div className="flex items-end justify-center space-x-1 h-16">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-1.5 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-100 ${
            isRecording ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            height: `${Math.min(height, 60)}px`,
            minHeight: '4px'
          }}
        />
      ))}
    </div>
  )
}

const AudioStreamer: React.FC<AudioStreamerProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  onTranscription,
  onAudioResponse,
  onError,
  className = ''
}) => {
  // Live API context
  const {
    isConnected,
    isRecording,
    isSpeaking,
    audioLevel,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendAudio,
    clearError,
    error
  } = useLiveAPI()

  // Local state
  const [isInitialized, setIsInitialized] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  
  // Audio playback
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize connection when component mounts
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await connect({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!,
          model: 'gemini-pro'
        })
        setIsInitialized(true)
      } catch (error) {
        console.error('Erro ao inicializar conexão:', error)
        onError?.('Erro ao conectar com o serviço de voz')
      }
    }

    if (!isInitialized) {
      initializeConnection()
    }

    return () => {
      if (isInitialized) {
        disconnect()
      }
    }
  }, [connect, disconnect, isInitialized, onError])

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingDuration(0)
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
        recordingIntervalRef.current = null
      }
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }, [isRecording])

  // Handle recording actions
  const handleStartRecording = useCallback(async () => {
    try {
      if (!isConnected) {
        throw new Error('Não conectado ao serviço')
      }

      clearError()
      await startRecording()
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error)
      onError?.('Erro ao acessar o microfone. Verifique as permissões.')
    }
  }, [isConnected, startRecording, clearError, onError])

  const handleStopRecording = useCallback(() => {
    try {
      stopRecording()
    } catch (error) {
      console.error('Erro ao parar gravação:', error)
      onError?.('Erro ao parar a gravação')
    }
  }, [stopRecording, onError])

  // Handle audio playback
  const handlePlayAudio = useCallback((audioUrl: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    if (playbackState === 'playing') {
      audio.pause()
      setPlaybackState('paused')
      return
    }

    if (playbackState === 'paused' && currentAudioUrl === audioUrl) {
      audio.play()
      setPlaybackState('playing')
      return
    }

    // New audio or first play
    audio.src = audioUrl
    audio.play()
    setCurrentAudioUrl(audioUrl)
    setPlaybackState('playing')

    audio.onended = () => {
      setPlaybackState('idle')
      setCurrentAudioUrl(null)
    }

    audio.onerror = () => {
      setPlaybackState('idle')
      setCurrentAudioUrl(null)
      onError?.('Erro ao reproduzir áudio')
    }
  }, [playbackState, currentAudioUrl, onError])

  const handleStopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlaybackState('idle')
    setCurrentAudioUrl(null)
  }, [])

  // Format recording duration
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Get status badge content
  const getStatusBadge = () => {
    if (!isInitialized) {
      return (
        <Badge variant="outline" className="text-yellow-600">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Inicializando
        </Badge>
      )
    }

    if (!isConnected) {
      return (
        <Badge variant="destructive">
          <WifiOff className="w-3 h-3 mr-1" />
          Desconectado
        </Badge>
      )
    }

    if (isRecording) {
      return (
        <Badge variant="default" className="bg-red-500 animate-pulse">
          <Mic className="w-3 h-3 mr-1" />
          Gravando {formatDuration(recordingDuration)}
        </Badge>
      )
    }

    if (isSpeaking) {
      return (
        <Badge variant="default" className="bg-green-500">
          <Volume2 className="w-3 h-3 mr-1" />
          Falando
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-green-50 text-green-700">
        <Wifi className="w-3 h-3 mr-1" />
        Conectado
      </Badge>
    )
  }

  // Get recording button state
  const getRecordingButtonProps = () => {
    const disabled = !isConnected || !isInitialized
    
    if (isRecording) {
      return {
        variant: 'destructive' as const,
        onClick: handleStopRecording,
        disabled,
        icon: Square,
        text: 'Parar'
      }
    }

    return {
      variant: 'default' as const,
      onClick: handleStartRecording,
      disabled,
      icon: Mic,
      text: 'Gravar'
    }
  }

  const recordingButton = getRecordingButtonProps()
  const RecordingIcon = recordingButton.icon

  return (
    <div className={`flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border ${className}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold text-gray-800">Conversa por Voz</h3>
        {getStatusBadge()}
      </div>

      {/* Error Display */}
      {error && (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-700 hover:text-red-900 h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Audio Visualizer */}
      <div className="w-full max-w-md">
        <AudioVisualizer 
          audioLevel={audioLevel} 
          isRecording={isRecording}
          barCount={25}
        />
      </div>

      {/* Recording Controls */}
      <div className="flex items-center space-x-4">
        <Button
          {...recordingButton}
          size="lg"
          className={`w-20 h-20 rounded-full text-white font-semibold transition-all ${
            isRecording 
              ? 'shadow-lg shadow-red-500/30 scale-105' 
              : 'hover:scale-105'
          }`}
          disabled={recordingButton.disabled}
        >
          <RecordingIcon size={24} />
        </Button>

        {isSpeaking && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleStopAudio}
            className="w-16 h-16 rounded-full"
          >
            <VolumeX size={20} />
          </Button>
        )}
      </div>

      {/* Recording Info */}
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-600">
          {isRecording 
            ? 'Fale agora... Clique no botão vermelho para parar'
            : !isConnected 
            ? 'Aguardando conexão...' 
            : 'Clique no microfone para começar a gravar'
          }
        </p>
        
        {isRecording && (
          <p className="text-xs text-gray-500">
            Duração: {formatDuration(recordingDuration)}
          </p>
        )}
      </div>

      {/* Numerology Context */}
      <div className="w-full p-3 bg-white/70 rounded-lg border">
        <div className="text-xs text-gray-600 text-center">
          <span className="font-medium">Contexto Numerológico:</span>
          <br />
          Motivação {numerologyMap.motivacao} • Destino {numerologyMap.destino} • 
          Agente {selectedAgent} • Ano Pessoal {numerologyMap.anoPessoal}
        </div>
      </div>

      {/* Technical Info (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="w-full p-2 bg-gray-100 rounded text-xs text-gray-500">
          <div>Nível de áudio: {Math.round(audioLevel * 100)}%</div>
          <div>Estado: {isRecording ? 'Gravando' : isSpeaking ? 'Falando' : 'Idle'}</div>
          <div>Conexão: {isConnected ? 'Ativa' : 'Inativa'}</div>
        </div>
      )}

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

export default AudioStreamer