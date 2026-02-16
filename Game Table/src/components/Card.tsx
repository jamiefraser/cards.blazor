interface CardProps {
  suit?: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value?: string;
  faceDown?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const suitColors = {
  hearts: 'text-red-600',
  diamonds: 'text-red-600',
  clubs: 'text-gray-900',
  spades: 'text-gray-900',
};

export function Card({ suit, value, faceDown = false, size = 'md' }: CardProps) {
  const sizeClasses = {
    sm: 'w-12 h-16 text-xs',
    md: 'w-20 h-28 text-base',
    lg: 'w-24 h-32 text-lg',
  };

  if (faceDown) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg shadow-lg border-2 border-white/20 flex items-center justify-center`}>
        <div className="text-white/20 text-2xl font-bold">🂠</div>
      </div>
    );
  }

  if (!suit || !value) return null;

  return (
    <div className={`${sizeClasses[size]} bg-white rounded-lg shadow-lg border border-gray-300 p-1 flex flex-col`}>
      <div className={`${suitColors[suit]} font-bold flex items-start gap-0.5`}>
        <span>{value}</span>
        <span className="text-sm">{suitSymbols[suit]}</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className={`${suitColors[suit]} ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-3xl' : 'text-4xl'}`}>
          {suitSymbols[suit]}
        </span>
      </div>
      <div className={`${suitColors[suit]} font-bold flex items-end justify-end gap-0.5 rotate-180`}>
        <span>{value}</span>
        <span className="text-sm">{suitSymbols[suit]}</span>
      </div>
    </div>
  );
}
