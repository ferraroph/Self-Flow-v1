"use client"

import { GrainGradient } from "@paper-design/shaders-react"

interface GradientHeroProps {
  colors?: string[]
  className?: string
  children?: React.ReactNode
  softness?: number
  intensity?: number
  noise?: number
  shape?: "radial" | "linear" | "corners"
}

export function GradientHero({
  colors = [
    "hsl(193, 85%, 66%)", // Light blue
    "hsl(196, 100%, 83%)", // Lighter blue
    "hsl(195, 100%, 50%)", // Medium blue
    "hsl(270, 100%, 50%)", // Purple
    "hsl(315, 100%, 50%)", // Magenta
  ],
  className = "",
  children,
  softness = 0.76,
  intensity = 0.45,
  noise = 0,
  shape = "corners"
}: GradientHeroProps) {
  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 0%)"
          softness={softness}
          intensity={intensity}
          noise={noise}
          shape={shape}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={colors}
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20" />
      
      {/* Content */}
      {children}
    </div>
  )
}

export function GradientHeroSection() {
  return (
    <GradientHero>
      <section className="px-6 text-center">
        <h1 className="text-white text-center text-balance font-normal tracking-tight text-7xl mb-6">
          Seu clone{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            numerológico
          </span>
        </h1>
        <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
          Converse com a versão mais clara de você mesmo, baseada em seu mapa numerológico cabalístico completo
        </p>
      </section>
    </GradientHero>
  )
}
