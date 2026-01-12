'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Section } from '@/components/layout/Section'
import { ParallaxText } from '@/components/animation/ParallaxText'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { PowerStack } from '@/components/sections/PowerStack'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { ProjectShowcase } from '@/components/sections/ProjectShowcase'
import { CertificationMarquee } from '@/components/sections/CertificationMarquee'
import { EnhancedHero } from '@/components/sections/EnhancedHero'
import { SummarySection } from '@/components/sections/SummarySection'
import { SectionSeparator } from '@/components/ui/SectionSeparator'

// Dynamically import PageLoader to ensure it only renders on client
const PageLoader = dynamic(() => import('@/components/ui/PageLoader').then(mod => ({ default: mod.PageLoader })), {
  ssr: false
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <PageLoader onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          {/* Enhanced Hero Section */}
          <EnhancedHero />

          {/* Separator */}
          <SectionSeparator variant="geometric" />

          {/* Summary Section */}
          <SummarySection />

          {/* Separator */}
          <SectionSeparator variant="lines" />

          {/* Power Stack Bento Grid */}
          <Section>
            <div id="power-stack" className="container-spacing px-4">
              <ScrollReveal>
                <ParallaxText speed={0.3}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-heading-lg font-bold mb-6 lg:mb-element-gap text-center text-shimmer px-4">
                    Power Stack
                  </h2>
                </ParallaxText>
              </ScrollReveal>
              <PowerStack />
            </div>
          </Section>

          {/* Separator */}
          <SectionSeparator variant="wave" />

          {/* Experience Timeline */}
          <Section>
            <div id="experience" className="container-spacing">
              <ScrollReveal>
                <ParallaxText speed={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-heading-lg font-bold mb-6 lg:mb-element-gap text-center text-shimmer px-4">
                    Professional Impact
                  </h2>
                </ParallaxText>
              </ScrollReveal>
              <ExperienceTimeline />
            </div>
          </Section>

          {/* Separator */}
          <SectionSeparator variant="dots" />

          {/* Interactive Project Showcase */}
          <Section>
            <div className="container-spacing">
              <ScrollReveal>
                <ParallaxText speed={0.1}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-heading-lg font-bold mb-6 lg:mb-element-gap text-center text-shimmer px-4">
                    Featured Projects
                  </h2>
                </ParallaxText>
              </ScrollReveal>
              <ProjectShowcase />
            </div>
          </Section>

          {/* Separator */}
          <SectionSeparator variant="lines" />

          {/* Certifications Marquee */}
          <Section>
            <div className="container-spacing px-4">
              <CertificationMarquee />
            </div>
          </Section>
        </>
      )}
    </>
  )
}