import React from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Logo Video - Full Screen */}
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={onComplete}
      >
        <source src={`${import.meta.env.BASE_URL}logo.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};
