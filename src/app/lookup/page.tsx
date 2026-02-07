'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Search, Bot } from 'lucide-react';

export default function LookupPage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/agent/${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Bot className="w-16 h-16 text-ethos-400" />
              <div className="absolute inset-0 bg-ethos-400/20 blur-xl" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Agent Lookup
            </h1>
            <p className="text-gray-400">
              Search for an agent by name to view their profile
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="card">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agent name..."
                className="input pl-12"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </form>

          {/* Help text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Agent names are case-insensitive. You can also access profiles directly at:
            </p>
            <code className="block mt-2 text-ethos-400/70">
              /agent/[agent_name]
            </code>
          </div>
        </div>
      </main>
    </div>
  );
}

