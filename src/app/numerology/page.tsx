import NumerologyMap from '@/components/numerology/NumerologyMap'
import { MeshGradientSVG, RotatingEarth } from '@/components/premium'

export default function NumerologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      {/* Background with premium effects */}
      <div className="fixed inset-0 -z-10">
        <MeshGradientSVG 
          colors={["#1A1A2E", "#16213E", "#0F3460", "#533A7B", "#4A1942"]}
          showAvatar={false}
          animate={true}
          className="opacity-20"
        />
      </div>
      
      <div className="relative z-10">
        <NumerologyMap />
      </div>
      
      {/* Decorative Elements */}
      <div className="fixed bottom-4 right-4 opacity-30 pointer-events-none">
        <RotatingEarth 
          width={200} 
          height={200} 
          autoRotate={true}
          rotationSpeed={0.3}
        />
      </div>
    </div>
  )
}