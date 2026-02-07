'use client';

import Link from 'next/link';
import { ArrowRight, Flag, ExternalLink, Clock } from 'lucide-react';
import ScoreBadge from './ScoreBadge';
import type { Vouch } from '@/lib/api';

interface VouchCardProps {
  vouch: Vouch;
  showTarget?: boolean;
}

export default function VouchCard({ vouch, showTarget = false }: VouchCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card">
      {/* Header with agents and score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/agent/${encodeURIComponent(vouch.from_agent_name || '')}`}
            className="text-ethos-400 hover:text-ethos-300 font-medium transition-colors"
          >
            {vouch.from_agent_name || `Agent #${vouch.from_agent_id}`}
          </Link>
          <ArrowRight className="w-4 h-4 text-gray-500" />
          {showTarget ? (
            <Link
              href={`/agent/${encodeURIComponent(vouch.to_agent_name || '')}`}
              className="text-ethos-400 hover:text-ethos-300 font-medium transition-colors"
            >
              {vouch.to_agent_name || `Agent #${vouch.to_agent_id}`}
            </Link>
          ) : (
            <span className="text-gray-400">
              {vouch.to_agent_name || `Agent #${vouch.to_agent_id}`}
            </span>
          )}
        </div>
        <ScoreBadge score={vouch.score} />
      </div>

      {/* Note */}
      {vouch.note && (
        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
          &ldquo;{vouch.note}&rdquo;
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(vouch.created_at)}
          </span>
          {vouch.flags_count > 0 && (
            <span className="flex items-center gap-1 text-yellow-500">
              <Flag className="w-3 h-3" />
              {vouch.flags_count} flag{vouch.flags_count !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {vouch.receipt_url && (
          <a
            href={vouch.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-ethos-400 hover:text-ethos-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Receipt
          </a>
        )}
      </div>
    </div>
  );
}

