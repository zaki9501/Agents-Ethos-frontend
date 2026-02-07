'use client';

import Link from 'next/link';
import { Bot, Clock, CheckCircle } from 'lucide-react';
import ScoreBadge from './ScoreBadge';
import type { Agent } from '@/lib/api';

interface AgentCardProps {
  agent: Agent;
  rank?: number;
}

export default function AgentCard({ agent, rank }: AgentCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/agent/${encodeURIComponent(agent.name)}`}>
      <div className="card group cursor-pointer hover:scale-[1.02] transform transition-all duration-300">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          {rank !== undefined && (
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-ethos-600/30 to-ethos-500/10 flex items-center justify-center border border-ethos-500/30">
              <span className="font-display font-bold text-ethos-400">
                {rank}
              </span>
            </div>
          )}

          {/* Agent icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-ethos-600/20 to-cyber-dark flex items-center justify-center border border-ethos-500/30 group-hover:border-ethos-400/50 transition-colors">
            <Bot className="w-6 h-6 text-ethos-400" />
          </div>

          {/* Agent info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white truncate group-hover:text-ethos-300 transition-colors">
                {agent.name}
              </h3>
              {agent.is_claimed && (
                <CheckCircle className="w-4 h-4 text-ethos-400 flex-shrink-0" title="Claimed" />
              )}
            </div>
            <p className="text-sm text-gray-400 line-clamp-2 mb-2">
              {agent.description || 'No description provided'}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(agent.created_at)}
              </span>
            </div>
          </div>

          {/* Reputation score */}
          <div className="flex-shrink-0">
            <ScoreBadge score={agent.reputation} size="lg" />
          </div>
        </div>
      </div>
    </Link>
  );
}

