import React from 'react';

const ProfilePicture = () => {
  return (
    <div className="flex justify-center mb-12">
      <div className="relative">
        {/* Rotating outer ring - more subtle */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            width: '220px',
            height: '220px',
            background: 'linear-gradient(45deg, rgba(139, 38, 53, 0.3), transparent, rgba(30, 58, 95, 0.3), transparent)',
            padding: '2px',
            animation: 'spin 12s linear infinite'
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{ backgroundColor: 'var(--bg-hero-from)' }}
          ></div>
        </div>
        
        {/* Profile picture */}
        <div 
          className="relative rounded-full overflow-hidden"
          style={{
            width: '200px',
            height: '200px',
            margin: '10px',
            boxShadow: '4px 4px 16px var(--shadow-color-1), -4px -4px 16px var(--shadow-color-2)',
            border: '3px solid var(--bg-hero-via)'
          }}
        >
          <img
            src="/assets/Portfolio Profile Picture.jpg"
            alt="Jerathel Czerny"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
