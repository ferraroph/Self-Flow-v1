'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

interface NumerologyData {
  motivacao: number
  expressao: number  
  destino: number
  licoesCarmicas: number[]
  tendenciasOcultas: number[]
  anoPessoal: number
}

interface RotatingEarthProps {
  className?: string
  numerologyData: NumerologyData
  size?: number
  rotationSpeed?: number
}

export function RotatingEarth({ 
  className = '',
  numerologyData,
  size = 400,
  rotationSpeed = 0.5
}: RotatingEarthProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const container = containerRef.current
    if (!svg.node() || !container) return

    // Limpar conteúdo anterior
    svg.selectAll("*").remove()

    const width = size
    const height = size
    const radius = Math.min(width, height) / 2 - 20

    svg
      .attr('width', width)
      .attr('height', height)

    const projection = d3.geoOrthographic()
      .scale(radius * 0.8)
      .translate([width / 2, height / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection)
    
    // Configurar grupos
    const globe = svg.append('g')
    const numerologyPoints = svg.append('g')

    // Criar esfera base
    const sphere = { type: "Sphere" as const }
    
    globe.append('path')
      .datum(sphere)
      .attr('d', path)
      .attr('fill', 'url(#earthGradient)')
      .attr('stroke', 'rgba(147, 51, 234, 0.3)')
      .attr('stroke-width', 2)

    // Gradientes para a esfera
    const defs = svg.append('defs')
    
    const earthGradient = defs.append('radialGradient')
      .attr('id', 'earthGradient')
      .attr('cx', '30%')
      .attr('cy', '30%')
    
    earthGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#1e1b4b')
      .attr('stop-opacity', 0.9)
    
    earthGradient.append('stop')  
      .attr('offset', '70%')
      .attr('stop-color', '#312e81')
      .attr('stop-opacity', 0.7)
      
    earthGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0f172a')
      .attr('stop-opacity', 1)

    // Gradiente para pontos numerológicos
    const pointGradient = defs.append('radialGradient')
      .attr('id', 'pointGradient')
    
    pointGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#fbbf24')
      .attr('stop-opacity', 1)
      
    pointGradient.append('stop')
      .attr('offset', '100%')  
      .attr('stop-color', '#f59e0b')
      .attr('stop-opacity', 0.3)

    // Posições dos números no globo (latitude, longitude)
    const numerologyPositions = [
      { number: numerologyData.motivacao, lat: 40, lng: -74, label: 'Motivação' },
      { number: numerologyData.expressao, lat: 51, lng: 0, label: 'Expressão' },
      { number: numerologyData.destino, lat: 35, lng: 139, label: 'Destino' },
      { number: numerologyData.anoPessoal, lat: -33, lng: 151, label: 'Ano Pessoal' },
      ...numerologyData.licoesCarmicas.map((num, i) => ({
        number: num,
        lat: -20 + i * 15,
        lng: 30 + i * 40,
        label: 'Lição Cármica'
      })),
      ...numerologyData.tendenciasOcultas.map((num, i) => ({
        number: num, 
        lat: 60 - i * 20,
        lng: -120 + i * 30,
        label: 'Tendência Oculta'
      }))
    ]

    // Função para desenhar pontos numerológicos
    function drawNumerologyPoints(rotation: number) {
      numerologyPoints.selectAll('*').remove()
      
      numerologyPositions.forEach((pos, index) => {
        const point = projection([pos.lng + rotation, pos.lat])
        
        if (point) {
          const [x, y] = point
          const distance = Math.sqrt((x - width/2)**2 + (y - height/2)**2)
          const isVisible = distance < radius * 0.8
          
          if (isVisible) {
            // Círculo principal do número
            const group = numerologyPoints.append('g')
              .attr('transform', `translate(${x}, ${y})`)
              .style('opacity', isVisible ? 1 : 0)
            
            // Glow effect
            group.append('circle')
              .attr('r', 15)
              .attr('fill', 'url(#pointGradient)')
              .attr('filter', 'url(#glow)')
            
            // Círculo interno
            group.append('circle')
              .attr('r', 12)
              .attr('fill', 'rgba(0, 0, 0, 0.7)')
              .attr('stroke', '#fbbf24')
              .attr('stroke-width', 2)
            
            // Número
            group.append('text')
              .attr('text-anchor', 'middle')
              .attr('dy', '0.35em')
              .attr('fill', '#fbbf24')
              .attr('font-size', '10px')
              .attr('font-weight', 'bold')
              .text(pos.number)

            // Linhas de conexão para números relacionados
            if (index < 3) { // Conectar apenas números principais
              numerologyPositions.slice(0, 3).forEach((otherPos, otherIndex) => {
                if (otherIndex !== index) {
                  const otherPoint = projection([otherPos.lng + rotation, otherPos.lat])
                  if (otherPoint) {
                    const [ox, oy] = otherPoint
                    const otherDistance = Math.sqrt((ox - width/2)**2 + (oy - height/2)**2)
                    
                    if (otherDistance < radius * 0.8) {
                      numerologyPoints.append('line')
                        .attr('x1', x)
                        .attr('y1', y)
                        .attr('x2', ox)
                        .attr('y2', oy)
                        .attr('stroke', 'rgba(147, 51, 234, 0.3)')
                        .attr('stroke-width', 1)
                        .attr('stroke-dasharray', '2,2')
                    }
                  }
                }
              })
            }
          }
        }
      })
    }

    // Filtro de glow
    const filter = defs.append('filter')
      .attr('id', 'glow')
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')
    
    const merge = filter.append('feMerge')
    merge.append('feMergeNode').attr('in', 'coloredBlur')
    merge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Animação de rotação
    let rotation = 0
    let animationId: number

    function animate() {
      rotation += rotationSpeed
      if (rotation >= 360) rotation = 0
      
      projection.rotate([rotation, -10, 0])
      
      // Redesenhar esfera
      globe.select('path')
        .datum(sphere)
        .attr('d', path)
      
      // Redesenhar pontos
      drawNumerologyPoints(rotation)
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [numerologyData, size, rotationSpeed])

  return (
    <motion.div 
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg ref={svgRef} className="drop-shadow-2xl" />
      
      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-xs text-white">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <span>Números Numerológicos</span>
          </div>
          <div className="text-gray-400">Rotação: {rotationSpeed}x</div>
        </div>
      </div>
    </motion.div>
  )
}