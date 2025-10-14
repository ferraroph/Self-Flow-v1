'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PulsingBorderShader } from './PulsingBorderShader'

interface GradientHeroProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  onGetStarted?: () => void
  onLearnMore?: () => void
}

export function GradientHero({ 
  className = '',
  title = "Seu Clone Numerológico",
  subtitle = "Converse com a versão mais clara de você mesmo",
  description = "Descubra insights profundos através do seu mapa numerológico cabalístico completo e converse com um agente AI que reflete sua verdadeira essência.",
  onGetStarted,
  onLearnMore
}: GradientHeroProps) {
  
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 4 + i * 0.3,
    x: Math.random() * 100,
    y: Math.random() * 100
  }))

  return (
    <div className={`relative min-h-screen bg-black text-white overflow-hidden ${className}`}>
      {/* Background gradiente animado */}
      <div className="absolute inset-0">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black via-50% to-blue-900/40" />
        
        {/* Gradientes animados sobrepostos */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-600/20 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [30, -30, 30],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-pink-600/15 to-transparent rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Elementos flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Texto principal */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="block">Seu</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                  Clone
                </span>
                <span className="block">Numerológico</span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light">
                {subtitle}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              {description}
            </motion.p>

            {/* Botões de ação */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Começar Agora
              </motion.button>
              
              <motion.button
                onClick={onLearnMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-2xl hover:border-gray-400 hover:bg-white/5 transition-all duration-300"
              >
                Saiba Mais
              </motion.button>
            </motion.div>

            {/* Indicadores de funcionalidades */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              {[
                'Análise Numerológica Completa',
                'Conversação com IA',
                'Insights Personalizados',
                'Meditações Guiadas'
              ].map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center space-x-2 text-sm text-gray-400"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visualização interativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl scale-110 rounded-full" />
              
              {/* Componente principal com shader pulsante */}
              <PulsingBorderShader size={400} pulseSpeed={1.5}>
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600/80 via-blue-500/80 to-pink-500/80 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 p-8">
                  <div className="text-4xl font-bold">SF</div>
                  <div className="text-sm opacity-80">Self Flow</div>
                  <div className="text-xs opacity-60">Numerologia IA</div>
                </div>
              </PulsingBorderShader>

              {/* Elementos orbitais */}
              {[1, 2, 3].map((num) => (
                <motion.div
                  key={num}
                  className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black text-xs font-bold"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 8 + num * 2,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      delay: num * 0.5
                    }
                  }}
                  style={{
                    transformOrigin: `${200 + num * 30}px 200px`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-16px',
                    marginTop: '-16px'
                  }}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}