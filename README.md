# 🚀 Startup Idea Generator

Generate absurd, hilarious startup ideas based on any word you throw at it!

## Features

- 🎨 Beautiful gradient UI with purple/pink theme
- ⚡ Real-time idea generation using Claude Sonnet 4.6
- 📱 Fully responsive design
- 🎯 Example words ready to click

## Setup

### Prerequisites
- Node.js 18+ 
- Anthropic API key

### Installation

1. Clone or navigate to the project:
```bash
cd startup-generator
```

2. Install dependencies:
```bash
npm install
```

3. Add your Anthropic API key to `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action!

### Production

Build and start:
```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push to GitHub (if not already)
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repo
4. Add `ANTHROPIC_API_KEY` to Environment Variables
5. Deploy! 🎉

## How It Works

1. Enter any word (socks, rocks, pizza, etc.)
2. Claude generates a funny startup pitch with:
   - Creative name
   - One-liner tagline
   - Absurd description
   - Fake funding prediction
   - Emoji logo

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 4.6
- **Deployment**: Vercel-ready

## License

MIT - Go wild! 🌼
