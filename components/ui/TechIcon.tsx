import type { ComponentType, SVGProps } from 'react'
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiExpo,
  SiSwift,
  SiKotlin,
  SiRust,
  SiDocker,
  SiTerraform,
  SiApple,
  SiAndroid,
  SiVite,
  SiFlutter,
  SiDart,
  SiStrava,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiVuedotjs,
  SiFirebase,
  SiRedis,
  SiSqlite,
  SiGraphql,
  SiOpenai,
  SiAnthropic,
  SiGooglecloud,
  SiVercel,
  SiRender,
  SiObsidian,
  SiGooglegemini,
  SiBetterauth,
  SiTiktok,
  SiInstagram,
  SiX,
  SiThreads,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import { FaAws, FaLinkedin } from 'react-icons/fa6'
import { LuGlobe, LuMonitor, LuSparkles, LuCode, LuShieldCheck, LuWorkflow } from 'react-icons/lu'

export interface TechIconProps extends SVGProps<SVGSVGElement> {
  name: string
  size?: number | string
  className?: string
}

const ICON_MAP: Record<string, ComponentType<{ size?: number | string; className?: string }>> = {
  // Web & Frontend
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  react: SiReact,
  'react.js': SiReact,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  'tailwind css': SiTailwindcss,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  motion: SiFramer,
  'framer motion': SiFramer,
  framer: SiFramer,
  vite: SiVite,
  vue: SiVuedotjs,
  'vue.js': SiVuedotjs,
  vuejs: SiVuedotjs,
  graphql: SiGraphql,

  // Backend & Languages
  python: SiPython,
  py: SiPython,
  fastapi: SiFastapi,
  'fast api': SiFastapi,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  php: SiPhp,
  laravel: SiLaravel,
  'laravel & livewire': SiLaravel,
  rust: SiRust,
  swift: SiSwift,
  kotlin: SiKotlin,

  // Data & Infrastructure
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  supabase: SiSupabase,
  mysql: SiMysql,
  sqlite: SiSqlite,
  redis: SiRedis,
  firebase: SiFirebase,
  render: SiRender,
  vercel: SiVercel,
  'better auth': SiBetterauth,
  betterauth: SiBetterauth,
  'google console': SiGooglecloud,
  'google cloud console': SiGooglecloud,
  docker: SiDocker,
  terraform: SiTerraform,
  aws: FaAws,
  'aws s3': FaAws,
  s3: FaAws,
  'google cloud': SiGooglecloud,
  gcp: SiGooglecloud,

  // Mobile
  'react native': TbBrandReactNative,
  expo: SiExpo,
  flutter: SiFlutter,
  dart: SiDart,

  // Platforms
  web: LuGlobe,
  ios: SiApple,
  apple: SiApple,
  android: SiAndroid,
  macos: LuMonitor,

  // AI & Services
  'agentic ai': LuSparkles,
  ai: LuSparkles,
  'ai copilot': LuSparkles,
  'ai agents': LuSparkles,
  openai: SiOpenai,
  codex: SiOpenai,
  'openai codex': SiOpenai,
  claude: SiAnthropic,
  gemini: SiGooglegemini,
  'google gemini': SiGooglegemini,
  jev: LuShieldCheck,
  'typesafe jev': LuShieldCheck,
  obsidian: SiObsidian,
  orca: LuWorkflow,
  'strava api': SiStrava,
  strava: SiStrava,
  websocket: LuMonitor,
  ws: LuMonitor,

  // Socials
  linkedin: FaLinkedin,
  tiktok: SiTiktok,
  instagram: SiInstagram,
  x: SiX,
  twitter: SiX,
  threads: SiThreads,
}

export function TechIcon({ name, size = 16, className, ...props }: TechIconProps) {
  const normalized = name.trim().toLowerCase()
  const IconComponent = ICON_MAP[normalized] || LuCode

  return <IconComponent size={size} className={className} {...props} />
}

export function hasTechIcon(name: string): boolean {
  const normalized = name.trim().toLowerCase()
  return normalized in ICON_MAP
}

export default TechIcon
