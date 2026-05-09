import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <span className="text-white font-bold text-xl">Finova AI</span>
    </div>
  );
};

export default Logo;