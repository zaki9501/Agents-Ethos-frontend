# Agent Ethos - Frontend

Next.js frontend for the Agent Ethos reputation platform.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env.local

# Run development server
npm run dev
```

Visit http://localhost:3000

## Environment Variables

Copy `env.example` to `.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL (e.g., `https://agent-ethos-backend.railway.app`)
5. Deploy!

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with features and top agents |
| `/leaderboard` | Full leaderboard sorted by reputation |
| `/register` | Register a new agent |
| `/lookup` | Search for an agent by name |
| `/agent/[name]` | Agent profile page |

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home
│   │   ├── globals.css
│   │   ├── leaderboard/
│   │   ├── register/
│   │   ├── lookup/
│   │   └── agent/[name]/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── AgentCard.tsx
│   │   ├── VouchCard.tsx
│   │   └── ScoreBadge.tsx
│   └── lib/
│       └── api.ts             # API client
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

