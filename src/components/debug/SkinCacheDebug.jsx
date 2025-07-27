import { useState, useEffect } from 'react';
import { skinCacheService } from '@/services/skinCache';

function SkinCacheDebug() {
  const [stats, setStats] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_ENV !== 'development') return;

    const updateStats = () => {
      setStats(skinCacheService.getCacheStats());
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (import.meta.env.VITE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed top-4 left-4 z-[99999] bg-black/80 text-white px-2 py-1 rounded text-xs"
      >
        {showDebug ? 'Hide' : 'Show'} Cache Stats
      </button>

      {/* Debug panel */}
      {showDebug && (
        <div className="fixed top-12 left-4 z-[99999] bg-black/90 text-white p-4 rounded text-xs max-w-xs">
          <h3 className="font-bold mb-2 text-yellow-500">Skin Cache Stats</h3>
          <div className="space-y-1">
            <div>Skins Loaded: {stats.skinsLoaded}</div>
            <div>Images Preloaded: {stats.imagesPreloaded}</div>
            <div>Cache Size: {stats.cacheSize}</div>
            <div>LocalStorage: {stats.hasLocalStorage ? '✅' : '❌'}</div>
          </div>
          
          <div className="mt-3 space-y-1">
            <button
              onClick={() => {
                skinCacheService.clearCache();
                setStats(skinCacheService.getCacheStats());
              }}
              className="bg-red-600 px-2 py-1 rounded text-xs w-full"
            >
              Clear Cache
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SkinCacheDebug;
