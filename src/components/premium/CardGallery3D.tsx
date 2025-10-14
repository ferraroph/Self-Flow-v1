'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export interface Insight {
  id: string
  title: string
  description: string
  numerologyNumber: number
  category: 'core' | 'karmic' | 'prediction' | 'hidden'
  color: string
  icon?: string
}

interface CardGallery3DProps {
  insights: Insight[]
  className?: string
  onCardClick?: (insight: Insight) => void
}

export function CardGallery3D({ 
  insights,
  className = '',
  onCardClick
}: CardGallery3DProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = (insight: Insight, index: number) => {
    setSelectedCard(selectedCard === insight.id ? null : insight.id)
    onCardClick?.(insight)
  }

  const getCategoryGradient = (category: Insight['category']) => {
    const gradients = {
      core: 'from-purple-600 via-blue-600 to-indigo-600',
      karmic: 'from-red-600 via-pink-600 to-rose-600', 
      prediction: 'from-green-600 via-emerald-600 to-teal-600',
      hidden: 'from-yellow-600 via-orange-600 to-amber-600'
    }
    return gradients[category]
  }

  const getCategoryIcon = (category: Insight['category']) => {
    const icons = {
      core: '◯',
      karmic: '◈',
      prediction: '◆',
      hidden: '◇'
    }
    return icons[category]
  }

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const isHovered = hoveredIndex === index
          const isSelected = selectedCard === insight.id
          
          return (
            <motion.div
              key={insight.id}
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(insight, index)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isSelected ? 1.05 : 1,
                rotateY: isHovered ? 5 : 0,
                rotateX: isHovered ? 2 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                scale: { duration: 0.2 },
                rotate: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Sombra 3D */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(insight.category)} rounded-2xl blur-xl transition-all duration-300 ${
                  isHovered ? 'opacity-40 scale-110' : 'opacity-20 scale-100'
                }`}
                style={{ transform: 'translateZ(-10px)' }}
              />
              
              {/* Card principal */}
              <div 
                className={`relative bg-gradient-to-br ${getCategoryGradient(insight.category)} p-[2px] rounded-2xl transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-white/30' : ''
                }`}
              >
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(insight.category)} flex items-center justify-center text-white text-xl font-bold`}>
                        {insight.numerologyNumber}
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {insight.category}
                        </div>
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {insight.title}
                        </h3>
                      </div>
                    </div>
                    <div className="text-2xl opacity-60">
                      {getCategoryIcon(insight.category)}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {insight.description}
                    </p>
                    
                    {/* Indicador de interação */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryGradient(insight.category)}`} />
                        <span className="text-xs text-gray-500">
                          Clique para expandir
                        </span>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isSelected ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400"
                      >
                        ↓
                      </motion.div>
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isSelected ? 'auto' : 0,
                      opacity: isSelected ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-700/30 mt-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">
                            Análise Detalhada
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Este número revela aspectos profundos da sua personalidade numerológica, 
                            oferecendo insights únicos para seu crescimento pessoal e autoconhecimento.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-black/30 rounded-lg p-3">
                            <div className="text-gray-400 mb-1">Energia</div>
                            <div className="text-white font-semibold">
                              {insight.numerologyNumber % 2 === 0 ? 'Receptiva' : 'Ativa'}
                            </div>
                          </div>
                          <div className="bg-black/30 rounded-lg p-3">
                            <div className="text-gray-400 mb-1">Elemento</div>
                            <div className="text-white font-semibold">
                              {['Ar', 'Fogo', 'Água', 'Terra'][insight.numerologyNumber % 4]}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Efeito de brilho no hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(insight.category)} rounded-2xl opacity-10 pointer-events-none`}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Estatísticas da galeria */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-black/40 backdrop-blur-sm rounded-xl p-4"
      >
        <div className="grid grid-cols-4 gap-4 text-center">
          {['core', 'karmic', 'prediction', 'hidden'].map((category) => {
            const count = insights.filter(i => i.category === category).length
            return (
              <div key={category}>
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-xs text-gray-400 capitalize">{category}</div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}