'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Sparkles, 
  Heart, 
  Brain, 
  Zap,
  Leaf,
  Star,
  Waves,
  Sun,
  Moon
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface MicroMeditationProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  currentEmotionalState?: 'ansioso' | 'estressado' | 'confuso' | 'cansado' | 'neutro' | 'energizado';
  onMeditationComplete?: (meditationData: MeditationSession) => void;
}

interface MeditationTemplate {
  id: string;
  name: string;
  description: string;
  duration: 30 | 60 | 90; // segundos
  category: 'respiracao' | 'visualizacao' | 'mantra' | 'body-scan' | 'foco' | 'numerologica';
  numerologyTrigger: number[]; // Quais números do mapa tornam esta meditação relevante
  emotionalStates: string[]; // Estados emocionais que esta meditação ajuda
  icon: React.ReactNode;
  color: string;
  script: MeditationStep[];
}

interface MeditationStep {
  id: string;
  instruction: string;
  duration: number; // segundos
  type: 'instrucao' | 'respiracao' | 'visualizacao' | 'mantra' | 'silencio';
  numerologyInsight?: string; // Insight específico baseado no mapa
}

interface MeditationSession {
  id: string;
  templateId: string;
  startTime: Date;
  endTime?: Date;
  completedSteps: number;
  totalSteps: number;
  emotionalStateBefore?: string;
  emotionalStateAfter?: string;
  insights: string[];
  numerologyAlignment: number; // 0-100% quão alinhada estava com o mapa
}

