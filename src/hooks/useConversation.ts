'use client';

/**
 * Self Flow - Hook para Gerenciamento de Conversas
 * Gerencia estado e comunicação com a API de conversas
 */

import { useState, useCallback, useRef } from 'react';
import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: string;
  insights?: string[];
}

interface ConversationState {
  sessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  isConnected: boolean;
  fallbackMode: boolean;
  error: string | null;
}

interface UseConversationOptions {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  onInsightGenerated?: (insight: string) => void;
}

export function useConversation(options: UseConversationOptions) {
  const { numerologyMap, personalityProfile, selectedAgent, onInsightGenerated } = options;
  
  const [state, setState] = useState<ConversationState>({
    sessionId: null,
    messages: [],
    isLoading: false,
    isConnected: false,
    fallbackMode: false,
    error: null
  });

  const abortController = useRef<AbortController | null>(null);

  const startConversation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Cancela request anterior se existir
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.current.signal,
        body: JSON.stringify({
          action: 'start',
          numerologyMap,
          personalityProfile,
          selectedAgent
        })
      });

      const data = await response.json();

      if (data.success) {
        const welcomeMessage: Message = {
          id: generateMessageId(),
          role: 'assistant',
          content: data.data.welcomeMessage,
          timestamp: new Date()
        };

        setState(prev => ({
          ...prev,
          sessionId: data.data.sessionId,
          messages: [welcomeMessage],
          isConnected: true,
          fallbackMode: data.data.fallbackMode || false,
          isLoading: false
        }));

        return data.data.sessionId;
      } else {
        throw new Error(data.error || 'Erro ao iniciar conversa');
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request cancelado, não atualiza estado
      }

      console.error('Erro ao iniciar conversa:', error);
      
      // Cria sessão local como fallback
      const fallbackSessionId = `local_${Date.now()}`;
      const fallbackMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: `Olá, ${personalityProfile.name}! Estou temporariamente sem conexão, mas posso continuar nossa conversa baseado em seu perfil numerológico. Como posso ajudá-lo?`,
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        sessionId: fallbackSessionId,
        messages: [fallbackMessage],
        isConnected: false,
        fallbackMode: true,
        isLoading: false,
        error: 'Modo offline - funcionalidade limitada'
      }));

      return fallbackSessionId;
    }
  }, [numerologyMap, personalityProfile, selectedAgent]);

  const sendMessage = useCallback(async (content: string) => {
    if (!state.sessionId || !content.trim()) return;

    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    // Adiciona mensagem do usuário imediatamente
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.current.signal,
        body: JSON.stringify({
          action: 'message',
          sessionId: state.sessionId,
          message: content
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: generateMessageId(),
          role: 'assistant',
          content: data.data.response,
          timestamp: new Date(),
          emotionalTone: data.data.emotionalTone,
          insights: data.data.insights
        };

        setState(prev => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false,
          fallbackMode: data.data.fallbackMode || prev.fallbackMode
        }));

        // Processa insights se callback fornecido
        if (onInsightGenerated && data.data.insights?.length > 0) {
          data.data.insights.forEach((insight: string) => onInsightGenerated(insight));
        }

      } else {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request cancelado
      }

      console.error('Erro ao enviar mensagem:', error);

      // Gera resposta de fallback local
      const fallbackResponse = generateLocalFallback(content, numerologyMap);
      const fallbackMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        insights: ['Resposta gerada localmente - conectividade limitada']
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, fallbackMessage],
        isLoading: false,
        fallbackMode: true,
        error: 'Conexão instável - usando modo local'
      }));
    }
  }, [state.sessionId, onInsightGenerated, numerologyMap]);

  const endConversation = useCallback(async () => {
    if (!state.sessionId) return null;

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'end',
          sessionId: state.sessionId
        })
      });

      const data = await response.json();

      // Limpa estado local
      setState(prev => ({
        ...prev,
        sessionId: null,
        isConnected: false,
        messages: []
      }));

      return data.success ? data.data : null;

    } catch (error) {
      console.error('Erro ao encerrar conversa:', error);
      
      // Limpa estado mesmo com erro
      setState(prev => ({
        ...prev,
        sessionId: null,
        isConnected: false,
        messages: []
      }));

      return null;
    }
  }, [state.sessionId]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const retryConnection = useCallback(() => {
    setState(prev => ({ ...prev, fallbackMode: false, error: null }));
    return startConversation();
  }, [startConversation]);

  return {
    // Estado
    ...state,
    
    // Ações
    startConversation,
    sendMessage,
    endConversation,
    clearError,
    retryConnection,
    
    // Utilitários
    messageCount: state.messages.length,
    lastMessage: state.messages[state.messages.length - 1],
    hasMessages: state.messages.length > 0
  };
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateLocalFallback(userMessage: string, numerology: NumerologyMap): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('obrigad')) {
    return 'De nada! É um prazer ajudá-lo em sua jornada de autoconhecimento.';
  }
  
  if (lowerMessage.includes('decisão') || lowerMessage.includes('escolha')) {
    return `Considerando seu número de Destino ${numerology.destino} e Expressão ${numerology.expressao}, decisões importantes devem alinhar-se com seu propósito maior. Que aspectos desta escolha mais ressoam com seus valores fundamentais?`;
  }
  
  if (lowerMessage.includes('trabalho') || lowerMessage.includes('carreira')) {
    return `Seu mapa numerológico sugere que questões profissionais são centrais em sua jornada. Com Ano Pessoal ${numerology.anoPessoal}, este é um momento de ${
      numerology.anoPessoal <= 5 ? 'construção e desenvolvimento' : 'reflexão e refinamento'
    }. O que mais te preocupa nesta área?`;
  }
  
  if (lowerMessage.includes('relacionamento') || lowerMessage.includes('amor')) {
    return 'Relacionamentos são espelhos de nosso crescimento interior. Baseado em seu perfil numerológico, como você sente que seus padrões pessoais influenciam suas conexões com outros?';
  }
  
  return `Entendo sua reflexão. Mesmo temporariamente offline, posso orientá-lo baseado em seus números pessoais (Motivação: ${numerology.motivacao}, Destino: ${numerology.destino}). Pode compartilhar mais sobre o que está vivenciando?`;
}