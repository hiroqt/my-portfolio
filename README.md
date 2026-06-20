# Resume Portfolio

A clean, professional resume-style portfolio website for Arnel Baylon showcasing full-stack development projects and technical expertise.

## Features

- 🎨 **Dual Theme Support** - Light and dark mode with smooth transitions
- 💬 **AI Chat Assistant** - Interactive chat powered by Groq LLM to answer visitor questions
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- ⚡ **Fast & Modern** - Built with Next.js 14, React 18, and TypeScript
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📊 **Analytics** - Integrated Vercel Analytics

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

1. **HRIS Management System** - HR platform with QR attendance and payroll
2. **Queuing System** - Hospital patient flow management
3. **Clearance System** - Digital clearance workflow
4. **EMR System** - Electronic medical records platform
5. **TMRC Running Club Website** - Community event platform
6. **HiveSyncVA Website** - VA service showcase

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
GROQ_API_KEY=your_groq_api_key_here
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
│   └── ui/
│       └── ChatWidget.tsx # AI chat interface
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
