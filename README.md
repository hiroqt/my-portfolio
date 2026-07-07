# Resume Portfolio

A clean, professional resume-style portfolio website for Arnel Baylon showcasing full-stack development projects and technical expertise.

## Features

- 🎨 **Dual Theme Support** - Light and dark mode with smooth transitions
- 💬 **AI Chat Assistant** - Interactive chat powered by Groq LLM to answer visitor questions
- 📊 **Real-Time GitHub Stats** - Live contribution graph, repository stats, and language analysis
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- ⚡ **Fast & Modern** - Built with Next.js 14, React 18, and TypeScript
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📈 **Analytics** - Integrated Vercel Analytics

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **UI Library**: React 18

### Backend & AI
- **Chat AI**: Groq SDK (Llama 3.3 70B)
- **API Routes**: Next.js API Routes
- **Rate Limiting**: In-memory (production: use Redis)

### DevOps
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics
- **Version Control**: Git

## Projects Showcase

1. **PaceMentor** - AI-powered running coach with dynamic workout graphics
2. **HRIS Management System** - HR platform with QR attendance and payroll
3. **Queuing System** - Hospital patient flow management
4. **Clearance System** - Digital clearance workflow
5. **EMR System** - Electronic medical records platform
6. **TMRC Running Club Website** - Community event platform
7. **HiveSyncVA Website** - VA service showcase

## GitHub Integration

The portfolio includes a **real-time GitHub activity section** that displays:

- 📈 **Contribution Graph** - 365-day heatmap of GitHub activity
- 📦 **Repository Stats** - Total repos, commits, and stars
- 💻 **Language Analysis** - Most used programming languages
- ⭐ **Featured Repos** - Top repositories by stars
- 👤 **Profile Info** - Bio, followers, and following count

All data is fetched directly from GitHub's public API. See `GITHUB_INTEGRATION.md` for detailed setup instructions.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API key (for chat feature)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Environment Variables

Create a `.env.local` file:

```env
# Required for chat feature
GROQ_API_KEY=your_groq_api_key_here

# Optional for GitHub stats (higher rate limits)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=hiroqt
```

## Project Structure

```
├── app/
│   ├── api/chat/          # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── chat-widget.css    # Chat widget styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main resume page
├── components/
│   ├── layout/
│   │   └── Section.tsx    # Section wrapper component
│   ├── GitHubStats.tsx    # GitHub activity component
│   ├── DotGrid.tsx        # Background grid animation
│   ├── TerminalIntro.tsx  # Terminal animation
│   └── TypingText.tsx     # Typing effect component
├── docs/
│   └── GITHUB_STATS.md    # GitHub integration docs
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

The site is optimized for Vercel deployment with automatic builds on push.

## Security Features

- Rate limiting on chat API (10 requests/minute per IP)
- Input sanitization and validation
- Content security patterns
- Environment variable protection

## License

Private - All rights reserved

## Contact

**Arnel A. Baylon**
- Email: arnelbaylon15@gmail.com
- GitHub: [hiroqt](https://github.com/hiroqt)
- Location: Cavite, Philippines
