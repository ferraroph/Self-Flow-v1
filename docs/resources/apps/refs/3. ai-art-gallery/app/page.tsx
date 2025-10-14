"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface MediaItem {
  id: string
  file: File
  url: string
  type: "image" | "video"
}

export default function AIArtGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [glowIntensity, setGlowIntensity] = useState(0.3)
  const [accordionScale, setAccordionScale] = useState(1)
  const [backgroundTone, setBackgroundTone] = useState(0.5)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = (index: number, file: File) => {
    const url = URL.createObjectURL(file)
    const type = file.type.startsWith("video/") ? "video" : "image"
    const newItem: MediaItem = {
      id: `${index}-${Date.now()}`,
      file,
      url,
      type,
    }

    setMediaItems((prev) => {
      const newItems = [...prev]
      newItems[index] = newItem
      return newItems
    })
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      handleFileUpload(index, file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(index, file)
    }
  }

  const getBackgroundGradient = () => {
    const intensity = backgroundTone
    if (intensity < 0.2) {
      return "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)"
    } else if (intensity < 0.4) {
      return "radial-gradient(ellipse at center, #1a0a1a 0%, #0a0a0a 50%, #000000 100%)"
    } else if (intensity < 0.6) {
      return "radial-gradient(ellipse at center, #0a1a1a 0%, #0a0a0a 40%, #000000 100%)"
    } else if (intensity < 0.8) {
      return "radial-gradient(ellipse at center, #1a1a0a 0%, #0a0a0a 30%, #000000 100%)"
    } else {
      return "radial-gradient(ellipse at center, #2a1a0a 0%, #1a0a0a 20%, #000000 100%)"
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000"
      style={{ background: getBackgroundGradient() }}
    >
      <div className="absolute inset-0 opacity-30 transition-opacity duration-1000" style={{ opacity: glowIntensity }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 space-y-3 z-50">
        {/* Glow Intensity Slider */}
        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 border border-white/8">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={glowIntensity}
            onChange={(e) => setGlowIntensity(Number.parseFloat(e.target.value))}
            className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer slider"
          />
        </div>

        {/* Accordion Size Slider */}
        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 border border-white/8">
          <input
            type="range"
            min="0.7"
            max="1.3"
            step="0.1"
            value={accordionScale}
            onChange={(e) => setAccordionScale(Number.parseFloat(e.target.value))}
            className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer slider"
          />
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-xl p-3 border border-white/8">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={backgroundTone}
            onChange={(e) => setBackgroundTone(Number.parseFloat(e.target.value))}
            className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-1 h-80 px-8 transition-transform duration-700"
        style={{ transform: `scale(${accordionScale})` }}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const item = mediaItems[index]
          const isHovered = hoveredIndex === index
          const isExpanded = isHovered
          const hasContent = !!item

          return (
            <div
              key={index}
              className={`relative transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] h-full ${
                isExpanded ? "w-96 z-30" : hoveredIndex !== null && hoveredIndex !== index ? "w-8 opacity-40" : "w-20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hasContent && isExpanded && (
                <>
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-purple-400/40 via-pink-400/30 to-blue-400/35 blur-3xl scale-110 opacity-90 transition-all duration-[800ms]" />
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-purple-500/25 to-transparent blur-2xl scale-115 transition-all duration-[800ms]" />
                </>
              )}

              <div
                className={`relative w-full h-full rounded-[28px] backdrop-blur-2xl border overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  isExpanded
                    ? "bg-white/12 shadow-[0_32px_64px_rgba(0,0,0,0.4),0_16px_32px_rgba(139,92,246,0.15)] border-white/20 scale-[1.02]"
                    : "bg-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-white/8 hover:border-white/12"
                }`}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                {item ? (
                  <div className="w-full h-full relative">
                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={`AI Art ${index + 1}`}
                        className={`w-full h-full object-cover transition-all duration-[800ms] ${
                          isExpanded ? "scale-100" : "scale-105 blur-[1px]"
                        }`}
                      />
                    ) : (
                      <video
                        src={item.url}
                        className={`w-full h-full object-cover transition-all duration-[800ms] ${
                          isExpanded ? "scale-100" : "scale-105 blur-[1px]"
                        }`}
                        loop
                        muted
                        autoPlay
                        playsInline
                      />
                    )}

                    {!isExpanded && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-8 bg-gradient-to-t from-white/40 to-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e, index)}
                    />

                    {isExpanded ? (
                      <>
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-white/15 group-hover:scale-110 group-hover:border-white/30">
                          <Upload className="w-12 h-12 text-white/70" />
                        </div>
                        <div className="text-center px-8">
                          <p className="text-white/80 text-xl font-light mb-2">Drop your creation</p>
                          <p className="text-white/50 text-sm">Images and videos supported</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center transition-all duration-500 group-hover:bg-white/15 group-hover:scale-125">
                        <Upload className="w-3 h-3 text-white/40" />
                      </div>
                    )}
                  </label>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
