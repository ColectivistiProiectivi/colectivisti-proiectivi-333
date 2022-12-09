import React, { useCallback, useRef, useState } from 'react'

export enum Section {
  GENERAL,
  PROFILE,
}

// TODO: Fix this / refactor
export const useSectionScroll = () => {
  // Handling Changing Section
  const [activeSection, setActiveSection] = useState(Section.GENERAL)
  const generalSectionRef = useRef<HTMLDivElement>(null)
  const profileSectionRef = useRef<HTMLDivElement>(null)

  const handleSectionChange = (_e: React.SyntheticEvent, section: Section) => {
    const activeSection = document.getElementById(section.toString())

    activeSection?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    setActiveSection(section)
  }

  const calculateSectionReached = useCallback(() => {
    if (generalSectionRef.current && profileSectionRef.current) {
      const generalHeight = generalSectionRef.current.offsetHeight
      const generalOffset = generalSectionRef.current.offsetTop - generalHeight

      const profileHeight = profileSectionRef.current.offsetHeight
      const profileOffset = profileSectionRef.current.offsetTop - profileHeight

      if (window.scrollY >= generalOffset && window.scrollY < profileOffset) {
        setActiveSection(Section.GENERAL)
      }

      if (window.scrollY >= profileOffset) {
        setActiveSection(Section.PROFILE)
      }
    }
  }, [generalSectionRef, profileSectionRef])

  document.addEventListener('scroll', calculateSectionReached)

  return { generalSectionRef, profileSectionRef, activeSection, handleSectionChange }
}
