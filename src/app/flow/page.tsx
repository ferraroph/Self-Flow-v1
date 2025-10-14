'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, User, Calculator, Brain, MessageCircle, Sparkles } from 'lucide-react';

import NumerologyMap from '@/components/numerology/NumerologyMap';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import AgentSelector from '@/components/agents/AgentSelector';
import ChatInterface from '@/components/chat/ChatInterface';

import type { NumerologyMap as NumerologyMapType } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';
import { AgentFactory } from '@/lib/agents';

type FlowStep = 'numerology' | 'onboarding' | 'agent-selection' | 'conversation';

interface FlowState {
  numerologyMap?: NumerologyMapType;
  personalityProfile?: PersonalityProfile;
  selectedAgent?: AgentType;
  agent?: any; // BaseAgent instance
}

const SelfFlowMain: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('numerology');
  const [flowState, setFlowState] = useState<FlowState>({});

  const steps = [
    {
      id: 'numerology' as FlowStep,
      title: 'Mapa Numerológico',
      description: 'Descubra seu mapa numerológico cabalístico completo',
      icon: <Calculator className="w-5 h-5" />,
      completed: !!flowState.numerologyMap
    },
    {
      id: 'onboarding' as FlowStep,
      title: 'Perfil Comportamental',
      description: 'Compartilhe como você pensa e age',
      icon: <User className="w-5 h-5" />,
      completed: !!flowState.personalityProfile
    },
    {
      id: 'agent-selection' as FlowStep,
      title: 'Agente Especializado',
      description: 'Escolha sua abordagem preferida',
      icon: <Brain className="w-5 h-5" />,
      completed: !!flowState.selectedAgent
    },
    {
      id: 'conversation' as FlowStep,
      title: 'Conversação',
      description: 'Converse com seu clone digital',
      icon: <MessageCircle className="w-5 h-5" />,
      completed: false
    }
  ];

  const handleNumerologyComplete = (numerologyMap: NumerologyMapType) => {
    setFlowState(prev => ({ ...prev, numerologyMap }));
    setCurrentStep('onboarding');
  };

  const handleOnboardingComplete = (personalityProfile: PersonalityProfile, recommendedAgent: AgentType) => {
    setFlowState(prev => ({ 
      ...prev, 
      personalityProfile,
      selectedAgent: recommendedAgent
    }));
    setCurrentStep('agent-selection');
  };

  const handleAgentSelected = (selectedAgent: AgentType) => {
    if (flowState.numerologyMap && flowState.personalityProfile) {
      const agent = AgentFactory.createAgent({
        numerologyMap: flowState.numerologyMap,
        personalityProfile: flowState.personalityProfile,
        preferredAgent: selectedAgent
      });

      setFlowState(prev => ({ 
        ...prev, 
        selectedAgent,
        agent
      }));
      setCurrentStep('conversation');
    }
  };

  const goToStep = (step: FlowStep) => {
    // Só permite voltar para steps já completados ou o próximo step
    const currentStepIndex = steps.findIndex(s => s.id === currentStep);
    const targetStepIndex = steps.findIndex(s => s.id === step);
    
    if (targetStepIndex <= currentStepIndex || steps[targetStepIndex - 1]?.completed) {
      setCurrentStep(step);
    }
  };

  const ProgressIndicator: React.FC = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(step.id)}
                disabled={!step.completed && currentStep !== step.id}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  currentStep === step.id 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : step.completed
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="mb-2">{step.icon}</div>
                <div className="text-xs font-medium text-center">{step.title}</div>
              </button>
              
              {index < steps.length - 1 && (
                <ArrowRight 
                  className={`w-4 h-4 mx-4 ${
                    steps[index + 1].completed ? 'text-green-500' : 'text-gray-300'
                  }`} 
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const StepContent: React.FC = () => {
    switch (currentStep) {
      case 'numerology':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Bem-vindo ao Self Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vamos começar descobrindo seu mapa numerológico cabalístico completo. 
                  Este será a base para criar seu clone digital personalizado.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span>15+ números calculados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>Interpretações personalizadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span>Validação matemática dupla</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <NumerologyMapWrapper onComplete={handleNumerologyComplete} />
          </div>
        );

      case 'onboarding':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Comportamental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Agora vamos entender como você pensa, sente e age. Essas informações serão 
                  combinadas com seu mapa numerológico para criar um clone digital que realmente reflete você.
                </p>
              </CardContent>
            </Card>
            {flowState.numerologyMap && (
              <OnboardingFlow 
                numerologyMap={flowState.numerologyMap}
                onComplete={handleOnboardingComplete}
              />
            )}
          </div>
        );

      case 'agent-selection':
        return (
          <div className="space-y-6">
            {flowState.numerologyMap && flowState.personalityProfile && (
              <AgentSelector
                numerologyMap={flowState.numerologyMap}
                personalityProfile={flowState.personalityProfile}
                recommendedAgent={flowState.selectedAgent}
                onSelect={handleAgentSelected}
              />
            )}
          </div>
        );

      case 'conversation':
        return (
          <div className="space-y-6">
            {flowState.numerologyMap && flowState.personalityProfile && flowState.selectedAgent && (
              <ChatInterface
                numerologyMap={flowState.numerologyMap}
                personalityProfile={flowState.personalityProfile}
                selectedAgent={flowState.selectedAgent}
                onInsightGenerated={(insight) => {
                  console.log('Novo insight gerado:', insight);
                  // Aqui pode implementar salvamento de insights
                }}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Self Flow
          </h1>
          <p className="text-lg text-muted-foreground">
            Converse com a versão mais clara de você mesmo
          </p>
        </div>

        <ProgressIndicator />
        
        <StepContent />
      </div>
    </div>
  );
};

// Wrapper component para capturar os dados do mapa numerológico
const NumerologyMapWrapper: React.FC<{ onComplete: (map: NumerologyMapType) => void }> = ({ onComplete }) => {
  // Este componente precisará ser atualizado para capturar os dados do NumerologyMap
  // Por enquanto, vamos retornar o componente original
  return <NumerologyMap />;
};

export default SelfFlowMain;