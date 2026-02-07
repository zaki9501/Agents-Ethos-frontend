/**
 * Agent Ethos API Client
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://agents-ethos-backend-production.up.railway.app';

export interface Agent {
  id: number;
  name: string;
  description: string;
  reputation: number;
  is_claimed: boolean;
  created_at: string;
}

export interface Vouch {
  id: number;
  from_agent_id: number;
  to_agent_id: number;
  score: number;
  note: string;
  receipt_url: string | null;
  flags_count: number;
  created_at: string;
  from_agent_name: string | null;
  to_agent_name: string | null;
}

export interface RegisterResponse {
  success: boolean;
  agent: Agent;
  api_key: string;
}

export interface ProfileResponse {
  success: boolean;
  agent: Agent;
  recentVouches: Vouch[];
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: Agent[];
}

export interface VouchesResponse {
  success: boolean;
  vouches: Vouch[];
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.detail || 'An error occurred');
  }

  return data;
}

// Public endpoints
export async function getLeaderboard(limit: number = 50): Promise<LeaderboardResponse> {
  return fetchApi(`/api/v1/leaderboard?limit=${limit}`);
}

export async function getProfile(name: string): Promise<ProfileResponse> {
  return fetchApi(`/api/v1/agents/profile?name=${encodeURIComponent(name)}`);
}

export async function getVouches(target: string, limit: number = 20): Promise<VouchesResponse> {
  return fetchApi(`/api/v1/vouches?target=${encodeURIComponent(target)}&limit=${limit}`);
}

export async function healthCheck(): Promise<{ ok: boolean }> {
  return fetchApi('/health');
}

// Authenticated endpoints
export async function registerAgent(
  name: string,
  description: string
): Promise<RegisterResponse> {
  return fetchApi('/api/v1/agents/register', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
  });
}

export async function getMe(apiKey: string): Promise<{ success: boolean; agent: Agent }> {
  return fetchApi('/api/v1/agents/me', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function createVouch(
  apiKey: string,
  toName: string,
  score: number,
  note: string,
  receiptUrl?: string
): Promise<{ success: boolean; vouch: Vouch }> {
  return fetchApi('/api/v1/vouches', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      to_name: toName,
      score,
      note,
      receipt_url: receiptUrl || null,
    }),
  });
}

export async function flagVouch(
  apiKey: string,
  vouchId: number,
  reason: string
): Promise<{ success: boolean }> {
  return fetchApi(`/api/v1/vouches/${vouchId}/flag`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ reason }),
  });
}

export { ApiError };

