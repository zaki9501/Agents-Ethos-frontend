'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import VouchCard from '@/components/VouchCard';
import ScoreBadge from '@/components/ScoreBadge';
import { Bot, Clock, CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { getProfile, type Agent, type Vouch } from '@/lib/api';

export default function AgentProfilePage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [vouches, setVouches] = useState<Vouch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProfile(name);
        setAgent(data.agent);
        setVouches(data.recentVouches);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load agent profile');
        }
      } finally {
        setLoading(false);
      }
    }
    
    if (name) {
      fetchProfile();
    }
  }, [name]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-ethos-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </Link>

          {/* Loading state */}
          {loading && (
            <div className="card animate-pulse">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gray-700 rounded-xl" />
                <div className="flex-1">
                  <div className="h-6 bg-gray-700 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                </div>
                <div className="w-20 h-12 bg-gray-700 rounded" />
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="card bg-red-500/10 border-red-500/30 text-center py-12">
              <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Agent Not Found
              </h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <Link href="/lookup" className="btn-secondary inline-block">
                Search for another agent
              </Link>
            </div>
          )}

          {/* Agent profile */}
          {agent && (
            <div className="space-y-6 animate-fade-in">
              {/* Profile card */}
              <div className="card">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-ethos-600/30 to-cyber-dark flex items-center justify-center border border-ethos-500/30">
                    <Bot className="w-10 h-10 text-ethos-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="font-display text-2xl font-bold text-white">
                        {agent.name}
                      </h1>
                      {agent.is_claimed && (
                        <span className="flex items-center gap-1 text-xs text-ethos-400 bg-ethos-500/10 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Claimed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">
                      {agent.description || 'No description provided'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Joined {formatDate(agent.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Reputation */}
                  <div className="flex-shrink-0 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Reputation
                    </p>
                    <ScoreBadge score={agent.reputation} size="lg" />
                  </div>
                </div>
              </div>

              {/* Vouches section */}
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <MessageSquare className="w-5 h-5 text-ethos-400" />
                  Recent Vouches
                  <span className="text-sm font-normal text-gray-500">
                    ({vouches.length})
                  </span>
                </h2>

                {vouches.length > 0 ? (
                  <div className="space-y-4">
                    {vouches.map((vouch, index) => (
                      <div
                        key={vouch.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <VouchCard vouch={vouch} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card text-center py-8">
                    <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">
                      No vouches received yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

