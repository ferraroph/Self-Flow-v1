'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Brain, Heart, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';
import { AgentFactory, AgentRecommendation } from '@/lib/agents';
import type { NumerologyMap } from '@/lib/numerology/calculator';

interface OnboardingProps {
  numerologyMap: NumerologyMap;
  onComplete: (profile: PersonalityProfile, recommendedAgent: AgentType) => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  type: 'scale' | 'select' | 'multiselect' | 'text';
  options?: { value: string; label: string; description?: string }[];
  scaleLabels?: { min: string; max: string };
}

const OnboardingFlow: React.FC<OnboardingProps> = ({ numerologyMap, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [recommendation, setRecommendation] = useState<AgentRecommendation | null>(null);

  const steps: OnboardingStep[] = [
    {
      id: 'basic_info',
      title: 'Informações Básicas',
      description: 'Conte-nos um pouco sobre sua situação atual',
      questions: [
        {
          id: 'age',
          text: 'Qual sua idade?',
          type: 'select',
          options: [
            { value: '18-25', label: '18-25 anos' },
            { value: '26-35', label: '26-35 anos' },
            { value: '36-45', label: '36-45 anos' },
            { value: '46-55', label: '46-55 anos' },
            { value: '56+', label: '56+ anos' }
          ]
        },
        {
          id: 'currentSituation',
          text: 'Como você descreveria sua situação atual?',
          type: 'text'
        },
        {
          id: 'mainChallenges',
          text: 'Quais são seus principais desafios atualmente?',
          type: 'multiselect',
          options: [
            { value: 'ansiedade', label: 'Ansiedade e preocupação' },
            { value: 'decisoes', label: 'Dificuldade para tomar decisões' },
            { value: 'autoconfianca', label: 'Falta de autoconfiança' },
            { value: 'relacionamentos', label: 'Problemas de relacionamento' },
            { value: 'carreira', label: 'Direcionamento profissional' },
            { value: 'proposito', label: 'Falta de propósito' },
            { value: 'estresse', label: 'Estresse e sobrecarga' },
            { value: 'mudancas', label: 'Resistência a mudanças' }
          ]
        }
      ]
    },
    {
      id: 'personality_traits',
      title: 'Traços de Personalidade',
      description: 'Como você se comporta e toma decisões?',
      questions: [
        {
          id: 'communicationStyle',
          text: 'Qual seu estilo de comunicação predominante?',
          type: 'select',
          options: [
            { value: 'direto', label: 'Direto e objetivo', description: 'Fala de forma clara e sem rodeios' },
            { value: 'empático', label: 'Empático e cuidadoso', description: 'Considera sentimentos dos outros' },
            { value: 'analítico', label: 'Analítico e detalhista', description: 'Gosta de dados e precisão' },
            { value: 'criativo', label: 'Criativo e expressivo', description: 'Usa metáforas e exemplos' }
          ]
        },
        {
          id: 'decisionMaking',
          text: 'Como você costuma tomar decisões importantes?',
          type: 'select',
          options: [
            { value: 'racional', label: 'Análise racional', description: 'Peso prós e contras, busco dados' },
            { value: 'intuitivo', label: 'Intuição e feeling', description: 'Confio no meu instinto' },
            { value: 'híbrido', label: 'Combinação de ambos', description: 'Uso lógica E intuição' }
          ]
        },
        {
          id: 'stressResponse',
          text: 'Como você reage quando está estressado?',
          type: 'select',
          options: [
            { value: 'ação', label: 'Parto para ação', description: 'Faço algo para resolver' },
            { value: 'reflexão', label: 'Paro para refletir', description: 'Preciso de tempo para pensar' },
            { value: 'busca_ajuda', label: 'Busco ajuda', description: 'Converso com outros' }
          ]
        },
        {
          id: 'motivationStyle',
          text: 'O que mais te motiva?',
          type: 'select',
          options: [
            { value: 'intrínseca', label: 'Satisfação pessoal', description: 'Crescimento e realização própria' },
            { value: 'extrínseca', label: 'Reconhecimento externo', description: 'Aprovação e recompensas' },
            { value: 'mista', label: 'Ambos igualmente', description: 'Equilibrio entre interno e externo' }
          ]
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferências de Abordagem',
      description: 'Que tipo de orientação você prefere?',
      questions: [
        {
          id: 'spiritualOpenness',
          text: 'Qual sua abertura para abordagens espirituais/esotéricas?',
          type: 'scale',
          scaleLabels: { min: 'Muito cético', max: 'Muito aberto' }
        },
        {
          id: 'psychologicalInterest',
          text: 'Qual seu interesse por psicologia e ciência comportamental?',
          type: 'scale',
          scaleLabels: { min: 'Pouco interesse', max: 'Muito interessado' }
        },
        {
          id: 'selfReflectionLevel',
          text: 'Como você avalia seu nível de autorreflexão?',
          type: 'scale',
          scaleLabels: { min: 'Prefiro ação', max: 'Amo refletir' }
        }
      ]
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendation();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendation = () => {
    // Converte respostas em PersonalityProfile
    const profile: PersonalityProfile = {
      name: numerologyMap.calculationLog[0]?.split(': ')[1]?.split(',')[0] || 'Usuário',
      age: getAgeFromResponse(responses.age),
      currentSituation: responses.currentSituation || 'Buscando maior clareza pessoal',
      mainChallenges: Array.isArray(responses.mainChallenges) ? responses.mainChallenges : [],
      coreValues: extractCoreValues(responses),
      communicationStyle: responses.communicationStyle || 'empático',
      decisionMaking: responses.decisionMaking || 'híbrido',
      stressResponse: responses.stressResponse || 'reflexão',
      motivationStyle: responses.motivationStyle || 'intrínseca',
      spiritualOpenness: responses.spiritualOpenness || 3,
      psychologicalInterest: responses.psychologicalInterest || 3,
      selfReflectionLevel: responses.selfReflectionLevel || 3
    };

    const agentRecommendation = AgentFactory.recommendAgent(numerologyMap, profile);
    setRecommendation(agentRecommendation);
  };

  const completeOnboarding = () => {
    if (recommendation) {
      const profile: PersonalityProfile = {
        name: numerologyMap.calculationLog[0]?.split(': ')[1]?.split(',')[0] || 'Usuário',
        age: getAgeFromResponse(responses.age),
        currentSituation: responses.currentSituation || 'Buscando maior clareza pessoal',
        mainChallenges: Array.isArray(responses.mainChallenges) ? responses.mainChallenges : [],
        coreValues: extractCoreValues(responses),
        communicationStyle: responses.communicationStyle || 'empático',
        decisionMaking: responses.decisionMaking || 'híbrido',
        stressResponse: responses.stressResponse || 'reflexão',
        motivationStyle: responses.motivationStyle || 'intrínseca',
        spiritualOpenness: responses.spiritualOpenness || 3,
        psychologicalInterest: responses.psychologicalInterest || 3,
        selfReflectionLevel: responses.selfReflectionLevel || 3
      };

      onComplete(profile, recommendation.recommendedAgent);
    }
  };

  const getAgeFromResponse = (ageRange: string): number => {
    const ageMap: Record<string, number> = {
      '18-25': 22,
      '26-35': 30,
      '36-45': 40,
      '46-55': 50,
      '56+': 60
    };
    return ageMap[ageRange] || 35;
  };

  const extractCoreValues = (responses: Record<string, any>): string[] => {
    const values: string[] = ['Crescimento pessoal'];
    
    if (responses.motivationStyle === 'intrínseca') values.push('Autenticidade');
    if (responses.spiritualOpenness >= 4) values.push('Espiritualidade');
    if (responses.psychologicalInterest >= 4) values.push('Autoconhecimento');
    if (responses.communicationStyle === 'empático') values.push('Conexão humana');
    
    return values;
  };

  const isStepComplete = (step: OnboardingStep): boolean => {
    return step.questions.every(q => responses[q.id] !== undefined);
  };

  const ScaleQuestion: React.FC<{ question: Question; value: number; onChange: (value: number) => void }> = 
    ({ question, value, onChange }) => (
    <div className="space-y-4">
      <p className="text-sm font-medium">{question.text}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{question.scaleLabels?.min}</span>
          <span>{question.scaleLabels?.max}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => onChange(num)}
              className={`w-12 h-12 rounded-full border-2 transition-colors ${
                value === num 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const SelectQuestion: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = 
    ({ question, value, onChange }) => (
    <div className="space-y-4">
      <p className="text-sm font-medium">{question.text}</p>
      <div className="grid gap-3">
        {question.options?.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`text-left p-4 rounded-lg border-2 transition-colors ${
              value === option.value 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{option.label}</div>
            {option.description && (
              <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const MultiSelectQuestion: React.FC<{ question: Question; value: string[]; onChange: (value: string[]) => void }> = 
    ({ question, value = [], onChange }) => (
    <div className="space-y-4">
      <p className="text-sm font-medium">{question.text}</p>
      <div className="grid gap-2">
        {question.options?.map(option => (
          <button
            key={option.value}
            onClick={() => {
              const newValue = value.includes(option.value)
                ? value.filter(v => v !== option.value)
                : [...value, option.value];
              onChange(newValue);
            }}
            className={`text-left p-3 rounded-lg border transition-colors ${
              value.includes(option.value) 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {value.includes(option.value) && <CheckCircle className="w-4 h-4 text-primary" />}
              <span>{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const TextQuestion: React.FC<{ question: Question; value: string; onChange: (value: string) => void }> = 
    ({ question, value, onChange }) => (
    <div className="space-y-4">
      <p className="text-sm font-medium">{question.text}</p>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-lg resize-none h-24"
        placeholder="Descreva em algumas palavras..."
      />
    </div>
  );

  const getAgentIcon = (agentType: AgentType) => {
    switch (agentType) {
      case 'ESOTERICO': return '🔮';
      case 'PSICOLOGICO': return '🧠';
      case 'HYBRID': return '🌟';
      default: return '💫';
    }
  };

  const getAgentName = (agentType: AgentType) => {
    switch (agentType) {
      case 'ESOTERICO': return 'Agente Esotérico';
      case 'PSICOLOGICO': return 'Agente Psicológico';
      case 'HYBRID': return 'Agente Híbrido';
      default: return 'Agente Personalizado';
    }
  };

  const getAgentDescription = (agentType: AgentType) => {
    switch (agentType) {
      case 'ESOTERICO': 
        return 'Integra seu mapa numerológico com sabedoria espiritual, ciclos energéticos e desenvolvimento da consciência superior.';
      case 'PSICOLOGICO': 
        return 'Combina insights numerológicos com ciência comportamental, TCC e estratégias práticas de desenvolvimento pessoal.';
      case 'HYBRID': 
        return 'Sintetiza abordagens esotéricas e científicas, criando uma perspectiva integral única para seu crescimento.';
      default: 
        return 'Clone personalizado baseado em seu perfil único.';
    }
  };

  if (recommendation) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Seu Clone Digital Recomendado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-4xl mb-2">{getAgentIcon(recommendation.recommendedAgent)}</div>
            <h3 className="text-xl font-bold mb-2">{getAgentName(recommendation.recommendedAgent)}</h3>
            <p className="text-muted-foreground mb-4">{getAgentDescription(recommendation.recommendedAgent)}</p>
            <Badge variant="secondary" className="text-sm">
              {recommendation.confidence}% de compatibilidade
            </Badge>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Por que esta recomendação?</h4>
            <ul className="space-y-2">
              {recommendation.reasoning.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {recommendation.alternativeAgents.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Alternativas disponíveis:</h4>
              <div className="grid gap-2">
                {recommendation.alternativeAgents.map(alt => (
                  <div key={alt.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>{getAgentIcon(alt.type)}</span>
                      <span className="text-sm">{getAgentName(alt.type)}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((alt.score / 10) * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex gap-3">
            <Button onClick={completeOnboarding} className="flex-1">
              <ArrowRight className="w-4 h-4 mr-2" />
              Criar Meu Clone Digital
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          {currentStepData.title}
        </CardTitle>
        <p className="text-muted-foreground">{currentStepData.description}</p>
        
        {/* Progress indicator */}
        <div className="flex gap-2 mt-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded ${
                idx <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {currentStepData.questions.map(question => (
          <div key={question.id}>
            {question.type === 'scale' && (
              <ScaleQuestion
                question={question}
                value={responses[question.id] || 0}
                onChange={(value) => handleResponse(question.id, value)}
              />
            )}
            
            {question.type === 'select' && (
              <SelectQuestion
                question={question}
                value={responses[question.id] || ''}
                onChange={(value) => handleResponse(question.id, value)}
              />
            )}
            
            {question.type === 'multiselect' && (
              <MultiSelectQuestion
                question={question}
                value={responses[question.id] || []}
                onChange={(value) => handleResponse(question.id, value)}
              />
            )}
            
            {question.type === 'text' && (
              <TextQuestion
                question={question}
                value={responses[question.id] || ''}
                onChange={(value) => handleResponse(question.id, value)}
              />
            )}
          </div>
        ))}
        
        <Separator />
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!isStepComplete(currentStepData)}
          >
            {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingFlow;