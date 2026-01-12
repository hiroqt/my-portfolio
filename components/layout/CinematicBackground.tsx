'use client'

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Monochrome base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-dark to-dark-gray" />
      
      {/* Animated gradient overlay with monochrome colors */}
      <div className="absolute inset-0 cinematic-gradient animate-gradient-shift" />
      
      {/* Enhanced noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Enhanced vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40" />
      
      {/* Subtle atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-medium-gray/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-light-gray/3 via-transparent to-transparent" />
    </div>
  )
}