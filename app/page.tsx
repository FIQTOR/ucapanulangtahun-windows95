'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setLoading(false);
            setShowMessage(true);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Selamat Ulang Tahun!',
          text: 'Kirim ucapan ulang tahun spesial untukmu!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePlaySound = () => {
    if (!playingSound) {
      setPlayingSound(true);
      setTimeout(() => setPlayingSound(false), 3000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="loading-container">
            <div className="loading-text">LOADING...</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="loading-subtext">WINDOWS 95</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <audio style={{ display: 'none' }} ref={audioRef} />

      {/* Windows 95 Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Main Window */}
        <div className="window">
          {/* Title Bar */}
          <div className="title-bar">
            <div className="title-bar-text">
              <div className="window-icon">
                <div className="icon-content">🎂</div>
              </div>
              Selamat Ulang Tahun Kamu!
            </div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>

          {/* Content */}
          <div className="window-body bg-teal-50">
            <div className={`content ${showMessage ? 'show' : ''}`}>
              {/* Birthday Message */}
              <div className="text-center mb-8">
                <div className="birthday-title">
                  <h1>🎉 SELAMAT ULANG TAHUN KAMU! 🎉</h1>
                  <div className="birthday-subtitle">Semoga Harimu Menyenangkan! 🎈</div>
                </div>
              </div>

              {/* Message Card */}
              <div className="message-card">
                <div className="card-title">💌 Pesan Spesial Untukmu:</div>
                <div className="card-content">
                  <p>Di hari ulang tahunmu ini, semoga semua harapan dan impianmu terwujud.</p>
                  <p>Teruslah menjadi orang yang hebat dan jangan pernah berhenti bermimpi! 💫</p>
                  <div className="wishes-list">
                    <div className="wish-item">🌈 Diberikan kebahagiaan selalu</div>
                    <div className="wish-item">🎯 Semua cita-citamu tercapai</div>
                    <div className="wish-item">💖 Dikelilingi orang-orang tersayang</div>
                    <div className="wish-item">✨ Sukses di segala hal</div>
                    <div className="wish-item">🎁 Diberikan umur panjang dan sehat</div>
                  </div>
                </div>
              </div>

              {/* Interactive Buttons */}
              <div className="button-group">
                <button onClick={handleRefresh} className="win-button">
                  🔄 Refresh
                </button>
                <button onClick={handleShare} className="win-button">
                  📤 Share
                </button>
                <button onClick={handlePlaySound} className="win-button" disabled={playingSound}>
                  {playingSound ? '🔊 Playing...' : '🎵 Play Music'}
                </button>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="status-section">Ready</div>
            <div className="status-section">Birthday System v1.0</div>
          </div>
        </div>

        {/* Taskbar */}
        <div className="taskbar">
          <button className="start-button">Start</button>
          <div className="taskbar-time">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
