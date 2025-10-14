/**
 * Self Flow - Gemini Client
 * Integração com Google AI Studio Gemini 2.5 Flash para conversas
 */

import { GoogleGenerativeAI, ChatSession, GenerativeModel } from '@google/generative-ai';
import { BaseAgent } from './agents/base';
import { ResponseProcessor } from './agents/base';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotionalTone?: string;
  tokensUsed?: number;
}

interface ConversationContext {
  agent: BaseAgent;
  sessionId: string;
  messages: ConversationMessage[];
  totalTokens: number;
  startTime: Date;
}

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private activeSessions: Map<string, ChatSession> = new Map();
  private conversationContexts: Map<string, ConversationContext> = new Map();

  constructor() {
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google AI API key não configurada. Configure GOOGLE_AI_API_KEY no .env');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // Usa Gemini 2.5 Flash para conversas rápidas
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.8, // Balanço entre criatividade e consistência
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048, // Respostas focadas
      },
    });
  }

  /**
   * Inicia nova conversa com clone personalizado
   */
  async startConversation(agent: BaseAgent, sessionId?: string): Promise<string> {
    const id = sessionId || this.generateSessionId();
    
    // Gera system prompt personalizado do agente
    const systemPrompt = agent.generateSystemPrompt();
    
    // Inicia nova sessão do Gemini
    const chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `SYSTEM: ${systemPrompt}` }]
        },
        {
          role: "model", 
          parts: [{ text: "Entendi. Sou o clone digital personalizado, pronto para conversar baseado no mapa numerológico e perfil comportamental. Como posso ajudar?" }]
        }
      ],
    });

    this.activeSessions.set(id, chat);
    
    // Cria contexto da conversa
    this.conversationContexts.set(id, {
      agent,
      sessionId: id,
      messages: [],
      totalTokens: 0,
      startTime: new Date()
    });

    return id;
  }

  /**
   * Envia mensagem e recebe resposta do clone
   */
  async sendMessage(sessionId: string, userMessage: string): Promise<{
    response: string;
    emotionalTone: string;
    insights: string[];
    tokensUsed: number;
  }> {
    const session = this.activeSessions.get(sessionId);
    const context = this.conversationContexts.get(sessionId);

    if (!session || !context) {
      throw new Error(`Sessão não encontrada: ${sessionId}`);
    }

    try {
      // Detecta tom emocional da mensagem do usuário
      const emotionalTone = ResponseProcessor.identifyEmotionalTone(userMessage);
      
      // Adiciona contexto emocional para o clone
      const enhancedMessage = this.enhanceMessageWithContext(userMessage, emotionalTone, context);
      
      // Envia para Gemini
      const result = await session.sendMessage(enhancedMessage);
      const response = result.response.text();
      
      // Aplica adaptação numerológica específica do agente
      const numerologyEnhancedResponse = context.agent.adaptResponseToNumerology(response);
      
      // Extrai insights especializados
      const conversationHistory = context.messages.map(m => m.content);
      conversationHistory.push(userMessage);
      const insights = context.agent.extractSpecializedInsights(conversationHistory);
      
      // Estima tokens usados (aproximação)
      const tokensUsed = this.estimateTokens(userMessage + response);
      
      // Atualiza contexto
      context.messages.push(
        { 
          role: 'user', 
          content: userMessage, 
          timestamp: new Date(), 
          emotionalTone 
        },
        { 
          role: 'assistant', 
          content: numerologyEnhancedResponse, 
          timestamp: new Date(),
          tokensUsed 
        }
      );
      
      context.totalTokens += tokensUsed;

      return {
        response: numerologyEnhancedResponse,
        emotionalTone,
        insights,
        tokensUsed
      };

    } catch (error) {
      console.error('Erro na conversa com Gemini:', error);
      
      // Fallback com resposta baseada no agente
      const fallbackResponse = this.generateFallbackResponse(context.agent, userMessage);
      
      return {
        response: fallbackResponse,
        emotionalTone: 'neutro',
        insights: ['Sistema temporariamente indisponível - usando resposta baseada no perfil'],
        tokensUsed: 0
      };
    }
  }

  /**
   * Encerra conversa e retorna resumo
   */
  async endConversation(sessionId: string): Promise<{
    summary: string;
    duration: number;
    messageCount: number;
    totalTokens: number;
    mainThemes: string[];
  }> {
    const context = this.conversationContexts.get(sessionId);
    
    if (!context) {
      throw new Error(`Contexto da conversa não encontrado: ${sessionId}`);
    }

    const duration = Date.now() - context.startTime.getTime();
    const messageCount = context.messages.length;
    
    // Extrai temas principais da conversa
    const mainThemes = ResponseProcessor.extractConversationThemes(
      context.messages.filter(m => m.role === 'user').map(m => m.content)
    );

    // Gera resumo automático
    const summary = await this.generateConversationSummary(context);

    // Limpa sessões
    this.activeSessions.delete(sessionId);
    this.conversationContexts.delete(sessionId);

    return {
      summary,
      duration: Math.round(duration / 1000), // em segundos
      messageCount,
      totalTokens: context.totalTokens,
      mainThemes
    };
  }

  /**
   * Adiciona contexto emocional e numerológico à mensagem
   */
  private enhanceMessageWithContext(
    message: string, 
    emotionalTone: string, 
    context: ConversationContext
  ): string {
    const { agent } = context;
    
    // Adiciona informação sobre tom emocional para resposta mais empática
    let enhancedMessage = message;
    
    if (emotionalTone !== 'neutro') {
      enhancedMessage += `\n\n[CONTEXTO EMOCIONAL: Usuário parece ${emotionalTone}. Responda com sensibilidade apropriada.]`;
    }

    // Adiciona contexto de conversa para continuidade
    if (context.messages.length > 0) {
      const recentTopics = context.messages
        .slice(-4) // Últimas 2 trocas
        .filter(m => m.role === 'user')
        .map(m => m.content.substring(0, 100))
        .join(' | ');
      
      enhancedMessage += `\n\n[CONTEXTO DA CONVERSA: Temas recentes - ${recentTopics}]`;
    }

    return enhancedMessage;
  }

  /**
   * Gera resposta de fallback baseada no agente quando Gemini falha
   */
  private generateFallbackResponse(agent: BaseAgent, userMessage: string): string {
    const agentType = agent.getAgentType();
    
    const fallbacks = {
      'ESOTERICO': `Considerando seu mapa numerológico, vejo que esta questão se conecta com padrões energéticos importantes em sua vida. Embora eu esteja temporariamente com acesso limitado ao processamento completo, posso compartilhar que situações como esta geralmente se relacionam com os números centrais do seu mapa pessoal.`,
      
      'PSICOLOGICO': `Do ponto de vista comportamental, sua pergunta toca em padrões que identificamos em seu perfil. Embora eu esteja com processamento reduzido no momento, posso sugerir que você considere como essa situação se relaciona com seus padrões habituais de resposta e as estratégias que discutimos anteriormente.`,
      
      'HYBRID': `Integrando as perspectivas do seu mapa numerológico com seu perfil comportamental, percebo que esta questão representa uma oportunidade de crescimento multi-dimensional. Mesmo com processamento limitado, posso orientar que você considere tanto os aspectos energéticos quanto os padrões práticos envolvidos.`
    };

    return fallbacks[agentType] || 'Estou temporariamente com capacidade reduzida, mas continuo aqui para apoiá-lo baseado em seu perfil único.';
  }

  /**
   * Gera resumo automático da conversa
   */
  private async generateConversationSummary(context: ConversationContext): Promise<string> {
    if (context.messages.length === 0) {
      return 'Conversa iniciada mas sem mensagens trocadas.';
    }

    // Cria prompt de resumo
    const conversationText = context.messages
      .map(m => `${m.role === 'user' ? 'Usuário' : 'Clone'}: ${m.content}`)
      .join('\n\n');

    const summaryPrompt = `
Resuma esta conversa de autoconhecimento em 2-3 frases, focando nos principais insights descobertos e próximos passos sugeridos:

${conversationText}

Resumo:`;

    try {
      const result = await this.model.generateContent(summaryPrompt);
      return result.response.text();
    } catch (error) {
      // Fallback: resumo baseado em temas
      const themes = ResponseProcessor.extractConversationThemes(
        context.messages.filter(m => m.role === 'user').map(m => m.content)
      );
      
      return `Conversa focou em: ${themes.join(', ')}. ${context.messages.length / 2} trocas de mensagens com insights baseados no mapa numerológico pessoal.`;
    }
  }

  /**
   * Estimativa de tokens usados (aproximação)
   */
  private estimateTokens(text: string): number {
    // Aproximação: ~4 caracteres por token em português
    return Math.ceil(text.length / 4);
  }

  /**
   * Gera ID único para sessão
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Lista sessões ativas (útil para debugging)
   */
  getActiveSessions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  /**
   * Obtém estatísticas de uma sessão
   */
  getSessionStats(sessionId: string): ConversationContext | null {
    return this.conversationContexts.get(sessionId) || null;
  }

  /**
   * Força encerramento de sessão (cleanup)
   */
  forceEndSession(sessionId: string): boolean {
    const hasSession = this.activeSessions.has(sessionId);
    this.activeSessions.delete(sessionId);
    this.conversationContexts.delete(sessionId);
    return hasSession;
  }
}