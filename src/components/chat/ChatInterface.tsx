'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Loader2,
  Sparkles,
  Brain,
  Star,
  Wifi,
  WifiOff,
  RefreshCw,
  Bot
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';
import { useConversation } from '@/hooks/useConversation';

interface ChatInterfaceProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  onInsightGenerated?: (insight: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  onInsightGenerated
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatMode, setChatMode] = useState<'text' | 'voice'>('text');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);

  // Hook para gerenciar conversa
  const {
    messages,
    isLoading,
    isConnected,
    fallbackMode,
    error,
    sessionId,
    startConversation,
    sendMessage,
    endConversation,
    clearError,
    retryConnection
  } = useConversation({
    numerologyMap,
    personalityProfile,
    selectedAgent,
    onInsightGenerated
  });

  // Inicializa conversa quando componente monta
  useEffect(() => {
    startConversation();

    // Configura Web Speech API se disponível
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    }

    return () => {
      // Cleanup da sessão
      if (sessionId) {
        endConversation();
      }
    };
  }, []);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const messageToSend = inputMessage;
    setInputMessage('');
    
    // Usa o método do hook para enviar mensagem
    await sendMessage(messageToSend);
    
    // Se modo voz está ativo, fala a última resposta do assistente
    if (chatMode === 'voice' && speechSynthesis.current) {
      // A resposta será adicionada pelo hook, então precisamos aguardar
      setTimeout(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          speakMessage(lastMessage.content);
        }
      }, 100);
    }
  };



  const startVoiceRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('Gravação de voz não disponível neste navegador');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorder.current = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        // Por enquanto, mostra placeholder - implementação completa de transcrição requer backend
        setInputMessage('[Mensagem de voz - transcrição em desenvolvimento]');
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);

    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const speakMessage = (text: string) => {
    if (!speechSynthesis.current) return;

    // Para qualquer fala anterior
    speechSynthesis.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAgentIcon = () => {
    switch (selectedAgent) {
      case 'ESOTERICO': return <Sparkles className="w-4 h-4" />;
      case 'PSICOLOGICO': return <Brain className="w-4 h-4" />;
      case 'HYBRID': return <Star className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getAgentColor = () => {
    switch (selectedAgent) {
      case 'ESOTERICO': return 'bg-purple-100 text-purple-800';
      case 'PSICOLOGICO': return 'bg-blue-100 text-blue-800';
      case 'HYBRID': return 'bg-gradient-to-r from-purple-100 to-blue-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Conversa com seu Clone Digital
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge className={getAgentColor()}>
              {getAgentIcon()}
              <span className="ml-1">{selectedAgent}</span>
            </Badge>
            
            {/* Status de conexão */}
            <div className="flex items-center gap-1">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-orange-500" />
              )}
              <Badge variant={isConnected ? 'default' : 'secondary'}>
                {isConnected ? 'Online' : 'Offline'}
              </Badge>
              
              {fallbackMode && (
                <Badge variant="outline" className="text-xs">
                  Modo Local
                </Badge>
              )}
            </div>
            
            <div className="flex gap-1">
              <Button
                variant={chatMode === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatMode('text')}
              >
                Texto
              </Button>
              <Button
                variant={chatMode === 'voice' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChatMode('voice')}
              >
                Voz
              </Button>
              
              {/* Botão de reconectar se offline */}
              {!isConnected && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryConnection}
                  disabled={isLoading}
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Baseado em seu mapa numerológico • Motivação {numerologyMap.motivacao} • Destino {numerologyMap.destino}
        </div>
        
        {/* Notificação de erro */}
        {error && (
          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-md p-2">
            <span className="text-sm text-orange-700">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-orange-700 hover:text-orange-900"
            >
              ✕
            </Button>
          </div>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-muted mr-12'
                }`}
              >
                {isLoading && message.id === 'typing-indicator' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Digitando...</span>
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.insights && message.insights.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="text-xs font-medium mb-2">💡 Insights:</div>
                        {message.insights.map((insight, idx) => (
                          <div key={idx} className="text-xs bg-background/50 rounded p-2 mb-1">
                            {insight}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className={`flex items-center justify-between mt-2 text-xs ${
                      message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <span>{formatTimestamp(message.timestamp)}</span>
                      
                      {message.emotionalTone && message.emotionalTone !== 'neutro' && (
                        <Badge variant="secondary" className="text-xs">
                          {message.emotionalTone}
                        </Badge>
                      )}
                      
                      {message.role === 'assistant' && chatMode === 'voice' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message.content)}
                          disabled={isSpeaking}
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <Separator />

        {/* Input Area */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            {chatMode === 'voice' && (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                disabled={isLoading}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
            
            <div className="flex-1 flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  chatMode === 'voice' 
                    ? "Digite ou grave sua mensagem..." 
                    : "Digite sua mensagem..."
                }
                disabled={isLoading}
                className="flex-1"
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {isSpeaking && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopSpeaking}
              >
                <VolumeX className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {isRecording && 'Gravando... Clique no microfone novamente para parar'}
            {!sessionId && 'Conectando com seu clone digital...'}
            {sessionId && !isRecording && !fallbackMode && 'Pressione Enter para enviar • Shift+Enter para nova linha'}
            {fallbackMode && 'Modo local ativo • Funcionalidade limitada sem conexão'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;