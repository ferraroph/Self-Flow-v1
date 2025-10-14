'use client'

import React, { useEffect, useRef } from 'react'

interface MeshGradientSVGProps {
  className?: string
  colors?: string[]
  animate?: boolean
  opacity?: number
}

export function MeshGradientSVG({ 
  className = '',
  colors = [
    '#1a1a2e',
    '#16213e', 
    '#0f3460',
    '#533483',
    '#7209b7',
    '#560bad'
  ],
  animate = true,
  opacity = 0.8
}: MeshGradientSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animate) return

    const svg = svgRef.current
    if (!svg) return

    let animationId: number
    let startTime = Date.now()

    const animateGradient = () => {
      const elapsed = (Date.now() - startTime) / 1000
      
      // Animar os pontos do gradiente
      const stops = svg.querySelectorAll('stop')
      stops.forEach((stop, index) => {
        const baseOffset = index / (stops.length - 1)
        const wobble = Math.sin(elapsed * 0.5 + index * 2) * 0.1
        const newOffset = Math.max(0, Math.min(1, baseOffset + wobble))
        stop.setAttribute('offset', `${newOffset * 100}%`)
      })

      // Animar transformações dos gradientes
      const defs = svg.querySelector('defs')
      const gradients = defs?.querySelectorAll('radialGradient, linearGradient')
      gradients?.forEach((gradient, index) => {
        const rotation = elapsed * 10 + index * 60
        gradient.setAttribute('gradientTransform', `rotate(${rotation})`)
      })

      animationId = requestAnimationFrame(animateGradient)
    }

    animateGradient()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [animate])

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
    >
      <defs>
        {/* Gradiente principal */}
        <radialGradient id="meshGrad1" cx="20%" cy="20%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.9" />
          <stop offset="50%" stopColor={colors[1]} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors[2]} stopOpacity="0.3" />
        </radialGradient>

        {/* Gradiente secundário */}
        <radialGradient id="meshGrad2" cx="80%" cy="30%">
          <stop offset="0%" stopColor={colors[3]} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors[4]} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colors[5]} stopOpacity="0.2" />
        </radialGradient>

        {/* Gradiente terciário */}
        <linearGradient id="meshGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[1]} stopOpacity="0.4" />
          <stop offset="30%" stopColor={colors[3]} stopOpacity="0.6" />
          <stop offset="70%" stopColor={colors[4]} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors[5]} stopOpacity="0.2" />
        </linearGradient>

        {/* Gradiente quaternário */}
        <radialGradient id="meshGrad4" cx="50%" cy="80%">
          <stop offset="0%" stopColor={colors[2]} stopOpacity="0.7" />
          <stop offset="40%" stopColor={colors[4]} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colors[0]} stopOpacity="0.1" />
        </radialGradient>

        {/* Filtro de blur para suavizar */}
        <filter id="blur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      {/* Base escura */}
      <rect width="100%" height="100%" fill={colors[0]} />

      {/* Camadas de gradiente sobrepostas */}
      <circle 
        cx="200" 
        cy="200" 
        r="400" 
        fill="url(#meshGrad1)" 
        filter="url(#blur)"
      />
      
      <circle 
        cx="800" 
        cy="300" 
        r="350" 
        fill="url(#meshGrad2)" 
        filter="url(#blur)"
      />
      
      <rect 
        x="0" 
        y="0" 
        width="100%" 
        height="100%" 
        fill="url(#meshGrad3)" 
        filter="url(#blur)"
        opacity="0.6"
      />
      
      <ellipse 
        cx="500" 
        cy="800" 
        rx="450" 
        ry="300" 
        fill="url(#meshGrad4)" 
        filter="url(#blur)"
      />

      {/* Pontos luminosos */}
      <circle cx="150" cy="150" r="3" fill={colors[4]} opacity="0.8">
        <animate 
          attributeName="opacity" 
          values="0.3;1;0.3" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </circle>
      
      <circle cx="850" cy="250" r="2" fill={colors[5]} opacity="0.6">
        <animate 
          attributeName="opacity" 
          values="0.2;0.8;0.2" 
          dur="4s" 
          repeatCount="indefinite" 
        />
      </circle>
      
      <circle cx="450" cy="750" r="4" fill={colors[3]} opacity="0.7">
        <animate 
          attributeName="opacity" 
          values="0.4;1;0.4" 
          dur="2.5s" 
          repeatCount="indefinite" 
        />
      </circle>
    </svg>
  )
}