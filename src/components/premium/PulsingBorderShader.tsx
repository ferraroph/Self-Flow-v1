"use client"

import { PulsingBorder } from "@paper-design/shaders-react"

interface PulsingBorderShaderProps {
  width?: string
  height?: string
  className?: string
  colors?: string[]
  speed?: number
  intensity?: number
}

export function PulsingBorderShader({
  width = "535px",
  height = "511px",
  className = "",
  colors = ["#5800FF", "#BEECFF", "#E77EDC", "#FF4C3E"],
  speed = 1.5,
  intensity = 1,
  ...props
}: PulsingBorderShaderProps) {
  return (
    <div className={className}>
      <PulsingBorder
        colors={colors}
        colorBack="#00000000"
        speed={speed}
        roundness={1}
        thickness={0.05}
        softness={0.1}
        intensity={intensity}
        spotsPerColor={5}
        spotSize={0.1}
        pulse={0.2}
        smoke={0.5}
        smokeSize={2}
        scale={0.65}
        rotation={0}
        frame={9161408.251009725}
        {...props}
        style={{
          width,
          height,
          borderRadius: "0px",
          backgroundImage:
            "radial-gradient(circle in oklab, oklab(0% 0 -.0001 / 0%) 25.22%, oklab(30.5% 0.029 -0.184) 43.89%, oklab(0% 0 -.0001 / 0%) 60.04%)",
          ...props.style,
        }}
      />
    </div>
  )
}
