'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award, 
  Crown, 
  Sparkles, 
  TrendingUp,
  Calendar,
  MessageCircle,
  Brain,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  Gift,
  Flame,
  Medal,
  Diamond
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface GamificationSystemProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  userStats: UserStats;
  onLevelUp?: (newLevel: number, rewards: Reward[]) => void;
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

interface UserStats {
  totalConversations: number;
  totalMeditations: number;
  totalDevaneios: number;
  daysActive: number;
  totalTimeSpent: number; // em minutos
  insightsGenerated: number;
  consecutiveDays: number;
  averageSessionTime: number;
  joinDate: Date;
}

interface PlayerLevel {
  level: number;
  title: string;
  xpRequired: number;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  numerologyAlignment?: number; // Específico para cada mapa numerológico
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
  category: 'conversacao' | 'meditacao' | 'devaneio' | 'consistencia' | 'descoberta' | 'numerologia';
  requirement: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number; // 0-100%
}

interface Reward {
  id: string;
  type: 'xp' | 'titulo' | 'avatar' | 'funcionalidade' | 'badge';
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
}

interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'diaria' | 'semanal' | 'mensal' | 'numerologica';
  target: number;
  progress: number;
  xpReward: number;
  deadline?: Date;
  numerologySpecific?: number; // Específico para pessoas com certo número
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  userStats,
  onLevelUp,
  onAchievementUnlocked
}) => {
  const [currentXP, setCurrentXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [recentRewards, setRecentRewards] = useState<Reward[]>([]);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);

  // Calcular XP baseado nas estatísticas
  const calculateTotalXP = useMemo(() => {
    let xp = 0;
    xp += userStats.totalConversations * 50; // 50 XP por conversa
    xp += userStats.totalMeditations * 30; // 30 XP por meditação
    xp += userStats.totalDevaneios * 100; // 100 XP por devaneio
    xp += userStats.daysActive * 25; // 25 XP por dia ativo
    xp += userStats.consecutiveDays * 10; // Bonus por consistência
    xp += userStats.insightsGenerated * 20; // 20 XP por insight
    xp += Math.floor(userStats.totalTimeSpent / 10) * 5; // 5 XP a cada 10 minutos
    return xp;
  }, [userStats]);

  // Sistema de níveis baseado no mapa numerológico
  const playerLevels: PlayerLevel[] = useMemo(() => {
    const destino = numerologyMap.destino;
    const baseColor = destino === 1 ? '#F59E0B' : destino === 7 ? '#7C3AED' : '#3B82F6';
    
    return [
      {
        level: 1,
        title: 'Buscador Iniciante',
        xpRequired: 0,
        icon: <Star className="w-4 h-4" />,
        color: '#9CA3AF',
        benefits: ['Acesso básico ao Self Flow']
      },
      {
        level: 2,
        title: `Explorador ${destino === 7 ? 'Místico' : destino === 1 ? 'Pioneiro' : 'Curioso'}`,
        xpRequired: 500,
        icon: <Eye className="w-4 h-4" />,
        color: '#60A5FA',
        benefits: ['Modo Devaneio desbloqueado', 'Insights personalizados']
      },
      {
        level: 3,
        title: `Praticante ${destino === 2 ? 'Harmonioso' : destino === 8 ? 'Determinado' : 'Dedicado'}`,
        xpRequired: 1200,
        icon: <Brain className="w-4 h-4" />,
        color: '#34D399',
        benefits: ['Micro-meditações avançadas', 'Avatar personalizado']
      },
      {
        level: 4,
        title: `Conhecedor ${destino === 3 ? 'Criativo' : destino === 6 ? 'Compassivo' : 'Sábio'}`,
        xpRequired: 2500,
        icon: <Sparkles className="w-4 h-4" />,
        color: '#A78BFA',
        benefits: ['Análises numerológicas profundas', 'Funcionalidades exclusivas']
      },
      {
        level: 5,
        title: `Mestre ${destino === 11 ? 'Iluminado' : destino === 22 ? 'Construtor' : 'Interior'}`,
        xpRequired: 5000,
        icon: <Crown className="w-4 h-4" />,
        color: baseColor,
        benefits: ['Acesso completo', 'Mentoria de outros usuários', 'Funcionalidades beta'],
        numerologyAlignment: 100
      }
    ];
  }, [numerologyMap.destino]);

  // Achievements baseados no perfil numerológico
  const achievements: Achievement[] = useMemo(() => [
    // Achievements de Conversação
    {
      id: 'first-conversation',
      title: 'Primeiro Diálogo',
      description: 'Complete sua primeira conversa com o clone digital',
      icon: <MessageCircle className="w-5 h-5" />,
      rarity: 'comum',
      category: 'conversacao',
      requirement: 'conversations >= 1',
      xpReward: 100,
      unlocked: userStats.totalConversations >= 1
    },
    {
      id: 'conversational-explorer',
      title: 'Explorador Conversacional',
      description: 'Tenha 25 conversas profundas',
      icon: <TrendingUp className="w-5 h-5" />,
      rarity: 'raro',
      category: 'conversacao',
      requirement: 'conversations >= 25',
      xpReward: 500,
      unlocked: userStats.totalConversations >= 25
    },
    
    // Achievements de Meditação
    {
      id: 'zen-beginner',
      title: 'Iniciante Zen',
      description: 'Complete 10 micro-meditações',
      icon: <Heart className="w-5 h-5" />,
      rarity: 'comum',
      category: 'meditacao',
      requirement: 'meditations >= 10',
      xpReward: 200,
      unlocked: userStats.totalMeditations >= 10
    },
    {
      id: 'meditation-master',
      title: 'Mestre da Meditação',
      description: 'Complete 100 micro-meditações',
      icon: <Diamond className="w-5 h-5" />,
      rarity: 'epico',
      category: 'meditacao',
      requirement: 'meditations >= 100',
      xpReward: 1000,
      unlocked: userStats.totalMeditations >= 100
    },

    // Achievements Numerológicos Específicos
    {
      id: `destino-mastery-${numerologyMap.destino}`,
      title: `Mestre do Destino ${numerologyMap.destino}`,
      description: `Domine completamente as energias do seu Destino ${numerologyMap.destino}`,
      icon: <Crown className="w-5 h-5" />,
      rarity: 'lendario',
      category: 'numerologia',
      requirement: 'level >= 5 && conversations >= 50',
      xpReward: 2000,
      unlocked: currentLevel >= 5 && userStats.totalConversations >= 50
    },

    // Achievements de Consistência
    {
      id: 'weekly-warrior',
      title: 'Guerreiro Semanal',
      description: 'Use o Self Flow por 7 dias consecutivos',
      icon: <Flame className="w-5 h-5" />,
      rarity: 'raro',
      category: 'consistencia',
      requirement: 'consecutiveDays >= 7',
      xpReward: 400,
      unlocked: userStats.consecutiveDays >= 7
    },
    
    // Achievements de Descoberta
    {
      id: 'insight-collector',
      title: 'Colecionador de Insights',
      description: 'Gere 50 insights únicos sobre você mesmo',
      icon: <Lightbulb className="w-5 h-5" />,
      rarity: 'epico',
      category: 'descoberta',
      requirement: 'insights >= 50',
      xpReward: 800,
      unlocked: userStats.insightsGenerated >= 50
    },

    // Achievement especial para números mestres
    ...(numerologyMap.destino === 11 || numerologyMap.destino === 22 || numerologyMap.destino === 33 ? [{
      id: 'master-number-awakening',
      title: 'Despertar do Número Mestre',
      description: `Desbloqueie o potencial completo do seu Número Mestre ${numerologyMap.destino}`,
      icon: <Star className="w-5 h-5" />,
      rarity: 'lendario' as const,
      category: 'numerologia' as const,
      requirement: 'conversations >= 33 && meditations >= 22',
      xpReward: 3000,
      unlocked: userStats.totalConversations >= 33 && userStats.totalMeditations >= 22
    }] : [])
  ], [numerologyMap, userStats, currentLevel]);

  // Quests diárias/semanais
  const generateDailyQuests = (): Quest[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return [
      {
        id: 'daily-conversation',
        title: 'Diálogo Diário',
        description: 'Tenha uma conversa significativa hoje',
        category: 'diaria',
        target: 1,
        progress: 0, // Seria calculado baseado na atividade do dia
        xpReward: 50,
        deadline: tomorrow
      },
      {
        id: 'daily-meditation',
        title: 'Momento de Paz',
        description: 'Complete uma micro-meditação hoje',
        category: 'diaria',
        target: 1,
        progress: 0,
        xpReward: 30,
        deadline: tomorrow
      },
      {
        id: `numerology-quest-${numerologyMap.destino}`,
        title: `Energia do ${numerologyMap.destino}`,
        description: `Pratique conscientemente sua energia de Destino ${numerologyMap.destino}`,
        category: 'numerologica',
        target: 1,
        progress: 0,
        xpReward: 75,
        deadline: tomorrow,
        numerologySpecific: numerologyMap.destino
      }
    ];
  };

  // Calcular nível atual
  useEffect(() => {
    setCurrentXP(calculateTotalXP);
    
    let level = 1;
    for (const playerLevel of playerLevels) {
      if (calculateTotalXP >= playerLevel.xpRequired) {
        level = playerLevel.level;
      } else {
        break;
      }
    }
    
    if (level > currentLevel) {
      setShowLevelUpAnimation(true);
      setTimeout(() => setShowLevelUpAnimation(false), 3000);
      
      const newLevelData = playerLevels.find(l => l.level === level);
      if (newLevelData && onLevelUp) {
        onLevelUp(level, []); // Rewards seriam definidos aqui
      }
    }
    
    setCurrentLevel(level);
  }, [calculateTotalXP, currentLevel, onLevelUp, playerLevels]);

  // Verificar achievements desbloqueados
  useEffect(() => {
    const newlyUnlocked = achievements
      .filter(ach => ach.unlocked && !unlockedAchievements.includes(ach.id))
      .map(ach => ach.id);
    
    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newlyUnlocked]);
      
      newlyUnlocked.forEach(achId => {
        const achievement = achievements.find(a => a.id === achId);
        if (achievement && onAchievementUnlocked) {
          onAchievementUnlocked(achievement);
        }
      });
    }
  }, [achievements, unlockedAchievements, onAchievementUnlocked]);

  // Inicializar quests
  useEffect(() => {
    setActiveQuests(generateDailyQuests());
  }, []);

  const getCurrentLevelData = () => {
    return playerLevels.find(l => l.level === currentLevel) || playerLevels[0];
  };

  const getNextLevelData = () => {
    return playerLevels.find(l => l.level === currentLevel + 1);
  };

  const calculateLevelProgress = () => {
    const currentLevelData = getCurrentLevelData();
    const nextLevelData = getNextLevelData();
    
    if (!nextLevelData) return 100;
    
    const currentLevelXP = currentLevelData.xpRequired;
    const nextLevelXP = nextLevelData.xpRequired;
    const xpInCurrentLevel = currentXP - currentLevelXP;
    const xpNeededForNext = nextLevelXP - currentLevelXP;
    
    return Math.min(100, (xpInCurrentLevel / xpNeededForNext) * 100);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'comum': return 'bg-gray-100 text-gray-800';
      case 'raro': return 'bg-blue-100 text-blue-800';
      case 'epico': return 'bg-purple-100 text-purple-800';
      case 'lendario': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentLevelData = getCurrentLevelData();
  const nextLevelData = getNextLevelData();
  const levelProgress = calculateLevelProgress();
  const unlockedAchievementsList = achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-6">
      
      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 animate-pulse">
          <CardContent className="pt-6">
            <div className="text-center">
              <Crown className="w-12 h-12 mx-auto text-yellow-500 mb-2" />
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">LEVEL UP!</h2>
              <p className="text-yellow-600">
                Você alcançou o nível {currentLevel}: {currentLevelData.title}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status do Player */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Status do Explorador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Nível atual */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: currentLevelData.color + '20' }}>
                {currentLevelData.icon}
              </div>
              <div>
                <h3 className="font-semibold">{currentLevelData.title}</h3>
                <p className="text-sm text-muted-foreground">Nível {currentLevel}</p>
              </div>
            </div>
            <Badge style={{ backgroundColor: currentLevelData.color, color: 'white' }}>
              {currentXP.toLocaleString()} XP
            </Badge>
          </div>

          {/* Progresso para o próximo nível */}
          {nextLevelData && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso para {nextLevelData.title}</span>
                <span>{levelProgress.toFixed(0)}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {(nextLevelData.xpRequired - currentXP).toLocaleString()} XP restantes
              </div>
            </div>
          )}

          {/* Benefícios atuais */}
          <div>
            <h4 className="font-medium mb-2">Benefícios Desbloqueados:</h4>
            <ul className="space-y-1">
              {currentLevelData.benefits.map((benefit, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.totalConversations}</div>
              <div className="text-sm text-muted-foreground">Conversas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.totalMeditations}</div>
              <div className="text-sm text-muted-foreground">Meditações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.consecutiveDays}</div>
              <div className="text-sm text-muted-foreground">Dias seguidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.insightsGenerated}</div>
              <div className="text-sm text-muted-foreground">Insights</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quests Ativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Missões Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeQuests.map((quest) => (
              <div key={quest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{quest.title}</h4>
                  <p className="text-sm text-muted-foreground">{quest.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(quest.progress / quest.target) * 100} className="flex-1 h-1" />
                    <span className="text-xs">{quest.progress}/{quest.target}</span>
                  </div>
                </div>
                <Badge className="ml-3">+{quest.xpReward} XP</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Conquistas ({unlockedAchievementsList.length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-2 rounded ${
                  achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                      {achievement.rarity}
                    </Badge>
                    <Badge variant="outline">+{achievement.xpReward} XP</Badge>
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Numerologia Gamificada */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Mestria Numerológica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {numerologyMap.destino}
              </div>
              <p className="text-muted-foreground">Seu Número de Destino</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-blue-600">{numerologyMap.motivacao}</div>
                <div className="text-xs text-muted-foreground">Motivação</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{numerologyMap.expressao}</div>
                <div className="text-xs text-muted-foreground">Expressão</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-orange-600">{numerologyMap.anoPessoal}</div>
                <div className="text-xs text-muted-foreground">Ano Pessoal</div>
              </div>
            </div>

            {numerologyMap.licoesCarmicas.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-orange-600 mb-2">Lições Cármicas a Desenvolver:</p>
                <div className="flex justify-center gap-2">
                  {numerologyMap.licoesCarmicas.map((lesson) => (
                    <Badge key={lesson} variant="outline" className="border-orange-300">
                      {lesson}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente auxiliar para o ícone Lightbulb (não estava importado)
const Lightbulb = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 17H9.154a3.374 3.374 0 00-1.849-1.153L6.757 15.3z" />
  </svg>
);

export default GamificationSystem;