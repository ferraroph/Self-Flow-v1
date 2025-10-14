'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  MessageCircle,
  Brain,
  Heart,
  Sparkles,
  Target,
  Award,
  Users,
  Activity,
  Zap,
  Eye,
  Star,
  Flame,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download,
  Share2,
  Filter
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface AnalyticsDashboardProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  userStats: UserStats;
  historicalData?: HistoricalData[];
  onRefreshData?: () => void;
}

interface UserStats {
  totalSessions: number;
  totalConversations: number;
  totalMeditations: number;
  totalDevaneios: number;
  totalTimeSpent: number; // em minutos
  averageSessionTime: number;
  longestSession: number;
  insightsGenerated: number;
  daysActive: number;
  consecutiveDays: number;
  currentStreak: number;
  joinDate: Date;
  lastActiveDate: Date;
  favoriteTimeSlot: string;
  mostUsedAgent: AgentType;
  completionRate: number; // 0-100%
  engagementScore: number; // 0-100%
}

interface HistoricalData {
  date: Date;
  sessions: number;
  conversations: number;
  meditations: number;
  devaneios: number;
  timeSpent: number;
  insights: number;
  engagementScore: number;
}

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change?: number; // % change from previous period
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  target?: number;
  progress?: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  userStats,
  historicalData = [],
  onRefreshData
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [focusMetric, setFocusMetric] = useState<'engagement' | 'usage' | 'growth'>('engagement');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calcular métricas principais
  const mainMetrics = useMemo((): MetricCard[] => {
    const daysActive = Math.max(1, userStats.daysActive);
    const avgSessionsPerDay = userStats.totalSessions / daysActive;
    const avgInsightsPerSession = userStats.totalSessions > 0 ? userStats.insightsGenerated / userStats.totalSessions : 0;
    
    return [
      {
        id: 'total-sessions',
        title: 'Total de Sessões',
        value: userStats.totalSessions.toLocaleString(),
        change: 15, // Simulado - seria calculado com dados históricos
        trend: 'up',
        icon: <Activity className="w-5 h-5" />,
        color: '#3B82F6',
        subtitle: `${avgSessionsPerDay.toFixed(1)}/dia`,
        target: 100,
        progress: Math.min(100, (userStats.totalSessions / 100) * 100)
      },
      {
        id: 'engagement-score',
        title: 'Score de Engajamento',
        value: `${userStats.engagementScore}%`,
        change: 8,
        trend: 'up',
        icon: <Zap className="w-5 h-5" />,
        color: '#10B981',
        subtitle: 'Baseado em atividade',
        progress: userStats.engagementScore
      },
      {
        id: 'time-spent',
        title: 'Tempo Total',
        value: `${Math.floor(userStats.totalTimeSpent / 60)}h ${userStats.totalTimeSpent % 60}m`,
        change: 22,
        trend: 'up',
        icon: <Clock className="w-5 h-5" />,
        color: '#8B5CF6',
        subtitle: `${userStats.averageSessionTime}min/sessão`
      },
      {
        id: 'insights-generated',
        title: 'Insights Gerados',
        value: userStats.insightsGenerated.toLocaleString(),
        change: 5,
        trend: 'up',
        icon: <Eye className="w-5 h-5" />,
        color: '#F59E0B',
        subtitle: `${avgInsightsPerSession.toFixed(1)}/sessão`,
        progress: Math.min(100, (userStats.insightsGenerated / 50) * 100)
      },
      {
        id: 'streak',
        title: 'Sequência Atual',
        value: `${userStats.currentStreak} dias`,
        change: userStats.currentStreak > 0 ? 1 : -1,
        trend: userStats.currentStreak > 0 ? 'up' : 'down',
        icon: <Flame className="w-5 h-5" />,
        color: userStats.currentStreak > 0 ? '#EF4444' : '#6B7280',
        subtitle: `Recorde: ${userStats.consecutiveDays} dias`
      },
      {
        id: 'completion-rate',
        title: 'Taxa de Conclusão',
        value: `${userStats.completionRate}%`,
        change: 3,
        trend: 'up',
        icon: <Target className="w-5 h-5" />,
        color: '#06B6D4',
        subtitle: 'Sessões completas',
        progress: userStats.completionRate
      }
    ];
  }, [userStats]);

  // Dados para gráficos (simulados - em produção viriam do backend)
  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      
      return {
        date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        sessions: Math.floor(Math.random() * 5) + 1,
        conversations: Math.floor(Math.random() * 3) + 1,
        meditations: Math.floor(Math.random() * 4),
        devaneios: Math.floor(Math.random() * 2),
        engagementScore: Math.floor(Math.random() * 30) + 70
      };
    });
    
    return last7Days;
  }, []);

  // Análise numerológica dos padrões de uso
  const numerologyInsights = useMemo(() => {
    const insights = [];
    
    // Insight baseado no Destino
    if (numerologyMap.destino === 1 && userStats.totalSessions > 20) {
      insights.push({
        icon: <Star className="w-4 h-4" />,
        text: 'Como Destino 1, sua consistência no Self Flow reflete sua natureza de liderança!',
        color: 'text-yellow-600'
      });
    } else if (numerologyMap.destino === 7 && userStats.totalMeditations > userStats.totalConversations) {
      insights.push({
        icon: <Brain className="w-4 h-4" />,
        text: 'Destino 7: Sua preferência por meditações mostra busca por sabedoria interior.',
        color: 'text-purple-600'
      });
    }
    
    // Insight baseado no Ano Pessoal
    if (numerologyMap.anoPessoal === 1 && userStats.currentStreak > 7) {
      insights.push({
        icon: <Zap className="w-4 h-4" />,
        text: 'Ano Pessoal 1: Sua sequência de uso está alinhada com energia de novos começos!',
        color: 'text-blue-600'
      });
    }
    
    // Insight baseado em padrões de uso
    if (userStats.favoriteTimeSlot === 'morning') {
      insights.push({
        icon: <Clock className="w-4 h-4" />,
        text: 'Padrão matinal: Você aproveita bem a energia do início do dia para autoconhecimento.',
        color: 'text-green-600'
      });
    }
    
    return insights;
  }, [numerologyMap, userStats]);

  // Gerar relatório automático
  const generateInsightsReport = () => {
    const totalSessions = userStats.totalSessions;
    const engagementScore = userStats.engagementScore;
    
    let report = '';
    
    if (totalSessions < 5) {
      report = '🌱 Você está no início da jornada! Continue explorando para descobrir mais sobre si mesmo.';
    } else if (totalSessions < 20) {
      report = '🌿 Bom progresso! Seus padrões de uso começam a revelar preferências interessantes.';
    } else if (totalSessions < 50) {
      report = '🌳 Usuário experiente! Você está desenvolvendo uma prática consistente de autoconhecimento.';
    } else {
      report = '🏆 Expert em Self Flow! Seus insights e padrões mostram evolução significativa.';
    }
    
    if (engagementScore > 80) {
      report += ' Seu alto engajamento indica que o Self Flow está realmente agregando valor à sua vida.';
    } else if (engagementScore > 60) {
      report += ' Bom nível de engajamento. Considere explorar novas funcionalidades para maximizar benefícios.';
    } else {
      report += ' Há potencial para aumentar seu engajamento. Que tal tentar os devaneios ou meditações?';
    }
    
    return report;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefreshData) {
      await onRefreshData();
    }
    // Simular delay de atualização
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', change?: number) => {
    if (trend === 'up') return <ArrowUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="w-3 h-3 text-red-500" />;
    return <div className="w-3 h-3" />;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      
      {/* Header com controles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="all">Todo período</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Membro desde {userStats.joinDate.toLocaleDateString('pt-BR')}</span>
            <span>•</span>
            <span>Última atividade: {userStats.lastActiveDate.toLocaleDateString('pt-BR')}</span>
            <span>•</span>
            <span>Agente preferido: {userStats.mostUsedAgent}</span>
          </div>
        </CardHeader>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg`} style={{ backgroundColor: metric.color + '20' }}>
                  <div style={{ color: metric.color }}>
                    {metric.icon}
                  </div>
                </div>
                {metric.change !== undefined && (
                  <div className={`flex items-center gap-1 text-xs ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend, metric.change)}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.title}</div>
                
                {metric.subtitle && (
                  <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
                )}
                
                {metric.progress !== undefined && (
                  <div className="mt-3">
                    <Progress value={metric.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {metric.progress.toFixed(0)}%
                      {metric.target && ` de meta ${metric.target}`}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Atividade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Atividade dos Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex flex-col items-center gap-1 mb-2">
                  {/* Barras empilhadas */}
                  <div className="w-full max-w-12 bg-gray-100 rounded overflow-hidden" style={{ height: '120px' }}>
                    <div className="bg-blue-500 transition-all duration-300" style={{ 
                      height: `${(day.sessions / 5) * 100}%`,
                      minHeight: day.sessions > 0 ? '8px' : '0'
                    }} title={`${day.sessions} sessões`} />
                    <div className="bg-green-500 transition-all duration-300" style={{ 
                      height: `${(day.conversations / 3) * 100}%`,
                      minHeight: day.conversations > 0 ? '8px' : '0'
                    }} title={`${day.conversations} conversas`} />
                    <div className="bg-purple-500 transition-all duration-300" style={{ 
                      height: `${(day.meditations / 4) * 100}%`,
                      minHeight: day.meditations > 0 ? '8px' : '0'
                    }} title={`${day.meditations} meditações`} />
                  </div>
                  
                  {/* Score de engajamento */}
                  <div className="text-xs font-semibold" style={{
                    color: day.engagementScore > 80 ? '#10B981' : 
                           day.engagementScore > 60 ? '#F59E0B' : '#EF4444'
                  }}>
                    {day.engagementScore}%
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground font-medium">
                  {day.date}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legenda */}
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>Sessões</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>Conversas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded" />
              <span>Meditações</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Numerológicos */}
      {numerologyInsights.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Insights Numerológicos dos seus Padrões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {numerologyInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className={insight.color}>
                    {insight.icon}
                  </div>
                  <p className="text-sm">{insight.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Relatório de Progresso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Relatório de Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm leading-relaxed">
              {generateInsightsReport()}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor((userStats.totalTimeSpent / (userStats.daysActive * 30)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Eficiência de uso</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userStats.totalSessions > 0 ? Math.floor((userStats.insightsGenerated / userStats.totalSessions) * 10) / 10 : 0}
              </div>
              <div className="text-sm text-muted-foreground">Insights por sessão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.min(100, Math.floor((userStats.consecutiveDays / 30) * 100))}%
              </div>
              <div className="text-sm text-muted-foreground">Consistência</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição de Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Distribuição de Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Conversas', value: userStats.totalConversations, color: '#3B82F6', total: userStats.totalSessions },
                { label: 'Meditações', value: userStats.totalMeditations, color: '#10B981', total: userStats.totalSessions },
                { label: 'Devaneios', value: userStats.totalDevaneios, color: '#8B5CF6', total: userStats.totalSessions }
              ].map((item) => {
                const percentage = userStats.totalSessions > 0 ? (item.value / item.total) * 100 : 0;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span>{item.value} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <Progress value={percentage} className="h-1 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Padrões Temporais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Horário Favorito</h4>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {userStats.favoriteTimeSlot === 'morning' ? 'Manhã (06:00-12:00)' :
                     userStats.favoriteTimeSlot === 'afternoon' ? 'Tarde (12:00-18:00)' :
                     userStats.favoriteTimeSlot === 'evening' ? 'Noite (18:00-24:00)' :
                     'Madrugada (00:00-06:00)'}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Frequência de Uso</h4>
                <div className="text-sm text-muted-foreground">
                  <p>Média: {(userStats.totalSessions / Math.max(1, userStats.daysActive)).toFixed(1)} sessões/dia</p>
                  <p>Sessão mais longa: {userStats.longestSession} minutos</p>
                  <p>Tempo médio: {userStats.averageSessionTime} minutos</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Objetivo Semanal</h4>
                <div className="space-y-2">
                  <Progress value={Math.min(100, (userStats.currentStreak / 7) * 100)} />
                  <div className="text-sm text-muted-foreground">
                    {userStats.currentStreak}/7 dias esta semana
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações do Dashboard */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar Relatório
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar Progresso
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Definir Metas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;