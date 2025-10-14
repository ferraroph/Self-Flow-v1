'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface PulsingBorderShaderProps {
  className?: string
  children?: React.ReactNode
  size?: number
  pulseSpeed?: number
  glowIntensity?: number
}

export function PulsingBorderShader({ 
  className = '',
  children,
  size = 300,
  pulseSpeed = 2,
  glowIntensity = 0.8
}: PulsingBorderShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    let animationId: number
    let startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = (currentTime - startTime) / 1000
      
      // Limpar canvas
      ctx.clearRect(0, 0, size, size)
      
      // Calcular pulsação
      const pulse = (Math.sin(elapsed * pulseSpeed) + 1) / 2
      const borderWidth = 2 + pulse * 4
      const glowRadius = 10 + pulse * 20
      
      // Configurar gradiente circular pulsante
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, size / 2 - borderWidth - glowRadius,
        size / 2, size / 2, size / 2
      )
      
      const alpha = 0.3 + pulse * glowIntensity
      gradient.addColorStop(0, `rgba(147, 51, 234, 0)`) // transparent purple
      gradient.addColorStop(0.7, `rgba(147, 51, 234, ${alpha * 0.5})`)
      gradient.addColorStop(0.9, `rgba(59, 130, 246, ${alpha})`) // blue
      gradient.addColorStop(1, `rgba(236, 72, 153, ${alpha})`) // pink

      // Desenhar borda circular
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - borderWidth / 2, 0, 2 * Math.PI)
      ctx.lineWidth = borderWidth
      ctx.strokeStyle = gradient
      ctx.stroke()

      // Desenhar glow externo
      ctx.shadowBlur = glowRadius
      ctx.shadowColor = `rgba(147, 51, 234, ${pulse * 0.5})`
      ctx.stroke()

      // Reset shadow
      ctx.shadowBlur = 0

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [size, pulseSpeed, glowIntensity])

  return (
    <div className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: size, height: size }}
      />
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        animate={{ 
          scale: [1, 1.02, 1],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children || (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="text-white text-xl font-bold">SF</div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}