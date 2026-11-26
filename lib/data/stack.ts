export interface StackTechnology {
  label: string
  source: string
}

export interface StackGroup {
  label: string
  description: string
  technologies: StackTechnology[]
}

export const stackGroups: StackGroup[] = [
  {
    label: 'Web & apps',
    description: 'Interfaces and experiences across web, mobile, and desktop.',
    technologies: [
      { label: 'TypeScript', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'React', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Next.js', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Tailwind CSS', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Motion', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'React Native', source: 'https://github.com/hiroqt/momo/blob/main/mobile/package.json' },
      { label: 'Swift', source: 'https://github.com/hiroqt/android-deck/blob/main/macos/NotchDeck/Package.swift' },
      { label: 'Kotlin', source: 'https://github.com/hiroqt/android-deck/blob/main/android/app/build.gradle.kts' },
      { label: 'Expo', source: 'https://github.com/hiroqt/momo/blob/main/mobile/package.json' },
    ],
  },
  {
    label: 'Backend & AI',
    description: 'Backend services, runtimes, and AI models.',
    technologies: [
      { label: 'Python', source: 'https://github.com/hiroqt/momo/blob/main/backend/pyproject.toml' },
      { label: 'FastAPI', source: 'https://github.com/hiroqt/momo/blob/main/backend/app/main.py' },
      { label: 'Node.js', source: 'https://github.com/hiroqt/PixelCrew/blob/main/src/core/orchestrator.js' },
      { label: 'Better Auth', source: 'https://better-auth.com' },
      { label: 'Gemini', source: 'https://gemini.google.com' },
      { label: 'Jev', source: 'https://github.com/typesafe-ai' },
      { label: 'Rust', source: 'https://github.com/hiroqt/harvest_pay/blob/main/Cargo.toml' },
    ],
  },
  {
    label: 'Data & infrastructure',
    description: 'Databases, cloud services, and deployment tools.',
    technologies: [
      { label: 'PostgreSQL', source: 'https://github.com/hiroqt/flyrank_crud_api/blob/main/index.js' },
      { label: 'Supabase', source: 'https://supabase.com' },
      { label: 'Redis', source: 'https://redis.io' },
      { label: 'Firebase', source: 'https://firebase.google.com' },
      { label: 'Vercel', source: 'https://vercel.com' },
      { label: 'Render', source: 'https://render.com' },
      { label: 'Google Console', source: 'https://console.cloud.google.com' },
      { label: 'Docker', source: 'https://github.com/hiroqt/flyrank_crud_api/blob/main/Dockerfile' },
      { label: 'AWS S3', source: 'https://github.com/hiroqt/momo/blob/main/backend/app/services/storage/s3_service.py' },
      { label: 'Terraform', source: 'https://github.com/hiroqt/bettertrece/blob/main/terraform/main.tf' },
    ],
  },
  {
    label: 'Tools I use',
    description: 'The apps behind my everyday workflow.',
    technologies: [
      { label: 'Orca', source: 'https://stably.ai' },
      { label: 'Wispr Flow', source: 'https://wisprflow.ai' },
      { label: 'Claude Ultra', source: 'https://claude.ai' },
      { label: 'Codex', source: 'https://openai.com' },
      { label: 'Obsidian', source: 'https://obsidian.md' },
    ],
  },
  {
    label: 'Agent skills',
    description: 'Skills I run in my coding agents.',
    technologies: [
      { label: 'Ponytail', source: 'https://github.com/DietrichGebert/ponytail' },
      { label: 'Caveman', source: 'https://github.com/JuliusBrussee/caveman' },
      { label: 'Overdrive', source: 'https://github.com/hiroqt/overdrive' },
      { label: 'Graphify', source: 'https://github.com/Graphify-Labs/graphify' },
    ],
  },
]
