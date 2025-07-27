import { SKIN_CACHE_CONFIG } from '@/constants/skinCache';

class SkinCacheService {
  constructor() {
    this.cache = new Map();
    this.imageCache = new Map();
    this.loadedImages = new Set();
    this.skinData = null;
    this.isLoading = false;
  }

  // Get cache key with version for cache invalidation
  getCacheKey() {
    return `${SKIN_CACHE_CONFIG.STORAGE_KEY}_v${SKIN_CACHE_CONFIG.CACHE_VERSION}`;
  }

  // Load skins data with caching
  async loadSkins() {
    if (this.skinData) return this.skinData;
    if (this.isLoading) {
      // Wait for existing request
      while (this.isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.skinData;
    }

    this.isLoading = true;

    try {
      // Try to load from localStorage first
      const cachedData = this.loadFromStorage();
      if (cachedData) {
        console.log('✅ Loaded skins from cache');
        this.skinData = cachedData;
        this.isLoading = false;
        return this.skinData;
      }

      // Fetch from API
      console.log('🌐 Fetching skins from API...');
      const response = await fetch(SKIN_CACHE_CONFIG.API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      // Cache the data
      this.saveToStorage(data);
      this.skinData = data;
      
      console.log(`✅ Loaded ${data.length} skins from API`);
      return this.skinData;

    } catch (error) {
      console.error('❌ Failed to load skins:', error);
      // Return fallback data if available
      this.skinData = this.getFallbackSkins();
      return this.skinData;
    } finally {
      this.isLoading = false;
    }
  }

  // Save to localStorage with compression
  saveToStorage(data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        version: SKIN_CACHE_CONFIG.CACHE_VERSION
      };
      
      localStorage.setItem(this.getCacheKey(), JSON.stringify(cacheData));
      console.log('💾 Skins cached to localStorage');
    } catch (error) {
      console.warn('⚠️ Failed to cache skins:', error);
    }
  }

  // Load from localStorage with expiration check
  loadFromStorage() {
    try {
      const cached = localStorage.getItem(this.getCacheKey());
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const isExpired = Date.now() - cacheData.timestamp > SKIN_CACHE_CONFIG.CACHE_DURATION;
      
      if (isExpired || cacheData.version !== SKIN_CACHE_CONFIG.CACHE_VERSION) {
        localStorage.removeItem(this.getCacheKey());
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('⚠️ Failed to load cached skins:', error);
      return null;
    }
  }

  // Preload skin images in batches
  async preloadImages(skins, batchSize = 10) {
    const skinsToLoad = skins.filter(skin => 
      skin.image && !this.loadedImages.has(skin.image)
    );

    console.log(`🖼️ Preloading ${skinsToLoad.length} skin images...`);

    for (let i = 0; i < skinsToLoad.length; i += batchSize) {
      const batch = skinsToLoad.slice(i, i + batchSize);
      const promises = batch.map(skin => this.preloadSingleImage(skin));
      
      try {
        await Promise.allSettled(promises);
        // Small delay between batches to not overwhelm the browser
        if (i + batchSize < skinsToLoad.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.warn('⚠️ Batch preload failed:', error);
      }
    }

    console.log(`✅ Preloaded ${this.loadedImages.size} images`);
  }

  // Preload a single image
  preloadSingleImage(skin) {
    return new Promise((resolve) => {
      if (this.loadedImages.has(skin.image)) {
        resolve(skin);
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(skin.image);
        this.imageCache.set(skin.image, img);
        resolve(skin);
      };
      img.onerror = () => {
        console.warn(`⚠️ Failed to load image: ${skin.name}`);
        resolve(skin); // Resolve anyway to not block batch
      };
      img.src = skin.image;
    });
  }

  // Get random skin with fallback
  getRandomSkin() {
    if (!this.skinData || this.skinData.length === 0) {
      return this.getFallbackSkin();
    }
    return this.skinData[Math.floor(Math.random() * this.skinData.length)];
  }

  // Get skin by ID
  getSkinById(id) {
    if (!this.skinData) return null;
    return this.skinData.find(skin => skin.id === id);
  }

  // Filter skins by criteria
  filterSkins(criteria = {}) {
    if (!this.skinData) return [];
    
    return this.skinData.filter(skin => {
      if (criteria.rarity && skin.rarity !== criteria.rarity) return false;
      if (criteria.weapon && !skin.weapon_name?.includes(criteria.weapon)) return false;
      if (criteria.hasImage && !skin.image) return false;
      return true;
    });
  }

  // Get popular skins (for priority preloading)
  getPopularSkins(limit = 50) {
    if (!this.skinData) return [];
    
    // Filter high-quality skins with images
    const popularSkins = this.skinData
      .filter(skin => skin.image && skin.rarity)
      .sort((a, b) => {
        // Sort by rarity priority and name
        const rarityOrder = { 'Classified': 3, 'Restricted': 2, 'Mil-Spec': 1 };
        return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
      })
      .slice(0, limit);

    return popularSkins;
  }

  // Fallback skins for when API is unavailable
  getFallbackSkins() {
    return [
      {
        id: 'fallback-1',
        name: 'AK-47 | Redline',
        image: 'https://via.placeholder.com/100?text=AK-47',
        rarity: 'Classified',
        weapon_name: 'AK-47'
      },
      {
        id: 'fallback-2', 
        name: 'AWP | Dragon Lore',
        image: 'https://via.placeholder.com/100?text=AWP',
        rarity: 'Covert',
        weapon_name: 'AWP'
      }
    ];
  }

  getFallbackSkin() {
    const fallbacks = this.getFallbackSkins();
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Clear cache
  clearCache() {
    localStorage.removeItem(this.getCacheKey());
    this.cache.clear();
    this.imageCache.clear();
    this.loadedImages.clear();
    this.skinData = null;
    console.log('🗑️ Skin cache cleared');
  }

  // Get cache stats
  getCacheStats() {
    return {
      skinsLoaded: this.skinData?.length || 0,
      imagesPreloaded: this.loadedImages.size,
      cacheSize: this.cache.size,
      hasLocalStorage: !!localStorage.getItem(this.getCacheKey())
    };
  }
}

// Export singleton instance
export const skinCacheService = new SkinCacheService();
export default skinCacheService;
