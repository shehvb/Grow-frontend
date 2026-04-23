import React from 'react';
import type { Reactions, ReactionType } from '../../types/channel';
import { FiThumbsUp, FiHeart } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

interface ReactionButtonsProps {
  reactions: Reactions;
  onReact: (reaction: ReactionType) => void;
  isReacting: boolean;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ reactions, onReact, isReacting }) => {
  const handleReact = (type: ReactionType) => {
    if (!isReacting) {
      onReact(type);
    }
  };

  const getButtonClass = (type: ReactionType) => {
    const isActive = reactions.userReaction === type;
    const base = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border";
    
    if (isActive) {
      if (type === 'like') return `${base} bg-blue-50 border-blue-200 text-blue-600`;
      if (type === 'love') return `${base} bg-red-50 border-red-200 text-red-600`;
      if (type === 'fire') return `${base} bg-orange-50 border-orange-200 text-orange-600`;
    }
    
    return `${base} bg-white border-gray-200 text-gray-600 hover:bg-gray-50 opacity-80`;
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <button 
        onClick={() => handleReact('like')} 
        disabled={isReacting}
        className={getButtonClass('like')}
      >
        <FiThumbsUp className={reactions.userReaction === 'like' ? "fill-blue-500 text-blue-500" : "text-gray-500"} />
        <span>{reactions.like}</span>
      </button>

      <button 
        onClick={() => handleReact('love')} 
        disabled={isReacting}
        className={getButtonClass('love')}
      >
        <FiHeart className={reactions.userReaction === 'love' ? "fill-red-500 text-red-500" : "text-gray-500"} />
        <span>{reactions.love}</span>
      </button>

      <button 
        onClick={() => handleReact('fire')} 
        disabled={isReacting}
        className={getButtonClass('fire')}
      >
        <FaFire className={reactions.userReaction === 'fire' ? "text-orange-500" : "text-gray-500"} />
        <span>{reactions.fire}</span>
      </button>
    </div>
  );
};

export default ReactionButtons;
