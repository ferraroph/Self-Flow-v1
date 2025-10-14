'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Settings, 
  Sparkles, 
  Sun, 
  Moon, 
  Star,
  Heart,
  Zap,
  Eye,
  Smile,
  Frown
} from 'lucide-react';

import type { NumerologyMap } from '@/lib/numerology/calculator';
import type { PersonalityProfile, AgentType } from '@/lib/agents/base';

interface AvatarProps {
  numerologyMap: NumerologyMap;
  personalityProfile: PersonalityProfile;
  selectedAgent: AgentType;
  isListening?: boolean;
  isSpeaking?: boolean;
  currentEmotion?: 'neutro' | 'feliz' | 'pensativo' | 'energico' | 'calmo' | 'concentrado';
  audioLevel?: number; // 0-100
  conversationContext?: string;
  size?: 'small' | 'medium' | 'large';
  showControls?: boolean;
}

interface AvatarPersonality {
  primaryColor: string;
  secondaryColor: string;
  shape: 'circle' | 'diamond' | 'star' | 'hexagon';
  energy: 'calm' | 'dynamic' | 'intense' | 'flowing';
  elements: AvatarElement[];
  animations: AnimationSet;
}

interface AvatarElement {
  id: string;
  type: 'core' | 'aura' | 'accent' | 'numbers' | 'symbols';
  position: { x: number; y: number };
  size: number;
  color: string;
  opacity: number;
  rotation?: number;
  pulseRate?: number;
}

interface AnimationSet {
  idle: string;
  listening: string;
  speaking: string;
  thinking: string;
  excited: string;
}

