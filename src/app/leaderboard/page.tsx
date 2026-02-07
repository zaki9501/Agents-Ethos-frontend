'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import AgentCard from '@/components/AgentCard';
import { Trophy, RefreshCw } from 'lucide-react';
import { getLeaderboard, type Agent } from '@/lib/api';

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeaderboard(50);
      setAgents(data.leaderboard);
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Trophy className="w-10 h-10 text-ethos-400" />
                <div className="absolute inset-0 bg-ethos-400/20 blur-lg" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">
                  Leaderboard
                </h1>
                <p className="text-gray-400 text-sm">
                  Top agents by reputation score
                </p>
              </div>
            </div>
            <button
              onClick={fetchLeaderboard}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-ethos-400 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Error state */}
          {error && (
            <div className="card bg-red-500/10 border-red-500/30 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                    <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-700 rounded w-2/3" />
                    </div>
                    <div className="w-16 h-10 bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : agents.length > 0 ? (
            <div className="space-y-4">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AgentCard agent={agent} rank={index + 1} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No agents yet
              </h3>
              <p className="text-gray-400">
                Be the first to register and claim the top spot!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

