/**
 * Self Flow - API Route para Conversas
 * Endpoint seguro para comunicação com Gemini AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { GeminiClient } from '@/lib/gemini';
import { AgentFactory } from '@/lib/agents';
import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface ConversationRequest {
  action: 'start' | 'message' | 'end';
  sessionId?: string;
  message?: string;
  numerologyMap?: NumerologyMap;
  personalityProfile?: PersonalityProfile;
  selectedAgent?: AgentType;
}

interface ConversationResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Cache global para sessões (em produção, usar Redis)
let globalGeminiClient: GeminiClient | null = null;

// Inicializa cliente apenas quando necessário
function getGeminiClient(): GeminiClient {
  if (!globalGeminiClient) {
    globalGeminiClient = new GeminiClient();
  }
  return globalGeminiClient;
}

export async function POST(request: NextRequest): Promise<NextResponse<ConversationResponse>> {
  try {
    const body: ConversationRequest = await request.json();
    const { action, sessionId, message, numerologyMap, personalityProfile, selectedAgent } = body;

    switch (action) {
      case 'start':
        if (!numerologyMap || !personalityProfile || !selectedAgent) {
          return NextResponse.json({
            success: false,
            error: 'Dados obrigatórios ausentes para iniciar conversa'
          }, { status: 400 });
        }

        try {
          // Cria agente personalizado
          const agent = AgentFactory.createAgent({
            numerologyMap,
            personalityProfile,
            preferredAgent: selectedAgent
          });

          // Inicia sessão com Gemini
          const client = getGeminiClient();
          const newSessionId = await client.startConversation(agent);

          return NextResponse.json({
            success: true,
            data: {
              sessionId: newSessionId,
              welcomeMessage: generateWelcomeMessage(personalityProfile, selectedAgent, numerologyMap)
            }
          });

        } catch (error) {
          console.error('Erro ao iniciar conversação:', error);
          
          // Fallback: cria sessão local sem Gemini
          const fallbackSessionId = `fallback_${Date.now()}`;
          
          return NextResponse.json({
            success: true,
            data: {
              sessionId: fallbackSessionId,
              welcomeMessage: generateWelcomeMessage(personalityProfile, selectedAgent, numerologyMap),
              fallbackMode: true
            }
          });
        }

      case 'message':
        if (!sessionId || !message) {
          return NextResponse.json({
            success: false,
            error: 'SessionId e mensagem são obrigatórios'
          }, { status: 400 });
        }

        try {
          const client = getGeminiClient();
          const response = await client.sendMessage(sessionId, message);

          return NextResponse.json({
            success: true,
            data: response
          });

        } catch (error) {
          console.error('Erro ao processar mensagem:', error);

          // Fallback response baseado na mensagem
          const fallbackResponse = generateFallbackResponse(message);

          return NextResponse.json({
            success: true,
            data: {
              response: fallbackResponse,
              emotionalTone: 'neutro',
              insights: ['Sistema temporariamente indisponível'],
              tokensUsed: 0,
              fallbackMode: true
            }
          });
        }

      case 'end':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'SessionId é obrigatório para encerrar conversa'
          }, { status: 400 });
        }

        try {
          const client = getGeminiClient();
          const summary = await client.endConversation(sessionId);

          return NextResponse.json({
            success: true,
            data: summary
          });

        } catch (error) {
          console.error('Erro ao encerrar conversação:', error);

          // Força limpeza da sessão mesmo com erro
          if (globalGeminiClient) {
            globalGeminiClient.forceEndSession(sessionId);
          }

          return NextResponse.json({
            success: true,
            data: {
              summary: 'Conversa encerrada.',
              duration: 0,
              messageCount: 0,
              totalTokens: 0,
              mainThemes: []
            }
          });
        }

      default:
        return NextResponse.json({
          success: false,
          error: 'Ação não reconhecida'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Erro na API de conversação:', error);

    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

function generateWelcomeMessage(
  profile: PersonalityProfile, 
  agent: AgentType, 
  numerology: NumerologyMap
): string {
  const agentNames = {
    'ESOTERICO': '🔮 Agente Esotérico',
    'PSICOLOGICO': '🧠 Agente Psicológico', 
    'HYBRID': '🌟 Agente Híbrido'
  };

  return `Olá, ${profile.name}! 

Sou seu ${agentNames[agent]}, criado especificamente com base em seu mapa numerológico e perfil comportamental.

Acabei de analisar seus números pessoais:
• Motivação: ${numerology.motivacao}
• Expressão: ${numerology.expressao} 
• Destino: ${numerology.destino}
• Ano Pessoal: ${numerology.anoPessoal}

Estou aqui para conversar como a versão mais clara de você mesmo, sem filtros emocionais ou autossabotagem. O que gostaria de explorar hoje?`;
}

function generateFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('obrigad')) {
    return 'De nada! Estou aqui sempre que precisar de clareza e orientação baseada em seu mapa numerológico.';
  }
  
  if (lowerMessage.includes('como') && lowerMessage.includes('você')) {
    return 'Sou a versão mais clara e centrada de você mesmo, baseada em seu perfil numerológico único. Como posso ajudar você a ver sua situação com mais clareza?';
  }
  
  if (lowerMessage.includes('decisão') || lowerMessage.includes('escolha')) {
    return 'Para decisões importantes, é essencial considerar tanto sua intuição quanto seus padrões numerológicos. Baseado em seu perfil, que aspectos desta escolha mais te preocupam?';
  }
  
  if (lowerMessage.includes('trabalho') || lowerMessage.includes('carreira')) {
    return 'Questões profissionais se conectam diretamente com seu número de Expressão e Destino. Considerando seu mapa numerológico, o que especificamente está gerando dúvidas em sua carreira?';
  }
  
  return 'Entendo sua questão. Embora eu esteja temporariamente com processamento reduzido, posso orientá-lo baseado em seus padrões numerológicos pessoais. Pode me contar mais detalhes sobre como isso tem afetado você?';
}

// Método GET para health check
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'OK',
    service: 'Self Flow Conversation API',
    timestamp: new Date().toISOString(),
    availableActions: ['start', 'message', 'end']
  });
}