import { useEffect, useState, useCallback } from "react";
import { skinCacheService } from "@/services/skinCache";
import { SKIN_CACHE_CONFIG } from "@/constants/skinCache";

export const useSkins = (options = {}) => {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preloadProgress, setPreloadProgress] = useState(0);

  const {
    preloadImages = false,
    priorityPreload = true,
    filterCriteria = null
  } = options;

  const loadSkins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load skin data
      const skinData = await skinCacheService.loadSkins();
      
      // Apply filters if provided
      const finalSkins = filterCriteria 
        ? skinCacheService.filterSkins(filterCriteria)
        : skinData;

      setSkins(finalSkins);

      // Preload images if requested
      if (preloadImages && finalSkins.length > 0) {
        let skinsToPreload = finalSkins;
        
        // If priority preload is enabled, start with popular skins
        if (priorityPreload) {
          const popularSkins = skinCacheService.getPopularSkins(
            SKIN_CACHE_CONFIG.PRIORITY_PRELOAD_COUNT
          );
          skinsToPreload = [...popularSkins, ...finalSkins.filter(
            skin => !popularSkins.find(p => p.id === skin.id)
          )];
        }

        // Start image preloading in background
        skinCacheService.preloadImages(
          skinsToPreload, 
          SKIN_CACHE_CONFIG.PRELOAD_BATCH_SIZE
        ).then(() => {
          setPreloadProgress(100);
          console.log('✅ All skin images preloaded');
        });
      }

    } catch (err) {
      console.error('Failed to load skins:', err);
      setError(err.message);
      // Set fallback skins
      setSkins(skinCacheService.getFallbackSkins());
    } finally {
      setLoading(false);
    }
  }, [preloadImages, priorityPreload, filterCriteria]);

  useEffect(() => {
    loadSkins();
  }, [loadSkins]);

  const getRandomSkin = useCallback(() => {
    return skinCacheService.getRandomSkin();
  }, []);

  const getSkinById = useCallback((id) => {
    return skinCacheService.getSkinById(id);
  }, []);

  const refreshCache = useCallback(async () => {
    skinCacheService.clearCache();
    await loadSkins();
  }, [loadSkins]);

  const getCacheStats = useCallback(() => {
    return skinCacheService.getCacheStats();
  }, []);

  return {
    skins,
    loading,
    error,
    preloadProgress,
    getRandomSkin,
    getSkinById,
    refreshCache,
    getCacheStats
  };
};