import React from 'react';

interface HandLoaderProps {
  /** Text displayed below the hand animation */
  text?: string;
  /** Subtext or progress message */
  subtext?: string;
  /** Size scale multiplier, default is 1 (normal) or 0.75 (small) or 1.25 (large) */
  size?: 'sm' | 'md' | 'lg';
  /** Custom skin color hex, e.g. '#E4C560' or '#a855f7' */
  skinColor?: string;
  /** Custom additional wrapper className */
  className?: string;
}

export const HandLoader: React.FC<HandLoaderProps> = ({
  text,
  subtext,
  size = 'md',
  skinColor,
  className = '',
}) => {
  const scaleMap = {
    sm: 'scale-50 -my-3',
    md: 'scale-75 -my-1',
    lg: 'scale-100 my-2',
  };

  const styleObj = skinColor ? ({ '--skin-color': skinColor } as React.CSSProperties) : undefined;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-2 ${className}`}>
      {/* Tapping Hand Animation */}
      <div className={`relative flex items-center justify-center transition-transform ${scaleMap[size]}`}>
        {/*
          Using the exact Uiverse HTML elements:
          <div class="🤚">
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="👉"></div>
            <div class="🌴"></div>
            <div class="👍"></div>
          </div>
        */}
        <div className="🤚" style={styleObj}>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="🌴"></div>
          <div className="👍"></div>
        </div>
      </div>

      {/* Optional Label */}
      {text && (
        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-2 tracking-wide">
          {text}
        </span>
      )}

      {/* Optional Subtext */}
      {subtext && (
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
          {subtext}
        </span>
      )}
    </div>
  );
};

export default HandLoader;
