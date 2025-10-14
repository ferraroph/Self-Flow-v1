"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense, createContext, useContext, useState } from "react"
import { CardGalaxy } from "./CardGalaxy"

interface NumerologyCard {
  id: string
  imageUrl: string
  alt: string
  title: string
  content: string
  type: string
}

interface CardContextType {
  cards: NumerologyCard[]
  selectedCard: NumerologyCard | null
  setSelectedCard: (card: NumerologyCard | null) => void
}

const CardContext = createContext<CardContextType | undefined>(undefined)

export function useCard() {
  const context = useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}

interface CardGallery3DProps {
  insights?: any[]
  className?: string
}

export function CardGallery3D({ insights = [], className = "" }: CardGallery3DProps) {
  const [selectedCard, setSelectedCard] = useState<NumerologyCard | null>(null)
  
  // Transform insights into card format
  const cards: NumerologyCard[] = insights.map((insight, index) => ({
    id: `card-${index}`,
    imageUrl: insight.imageUrl || `/api/placeholder/300/400?text=${insight.title || `Card ${index + 1}`}`,
    alt: insight.alt || insight.title || `Numerology Insight ${index + 1}`,
    title: insight.title || `Insight ${index + 1}`,
    content: insight.content || insight.description || "Numerological insight content",
    type: insight.type || "general"
  }))

  return (
    <CardContext.Provider value={{ cards, selectedCard, setSelectedCard }}>
      <div className={`relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 30]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={100}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          
          <Suspense fallback={null}>
            <CardGalaxy />
          </Suspense>
        </Canvas>
        
        {/* Selected Card Modal */}
        {selectedCard && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md mx-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{selectedCard.title}</h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.alt}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 text-sm">{selectedCard.content}</p>
              <div className="mt-4 text-xs text-gray-500 uppercase tracking-wider">
                {selectedCard.type}
              </div>
            </div>
          </div>
        )}
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-400 px-3 py-2 rounded-md bg-gray-800/80">
          Drag to rotate • Scroll to zoom • Click cards to view
        </div>
      </div>
    </CardContext.Provider>
  )
}
