# Arnel Baylon’s portfolio

A responsive portfolio for Arnel’s software engineering, civic technology, and AI work. The site uses one portfolio layout, focused project case studies, and a separate conversational assistant. https://yhel.online

Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, CSS modules, Geist typography, and restrained Framer Motion interactions. Themes share the same design tokens, and motion supports reduced-motion preferences.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Work, capabilities, background, experience, recognition, and contact |
| `/assistant` | Streamed portfolio answers, voice controls, suggested questions, and explicit navigation actions |
| `/projects/[slug]` | Project overview, technology, features, and supporting detail |
| `/api/ai/chat` | Conversation streaming and available request quota |
| `/api/ai/tts` | Spoken responses with the configured speech provider and fallback |

The typing playground loads on demand. Project navigation from an AI response runs when a visitor chooses an action button.

## Local setup

Use Node.js 20 or later and npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Add any optional AI credentials to `.env.local`; the portfolio and local assistant fallback work without them. Keep credentials in the ignored local file.

| Environment key | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Optional hosted AI responses; empty uses the portfolio-grounded local assistant |
| `ELEVENLABS_API_KEY` | Optional ElevenLabs speech; empty uses the existing speech fallback |
| `ELEVENLABS_VOICE_ID` | Optional voice selection; empty keeps the default voice |

`.env.example` contains empty assignments and can be committed. The browser calls same-origin API routes; provider credentials stay on the server.

## Checks and production

```sh
npm run lint
npm run build
npm start
```

Run the production build when the development server is stopped, or use a separate checkout/output directory. Both commands otherwise write the default `.next` directory.

Next.js loads the server-side environment for chat and speech. Vercel Analytics is included. API rate limits use a process-local in-memory store in `lib/ai/rateLimit.ts`.

## Source layout

- `app/`: pages, root styling, metadata, project routes, and AI API handlers.
- `components/PortfolioShell.*`: the primary portfolio layout and interactions.
- `components/sections/`: focused work, journey, and toolkit sections.
- `components/modules/ai/`: message rendering and voice controls.
- `components/modules/typing/`: the on-demand typing playground.
- `lib/data/projects.ts`: project records shared by the portfolio, case studies, and AI knowledge.
- `lib/data/stack.ts`: the portfolio’s grouped tools and technology records.
- `lib/ai/` and `lib/rag/`: assistant orchestration, prompts, grounded knowledge, retrieval, and limits.
- `lib/audio/`: synthesized keyboard switch sounds.
- `public/`: project imagery, personal photos, recognition documents, résumé, and site metadata.
- `content/ai/`: editorial reference documents; the running assistant currently reads `lib/rag/knowledge.ts` and project records.
- `scripts/test_dialogue.ts`: existing dialogue scenarios for the local response synthesizer.

Edit project content in `lib/data/projects.ts`. Keep the assistant’s facts aligned in `lib/rag/knowledge.ts`, and keep public links consistent when changing section IDs.