const MicroMeditation: React.FC<MicroMeditationProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  currentEmotionalState = 'neutro',
  onMeditationComplete
}) => {
  const [activeTemplate, setActiveTemplate] = useState<MeditationTemplate | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [sessionData, setSessionData] = useState<MeditationSession | null>(null);
  const [completedSessions, setCompletedSessions] = useState<MeditationSession[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  // Templates de meditação adaptadas ao perfil numerológico
  const meditationTemplates: MeditationTemplate[] = [
    // Respiração para Destino 1 (Líderes)
    {
      id: 'respiracao-lideranca',
      name: 'Respiração da Liderança',
      description: 'Conecte-se com sua energia natural de liderança e confiança',
      duration: 60,
      category: 'respiracao',
      numerologyTrigger: [1],
      emotionalStates: ['ansioso', 'estressado', 'confuso'],
      icon: <Sun className="w-4 h-4" />,
      color: 'bg-yellow-100 text-yellow-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Feche os olhos e sinta sua postura ereta, como um líder natural',
          duration: 10,
          type: 'instrucao',
          numerologyInsight: `Seu Destino ${numerologyMap.destino} te conecta com energia de liderança inata`
        },
        {
          id: 'step-2', 
          instruction: 'Inspire por 4 segundos, imaginando energia dourada entrando em você',
          duration: 20,
          type: 'respiracao'
        },
        {
          id: 'step-3',
          instruction: 'Expire por 6 segundos, irradiando confiança e clareza',
          duration: 20,
          type: 'respiracao'
        },
        {
          id: 'step-4',
          instruction: 'Abra os olhos e sinta-se pronto para liderar com sabedoria',
          duration: 10,
          type: 'instrucao',
          numerologyInsight: 'Você carrega a energia do número 1 - pioneirismo e iniciativa'
        }
      ]
    },

    // Meditação para Destino 2 (Cooperação)
    {
      id: 'harmonia-cooperacao',
      name: 'Harmonia da Cooperação',
      description: 'Cultive paciência e sabedoria nas relações',
      duration: 90,
      category: 'visualizacao',
      numerologyTrigger: [2],
      emotionalStates: ['ansioso', 'estressado'],
      icon: <Heart className="w-4 h-4" />,
      color: 'bg-pink-100 text-pink-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Respire suavemente e imagine-se cercado de harmonia',
          duration: 15,
          type: 'instrucao',
          numerologyInsight: `Seu Destino ${numerologyMap.destino} te conecta com energias de cooperação`
        },
        {
          id: 'step-2',
          instruction: 'Visualize pontes douradas se formando entre você e outros',
          duration: 30,
          type: 'visualizacao'
        },
        {
          id: 'step-3',
          instruction: 'Sinta como sua paciência é uma força, não uma fraqueza',
          duration: 30,
          type: 'visualizacao'
        },
        {
          id: 'step-4',
          instruction: 'Abra-se para dar e receber apoio com facilidade',
          duration: 15,
          type: 'instrucao',
          numerologyInsight: 'Número 2 traz o dom da diplomacia e sensibilidade'
        }
      ]
    },

    // Meditação para Destino 7 (Introspecção)
    {
      id: 'sabedoria-interior',
      name: 'Sabedoria Interior',
      description: 'Conecte-se com sua intuição profunda e conhecimento interior',
      duration: 90,
      category: 'foco',
      numerologyTrigger: [7],
      emotionalStates: ['confuso', 'cansado'],
      icon: <Brain className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Entre em silêncio profundo, como um sábio meditando',
          duration: 20,
          type: 'instrucao',
          numerologyInsight: `Destino ${numerologyMap.destino} te dá acesso à sabedoria profunda`
        },
        {
          id: 'step-2',
          instruction: 'Faça uma pergunta importante e simplesmente escute',
          duration: 40,
          type: 'silencio'
        },
        {
          id: 'step-3',
          instruction: 'Confie na primeira resposta que surge, sem julgar',
          duration: 20,
          type: 'visualizacao'
        },
        {
          id: 'step-4',
          instruction: 'Agradeça sua intuição e carregue essa sabedoria consigo',
          duration: 10,
          type: 'instrucao',
          numerologyInsight: 'O número 7 é seu portal para verdades profundas'
        }
      ]
    },

    // Meditação para números mestres (11, 22, 33)
    {
      id: 'energia-mestre',
      name: 'Energia Mestre',
      description: 'Canalize sua energia espiritual elevada com equilíbrio',
      duration: 60,
      category: 'numerologica',
      numerologyTrigger: [11, 22, 33],
      emotionalStates: ['ansioso', 'estressado', 'energizado'],
      icon: <Star className="w-4 h-4" />,
      color: 'bg-indigo-100 text-indigo-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Reconheça que você carrega energia espiritual elevada',
          duration: 15,
          type: 'instrucao',
          numerologyInsight: `Número Mestre ${numerologyMap.destino === 11 || numerologyMap.motivacao === 11 || numerologyMap.expressao === 11 ? 11 : numerologyMap.destino === 22 || numerologyMap.motivacao === 22 || numerologyMap.expressao === 22 ? 22 : 33} em seu mapa`
        },
        {
          id: 'step-2',
          instruction: 'Respire como se estivesse canalizando luz dourada',
          duration: 25,
          type: 'respiracao'
        },
        {
          id: 'step-3',
          instruction: 'Equilibre essa energia - nem muito intensa, nem muito sutil',
          duration: 15,
          type: 'visualizacao'
        },
        {
          id: 'step-4',
          instruction: 'Comprometa-se a usar essa energia para servir o bem maior',
          duration: 5,
          type: 'instrucao',
          numerologyInsight: 'Números Mestres carregam responsabilidade espiritual'
        }
      ]
    },

    // Meditação para Lições Cármicas
    {
      id: 'transformacao-carmica',
      name: 'Transformação Cármica',
      description: 'Trabalhe conscientemente com suas lições de crescimento',
      duration: 90,
      category: 'mantra',
      numerologyTrigger: [], // Se aplica quando há lições cármicas
      emotionalStates: ['confuso', 'estressado'],
      icon: <Leaf className="w-4 h-4" />,
      color: 'bg-green-100 text-green-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Aceite que crescimento às vezes é desconfortável',
          duration: 15,
          type: 'instrucao',
          numerologyInsight: `Lições Cármicas: ${numerologyMap.licoesCarmicas.join(', ')} - áreas de crescimento`
        },
        {
          id: 'step-2',
          instruction: 'Repita mentalmente: "Eu abraço meu crescimento com amor"',
          duration: 40,
          type: 'mantra'
        },
        {
          id: 'step-3',
          instruction: 'Visualize-se já tendo integrado essas qualidades',
          duration: 25,
          type: 'visualizacao'
        },
        {
          id: 'step-4',
          instruction: 'Gratidão por cada oportunidade de evolução',
          duration: 10,
          type: 'instrucao',
          numerologyInsight: 'Cada desafio é uma porta para sua expansão'
        }
      ]
    },

    // Meditação de emergência (30 segundos)
    {
      id: 'reset-rapido',
      name: 'Reset Rápido',
      description: 'Centramento instantâneo em momentos de pressão',
      duration: 30,
      category: 'respiracao',
      numerologyTrigger: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
      emotionalStates: ['ansioso', 'estressado'],
      icon: <Zap className="w-4 h-4" />,
      color: 'bg-red-100 text-red-800',
      script: [
        {
          id: 'step-1',
          instruction: 'Pare tudo. Respire fundo. Você está seguro.',
          duration: 5,
          type: 'instrucao'
        },
        {
          id: 'step-2',
          instruction: '4 respirações profundas, foque apenas no ar entrando e saindo',
          duration: 16,
          type: 'respiracao'
        },
        {
          id: 'step-3',
          instruction: 'Lembre-se: você tem recursos internos para lidar com isso',
          duration: 5,
          type: 'instrucao',
          numerologyInsight: `Sua energia ${numerologyMap.destino} te dá força única`
        },
        {
          id: 'step-4',
          instruction: 'Prossiga com clareza e presença',
          duration: 4,
          type: 'instrucao'
        }
      ]
    }
  ];

  // Filtrar templates baseados no mapa numerológico e estado emocional
  const getRecommendedTemplates = () => {
    return meditationTemplates.filter(template => {
      // Verifica se o template é relevante para o estado emocional atual
      const emotionalMatch = template.emotionalStates.includes(currentEmotionalState);
      
      // Verifica se algum número do mapa numerológico faz trigger do template
      const numerologyMatch = template.numerologyTrigger.length === 0 || // Template universal
        template.numerologyTrigger.includes(numerologyMap.destino) ||
        template.numerologyTrigger.includes(numerologyMap.motivacao) ||
        template.numerologyTrigger.includes(numerologyMap.expressao) ||
        (template.id === 'transformacao-carmica' && numerologyMap.licoesCarmicas.length > 0);

      return emotionalMatch || numerologyMatch;
    });
  };

  const startMeditation = (template: MeditationTemplate) => {
    const session: MeditationSession = {
      id: `session-${Date.now()}`,
      templateId: template.id,
      startTime: new Date(),
      completedSteps: 0,
      totalSteps: template.script.length,
      emotionalStateBefore: currentEmotionalState,
      insights: [],
      numerologyAlignment: calculateNumerologyAlignment(template)
    };

    setSessionData(session);
    setActiveTemplate(template);
    setCurrentStep(0);
    setStepProgress(0);
    setIsPlaying(true);

    playStep(template.script[0]);
  };

  const playStep = (step: MeditationStep) => {
    // Gerar tom suave se for passo de respiração
    if (step.type === 'respiracao' && typeof window !== 'undefined') {
      playBreathingTone();
    }

    // Timer para o passo atual
    const stepDuration = step.duration * 1000; // Convert to ms
    let elapsed = 0;
    
    timerRef.current = setInterval(() => {
      elapsed += 100;
      const progress = (elapsed / stepDuration) * 100;
      setStepProgress(Math.min(progress, 100));
      
      if (elapsed >= stepDuration) {
        nextStep();
      }
    }, 100);
  };

  const nextStep = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (currentStep < (activeTemplate?.script.length || 0) - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setStepProgress(0);
      
      if (activeTemplate) {
        playStep(activeTemplate.script[nextStepIndex]);
      }
    } else {
      // Meditação concluída
      completeMeditation();
    }
  };

  const completeMeditation = () => {
    if (sessionData && activeTemplate) {
      const completedSession: MeditationSession = {
        ...sessionData,
        endTime: new Date(),
        completedSteps: activeTemplate.script.length,
        emotionalStateAfter: 'centrado', // Pode ser detectado via input do usuário
        insights: generateInsights(activeTemplate)
      };

      setCompletedSessions(prev => [...prev, completedSession]);
      onMeditationComplete?.(completedSession);
    }

    setIsPlaying(false);
    setActiveTemplate(null);
    setSessionData(null);
    setCurrentStep(0);
    setStepProgress(0);
  };

  const pauseMeditation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPlaying(false);
  };

  const resumeMeditation = () => {
    if (activeTemplate && currentStep < activeTemplate.script.length) {
      setIsPlaying(true);
      playStep(activeTemplate.script[currentStep]);
    }
  };

  const stopMeditation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsPlaying(false);
    setActiveTemplate(null);
    setSessionData(null);
    setCurrentStep(0);
    setStepProgress(0);
  };

  const calculateNumerologyAlignment = (template: MeditationTemplate): number => {
    // Calcular quão alinhado o template está com o mapa numerológico
    let alignment = 50; // Base
    
    if (template.numerologyTrigger.includes(numerologyMap.destino)) alignment += 30;
    if (template.numerologyTrigger.includes(numerologyMap.motivacao)) alignment += 20;
    if (template.id === 'transformacao-carmica' && numerologyMap.licoesCarmicas.length > 0) alignment += 25;
    
    return Math.min(alignment, 100);
  };

  const generateInsights = (template: MeditationTemplate): string[] => {
    const insights = [
      `Você completou ${template.name} com sucesso`,
      `Esta prática está ${calculateNumerologyAlignment(template)}% alinhada com seu mapa numerológico`
    ];
    
    // Adicionar insights específicos baseados no template
    if (template.category === 'respiracao') {
      insights.push('Sua respiração consciente fortaleceu sua presença no momento');
    }
    
    if (template.numerologyTrigger.includes(numerologyMap.destino)) {
      insights.push(`Esta meditação ressoa com seu Destino ${numerologyMap.destino}`);
    }
    
    return insights;
  };

  const playBreathingTone = () => {
    if (typeof window === 'undefined') return;
    
    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }
      
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      oscillator.frequency.value = 220; // Tom suave
      gainNode.gain.value = 0.1; // Volume baixo
      
      oscillator.start();
      oscillator.stop(audioContext.current.currentTime + 0.5);
    } catch (error) {
      console.log('Audio não disponível:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const recommendedTemplates = getRecommendedTemplates();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Micro-Meditações Adaptativas
          </CardTitle>
          <p className="text-muted-foreground">
            Intervenções de 30-90 segundos personalizadas para seu mapa numerológico
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-blue-100 text-blue-800">
              Estado: {currentEmotionalState}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              Destino {numerologyMap.destino}
            </Badge>
            {numerologyMap.licoesCarmicas.length > 0 && (
              <Badge className="bg-orange-100 text-orange-800">
                {numerologyMap.licoesCarmicas.length} lições cármicas
              </Badge>
            )}
          </div>

          {/* Estatísticas das sessões */}
          {completedSessions.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-green-700">
                    {completedSessions.length}
                  </div>
                  <div className="text-sm text-green-600">Sessões completas</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-700">
                    {Math.round(completedSessions.reduce((acc, session) => acc + session.numerologyAlignment, 0) / completedSessions.length)}%
                  </div>
                  <div className="text-sm text-blue-600">Alinhamento médio</div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-purple-700">
                    {Math.round(completedSessions.reduce((acc, session) => {
                      const duration = session.endTime && session.startTime ? 
                        (session.endTime.getTime() - session.startTime.getTime()) / 1000 : 0;
                      return acc + duration;
                    }, 0))}s
                  </div>
                  <div className="text-sm text-purple-600">Tempo total</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meditação Ativa */}
      {activeTemplate && sessionData && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {activeTemplate.icon}
                {activeTemplate.name}
              </CardTitle>
              <Badge className={activeTemplate.color}>
                {activeTemplate.duration}s
              </Badge>
            </div>
            <p className="text-muted-foreground">{activeTemplate.description}</p>
          </CardHeader>
          <CardContent>
            
            {/* Progress geral */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Passo {currentStep + 1} de {activeTemplate.script.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentStep / activeTemplate.script.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentStep + (stepProgress / 100)) / activeTemplate.script.length) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Instrução atual */}
            <Card className="bg-blue-50 border-blue-200 mb-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">
                    {activeTemplate.script[currentStep]?.instruction}
                  </div>
                  {activeTemplate.script[currentStep]?.numerologyInsight && (
                    <div className="text-sm text-blue-600 italic">
                      💫 {activeTemplate.script[currentStep].numerologyInsight}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress do passo atual */}
            <div className="mb-6">
              <div className="w-full bg-secondary rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-100"
                  style={{ width: `${stepProgress}%` }}
                />
              </div>
              <div className="text-xs text-center text-muted-foreground mt-1">
                {activeTemplate.script[currentStep]?.duration}s - {activeTemplate.script[currentStep]?.type}
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-4">
              {isPlaying ? (
                <Button onClick={pauseMeditation} variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
              ) : (
                <Button onClick={resumeMeditation}>
                  <Play className="w-4 h-4 mr-2" />
                  Retomar
                </Button>
              )}
              
              <Button onClick={stopMeditation} variant="destructive">
                Parar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates disponíveis */}
      {!activeTemplate && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedTemplates.map((template) => (
            <Card key={template.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => startMeditation(template)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {template.icon}
                    {template.name}
                  </CardTitle>
                  <Badge className={template.color}>
                    <Clock className="w-3 h-3 mr-1" />
                    {template.duration}s
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  {template.numerologyTrigger.includes(numerologyMap.destino) && (
                    <Badge variant="secondary" className="text-xs">
                      Destino {numerologyMap.destino}
                    </Badge>
                  )}
                  {template.id === 'transformacao-carmica' && numerologyMap.licoesCarmicas.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Cármico
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  <Button size="sm" className="w-full">
                    <Play className="w-3 h-3 mr-2" />
                    Iniciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Histórico de sessões */}
      {completedSessions.length > 0 && !activeTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Sessões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedSessions.slice(-5).map((session) => {
                const template = meditationTemplates.find(t => t.id === session.templateId);
                const duration = session.endTime && session.startTime ? 
                  Math.round((session.endTime.getTime() - session.startTime.getTime()) / 1000) : 0;
                
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {template?.icon}
                      <div>
                        <div className="font-medium text-sm">{template?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {session.startTime.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {duration}s
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {session.numerologyAlignment}% alinhado
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MicroMeditation;