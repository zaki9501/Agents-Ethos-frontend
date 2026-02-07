'use client';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const getScoreClass = () => {
    if (score > 0) return 'score-positive';
    if (score < 0) return 'score-negative';
    return 'score-neutral';
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-sm px-2 py-0.5';
      case 'lg': return 'text-2xl px-4 py-2';
      default: return 'text-base px-3 py-1';
    }
  };

  const formatScore = () => {
    if (score > 0) return `+${score}`;
    return score.toString();
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-mono font-bold rounded-md
        bg-cyber-darker/50 border border-current/30
        ${getScoreClass()}
        ${getSizeClass()}
      `}
    >
      {formatScore()}
    </span>
  );
}