const NumerologyAvatar: React.FC<AvatarProps> = ({
  numerologyMap,
  personalityProfile,
  selectedAgent,
  isListening = false,
  isSpeaking = false,
  currentEmotion = 'neutro',
  audioLevel = 0,
  conversationContext,
  size = 'medium',
  showControls = false
}) => {
  const [avatarPersonality, setAvatarPersonality] = useState<AvatarPersonality | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();

  // Determinar personalidade do avatar baseada no mapa numerológico
  const generateAvatarPersonality = useMemo((): AvatarPersonality => {
    const destino = numerologyMap.destino;
    const motivacao = numerologyMap.motivacao;
    const expressao = numerologyMap.expressao;
    
    // Cores baseadas no número de Destino
    let primaryColor = '#3B82F6'; // Azul padrão
    let secondaryColor = '#A855F7'; // Roxo padrão
    let shape: 'circle' | 'diamond' | 'star' | 'hexagon' = 'circle';
    let energy: 'calm' | 'dynamic' | 'intense' | 'flowing' = 'calm';

    // Personalização baseada no Destino
    switch (destino) {
      case 1:
        primaryColor = '#F59E0B'; // Dourado - Liderança
        secondaryColor = '#EF4444'; // Vermelho - Ação
        shape = 'diamond';
        energy = 'intense';
        break;
      case 2:
        primaryColor = '#EC4899'; // Rosa - Harmonia
        secondaryColor = '#8B5CF6'; // Lavanda - Cooperação
        shape = 'circle';
        energy = 'flowing';
        break;
      case 3:
        primaryColor = '#F97316'; // Laranja - Criatividade
        secondaryColor = '#FACC15'; // Amarelo - Expressão
        shape = 'star';
        energy = 'dynamic';
        break;
      case 4:
        primaryColor = '#22C55E'; // Verde - Estabilidade
        secondaryColor = '#059669'; // Verde escuro - Construção
        shape = 'hexagon';
        energy = 'calm';
        break;
      case 5:
        primaryColor = '#06B6D4'; // Ciano - Liberdade
        secondaryColor = '#3B82F6'; // Azul - Aventura
        shape = 'diamond';
        energy = 'dynamic';
        break;
      case 6:
        primaryColor = '#DC2626'; // Vermelho suave - Responsabilidade
        secondaryColor = '#F97316'; // Laranja - Cuidado
        shape = 'hexagon';
        energy = 'flowing';
        break;
      case 7:
        primaryColor = '#7C3AED'; // Roxo profundo - Espiritualidade
        secondaryColor = '#4F46E5'; // Índigo - Mistério
        shape = 'star';
        energy = 'calm';
        break;
      case 8:
        primaryColor = '#1F2937'; // Grafite - Poder material
        secondaryColor = '#F59E0B'; // Dourado - Sucesso
        shape = 'diamond';
        energy = 'intense';
        break;
      case 9:
        primaryColor = '#8B5CF6'; // Violeta - Humanitarismo
        secondaryColor = '#EC4899'; // Rosa - Compaixão
        shape = 'circle';
        energy = 'flowing';
        break;
      case 11:
        primaryColor = '#FFFFFF'; // Branco - Iluminação
        secondaryColor = '#A855F7'; // Roxo místico
        shape = 'star';
        energy = 'intense';
        break;
      case 22:
        primaryColor = '#059669'; // Verde construtor
        secondaryColor = '#F59E0B'; // Dourado mestre
        shape = 'hexagon';
        energy = 'intense';
        break;
    }

    // Elementos do avatar
    const elements: AvatarElement[] = [
      // Núcleo central
      {
        id: 'core',
        type: 'core',
        position: { x: 50, y: 50 },
        size: 25,
        color: primaryColor,
        opacity: 1,
        pulseRate: energy === 'intense' ? 1.5 : energy === 'dynamic' ? 1.2 : 1
      },
      // Aura externa
      {
        id: 'aura',
        type: 'aura',
        position: { x: 50, y: 50 },
        size: 45,
        color: secondaryColor,
        opacity: 0.3,
        pulseRate: 0.8
      }
    ];

    // Adicionar números importantes como elementos visuais
    const importantNumbers = [destino, motivacao, expressao].filter((n, i, arr) => arr.indexOf(n) === i);
    importantNumbers.forEach((number, index) => {
      elements.push({
        id: `number-${number}`,
        type: 'numbers',
        position: { 
          x: 50 + Math.cos((index * 120) * Math.PI / 180) * 35, 
          y: 50 + Math.sin((index * 120) * Math.PI / 180) * 35 
        },
        size: 8,
        color: primaryColor,
        opacity: 0.7,
        rotation: index * 120
      });
    });

    // Adicionar símbolos para agente selecionado
    if (selectedAgent === 'ESOTERICO') {
      elements.push({
        id: 'esoteric-symbol',
        type: 'symbols',
        position: { x: 50, y: 30 },
        size: 6,
        color: '#A855F7',
        opacity: 0.8
      });
    } else if (selectedAgent === 'PSICOLOGICO') {
      elements.push({
        id: 'psychology-symbol',
        type: 'symbols',
        position: { x: 50, y: 30 },
        size: 6,
        color: '#3B82F6',
        opacity: 0.8
      });
    }

    // Lições cármicas como elementos de desafio
    numerologyMap.licoesCarmicas.forEach((lesson, index) => {
      elements.push({
        id: `karmic-${lesson}`,
        type: 'accent',
        position: { 
          x: 20 + (index * 15), 
          y: 80 
        },
        size: 4,
        color: '#EF4444',
        opacity: 0.5
      });
    });

    return {
      primaryColor,
      secondaryColor,
      shape,
      energy,
      elements,
      animations: {
        idle: 'pulse-gentle',
        listening: 'pulse-active',
        speaking: 'wave-dynamic',
        thinking: 'rotate-slow',
        excited: 'bounce-high'
      }
    };
  }, [numerologyMap, selectedAgent]);

  useEffect(() => {
    setAvatarPersonality(generateAvatarPersonality);
  }, [generateAvatarPersonality]);

  // Atualizar animação baseada no estado
  useEffect(() => {
    if (isSpeaking) {
      setCurrentAnimation('speaking');
    } else if (isListening) {
      setCurrentAnimation('listening');
    } else if (currentEmotion === 'pensativo') {
      setCurrentAnimation('thinking');
    } else if (currentEmotion === 'energico') {
      setCurrentAnimation('excited');
    } else {
      setCurrentAnimation('idle');
    }
  }, [isSpeaking, isListening, currentEmotion]);

  // Visualização de áudio em tempo real
  useEffect(() => {
    if (audioLevel > 0) {
      // Gerar barras de visualização baseadas no nível de áudio
      const bars = Array.from({ length: 12 }, (_, i) => {
        const baseHeight = 20;
        const variation = (audioLevel / 100) * 60;
        const frequency = Math.sin((i + Date.now() / 100) * 0.5);
        return Math.max(5, baseHeight + (variation * frequency));
      });
      setAudioVisualization(bars);
    } else {
      setAudioVisualization([]);
    }
  }, [audioLevel]);

  // Animação contínua
  useEffect(() => {
    const animate = () => {
      // Aqui você pode adicionar lógica de animação personalizada
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isVisible) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'large': return 'w-48 h-48';
      default: return 'w-32 h-32';
    }
  };

  const renderShape = (element: AvatarElement, index: number) => {
    const { position, size: elementSize, color, opacity, rotation = 0 } = element;
    const animationClass = `animate-${currentAnimation}`;
    
    if (element.type === 'core') {
      if (avatarPersonality?.shape === 'circle') {
        return (
          <circle
            key={element.id}
            cx={position.x}
            cy={position.y}
            r={elementSize}
            fill={color}
            opacity={opacity}
            className={`${animationClass} transition-all duration-300`}
            style={{
              filter: isSpeaking ? 'drop-shadow(0 0 10px currentColor)' : 'none',
              transformOrigin: `${position.x}% ${position.y}%`
            }}
          />
        );
      } else if (avatarPersonality?.shape === 'diamond') {
        return (
          <polygon
            key={element.id}
            points={`${position.x},${position.y - elementSize} ${position.x + elementSize},${position.y} ${position.x},${position.y + elementSize} ${position.x - elementSize},${position.y}`}
            fill={color}
            opacity={opacity}
            className={`${animationClass} transition-all duration-300`}
            style={{
              filter: isSpeaking ? 'drop-shadow(0 0 10px currentColor)' : 'none',
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${position.x}% ${position.y}%`
            }}
          />
        );
      } else if (avatarPersonality?.shape === 'star') {
        // SVG path para estrela de 5 pontas
        const starPath = `M${position.x},${position.y - elementSize} L${position.x + elementSize * 0.3},${position.y - elementSize * 0.3} L${position.x + elementSize},${position.y} L${position.x + elementSize * 0.3},${position.y + elementSize * 0.3} L${position.x},${position.y + elementSize} L${position.x - elementSize * 0.3},${position.y + elementSize * 0.3} L${position.x - elementSize},${position.y} L${position.x - elementSize * 0.3},${position.y - elementSize * 0.3} Z`;
        
        return (
          <path
            key={element.id}
            d={starPath}
            fill={color}
            opacity={opacity}
            className={`${animationClass} transition-all duration-300`}
            style={{
              filter: isSpeaking ? 'drop-shadow(0 0 10px currentColor)' : 'none',
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${position.x}% ${position.y}%`
            }}
          />
        );
      }
    }

    if (element.type === 'aura') {
      return (
        <circle
          key={element.id}
          cx={position.x}
          cy={position.y}
          r={elementSize}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={opacity}
          className="animate-pulse"
          style={{
            filter: isListening ? 'blur(1px)' : 'none'
          }}
        />
      );
    }

    if (element.type === 'numbers') {
      const number = element.id.split('-')[1];
      return (
        <g key={element.id}>
          <circle
            cx={position.x}
            cy={position.y}
            r={elementSize}
            fill={color}
            opacity={opacity * 0.3}
          />
          <text
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={elementSize * 0.8}
            fill={color}
            opacity={opacity}
            className="font-bold"
          >
            {number}
          </text>
        </g>
      );
    }

    if (element.type === 'symbols') {
      // Renderizar símbolos específicos do agente
      if (element.id === 'esoteric-symbol') {
        return (
          <text
            key={element.id}
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={elementSize * 1.5}
            opacity={opacity}
          >
            ✨
          </text>
        );
      } else if (element.id === 'psychology-symbol') {
        return (
          <text
            key={element.id}
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={elementSize * 1.5}
            opacity={opacity}
          >
            🧠
          </text>
        );
      }
    }

    if (element.type === 'accent') {
      return (
        <circle
          key={element.id}
          cx={position.x}
          cy={position.y}
          r={elementSize}
          fill={color}
          opacity={opacity}
          className="animate-pulse"
        />
      );
    }

    return null;
  };

  const getEmotionIcon = () => {
    switch (currentEmotion) {
      case 'feliz': return <Smile className="w-4 h-4 text-green-500" />;
      case 'pensativo': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'energico': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'calmo': return <Heart className="w-4 h-4 text-purple-500" />;
      case 'concentrado': return <Star className="w-4 h-4 text-indigo-500" />;
      default: return null;
    }
  };

  if (!avatarPersonality) return null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Avatar Principal */}
          <div className={`${getSizeClasses()} relative`}>
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="transition-all duration-300"
              style={{
                filter: isListening ? 'brightness(1.2)' : isSpeaking ? 'saturate(1.5)' : 'none'
              }}
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke={avatarPersonality.primaryColor}
                strokeWidth="1"
                opacity="0.1"
              />
              
              {/* Elementos do avatar */}
              {avatarPersonality.elements.map((element, index) => 
                renderShape(element, index)
              )}
              
              {/* Visualização de áudio */}
              {audioVisualization.length > 0 && (
                <g>
                  {audioVisualization.map((height, index) => (
                    <rect
                      key={`audio-${index}`}
                      x={15 + (index * 6)}
                      y={90 - (height / 2)}
                      width="4"
                      height={height / 2}
                      fill={avatarPersonality.secondaryColor}
                      opacity="0.7"
                      className="animate-pulse"
                    />
                  ))}
                </g>
              )}
            </svg>

            {/* Overlay de estado */}
            {(isListening || isSpeaking) && (
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-pulse" />
            )}
          </div>

          {/* Status e controles */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2">
              {/* Estado emocional */}
              {getEmotionIcon()}
              
              {/* Status de áudio */}
              {isSpeaking && (
                <Badge className="bg-green-100 text-green-800">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Falando
                </Badge>
              )}
              {isListening && (
                <Badge className="bg-blue-100 text-blue-800">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Ouvindo
                </Badge>
              )}
              
              {/* Agente ativo */}
              <Badge 
                variant="outline"
                className={
                  selectedAgent === 'ESOTERICO' ? 'border-purple-300 text-purple-700' :
                  selectedAgent === 'PSICOLOGICO' ? 'border-blue-300 text-blue-700' :
                  'border-gradient-to-r from-purple-300 to-blue-300'
                }
              >
                {selectedAgent}
              </Badge>
            </div>

            {/* Informações numerológicas */}
            <div className="text-xs text-muted-foreground text-center">
              <div>Destino {numerologyMap.destino} • Motivação {numerologyMap.motivacao}</div>
              {numerologyMap.licoesCarmicas.length > 0 && (
                <div>Lições: {numerologyMap.licoesCarmicas.join(', ')}</div>
              )}
            </div>

            {/* Controles */}
            {showControls && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <Eye className="w-3 h-3" /> : <Eye className="w-3 h-3 opacity-50" />}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Estilos CSS para animações */}
      <style jsx>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes pulse-active {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          75% { transform: scale(1.05); }
        }
        
        @keyframes wave-dynamic {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(1deg); }
          50% { transform: scale(1.05) rotate(-1deg); }
          75% { transform: scale(1.1) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce-high {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-2px) scale(1.1); }
          50% { transform: translateY(0) scale(1.05); }
          75% { transform: translateY(-1px) scale(1.1); }
        }
        
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-pulse-active { animation: pulse-active 1s ease-in-out infinite; }
        .animate-wave-dynamic { animation: wave-dynamic 1.5s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 8s linear infinite; }
        .animate-bounce-high { animation: bounce-high 0.8s ease-in-out infinite; }
      `}</style>
    </Card>
  );
};

export default NumerologyAvatar;