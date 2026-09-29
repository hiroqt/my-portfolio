export interface StackTechnology {
  label: string
  mark: string
  source: string
}

export interface StackGroup {
  label: string
  technologies: StackTechnology[]
}

export const stackGroups: StackGroup[] = [
  {
    label: 'Frontend',
    technologies: [
      { label: 'TypeScript', mark: 'TS', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'React', mark: 'Re', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Next.js', mark: 'Nx', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Tailwind CSS', mark: 'Tw', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'Motion', mark: 'Mo', source: 'https://github.com/hiroqt/momo/blob/main/web/package.json' },
      { label: 'React Native', mark: 'Rn', source: 'https://github.com/hiroqt/momo/blob/main/mobile/package.json' },
    ],
  },
  {
    label: 'Backend',
    technologies: [
      { label: 'Python', mark: 'Py', source: 'https://github.com/hiroqt/momo/blob/main/backend/pyproject.toml' },
      { label: 'FastAPI', mark: 'Fa', source: 'https://github.com/hiroqt/momo/blob/main/backend/app/main.py' },
      { label: 'Node.js', mark: 'Nd', source: 'https://github.com/hiroqt/PixelCrew/blob/main/src/core/orchestrator.js' },
      { label: 'Better Auth', mark: 'Ba', source: 'https://better-auth.com' },
    ],
  },
  {
    label: 'Tools',
    technologies: [
      { label: 'Codex', mark: 'Cx', source: 'https://openai.com' },
      { label: 'Claude', mark: 'Cl', source: 'https://claude.ai' },
      { label: 'Gemini', mark: 'Gm', source: 'https://gemini.google.com' },
      { label: 'Jev', mark: 'Jv', source: 'https://github.com/typesafe-ai' },
      { label: 'Obsidian', mark: 'Ob', source: 'https://obsidian.md' },
      { label: 'Orca', mark: 'Or', source: 'https://stably.ai' },
    ],
  },
  {
    label: 'Storage',
    technologies: [
      { label: 'PostgreSQL', mark: 'Pg', source: 'https://github.com/hiroqt/flyrank_crud_api/blob/main/index.js' },
      { label: 'Supabase', mark: 'Sb', source: 'https://supabase.com' },
      { label: 'Redis', mark: 'Re', source: 'https://redis.io' },
      { label: 'Firebase', mark: 'Fb', source: 'https://firebase.google.com' },
    ],
  },
]

export const additionalStack: StackTechnology[] = [
  { label: 'Vercel', mark: 'Vc', source: 'https://vercel.com' },
  { label: 'Render', mark: 'Rd', source: 'https://render.com' },
  { label: 'Google Console', mark: 'Gc', source: 'https://console.cloud.google.com' },
  { label: 'Docker', mark: 'Dk', source: 'https://github.com/hiroqt/flyrank_crud_api/blob/main/Dockerfile' },
  { label: 'AWS S3', mark: 'S3', source: 'https://github.com/hiroqt/momo/blob/main/backend/app/services/storage/s3_service.py' },
  { label: 'Terraform', mark: 'Tf', source: 'https://github.com/hiroqt/bettertrece/blob/main/terraform/main.tf' },
  { label: 'Swift', mark: 'Sw', source: 'https://github.com/hiroqt/android-deck/blob/main/macos/NotchDeck/Package.swift' },
  { label: 'Kotlin', mark: 'Kt', source: 'https://github.com/hiroqt/android-deck/blob/main/android/app/build.gradle.kts' },
  { label: 'Rust', mark: 'Rs', source: 'https://github.com/hiroqt/harvest_pay/blob/main/Cargo.toml' },
  { label: 'Expo', mark: 'Ex', source: 'https://github.com/hiroqt/momo/blob/main/mobile/package.json' },
]
