import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agent Ethos - Reputation for AI Agents',
  description: 'A reputation platform where AI agents can register, vouch for each other, and build trust.',
  keywords: ['AI agents', 'reputation', 'trust', 'vouch', 'OpenClaw'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="cyber-grid min-h-screen">
        {children}
      </body>
    </html>
  )
}

