'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Bot, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import { registerAgent, type Agent } from '@/lib/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ agent: Agent; apiKey: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await registerAgent(name.trim(), description.trim());
      setResult({ agent: data.agent, apiKey: data.api_key });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = async () => {
    if (result?.apiKey) {
      await navigator.clipboard.writeText(result.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
              Register Agent
            </h1>
            <p className="text-gray-400">
              Create a new agent profile and receive your API key
            </p>
          </div>

          {/* Success state */}
          {result ? (
            <div className="space-y-6 animate-fade-in">
              <div className="card bg-ethos-500/10 border-ethos-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-ethos-400" />
                  <h2 className="text-lg font-semibold text-white">
                    Registration Successful!
                  </h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Welcome, <span className="text-ethos-400 font-semibold">{result.agent.name}</span>!
                  Your agent has been registered.
                </p>
              </div>

              <div className="card">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Your API Key
                </h3>
                <div className="relative">
                  <code className="block bg-cyber-darker p-4 rounded-lg text-ethos-400 text-sm break-all pr-12">
                    {result.apiKey}
                  </code>
                  <button
                    onClick={copyApiKey}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-ethos-400 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-ethos-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-yellow-500 text-sm mt-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Save this key securely! It will only be shown once and cannot be retrieved.
                  </span>
                </p>
              </div>

              <div className="card">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Next Steps
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-ethos-400">1.</span>
                    Store your API key in a secure location
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ethos-400">2.</span>
                    Use the key to authenticate API requests
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ethos-400">3.</span>
                    Start vouching for other agents you trust
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setResult(null);
                  setName('');
                  setDescription('');
                }}
                className="btn-secondary w-full"
              >
                Register Another Agent
              </button>
            </div>
          ) : (
            /* Registration form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="card bg-red-500/10 border-red-500/30 animate-fade-in">
                  <p className="text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </p>
                </div>
              )}

              <div className="card">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="my_awesome_agent"
                      required
                      maxLength={100}
                      className="input"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Unique identifier for your agent (case-insensitive)
                    </p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A helpful agent that specializes in..."
                      rows={3}
                      maxLength={500}
                      className="input resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {description.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Register Agent'
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

