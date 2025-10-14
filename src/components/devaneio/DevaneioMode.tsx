'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  Share2, 
  Clock, 
  Target, 
  Lightbulb,
  TrendingUp,
  Brain,
  Zap
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface DevaneioModeProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  onSaveScenario?: (scenario: DevaneioScenario) => void;
}

interface DevaneioScenario {
  id: string;
  title: string;
  description: string;
  timeframe: 'curto' | 'medio' | 'longo'; // 3 meses, 1 ano, 3+ anos
  category: 'profissional' | 'relacionamento' | 'pessoal' | 'financeiro' | 'saude' | 'espiritual';
  currentSituation: string;
  desiredOutcome: string;
  numerologyInsights: string[];
  possiblePaths: DevaneioPath[];
  createdAt: Date;
  lastSimulated?: Date;
}

interface DevaneioPath {
  id: string;
  name: string;
  probability: number; // 0-100%
  description: string;
  challenges: string[];
  opportunities: string[];
  numerologyAlignment: number; // 0-100% quão alinhado com o mapa numerológico
  steps: DevaneioStep[];
}

interface DevaneioStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  numerologySupport: string;
  difficulty: 'baixa' | 'media' | 'alta';
}

const DevaneioMode: React.FC<DevaneioModeProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  onSaveScenario
}) => {
  const [activeScenario, setActiveScenario] = useState<DevaneioScenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [scenarios, setScenarios] = useState<DevaneioScenario[]>([]);
  
  // Estado do formulário de novo cenário
  const [newScenarioForm, setNewScenarioForm] = useState({
    title: '',
    description: '',
    timeframe: 'medio' as const,
    category: 'profissional' as const,
    currentSituation: '',
    desiredOutcome: ''
  });

  const [showNewScenarioForm, setShowNewScenarioForm] = useState(false);

  // Simular cenários baseados no mapa numerológico
  const generateNumerologyInsights = (scenario: Partial<DevaneioScenario>) => {
    const insights: string[] = [];
    
    // Insights baseados no número de Destino
    if (numerologyMap.destino === 1) {
      insights.push("Sua energia de liderança natural será crucial para alcançar este objetivo");
    } else if (numerologyMap.destino === 2) {
      insights.push("Parcerias e colaborações serão fundamentais neste caminho");
    } else if (numerologyMap.destino === 3) {
      insights.push("Sua criatividade e comunicação serão suas maiores ferramentas");
    } else if (numerologyMap.destino === 4) {
      insights.push("Planejamento meticuloso e persistência levarão ao sucesso");
    } else if (numerologyMap.destino === 5) {
      insights.push("Flexibilidade e adaptação serão necessárias durante mudanças");
    } else if (numerologyMap.destino === 6) {
      insights.push("Responsabilidade e cuidado com outros influenciarão este resultado");
    } else if (numerologyMap.destino === 7) {
      insights.push("Reflexão profunda e análise detalhada guiarão suas decisões");
    } else if (numerologyMap.destino === 8) {
      insights.push("Foco em resultados materiais e organização estruturada serão vitais");
    } else if (numerologyMap.destino === 9) {
      insights.push("Visão humanitária e desapego ajudarão na realização deste objetivo");
    } else if (numerologyMap.destino === 11) {
      insights.push("Sua intuição elevada e inspiração serão fundamentais");
    } else if (numerologyMap.destino === 22) {
      insights.push("Sua capacidade de materializar grandes visões será testada");
    }

    // Insights baseados no Ano Pessoal
    if (numerologyMap.anoPessoal === 1) {
      insights.push("Este é um ano ideal para iniciar novos projetos relacionados ao seu objetivo");
    } else if (numerologyMap.anoPessoal === 2) {
      insights.push("Paciência e cooperação serão necessárias este ano");
    } else if (numerologyMap.anoPessoal === 3) {
      insights.push("Ano favorável para expressão criativa e networking");
    } else if (numerologyMap.anoPessoal === 9) {
      insights.push("Momento de finalização de ciclos antes de iniciar algo novo");
    }

    // Insights baseados nas Lições Cármicas
    if (numerologyMap.licoesCarmicas.includes(4)) {
      insights.push("Desenvolver disciplina e organização será um desafio importante");
    }
    if (numerologyMap.licoesCarmicas.includes(5)) {
      insights.push("Aprender a lidar com mudanças e liberdade responsável");
    }
    if (numerologyMap.licoesCarmicas.includes(7)) {
      insights.push("Desenvolver autoconhecimento e confiança em sua intuição");
    }

    return insights;
  };

  const generatePossiblePaths = (scenario: Partial<DevaneioScenario>): DevaneioPath[] => {
    const paths: DevaneioPath[] = [];

    // Caminho otimista (alinhado com números positivos)
    paths.push({
      id: `path-optimistic-${Date.now()}`,
      name: "Caminho da Manifestação",
      probability: numerologyMap.destino <= 5 ? 85 : 70,
      description: `Aproveitar seus talentos naturais (Destino ${numerologyMap.destino}) para alcançar o resultado desejado`,
      challenges: ["Manter a disciplina", "Superar autossabotagem", "Gerenciar expectativas"],
      opportunities: ["Crescimento pessoal acelerado", "Reconhecimento", "Realização profunda"],
      numerologyAlignment: 90,
      steps: generateStepsForPath('optimistic', scenario, numerologyMap)
    });

    // Caminho desafiador (trabalhando lições cármicas)
    if (numerologyMap.licoesCarmicas.length > 0) {
      paths.push({
        id: `path-karmic-${Date.now()}`,
        name: "Caminho do Crescimento Cármico",
        probability: 60,
        description: `Transformar desafios em oportunidades trabalhando suas lições cármicas: ${numerologyMap.licoesCarmicas.join(', ')}`,
        challenges: ["Enfrentar padrões antigos", "Desenvolver qualidades ausentes", "Paciência com o processo"],
        opportunities: ["Evolução espiritual", "Quebra de padrões limitantes", "Sabedoria adquirida"],
        numerologyAlignment: 75,
        steps: generateStepsForPath('karmic', scenario, numerologyMap)
      });
    }

    // Caminho equilibrado (usando harmônico superior)
    paths.push({
      id: `path-balanced-${Date.now()}`,
      name: "Caminho do Equilíbrio",
      probability: 75,
      description: `Integrar aspectos materiais e espirituais (Harmônico Superior ${numerologyMap.harmonicoSuperior})`,
      challenges: ["Manter equilíbrio", "Não se dispersar", "Tomar decisões alinhadas"],
      opportunities: ["Crescimento integrado", "Satisfação plena", "Impacto positivo nos outros"],
      numerologyAlignment: 85,
      steps: generateStepsForPath('balanced', scenario, numerologyMap)
    });

    return paths;
  };

  const generateStepsForPath = (pathType: 'optimistic' | 'karmic' | 'balanced', scenario: Partial<DevaneioScenario>, map: NumerologyMap): DevaneioStep[] => {
    const steps: DevaneioStep[] = [];
    const timeframes = scenario.timeframe === 'curto' ? 
      ['1-2 semanas', '1 mês', '2-3 meses'] : 
      scenario.timeframe === 'medio' ?
      ['1-3 meses', '6 meses', '1 ano'] :
      ['6 meses', '1-2 anos', '3+ anos'];

    if (pathType === 'optimistic') {
      steps.push({
        id: `step-1-${pathType}`,
        title: "Alinhamento Inicial",
        description: `Conectar-se com sua energia natural (Destino ${map.destino}) e definir intenções claras`,
        timeframe: timeframes[0],
        numerologySupport: `Ano Pessoal ${map.anoPessoal} favorece novos começos`,
        difficulty: 'baixa'
      });
      
      steps.push({
        id: `step-2-${pathType}`,
        title: "Ação Direcionada",
        description: "Implementar estratégias aproveitando seus talentos naturais",
        timeframe: timeframes[1],
        numerologySupport: `Motivação ${map.motivacao} impulsiona as ações`,
        difficulty: 'media'
      });
      
      steps.push({
        id: `step-3-${pathType}`,
        title: "Manifestação Completa",
        description: "Alcançar o resultado desejado e integrar os aprendizados",
        timeframe: timeframes[2],
        numerologySupport: `Expressão ${map.expressao} se manifesta plenamente`,
        difficulty: 'media'
      });
    }

    // Adicionar mais lógica para outros tipos de path...

    return steps;
  };

  const simulateScenario = async (scenario: DevaneioScenario) => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    // Simular progresso
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Gerar insights e caminhos para o cenário
    const insights = generateNumerologyInsights(scenario);
    const paths = generatePossiblePaths(scenario);
    
    const simulatedScenario: DevaneioScenario = {
      ...scenario,
      numerologyInsights: insights,
      possiblePaths: paths,
      lastSimulated: new Date()
    };
    
    setActiveScenario(simulatedScenario);
    
    // Atualizar a lista de cenários
    setScenarios(prev => 
      prev.map(s => s.id === scenario.id ? simulatedScenario : s)
    );
  };

  const createNewScenario = () => {
    const newScenario: DevaneioScenario = {
      id: `scenario-${Date.now()}`,
      ...newScenarioForm,
      numerologyInsights: [],
      possiblePaths: [],
      createdAt: new Date()
    };

    setScenarios(prev => [...prev, newScenario]);
    simulateScenario(newScenario);
    setShowNewScenarioForm(false);
    
    // Reset form
    setNewScenarioForm({
      title: '',
      description: '',
      timeframe: 'medio',
      category: 'profissional',
      currentSituation: '',
      desiredOutcome: ''
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'profissional': return <TrendingUp className="w-4 h-4" />;
      case 'relacionamento': return <Sparkles className="w-4 h-4" />;
      case 'pessoal': return <Brain className="w-4 h-4" />;
      case 'financeiro': return <Target className="w-4 h-4" />;
      case 'saude': return <Zap className="w-4 h-4" />;
      case 'espiritual': return <Lightbulb className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTimeframeBadge = (timeframe: string) => {
    const colors = {
      'curto': 'bg-green-100 text-green-800',
      'medio': 'bg-blue-100 text-blue-800', 
      'longo': 'bg-purple-100 text-purple-800'
    };
    
    const labels = {
      'curto': '3 meses',
      'medio': '1 ano',
      'longo': '3+ anos'
    };
    
    return <Badge className={colors[timeframe as keyof typeof colors]}>{labels[timeframe as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Modo Devaneio - Simulação de Cenários
          </CardTitle>
          <p className="text-muted-foreground">
            Explore possibilidades futuras baseadas em seu mapa numerológico e perfil comportamental
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => setShowNewScenarioForm(true)}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Novo Cenário
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Baseado em: Destino {numerologyMap.destino} • Ano Pessoal {numerologyMap.anoPessoal}
            </div>
          </div>

          {/* Formulário de novo cenário */}
          {showNewScenarioForm && (
            <Card className="mb-6 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Criar Novo Cenário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scenario-title">Título do Cenário</Label>
                    <Input
                      id="scenario-title"
                      value={newScenarioForm.title}
                      onChange={(e) => setNewScenarioForm(prev => ({...prev, title: e.target.value}))}
                      placeholder="Ex: Mudança de carreira"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="scenario-category">Categoria</Label>
                    <select 
                      id="scenario-category"
                      value={newScenarioForm.category}
                      onChange={(e) => setNewScenarioForm(prev => ({...prev, category: e.target.value as any}))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="profissional">Profissional</option>
                      <option value="relacionamento">Relacionamento</option>
                      <option value="pessoal">Desenvolvimento Pessoal</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="saude">Saúde</option>
                      <option value="espiritual">Espiritual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="scenario-description">Descrição</Label>
                  <Input
                    id="scenario-description"
                    value={newScenarioForm.description}
                    onChange={(e) => setNewScenarioForm(prev => ({...prev, description: e.target.value}))}
                    placeholder="Descreva brevemente o cenário que quer explorar"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-situation">Situação Atual</Label>
                    <Input
                      id="current-situation"
                      value={newScenarioForm.currentSituation}
                      onChange={(e) => setNewScenarioForm(prev => ({...prev, currentSituation: e.target.value}))}
                      placeholder="Como está sua situação hoje?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="desired-outcome">Resultado Desejado</Label>
                    <Input
                      id="desired-outcome"
                      value={newScenarioForm.desiredOutcome}
                      onChange={(e) => setNewScenarioForm(prev => ({...prev, desiredOutcome: e.target.value}))}
                      placeholder="Onde quer chegar?"
                    />
                  </div>
                </div>

                <div>
                  <Label>Prazo</Label>
                  <div className="flex gap-2 mt-2">
                    {[
                      { value: 'curto', label: '3 meses' },
                      { value: 'medio', label: '1 ano' },
                      { value: 'longo', label: '3+ anos' }
                    ].map(option => (
                      <Button
                        key={option.value}
                        variant={newScenarioForm.timeframe === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewScenarioForm(prev => ({...prev, timeframe: option.value as any}))}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={createNewScenario}
                    disabled={!newScenarioForm.title || !newScenarioForm.currentSituation || !newScenarioForm.desiredOutcome}
                  >
                    Simular Cenário
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewScenarioForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de cenários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setActiveScenario(scenario)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {getCategoryIcon(scenario.category)}
                      {scenario.title}
                    </CardTitle>
                    {getTimeframeBadge(scenario.timeframe)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{scenario.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {scenario.possiblePaths.length} caminhos
                    </Badge>
                    {scenario.lastSimulated && (
                      <span className="text-xs text-muted-foreground">
                        Simulado {scenario.lastSimulated.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simulação em progresso */}
      {isSimulating && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mb-4">
                <Sparkles className="w-8 h-8 animate-spin mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simulando Cenário...</h3>
              <p className="text-muted-foreground mb-4">
                Analisando possibilidades baseadas em seu mapa numerológico
              </p>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${simulationProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{simulationProgress}%</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detalhes do cenário ativo */}
      {activeScenario && !isSimulating && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(activeScenario.category)}
                {activeScenario.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {getTimeframeBadge(activeScenario.timeframe)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => simulateScenario(activeScenario)}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">{activeScenario.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Situação atual vs Resultado desejado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Situação Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{activeScenario.currentSituation}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Resultado Desejado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{activeScenario.desiredOutcome}</p>
                </CardContent>
              </Card>
            </div>

            {/* Insights numerológicos */}
            {activeScenario.numerologyInsights.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Insights Numerológicos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activeScenario.numerologyInsights.map((insight, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Caminhos possíveis */}
            {activeScenario.possiblePaths.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Caminhos Possíveis</h3>
                {activeScenario.possiblePaths.map((path) => (
                  <Card key={path.id} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{path.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{path.probability}% probabilidade</Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            {path.numerologyAlignment}% alinhamento
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-orange-700 mb-2">Desafios</h4>
                          <ul className="space-y-1">
                            {path.challenges.map((challenge, index) => (
                              <li key={index} className="text-sm text-orange-600">
                                • {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-2">Oportunidades</h4>
                          <ul className="space-y-1">
                            {path.opportunities.map((opportunity, index) => (
                              <li key={index} className="text-sm text-green-600">
                                • {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Steps do caminho */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Passos Sugeridos</h4>
                        {path.steps.map((step, index) => (
                          <Card key={step.id} className="bg-gray-50 border-gray-200">
                            <CardContent className="pt-3 pb-3">
                              <div className="flex items-start gap-3">
                                <Badge variant="outline" className="text-xs">
                                  {index + 1}
                                </Badge>
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium">{step.title}</h5>
                                  <p className="text-xs text-muted-foreground mb-1">{step.description}</p>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge variant="secondary">{step.timeframe}</Badge>
                                    <span className="text-blue-600">{step.numerologySupport}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Ações */}
            <Separator />
            <div className="flex gap-2">
              <Button 
                onClick={() => onSaveScenario?.(activeScenario)}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Cenário
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DevaneioMode;