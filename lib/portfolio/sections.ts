/**
 * Where each portfolio section lives. Sections that used to be anchors on the
 * home page (/#experience, /#certifications, …) now have their own pages; old
 * links and the assistant's section ids resolve through this map.
 */
const sectionRoutes: Record<string, string> = {
  home: '/',
  hero: '/',
  about: '/#about',
  recognition: '/#recognition',
  gallery: '/#recognition',
  experience: '/experience',
  education: '/experience#education',
  projects: '/projects',
  'built-skills': '/skills',
  skills: '/stack',
  stack: '/stack',
  certifications: '/certifications',
  services: '/services',
  contact: '/contact',
  github: '/contact',
  typing: '/typing',
  writing: '/blog',
  blog: '/blog',
}

/** The URL for a section id, falling back to the home page. */
export function routeForSection(id: string) {
  return sectionRoutes[id.toLowerCase()] ?? '/'
}

/** For an old home page anchor, the page it moved to; null when it still lives on the home page. */
export function movedSectionRoute(id: string) {
  const route = sectionRoutes[id.toLowerCase()]
  return route && route !== '/' && !route.startsWith('/#') ? route : null
}
