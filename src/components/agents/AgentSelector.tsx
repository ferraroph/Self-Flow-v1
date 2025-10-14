'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Heart, Sparkles, CheckCircle, Info, ArrowRight } from 'lucide-react';
import type { AgentType, PersonalityProfile } from '@/lib/agents/base';
import { AgentManager } from '@/lib/agents';
import type { NumerologyMap } from '@/lib/numerology/calculator';

interface AgentSelectorProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  recommendedAgent?: AgentType;
  onSelect: (selectedAgent: AgentType) => void;
}

interface AgentInfo {
  type: AgentType;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  specialties: string[];
  bestFor: string[];
  approach: string;
  example: string;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  numerologyMap,
  personalityProfile,
  recommendedAgent,
  onSelect
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(recommendedAgent || null);
  const [agentComparison, setAgentComparison] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState<AgentType | null>(null);

  const agents: AgentInfo[] = [
    {
      type: 'ESOTERICO',
      name: 'Agente Esotérico',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Integra sabedoria numerológica com desenvolvimento espiritual e energético',
      specialties: [
        'Interpretação profunda de números cabalísticos',
        'Ciclos energéticos e sincronicidades',
        'Desenvolvimento da consciência superior',
        'Conexão com propósito de vida'
      ],
      bestFor: [
        'Pessoas com alta abertura espiritual',
        'Buscadores de significado transcendente',
        'Interesse em astrologia e energia',
        'Desenvolvimento de intuição'
      ],
      approach: 'Sábio e intuitivo, conecta situações práticas com padrões energéticos maiores',
      example: 'Seu Ano Pessoal 7 traz energia de introspecção espiritual. Os números mostram que este é o momento de desenvolver sua intuição e conectar-se com sua sabedoria interior através da meditação diária.'
    },
    {
      type: 'PSICOLOGICO',
      name: 'Agente Psicológico',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Combina insights numerológicos com ciência comportamental e TCC',
      specialties: [
        'Análise de padrões comportamentais',
        'Estratégias de mudança baseadas em evidências',
        'Desenvolvimento de autorregulação',
        'Técnicas de reestruturação cognitiva'
      ],
      bestFor: [
        'Pessoas que preferem abordagens científicas',
        'Interesse em psicologia e neurociência',
        'Foco em resultados práticos e mensuráveis',
        'Desenvolvimento de habilidades concretas'
      ],
      approach: 'Analítico e estruturado, traduz insights numerológicos em estratégias comportamentais práticas',
      example: 'Seu perfil numerológico indica padrão de ansiedade antecipatória. Vamos usar técnicas de mindfulness e reestruturação cognitiva, aproveitando seu Ano Pessoal 3 para desenvolver expressão emocional saudável.'
    },
    {
      type: 'HYBRID',
      name: 'Agente Híbrido',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      description: 'Síntese única entre sabedoria esotérica e conhecimento científico',
      specialties: [
        'Integração de múltiplas perspectivas',
        'Tradução entre linguagens espirituais e científicas',
        'Desenvolvimento integral da personalidade',
        'Síntese de aparentes opostos'
      ],
      bestFor: [
        'Pessoas com interesse equilibrado em ambas abordagens',
        'Buscadores de síntese e integração',
        'Alto nível de autorreflexão',
        'Abertura a múltiplas perspectivas'
      ],
      approach: 'Integrador e flexível, encontra pontos de convergência entre sabedoria ancestral e ciência moderna',
      example: 'Sua Motivação 11 indica tanto potencial intuitivo (perspectiva espiritual) quanto capacidade de processamento sutil de informações (neurociência). Vamos integrar meditação com técnicas de metacognição para desenvolvimento integral.'
    }
  ];

  useEffect(() => {
    // Calcula comparação entre agentes para este perfil específico
    const comparison = AgentManager.compareAgentsForProfile(numerologyMap, personalityProfile);
    setAgentComparison(comparison);
  }, [numerologyMap, personalityProfile]);

  const getAgentScore = (agentType: AgentType): number => {
    const result = agentComparison.find(a => a.agentType === agentType);
    return result?.suitabilityScore || 0;
  };

  const getAgentStrengths = (agentType: AgentType): string[] => {
    const result = agentComparison.find(a => a.agentType === agentType);
    return result?.strengths || [];
  };

  const handleSelect = (agentType: AgentType) => {
    setSelectedAgent(agentType);
  };

  const confirmSelection = () => {
    if (selectedAgent) {
      onSelect(selectedAgent);
    }
  };

  const AgentCard: React.FC<{ agent: AgentInfo; isRecommended?: boolean }> = ({ agent, isRecommended = false }) => {
    const score = getAgentScore(agent.type);
    const strengths = getAgentStrengths(agent.type);
    const isSelected = selectedAgent === agent.type;
    const isExpanded = showDetails === agent.type;

    return (
      <Card className={`relative cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}>
        {isRecommended && (
          <div className="absolute -top-2 -right-2 z-10">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              Recomendado
            </Badge>
          </div>
        )}
        
        <CardHeader 
          className="pb-4 cursor-pointer" 
          onClick={() => handleSelect(agent.type)}
        >
          <CardTitle className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${agent.color} text-white`}>
              {agent.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{agent.name}</span>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
              <div className="text-sm text-muted-foreground font-normal mt-1">
                Compatibilidade: {score}%
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{agent.description}</p>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(isExpanded ? null : agent.type)}
              className="text-xs"
            >
              <Info className="w-3 h-3 mr-1" />
              {isExpanded ? 'Ocultar' : 'Ver'} detalhes
            </Button>
            
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.round(score / 20) ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {isExpanded && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h4 className="text-sm font-medium mb-2">Especialidades:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {agent.specialties.map((specialty, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Ideal para:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {agent.bestFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {strengths.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Forças para seu perfil:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium mb-2">Exemplo de abordagem:</h4>
                <p className="text-xs text-muted-foreground italic bg-gray-50 p-3 rounded">
                  "{agent.example}"
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Escolha Seu Agente Especializado
          </CardTitle>
          <p className="text-muted-foreground">
            Baseado no seu mapa numerológico e perfil comportamental, selecione o tipo de clone digital que mais ressoa com você.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <AgentCard
            key={agent.type}
            agent={agent}
            isRecommended={recommendedAgent === agent.type}
          />
        ))}
      </div>

      {selectedAgent && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {agents.find(a => a.type === selectedAgent)?.name} selecionado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Compatibilidade: {getAgentScore(selectedAgent)}%
                  </p>
                </div>
              </div>
              
              <Button onClick={confirmSelection} size="lg">
                <ArrowRight className="w-4 h-4 mr-2" />
                Criar Clone Digital
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Baseado no seu perfil numerológico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-medium text-lg text-primary">{numerologyMap.motivacao}</div>
              <div className="text-muted-foreground">Motivação</div>
            </div>
            <div>
              <div className="font-medium text-lg text-primary">{numerologyMap.expressao}</div>
              <div className="text-muted-foreground">Expressão</div>
            </div>
            <div>
              <div className="font-medium text-lg text-primary">{numerologyMap.destino}</div>
              <div className="text-muted-foreground">Destino</div>
            </div>
            <div>
              <div className="font-medium text-lg text-primary">{numerologyMap.anoPessoal}</div>
              <div className="text-muted-foreground">Ano Pessoal</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSelector;